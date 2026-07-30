import { supabase } from "@/lib/supabase/client";
import { Document } from "@/types/document";

/**
 * Get All Documents
 */
export async function getDocuments(): Promise<Document[]> {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []) as Document[];
}

/**
 * Get Document By ID
 */
export async function getDocumentById(
  id: string
): Promise<Document | null> {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Document;
}

/**
 * Get Customer Documents
 */
export async function getCustomerDocuments(
  customerId: string
): Promise<Document[]> {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []) as Document[];
}

/**
 * Get Application Documents
 */
export async function getApplicationDocuments(
  applicationId: string
): Promise<Document[]> {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("application_id", applicationId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []) as Document[];
}

/**
 * Create Document
 */
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

/**
 * Delete Document (Database Only)
 */
export async function deleteDocument(id: string): Promise<void> {
  const { error } = await supabase
    .from("documents")
    .delete()
    .eq("id", id);

  if (error) throw error;
}