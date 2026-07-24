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

  return filePath;
}

export async function getFileUrl(path: string) {
  const { data } = supabase.storage
    .from("documents")
    .getPublicUrl(path);

  return data.publicUrl;
}

export async function deleteFile(path: string) {
  const { error } = await supabase.storage
    .from("documents")
    .remove([path]);

  if (error) throw error;
}