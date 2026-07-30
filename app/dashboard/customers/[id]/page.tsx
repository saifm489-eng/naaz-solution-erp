"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function CustomerDetailsPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow">
        <h1 className="mb-4 text-3xl font-bold">Customer Details</h1>

        <p className="mb-6 text-gray-600">
          Customer ID: <strong>{id}</strong>
        </p>

        <div className="rounded-lg border p-4">
          <p>This is the customer details page.</p>
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            href={`/dashboard/customers/${id}/edit`}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white"
          >
            Edit Customer
          </Link>

          <Link
            href="/dashboard/customers"
            className="rounded-lg bg-gray-500 px-5 py-2 text-white"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}