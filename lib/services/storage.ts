import { supabase } from "@/lib/supabase/client";

export async function uploadFile(
  file: File,
  folder: string = "documents"
) {
  const fileExt = file.name.split(".").pop();

  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}.${fileExt}`;

  const filePath = `${folder}/${fileName}`;

  const { error } = await supabase.storage
    .from("documents")
    .upload(filePath, file);

  if (error) throw error;

  // Return only the storage path
  return filePath;
}

export function getFileUrl(filePath: string): string {
  const { data } = supabase.storage
    .from("documents")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function deleteFile(filePath: string) {
  const { error } = await supabase.storage
    .from("documents")
    .remove([filePath]);

  if (error) throw error;
}