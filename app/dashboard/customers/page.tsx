"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Eye,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  Search,
} from "lucide-react";

import {
  getCustomers,
  deleteCustomer,
} from "@/lib/services/customers";

import type { Customer } from "@/types/customer";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const loadCustomers = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const data = await getCustomers();

      setCustomers(data);
    } catch (error) {
      console.error("Get Customers Error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Customers load नहीं हो सके।"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setError("");

        const data = await getCustomers();

        if (!cancelled) {
          setCustomers(data);
        }
      } catch (error) {
        console.error("Get Customers Error:", error);

        if (!cancelled) {
          setError(
            error instanceof Error
              ? error.message
              : "Customers load नहीं हो सके।"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleRefresh = async () => {
    await loadCustomers(true);
  };

  const handleDelete = async (
    id: string,
    name: string
  ) => {
    const confirmed = window.confirm(
      `क्या आप "${name}" customer को delete करना चाहते हैं?\n\nयह action वापस नहीं किया जा सकता।`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      await deleteCustomer(id);

      setCustomers((current) =>
        current.filter((customer) => customer.id !== id)
      );
    } catch (error) {
      console.error("Delete Customer Error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Customer delete नहीं हो सका।"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return true;
    }

    return (
      customer.name?.toLowerCase().includes(value) ||
      customer.phone?.toLowerCase().includes(value) ||
      customer.customer_code?.toLowerCase().includes(value) ||
      customer.city?.toLowerCase().includes(value) ||
      customer.email?.toLowerCase().includes(value)
    );
  });

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "Inactive"
  ).length;

  if (loading) {
    return (
      <div className="p-4 sm:p-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

            <p className="text-sm text-gray-500">
              Customers load हो रहे हैं...
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
              Customers
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              अपने सभी customers को manage करें।
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
              href="/dashboard/customers/new"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Plus size={18} />

              Add Customer
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
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Customers
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {customers.length}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Active Customers
            </p>

            <p className="mt-2 text-2xl font-bold text-green-600">
              {activeCustomers}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Inactive Customers
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-500">
              {inactiveCustomers}
            </p>
          </div>
        </div>

        {/* Search */}
        {customers.length > 0 && (
          <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="नाम, मोबाइल, Customer Code, शहर या Email से खोजें..."
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        )}

        {/* Empty */}
        {customers.length === 0 ? (
          <div className="rounded-xl border border-dashed bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
              <Plus
                className="text-blue-600"
                size={28}
              />
            </div>

            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              No Customers Found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              अभी कोई customer नहीं है। अपना पहला customer
              add करके शुरू करें।
            </p>

            <Link
              href="/dashboard/customers/new"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Plus size={18} />

              Add Customer
            </Link>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="rounded-xl border border-dashed bg-white p-12 text-center shadow-sm">
            <Search
              size={40}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Customer नहीं मिला
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Search बदलकर दोबारा कोशिश करें।
            </p>
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
                        Customer
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Customer Code
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Phone
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        City
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Status
                      </th>

                      <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {filteredCustomers.map((customer) => (
                      <tr
                        key={customer.id}
                        className="transition hover:bg-gray-50"
                      >
                        {/* Customer */}
                        <td className="px-5 py-4">
                          <div>
                            <Link
                              href={`/dashboard/customers/${customer.id}`}
                              className="font-semibold text-gray-900 hover:text-blue-600"
                            >
                              {customer.name}
                            </Link>

                            {customer.father_name && (
                              <p className="mt-0.5 text-xs text-gray-500">
                                Father: {customer.father_name}
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Code */}
                        <td className="px-5 py-4">
                          <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
                            {customer.customer_code}
                          </span>
                        </td>

                        {/* Phone */}
                        <td className="px-5 py-4 text-sm text-gray-700">
                          {customer.phone || "—"}
                        </td>

                        {/* City */}
                        <td className="px-5 py-4 text-sm text-gray-700">
                          {customer.city || "—"}
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              customer.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {customer.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <Link
                              href={`/dashboard/customers/${customer.id}`}
                              title="View Customer"
                              className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                            >
                              <Eye size={17} />
                            </Link>

                            <Link
                              href={`/dashboard/customers/${customer.id}/edit`}
                              title="Edit Customer"
                              className="rounded-lg border border-blue-200 p-2 text-blue-600 transition hover:bg-blue-50"
                            >
                              <Pencil size={17} />
                            </Link>

                            <button
                              type="button"
                              title="Delete Customer"
                              onClick={() =>
                                handleDelete(
                                  customer.id,
                                  customer.name
                                )
                              }
                              disabled={
                                deletingId === customer.id
                              }
                              className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {deletingId === customer.id ? (
                                <span className="block h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-red-600" />
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
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="rounded-xl border bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/dashboard/customers/${customer.id}`}
                        className="font-semibold text-blue-700 hover:underline"
                      >
                        {customer.name}
                      </Link>

                      <p className="mt-1 text-xs text-gray-500">
                        {customer.customer_code}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        customer.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 border-t pt-4">
                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-gray-500">
                        Phone
                      </span>

                      <span className="font-medium text-gray-900">
                        {customer.phone || "—"}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-gray-500">
                        City
                      </span>

                      <span className="font-medium text-gray-900">
                        {customer.city || "—"}
                      </span>
                    </div>

                    {customer.email && (
                      <div className="flex justify-between gap-4 text-sm">
                        <span className="text-gray-500">
                          Email
                        </span>

                        <span className="max-w-[60%] truncate text-right font-medium text-gray-900">
                          {customer.email}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex gap-2 border-t pt-4">
                    <Link
                      href={`/dashboard/customers/${customer.id}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <Eye size={16} />
                      View
                    </Link>

                    <Link
                      href={`/dashboard/customers/${customer.id}/edit`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-blue-200 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          customer.id,
                          customer.name
                        )
                      }
                      disabled={
                        deletingId === customer.id
                      }
                      className="flex items-center justify-center rounded-lg border border-red-200 px-3 py-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      {deletingId === customer.id ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-red-600" />
                      ) : (
                        <Trash2 size={16} />
                      )}
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