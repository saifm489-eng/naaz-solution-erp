import { supabase } from "@/lib/supabase/client";
export async function getApplications() {
  const { data, error } = await supabase
    .from("applications")
    .select(`
      *,
      customers(name, phone)
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}