import { supabase } from "@/lib/supabase/client";
import { CustomerFormData } from "@/lib/validations/customer";
import { Customer } from "@/types/customer";

/**
 * Get all customers
 */
export async function getCustomers(): Promise<Customer[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get Customers Error:", error);
    throw error;
  }

  return data ?? [];
}

/**
 * Get customer by phone
 */
export async function getCustomerByPhone(
  phone: string
): Promise<Customer | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("phone", phone)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Get Customer By Phone Error:", error);
    throw error;
  }

  return data;
}

/**
 * Get customer by customer code
 */
export async function getCustomerByCode(
  code: string
): Promise<Customer | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("customer_code", code)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Get Customer By Code Error:", error);
    throw error;
  }

  return data;
}

/**
 * Generate next customer code
 */
export async function generateCustomerCode(): Promise<string> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const { count, error } = await supabase
    .from("customers")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", user.id);

  if (error) {
    console.error("Generate Customer Code Error:", error);
    throw error;
  }

  const next = (count ?? 0) + 1;

  return `CUS-${next.toString().padStart(6, "0")}`;
}

/**
 * Get customer by ID
 */
export async function getCustomerById(
  id: string
): Promise<Customer> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error("Get Customer By ID Error:", error);
    throw error;
  }

  return data;
}

/**
 * Create Customer
 */
export async function createCustomer(
  customer: CustomerFormData,
  userId: string
): Promise<Customer> {
  if (!userId) {
    throw new Error("User is not authenticated.");
  }

  const existing = await getCustomerByPhone(customer.phone);

  if (existing) {
    throw new Error(
      "Customer with this mobile number already exists."
    );
  }

  const customerCode = await generateCustomerCode();

  const { data, error } = await supabase
    .from("customers")
    .insert({
      ...customer,
      customer_code: customerCode,
      user_id: userId,
    })
    .select()
    .single();

  if (error) {
    console.error("Create Customer Error:", error);
    throw error;
  }

  return data;
}

/**
 * Update Customer
 */
export async function updateCustomer(
  id: string,
  customer: Partial<CustomerFormData>
): Promise<Customer> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  if (customer.phone) {
    const existing = await getCustomerByPhone(customer.phone);

    if (existing && existing.id !== id) {
      throw new Error(
        "Customer with this mobile number already exists."
      );
    }
  }

  const { data, error } = await supabase
    .from("customers")
    .update({
      ...customer,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    console.error("Update Customer Error:", error);
    throw error;
  }

  return data;
}

/**
 * Delete Customer
 */
export async function deleteCustomer(
  id: string
): Promise<boolean> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const { error } = await supabase
    .from("customers")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Delete Customer Error:", error);
    throw error;
  }

  return true;
}

/**
 * Search Customers
 */
export async function searchCustomers(
  search: string
): Promise<Customer[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const value = search.trim();

  let query = supabase
    .from("customers")
    .select("*")
    .eq("user_id", user.id);

  if (value) {
    query = query.or(
      `name.ilike.%${value}%,phone.ilike.%${value}%,email.ilike.%${value}%,customer_code.ilike.%${value}%`
    );
  }

  const { data, error } = await query.order("created_at", {
    ascending: false,
  });

  if (error) {
    console.error("Search Customers Error:", error);
    throw error;
  }

  return data ?? [];
}