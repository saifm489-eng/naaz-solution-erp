"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { applicationSchema } from "@/lib/validations/application";

type ApplicationFormData = z.input<typeof applicationSchema>;

export default function NewApplicationPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: "onSubmit",
    defaultValues: {
      customerName: "",
      phone: "",
      serviceName: "",
      amount: 0,
      status: "Pending",
      remarks: "",
    },
  });

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      console.log("Form Data:", data);

      alert("Form Submitted Successfully!");

      reset();

      // अभी Database Save नहीं करेंगे
      // Table Structure मिलने के बाद यहीं createApplication() आएगा

      // router.push("/dashboard/applications");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Add New Application</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        <div>
          <label className="mb-2 block font-medium">Customer Name</label>
          <input
            {...register("customerName")}
            className="w-full rounded-lg border p-3"
            placeholder="Enter customer name"
          />
          {errors.customerName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.customerName.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">Mobile Number</label>
          <input
            {...register("phone")}
            className="w-full rounded-lg border p-3"
            placeholder="9876543210"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">Service Name</label>
          <input
            {...register("serviceName")}
            className="w-full rounded-lg border p-3"
            placeholder="PAN Card"
          />
          {errors.serviceName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.serviceName.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">Amount</label>
          <input
            type="number"
            {...register("amount", { valueAsNumber: true })}
            className="w-full rounded-lg border p-3"
            placeholder="500"
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-red-500">
              {errors.amount.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">Status</label>
          <select
            {...register("status")}
            className="w-full rounded-lg border p-3"
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">Remarks</label>
          <textarea
            rows={4}
            {...register("remarks")}
            className="w-full rounded-lg border p-3"
            placeholder="Enter remarks"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Application"}
        </button>

      </form>
    </div>
  );
}