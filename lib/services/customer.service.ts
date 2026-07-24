import { supabase } from "@/lib/supabase/client";
import { CustomerFormData } from "@/lib/validations/customer";
import { Customer } from "@/types/customer";

/**
 * Get all customers
 */
export async function getCustomers(): Promise<Customer[]> {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}

/**
 * Get customer by phone
 */
export async function getCustomerByPhone(
  phone: string
): Promise<Customer | null> {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("phone", phone)
    .maybeSingle();

  if (error) throw error;

  return data;
}

/**
 * Get customer by customer code
 */
export async function getCustomerByCode(
  code: string
): Promise<Customer | null> {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("customer_code", code)
    .maybeSingle();

  if (error) throw error;

  return data;
}

/**
 * Generate next customer code
 */
export async function generateCustomerCode(): Promise<string> {
  const { count, error } = await supabase
    .from("customers")
    .select("*", {
      count: "exact",
      head: true,
    });

  if (error) throw error;

  const next = (count ?? 0) + 1;

  return `CUS-${next.toString().padStart(6, "0")}`;
}

/**
 * Get customer by ID
 */
export async function getCustomerById(
  id: string
): Promise<Customer> {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

/**
 * Create Customer
 */
export async function createCustomer(
  customer: CustomerFormData,
  userId: string
): Promise<Customer> {
  // Duplicate mobile check
  const existing = await getCustomerByPhone(customer.phone);

  if (existing) {
    throw new Error("Customer with this mobile number already exists.");
  }

  // Generate customer code
  const customerCode = await generateCustomerCode();

  // Insert customer
  const { data, error } = await supabase
    .from("customers")
    .insert([
      {
        ...customer,
        customer_code: customerCode,
        user_id: userId,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}

/**
 * Update Customer
 */
export async function updateCustomer(
  id: string,
  customer: Partial<CustomerFormData>
): Promise<Customer> {
  // Duplicate mobile check (if phone is updated)
  if (customer.phone) {
    const existing = await getCustomerByPhone(customer.phone);

    if (existing && existing.id !== id) {
      throw new Error("Customer with this mobile number already exists.");
    }
  }

  const { data, error } = await supabase
    .from("customers")
    .update(customer)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/**
 * Delete Customer
 */
export async function deleteCustomer(
  id: string
): Promise<boolean> {
  const { error } = await supabase
    .from("customers")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
}

/**
 * Search Customers
 */
export async function searchCustomers(
  search: string
): Promise<Customer[]> {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .or(
      `name.ilike.%${search}%,phone.ilike.%${search}%,email.ilike.%${search}%,customer_code.ilike.%${search}%`
    )
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}