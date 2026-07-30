import UploadDocumentDialog from "@/components/documents/UploadDocumentDialog";
import DocumentsTable from "@/components/documents/DocumentsTable";

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#083139]">
            Documents
          </h1>

          <p className="text-slate-500">
            Manage uploaded customer documents.
          </p>
        </div>

        <UploadDocumentDialog />
      </div>

      {/* Documents Table */}
      <DocumentsTable />
    </div>
  );
}