"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { customerSchema, CustomerFormData } from "@/lib/validations/customer";
import { createCustomer, updateCustomer } from "@/lib/services/customer.service";

import { Customer } from "@/types/customer";

interface CustomerFormProps {
  customer?: Customer;
  userId: string;
}

export default function CustomerForm({
  customer,
  userId,
}: CustomerFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),

    defaultValues: {
      name: customer?.name ?? "",
      father_name: customer?.father_name ?? "",
      mother_name: customer?.mother_name ?? "",

      phone: customer?.phone ?? "",
      alternate_phone: customer?.alternate_phone ?? "",

      email: customer?.email ?? "",

      gender: customer?.gender ?? undefined,

      dob: customer?.dob ?? "",

      aadhaar_no: customer?.aadhaar_no ?? "",
      pan_no: customer?.pan_no ?? "",

      address: customer?.address ?? "",
      city: customer?.city ?? "",
      district: customer?.district ?? "",
      state: customer?.state ?? "",
      pincode: customer?.pincode ?? "",

      notes: customer?.notes ?? "",

      status: customer?.status ?? "Active",
    },
  });
  const onSubmit = async (data: CustomerFormData) => {
  try {
    setLoading(true);

    if (customer) {
      await updateCustomer(customer.id, data);
    } else {
      await createCustomer(data, userId);
    }

    router.push("/dashboard/customers");
    router.refresh();
  } catch (error) {
    console.error(error);
    alert(error instanceof Error ? error.message : "Something went wrong");
  } finally {
    setLoading(false);
  }
};
return (
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-6 rounded-xl bg-white p-6 shadow"
  >
    <h2 className="text-2xl font-bold">
      {customer ? "Edit Customer" : "Add Customer"}
    </h2>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label className="mb-1 block text-sm font-medium">
          Customer Name
        </label>
        <input
          {...register("name")}
          className="w-full rounded-lg border p-3"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Father Name
        </label>
        <input
          {...register("father_name")}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Mother Name
        </label>
        <input
          {...register("mother_name")}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Phone
        </label>
        <input
          {...register("phone")}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Alternate Phone
        </label>
        <input
          {...register("alternate_phone")}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          {...register("email")}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Gender
        </label>

        <select
          {...register("gender")}
          className="w-full rounded-lg border p-3"
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Date of Birth
        </label>

        <input
          type="date"
          {...register("dob")}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Aadhaar Number
        </label>

        <input
          {...register("aadhaar_no")}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          PAN Number
        </label>

        <input
          {...register("pan_no")}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-1 block text-sm font-medium">
          Address
        </label>

        <textarea
          {...register("address")}
          className="w-full rounded-lg border p-3"
          rows={3}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          City
        </label>

        <input
          {...register("city")}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          District
        </label>

        <input
          {...register("district")}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          State
        </label>

        <input
          {...register("state")}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Pincode
        </label>

        <input
          {...register("pincode")}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-1 block text-sm font-medium">
          Notes
        </label>

        <textarea
          {...register("notes")}
          className="w-full rounded-lg border p-3"
          rows={3}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Status
        </label>

        <select
          {...register("status")}
          className="w-full rounded-lg border p-3"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </div>

    <button
      type="submit"
      disabled={loading}
      className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? "Saving..." : "Save Customer"}
    </button>
  </form>
);
}