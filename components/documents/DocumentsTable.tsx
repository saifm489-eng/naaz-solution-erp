"use client";

import { useEffect, useState } from "react";
import {
  getDocuments,
  deleteDocument,
  getDocumentById,
} from "@/lib/services/document.service";
import { deleteFile } from "@/lib/services/storage";
import { Document } from "@/types/document";

export default function DocumentsTable() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  // Load Documents
  async function refreshDocuments() {
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (error) {
      console.error("Failed to load documents:", error);
    }
  }

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await getDocuments();

        if (mounted) {
          setDocuments(data);
        }
      } catch (error) {
        console.error("Failed to load documents:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  // Delete Document
  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmed) return;

    try {
      const document = await getDocumentById(id);

      if (!document) {
        alert("Document not found.");
        return;
      }

      if (document.file_path) {
        await deleteFile(document.file_path);
      }

      await deleteDocument(id);

      await refreshDocuments();

      alert("Document deleted successfully.");
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Delete failed."
      );
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-6 text-center">
        Loading documents...
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-6 text-center text-gray-500">
        No documents found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left">File Name</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Size</th>
            <th className="px-4 py-3 text-left">Uploaded</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {documents.map((doc) => (
            <tr
              key={doc.id}
              className="border-t hover:bg-slate-50"
            >
              <td className="px-4 py-3">
                {doc.file_name}
              </td>

              <td className="px-4 py-3">
                {doc.file_type ?? "-"}
              </td>

              <td className="px-4 py-3">
                {doc.file_size
                  ? `${(doc.file_size / 1024).toFixed(2)} KB`
                  : "-"}
              </td>

              <td className="px-4 py-3">
                {new Date(doc.created_at).toLocaleString()}
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">

                  <a
                    href={doc.file_url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                  >
                    Preview
                  </a>

                  <a
                    href={doc.file_url ?? "#"}
                    download={doc.file_name}
                    className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                  >
                    Download
                  </a>

                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                  >
                    Delete
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}