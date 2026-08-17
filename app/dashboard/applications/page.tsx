"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Eye, Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";

import {
  deleteApplication,
  getApplications,
} from "@/lib/services/applications";

interface Customer {
  id: string;
  name: string;
  phone: string | null;
}

interface Application {
  id: string;
  application_no: string;
  service_name: string;
  status: string;
  amount: number;
  remarks?: string | null;
  created_at?: string;
  customer_id: string;
  customers?: Customer | null;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadApplications = async () => {
    try {
      setError("");

      const data = await getApplications();

      setApplications((data ?? []) as Application[]);
    } catch (error) {
      console.error("Error loading applications:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to load applications."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const initializeApplications = async () => {
      await loadApplications();
    };
    initializeApplications();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadApplications();
  };

  const handleDelete = async (
    id: string,
    applicationNo: string
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete application ${applicationNo}?\n\nThis action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      await deleteApplication(id);

      setApplications((current) =>
        current.filter((application) => application.id !== id)
      );
    } catch (error) {
      console.error("Delete Application Error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete application."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Processing":
        return "bg-blue-100 text-blue-700";

      case "Approved":
        return "bg-green-100 text-green-700";

      case "Completed":
        return "bg-emerald-100 text-emerald-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (date?: string) => {
    if (!date) {
      return "—";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />

            <p className="text-sm text-gray-500">
              Loading Applications...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Applications
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage all customer applications.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw
                size={17}
                className={refreshing ? "animate-spin" : ""}
              />

              Refresh
            </button>

            <Link
              href="/dashboard/applications/new"
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              <Plus size={18} />

              New Application
            </Link>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Applications
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {applications.length}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Pending
            </p>

            <p className="mt-2 text-2xl font-bold text-yellow-600">
              {
                applications.filter(
                  (app) => app.status === "Pending"
                ).length
              }
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Processing
            </p>

            <p className="mt-2 text-2xl font-bold text-blue-600">
              {
                applications.filter(
                  (app) => app.status === "Processing"
                ).length
              }
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Completed
            </p>

            <p className="mt-2 text-2xl font-bold text-green-600">
              {
                applications.filter(
                  (app) => app.status === "Completed"
                ).length
              }
            </p>
          </div>
        </div>

        {/* Empty State */}
        {applications.length === 0 ? (
          <div className="rounded-xl border border-dashed bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
              <Plus className="text-green-600" size={28} />
            </div>

            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              No Applications Found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              There are no applications yet. Create your first
              application to get started.
            </p>

            <Link
              href="/dashboard/applications/new"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
            >
              <Plus size={18} />

              Create Application
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-hidden rounded-xl border bg-white shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-225">
                  <thead className="border-b bg-gray-50">
                    <tr>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Application
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Customer
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Service
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Amount
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Status
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Date
                      </th>

                      <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {applications.map((app) => (
                      <tr
                        key={app.id}
                        className="transition hover:bg-gray-50"
                      >
                        {/* Application */}
                        <td className="px-5 py-4">
                          <Link
                            href={`/dashboard/applications/${app.id}`}
                            className="font-semibold text-green-700 hover:text-green-800 hover:underline"
                          >
                            {app.application_no}
                          </Link>
                        </td>

                        {/* Customer */}
                        <td className="px-5 py-4">
                          {app.customers ? (
                            <div>
                              <p className="font-medium text-gray-900">
                                {app.customers.name}
                              </p>

                              {app.customers.phone && (
                                <p className="mt-0.5 text-xs text-gray-500">
                                  {app.customers.phone}
                                </p>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">
                              Customer unavailable
                            </span>
                          )}
                        </td>

                        {/* Service */}
                        <td className="px-5 py-4 text-sm text-gray-700">
                          {app.service_name}
                        </td>

                        {/* Amount */}
                        <td className="px-5 py-4 text-sm font-medium text-gray-900">
                          ₹{Number(app.amount ?? 0).toLocaleString("en-IN")}
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                              app.status
                            )}`}
                          >
                            {app.status}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-5 py-4 text-sm text-gray-500">
                          {formatDate(app.created_at)}
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <Link
                              href={`/dashboard/applications/${app.id}`}
                              title="View Application"
                              className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                            >
                              <Eye size={17} />
                            </Link>

                            <Link
                              href={`/dashboard/applications/${app.id}/edit`}
                              title="Edit Application"
                              className="rounded-lg border border-blue-200 p-2 text-blue-600 transition hover:bg-blue-50"
                            >
                              <Pencil size={17} />
                            </Link>

                            <button
                              type="button"
                              title="Delete Application"
                              onClick={() =>
                                handleDelete(
                                  app.id,
                                  app.application_no
                                )
                              }
                              disabled={deletingId === app.id}
                              className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {deletingId === app.id ? (
                                <span className="block h-4.25 w-4.25 animate-spin rounded-full border-2 border-red-200 border-t-red-600" />
                              ) : (
                                <Trash2 size={17} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-4 md:hidden">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="rounded-xl border bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/dashboard/applications/${app.id}`}
                        className="font-semibold text-green-700"
                      >
                        {app.application_no}
                      </Link>

                      <p className="mt-1 text-sm text-gray-500">
                        {formatDate(app.created_at)}
                      </p>
                    </div>

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 border-t pt-4">
                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-gray-500">
                        Customer
                      </span>

                      <span className="text-right font-medium text-gray-900">
                        {app.customers?.name ?? "Unavailable"}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-gray-500">
                        Service
                      </span>

                      <span className="text-right font-medium text-gray-900">
                        {app.service_name}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-gray-500">
                        Amount
                      </span>

                      <span className="font-semibold text-gray-900">
                        ₹
                        {Number(
                          app.amount ?? 0
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2 border-t pt-4">
                    <Link
                      href={`/dashboard/applications/${app.id}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <Eye size={16} />
                      View
                    </Link>

                    <Link
                      href={`/dashboard/applications/${app.id}/edit`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-blue-200 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          app.id,
                          app.application_no
                        )
                      }
                      disabled={deletingId === app.id}
                      className="flex items-center justify-center rounded-lg border border-red-200 px-3 py-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}