"use client";

import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import {
  uploadFile,
  getFileUrl,
} from "@/lib/services/storage";
import { createDocument } from "@/lib/services/document.service";

export default function UploadDocumentDialog() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      // Upload file to Supabase Storage
      const filePath = await uploadFile(file);

      // Get public URL
      const publicUrl = await getFileUrl(filePath);

      // Get logged-in user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("User not authenticated.");
      }

      // Save metadata to database
      await createDocument({
        customer_id: null,
        application_id: null,
        user_id: user.id,
        file_name: file.name,
        file_path: filePath,
        file_url: publicUrl,
        file_size: file.size,
        file_type: file.type,
      });

      alert("Document uploaded successfully.");

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Upload failed."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="rounded-xl bg-[#083139] px-5 py-3 text-white transition hover:bg-[#0a4350] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload Document"}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
}