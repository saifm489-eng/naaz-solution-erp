"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Save,
} from "lucide-react";

import {
  getApplicationById,
  updateApplication,
} from "@/lib/services/applications";

import type {
  Application,
  ApplicationStatus,
} from "@/types/application";

type CustomerInfo = {
  id: string;
  name: string;
  phone: string | null;
};

type ApplicationWithCustomer = Application & {
  customers?: CustomerInfo | null;
};

const statuses: ApplicationStatus[] = [
  "Pending",
  "Processing",
  "Approved",
  "Rejected",
  "Completed",
];

export default function EditApplicationPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [application, setApplication] =
    useState<ApplicationWithCustomer | null>(null);

  const [serviceName, setServiceName] = useState("");
  const [amount, setAmount] = useState("0");
  const [status, setStatus] =
    useState<ApplicationStatus>("Pending");
  const [remarks, setRemarks] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadApplication() {
      try {
        setLoading(true);
        setError("");

        const data = await getApplicationById(id);

        if (!mounted) return;

        const app = data as ApplicationWithCustomer;

        setApplication(app);
        setServiceName(app.service_name ?? "");
        setAmount(String(app.amount ?? 0));
        setStatus(app.status ?? "Pending");
        setRemarks(app.remarks ?? "");
      } catch (err) {
        console.error("Load application error:", err);

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

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!serviceName.trim()) {
      setError("Service name is required.");
      return;
    }

    const numericAmount = Number(amount);

    if (Number.isNaN(numericAmount) || numericAmount < 0) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      setSaving(true);

      await updateApplication(id, {
        service_name: serviceName.trim(),
        amount: numericAmount,
        status,
        remarks: remarks.trim() || null,
      });

      setSuccess("Application updated successfully.");

      setTimeout(() => {
        router.push(
          `/dashboard/applications/${id}`
        );

        router.refresh();
      }, 700);
    } catch (err) {
      console.error("Update application error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update application."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-70px)] bg-slate-100 px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="animate-pulse">
            <div className="mb-6 h-5 w-32 rounded bg-slate-200" />
            <div className="mb-3 h-10 w-80 rounded bg-slate-200" />
            <div className="h-5 w-96 rounded bg-slate-200" />

            <div className="mt-8 h-125 rounded-2xl bg-white shadow-sm" />
          </div>
        </div>
      </main>
    );
  }

  if (error && !application) {
    return (
      <main className="flex min-h-[calc(100vh-70px)] items-center justify-center bg-slate-100 px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Application Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The application could not be loaded.
          </p>

          <Link
            href="/dashboard/applications"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            <ArrowLeft size={17} />
            Back to Applications
          </Link>
        </div>
      </main>
    );
  }

  const customer = application?.customers;

  return (
    <main className="min-h-[calc(100vh-70px)] bg-slate-100 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Back */}
        <Link
          href={`/dashboard/applications/${id}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Back to Application
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Edit Application
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Application No:{" "}
            <span className="font-semibold text-slate-700">
              {application?.application_no}
            </span>
          </p>
        </div>

        {/* Customer Summary */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Customer
          </p>

          <div className="mt-2">
            <p className="text-lg font-bold text-slate-900">
              {customer?.name ?? "Customer unavailable"}
            </p>

            {customer?.phone && (
              <p className="mt-1 text-sm text-slate-500">
                {customer.phone}
              </p>
            )}
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* Service */}
            <div className="md:col-span-2">
              <label
                htmlFor="service_name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Service Name
              </label>

              <input
                id="service_name"
                type="text"
                value={serviceName}
                onChange={(e) =>
                  setServiceName(e.target.value)
                }
                placeholder="Enter service name"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* Amount */}
            <div>
              <label
                htmlFor="amount"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Amount
              </label>

              <input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                placeholder="0"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Status
              </label>

              <select
                id="status"
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as ApplicationStatus
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                {statuses.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Remarks */}
            <div className="md:col-span-2">
              <label
                htmlFor="remarks"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Remarks
              </label>

              <textarea
                id="remarks"
                value={remarks}
                onChange={(e) =>
                  setRemarks(e.target.value)
                }
                rows={6}
                placeholder="Enter remarks..."
                className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mt-6 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              <CheckCircle2 size={18} />
              {success}
            </div>
          )}

          {/* Buttons */}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href={`/dashboard/applications/${id}`}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}