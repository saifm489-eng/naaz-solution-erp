"use client";

import { motion } from "framer-motion";

type Application = {
  id: string;
  application_no: string;
  service_name: string;
  status: string;
  amount: number | null;
  created_at: string;
};

interface RecentApplicationsProps {
  applications: Application[];
}

export default function RecentApplications({
  applications,
}: RecentApplicationsProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
      case "completed":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "processing":
        return "bg-blue-100 text-blue-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#083139]">
          Recent Applications
        </h2>

        <span className="text-sm text-slate-500">
          {applications.length} Records
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-3">Application</th>
              <th>Service</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((item) => (
              <tr
                key={item.id}
                className="border-b last:border-0"
              >
                <td className="py-4 font-medium">
                  {item.application_no}
                </td>

                <td>{item.service_name}</td>

                <td>
                  ₹{Number(item.amount ?? 0).toLocaleString("en-IN")}
                </td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td>
                  {new Date(item.created_at).toLocaleDateString("en-IN")}
                </td>
              </tr>
            ))}

            {applications.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-slate-500"
                >
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}