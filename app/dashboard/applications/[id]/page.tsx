"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  IndianRupee,
  Pencil,
  Phone,
  User,
  XCircle,
} from "lucide-react";

import { getApplicationById } from "@/lib/services/applications";
import type { Application } from "@/types/application";

type CustomerInfo = {
  id: string;
  name: string;
  phone: string | null;
};

type ApplicationWithCustomer = Application & {
  customers?: CustomerInfo | null;
};

export default function ApplicationDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [application, setApplication] =
    useState<ApplicationWithCustomer | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadApplication() {
      try {
        setLoading(true);
        setError("");

        const data = await getApplicationById(id);

        if (mounted) {
          setApplication(data as ApplicationWithCustomer);
        }
      } catch (err) {
        console.error("Application details error:", err);

        if (mounted) {
          setError("Application not found.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    if (id) {
      loadApplication();
    }

    return () => {
      mounted = false;
    };
  }, [id]);

  function getStatusClass(status: string) {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700 border-green-200";

      case "Processing":
        return "bg-blue-100 text-blue-700 border-blue-200";

      case "Completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";

      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200";

      default:
        return "bg-amber-100 text-amber-700 border-amber-200";
    }
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case "Approved":
      case "Completed":
        return <CheckCircle2 size={17} />;

      case "Rejected":
        return <XCircle size={17} />;

      case "Processing":
        return <Clock3 size={17} />;

      default:
        return <Clock3 size={17} />;
    }
  }

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-70px)] bg-slate-100 px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="animate-pulse">
            <div className="mb-6 h-5 w-32 rounded bg-slate-200" />
            <div className="mb-3 h-10 w-72 rounded bg-slate-200" />
            <div className="mb-8 h-5 w-96 rounded bg-slate-200" />

            <div className="grid gap-6 md:grid-cols-2">
              <div className="h-48 rounded-2xl bg-white shadow-sm" />
              <div className="h-48 rounded-2xl bg-white shadow-sm" />
              <div className="h-48 rounded-2xl bg-white shadow-sm" />
              <div className="h-48 rounded-2xl bg-white shadow-sm" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !application) {
    return (
      <main className="flex min-h-[calc(100vh-70px)] items-center justify-center bg-slate-100 px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
            <XCircle size={30} />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Application Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The application may have been deleted or you may not have
            permission to view it.
          </p>

          <Link
            href="/dashboard/applications"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <ArrowLeft size={17} />
            Back to Applications
          </Link>
        </div>
      </main>
    );
  }

  const customer = application.customers;

  return (
    <main className="min-h-[calc(100vh-70px)] bg-slate-100 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Back */}
        <Link
          href="/dashboard/applications"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Back to Applications
        </Link>

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <FileText className="text-emerald-600" size={28} />

              <h1 className="text-3xl font-bold text-slate-900">
                Application Details
              </h1>
            </div>

            <p className="text-sm text-slate-500">
              Application No:{" "}
              <span className="font-semibold text-slate-700">
                {application.application_no}
              </span>
            </p>
          </div>

          <Link
            href={`/dashboard/applications/${application.id}/edit`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            <Pencil size={17} />
            Edit Application
          </Link>
        </div>

        {/* Status */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-slate-500">Current Status</p>

              <div className="mt-2 flex items-center gap-3">
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${getStatusClass(
                    application.status
                  )}`}
                >
                  {getStatusIcon(application.status)}
                  {application.status}
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-sm text-slate-500">Service</p>

              <p className="mt-1 text-lg font-semibold capitalize text-slate-900">
                {application.service_name}
              </p>
            </div>
          </div>
        </div>

        {/* Information Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Customer */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <User size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Customer Information
                </h2>

                <p className="text-xs text-slate-500">
                  Linked customer details
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Name
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  {customer?.name ?? "Customer unavailable"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Phone
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <Phone size={15} className="text-slate-400" />

                  <span className="font-medium text-slate-800">
                    {customer?.phone ?? "Not available"}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Application */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <FileText size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Application Information
                </h2>

                <p className="text-xs text-slate-500">
                  Service and payment details
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Application Number
                </p>

                <p className="mt-1 font-semibold text-emerald-700">
                  {application.application_no}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Service
                </p>

                <p className="mt-1 font-semibold capitalize text-slate-800">
                  {application.service_name}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Amount
                </p>

                <div className="mt-1 flex items-center gap-1 font-bold text-slate-900">
                  <IndianRupee size={16} />
                  {Number(application.amount ?? 0).toLocaleString("en-IN")}
                </div>
              </div>
            </div>
          </section>

          {/* Date */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <CalendarDays size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Application Date
                </h2>

                <p className="text-xs text-slate-500">
                  Created and updated information
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Created
                </p>

                <p className="mt-1 font-medium text-slate-800">
                  {application.created_at
                    ? new Date(application.created_at).toLocaleString(
                        "en-IN",
                        {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }
                      )
                    : "Not available"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Updated
                </p>

                <p className="mt-1 font-medium text-slate-800">
                  {application.updated_at
                    ? new Date(application.updated_at).toLocaleString(
                        "en-IN",
                        {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }
                      )
                    : "Not available"}
                </p>
              </div>
            </div>
          </section>

          {/* Remarks */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="font-semibold text-slate-900">
                Remarks
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Additional application information
              </p>
            </div>

            <div className="min-h-28 rounded-xl bg-slate-50 p-4">
              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                {application.remarks || "No remarks added."}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}