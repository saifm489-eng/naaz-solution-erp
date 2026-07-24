import { supabase } from "@/lib/supabase/client";

export async function getDocuments() {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function createDocument(document: {
  customer_id: string;
  application_id: string;
  file_name: string;
  file_url: string;
}) {
  const { data, error } = await supabase
    .from("documents")
    .insert(document)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteDocument(id: string) {
  const { error } = await supabase
    .from("documents")
    .delete()
    .eq("id", id);

  if (error) throw error;
}