"use client";

import { useRef, useState } from "react";
import { uploadFile } from "@/lib/services/storage";
// import { createDocument } from "@/lib/services/documents";

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

      const filePath = await uploadFile(file);

      console.log("Uploaded Path:", filePath);

      // Database save बाद में करेंगे जब customerId/applicationId होंगे
      // await createDocument({
      //   customer_id: "...",
      //   application_id: "...",
      //   file_name: file.name,
      //   file_url: filePath,
      // });

      alert("File uploaded successfully.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Upload failed."
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
        className="rounded-xl bg-[#083139] px-5 py-3 text-white transition hover:bg-[#0a4350] disabled:opacity-50"
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