import { supabase } from "@/lib/supabase/client";
import { getCurrentUser } from "@/lib/auth/getUser";

import type {
  Application,
  ApplicationStatus,
} from "@/types/application";

export interface CreateApplicationData {
  customer_id: string;
  service_name: string;
  amount?: number | null;
  status?: ApplicationStatus;
  remarks?: string | null;
}

export interface UpdateApplicationData {
  customer_id?: string | null;
  service_name?: string;
  amount?: number | null;
  status?: ApplicationStatus;
  remarks?: string | null;
}

interface CustomerData {
  id: string;
  name: string;
  phone: string | null;
}

/**
 * Get customer by ID.
 */
async function getCustomerById(
  customerId: string,
  userId: string
): Promise<CustomerData | null> {
  if (!customerId) {
    return null;
  }

  const { data, error } = await supabase
    .from("customers")
    .select("id, name, phone")
    .eq("id", customerId)
    .maybeSingle();

  if (error) {
    console.error("Get Customer Error:", {
      customerId,
      userId,
      error,
    });

    return null;
  }

  return data ?? null;
}

/**
 * Get all applications of the logged-in user.
 */
export async function getApplications(): Promise<Application[]> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const { data: applications, error: applicationsError } =
    await supabase
      .from("applications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

  if (applicationsError) {
    console.error("Get Applications Error:", applicationsError);

    throw applicationsError;
  }

  if (!applications || applications.length === 0) {
    return [];
  }

  /*
   * Get all unique customer IDs.
   */
  const customerIds = [
    ...new Set(
      applications
        .map((application) => application.customer_id)
        .filter(
          (customerId): customerId is string =>
            typeof customerId === "string" &&
            customerId.trim().length > 0
        )
    ),
  ];

  /*
   * Load customers.
   */
  let customers: CustomerData[] = [];

  if (customerIds.length > 0) {
    const { data, error } = await supabase
      .from("customers")
      .select("id, name, phone")
      .in("id", customerIds);

    if (error) {
      console.error(
        "Get Customers For Applications Error:",
        error
      );
    } else {
      customers = data ?? [];
    }
  }

  /*
   * Create a quick customer lookup map.
   */
  const customerMap = new Map<string, CustomerData>();

  for (const customer of customers) {
    customerMap.set(String(customer.id), customer);
  }

  /*
   * Attach customer to each application.
   */
  const result = applications.map((application) => {
    const customerId = application.customer_id
      ? String(application.customer_id)
      : "";

    return {
      ...application,
      customers: customerMap.get(customerId) ?? null,
    };
  });

  return result as Application[];
}

/**
 * Get a single application by ID.
 */
export async function getApplicationById(
  id: string
): Promise<Application> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  if (!id) {
    throw new Error("Application ID is required.");
  }

  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error(
      "Get Application By ID Error:",
      error
    );

    throw error;
  }

  if (!data) {
    throw new Error("Application not found.");
  }

  const customer = data.customer_id
    ? await getCustomerById(
        String(data.customer_id),
        user.id
      )
    : null;

  return {
    ...data,
    customers: customer,
  } as Application;
}

/**
 * Create a new application.
 */
export async function createApplication(
  input: CreateApplicationData
): Promise<Application> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  if (!input.customer_id?.trim()) {
    throw new Error("Please select a customer.");
  }

  if (!input.service_name?.trim()) {
    throw new Error("Service name is required.");
  }

  const applicationNo = `APP-${Date.now()}`;

  const { data, error } = await supabase
    .from("applications")
    .insert({
      application_no: applicationNo,
      customer_id: input.customer_id,
      user_id: user.id,
      service_name: input.service_name.trim(),
      status: input.status ?? "Pending",
      amount: input.amount ?? 0,
      remarks: input.remarks?.trim() || null,
    })
    .select("*")
    .single();

  if (error) {
    console.error(
      "Create Application Error:",
      error
    );

    throw error;
  }

  const customer = data.customer_id
    ? await getCustomerById(
        String(data.customer_id),
        user.id
      )
    : null;

  return {
    ...data,
    customers: customer,
  } as Application;
}

/**
 * Update an existing application.
 */
export async function updateApplication(
  id: string,
  input: UpdateApplicationData
): Promise<Application> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  if (!id) {
    throw new Error("Application ID is required.");
  }

  const updateData: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (input.customer_id !== undefined) {
    updateData.customer_id = input.customer_id;
  }

  if (input.service_name !== undefined) {
    updateData.service_name =
      input.service_name.trim();
  }

  if (input.amount !== undefined) {
    updateData.amount = input.amount;
  }

  if (input.status !== undefined) {
    updateData.status = input.status;
  }

  if (input.remarks !== undefined) {
    updateData.remarks =
      input.remarks?.trim() || null;
  }

  const { data, error } = await supabase
    .from("applications")
    .update(updateData)
    .eq("id", id)
    .eq("user_id", user.id)
    .select("*")
    .single();

  if (error) {
    console.error(
      "Update Application Error:",
      error
    );

    throw error;
  }

  const customer = data.customer_id
    ? await getCustomerById(
        String(data.customer_id),
        user.id
      )
    : null;

  return {
    ...data,
    customers: customer,
  } as Application;
}

/**
 * Delete an application.
 */
export async function deleteApplication(
  id: string
): Promise<void> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  if (!id) {
    throw new Error("Application ID is required.");
  }

  const { error } = await supabase
    .from("applications")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error(
      "Delete Application Error:",
      error
    );

    throw error;
  }
}