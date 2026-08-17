"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Save } from "lucide-react";

import { createApplication } from "@/lib/services/applications";
import { getCustomers } from "@/lib/services/customer.service";
import type { ApplicationStatus } from "@/types/application";

interface Customer {
  id: string;
  name: string;
  phone: string | null;
}

const applicationSchema = z.object({
  customer_id: z
    .string()
    .min(1, "Please select a customer."),

  service_name: z
    .string()
    .trim()
    .min(1, "Service name is required."),

  amount: z
    .number()
    .min(0, "Amount cannot be negative."),

  status: z.enum([
    "Pending",
    "Processing",
    "Approved",
    "Rejected",
    "Completed",
  ]),

  remarks: z
    .string()
    .optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const services = [
  "Aadhaar",
  "PAN Card",
  "Voter ID",
  "Ration Card",
  "Income Certificate",
  "Caste Certificate",
  "Domicile Certificate",
  "Birth Certificate",
  "Death Certificate",
  "Marriage Certificate",
  "e-Mitra Service",
  "Rajasthan SSO",
  "Driving Licence",
  "Passport",
  "Other",
];

const statuses: ApplicationStatus[] = [
  "Pending",
  "Processing",
  "Approved",
  "Rejected",
  "Completed",
];

export default function NewApplicationPage() {
  const router = useRouter();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customersLoading, setCustomersLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      customer_id: "",
      service_name: "",
      amount: 0,
      status: "Pending",
      remarks: "",
    },
  });

  /*
   * React Hook Form's watch() is intentionally avoided here.
   * useWatch() works better with the React Compiler.
   */
  const watchedCustomerId = useWatch({
    control,
    name: "customer_id",
  });

  const selectedCustomer = customers.find(
    (customer) => customer.id === watchedCustomerId
  );

  useEffect(() => {
    let mounted = true;

    const loadCustomers = async () => {
      try {
        setCustomersLoading(true);
        setPageError("");

        const data = await getCustomers();

        if (!mounted) return;

        setCustomers((data ?? []) as Customer[]);
      } catch (error) {
        console.error("Load Customers Error:", error);

        if (!mounted) return;

        setPageError(
          error instanceof Error
            ? error.message
            : "Unable to load customers."
        );
      } finally {
        if (mounted) {
          setCustomersLoading(false);
        }
      }
    };

    loadCustomers();

    return () => {
      mounted = false;
    };
  }, []);

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      setSaving(true);
      setPageError("");

      await createApplication({
        customer_id: data.customer_id,
        service_name: data.service_name,
        amount: data.amount,
        status: data.status,
        remarks: data.remarks?.trim() || null,
      });

      /*
       * Navigate using Next.js router.
       * window.location.href is intentionally avoided.
       */
      router.push("/dashboard/applications");
      router.refresh();
    } catch (error) {
      console.error("Create Application Error:", error);

      setPageError(
        error instanceof Error
          ? error.message
          : "Unable to create application."
      );

      setSaving(false);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={saving}
            title="Go Back"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Add New Application
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Create a new customer application.
            </p>
          </div>
        </div>

        {/* Error */}
        {pageError && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-700">
              {pageError}
            </p>
          </div>
        )}

        {/* Application Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-xl border bg-white p-5 shadow-sm sm:p-7"
        >
          <div className="grid grid-cols-1 gap-6">

            {/* Customer */}
            <div>
              <label
                htmlFor="customer_id"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Customer{" "}
                <span className="text-red-500">*</span>
              </label>

              <select
                id="customer_id"
                {...register("customer_id")}
                disabled={customersLoading || saving}
                className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100 ${
                  errors.customer_id
                    ? "border-red-400"
                    : "border-gray-300"
                }`}
              >
                <option value="">
                  {customersLoading
                    ? "Loading customers..."
                    : customers.length === 0
                      ? "No customers available"
                      : "Select Customer"}
                </option>

                {customers.map((customer) => (
                  <option
                    key={customer.id}
                    value={customer.id}
                  >
                    {customer.name}
                    {customer.phone
                      ? ` — ${customer.phone}`
                      : ""}
                  </option>
                ))}
              </select>

              {errors.customer_id && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.customer_id.message}
                </p>
              )}

              {!customersLoading &&
                customers.length === 0 && (
                  <p className="mt-2 text-xs text-gray-500">
                    Please create a customer first from the
                    Customers section.
                  </p>
                )}

              {/* Selected Customer */}
              {selectedCustomer && (
                <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-3">
                  <p className="text-sm font-semibold text-green-800">
                    {selectedCustomer.name}
                  </p>

                  {selectedCustomer.phone && (
                    <p className="mt-0.5 text-xs text-green-700">
                      {selectedCustomer.phone}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Service */}
            <div>
              <label
                htmlFor="service_name"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Service Name{" "}
                <span className="text-red-500">*</span>
              </label>

              <select
                id="service_name"
                {...register("service_name")}
                disabled={saving}
                className={`w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100 ${
                  errors.service_name
                    ? "border-red-400"
                    : "border-gray-300"
                }`}
              >
                <option value="">
                  Select Service
                </option>

                {services.map((service) => (
                  <option
                    key={service}
                    value={service}
                  >
                    {service}
                  </option>
                ))}
              </select>

              {errors.service_name && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.service_name.message}
                </p>
              )}
            </div>

            {/* Amount */}
            <div>
              <label
                htmlFor="amount"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Amount{" "}
                <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
                  ₹
                </span>

                <input
                  id="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  {...register("amount", {
                    valueAsNumber: true,
                  })}
                  disabled={saving}
                  placeholder="0"
                  className={`w-full rounded-lg border bg-white py-3 pl-9 pr-4 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100 ${
                    errors.amount
                      ? "border-red-400"
                      : "border-gray-300"
                  }`}
                />
              </div>

              {errors.amount && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.amount.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Status
              </label>

              <select
                id="status"
                {...register("status")}
                disabled={saving}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              >
                {statuses.map((status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Remarks */}
            <div>
              <label
                htmlFor="remarks"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Remarks
              </label>

              <textarea
                id="remarks"
                rows={5}
                {...register("remarks")}
                disabled={saving}
                placeholder="Enter application remarks..."
                className={`w-full resize-y rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100 ${
                  errors.remarks
                    ? "border-red-400"
                    : "border-gray-300"
                }`}
              />

              {errors.remarks && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.remarks.message}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() =>
                router.push("/dashboard/applications")
              }
              disabled={saving}
              className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                saving ||
                customersLoading ||
                customers.length === 0
              }
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save Application
                </>
              )}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}