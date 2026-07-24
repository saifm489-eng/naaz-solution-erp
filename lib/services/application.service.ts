import { supabase } from "@/lib/supabase/client";

export interface CreateApplicationInput {
  application_no: string;
  customer_id: string;
  user_id: string;
  service_name: string;
  status: string;
  amount: number;
  remarks?: string;
}

export async function createApplication(
  payload: CreateApplicationInput
) {
  const { data, error } = await supabase
    .from("applications")
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.error("Create Application Error:", error);
    throw new Error(error.message);
  }

  return data;
}