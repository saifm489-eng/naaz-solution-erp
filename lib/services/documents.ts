import { supabase } from "@/lib/supabase/client";
import { Document } from "@/types/document";

export async function getDocuments(): Promise<Document[]> {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data as Document[];
}

export async function createDocument(
  document: Omit<Document, "id" | "created_at">
): Promise<Document> {
  const { data, error } = await supabase
    .from("documents")
    .insert(document)
    .select()
    .single();

  if (error) throw error;

  return data as Document;
}

export async function deleteDocument(id: string): Promise<void> {
  const { error } = await supabase
    .from("documents")
    .delete()
    .eq("id", id);

  if (error) throw error;
}