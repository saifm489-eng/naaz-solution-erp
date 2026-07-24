"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getApplications } from "@/lib/services/applications";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadApplications() {
      try {
        const data = await getApplications();
        setApplications(data || []);
      } catch (error) {
        console.error("Error loading applications:", error);
      } finally {
        setLoading(false);
      }
    }

    loadApplications();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading Applications...</p>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Applications
          </h1>

          <p className="mt-2 text-gray-500">
            Total Applications: {applications.length}
          </p>
        </div>

        <Link
          href="/dashboard/applications/new"
          className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700 transition"
        >
          + New Application
        </Link>

      </div>

      {/* Empty State */}
      {applications.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center bg-white">
          <h2 className="text-xl font-semibold">
            No Applications Found
          </h2>

          <p className="mt-2 text-gray-500">
            Click on <strong>+ New Application</strong> to create your first application.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app: any) => (
            <div
              key={app.id}
              className="rounded-lg border bg-white p-4 shadow-sm"
            >
              <h3 className="font-semibold">
                {app.application_no}
              </h3>

              <p className="text-sm text-gray-500">
                Service: {app.service_name}
              </p>

              <p className="text-sm">
                Status: {app.status}
              </p>

              <p className="text-sm">
                Amount: ₹{app.amount}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}