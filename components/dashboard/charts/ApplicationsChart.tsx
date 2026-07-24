"use client";

import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  Tooltip,
  Bar,
} from "recharts";

const data = [
  { month: "Jan", total: 15 },
  { month: "Feb", total: 20 },
  { month: "Mar", total: 12 },
  { month: "Apr", total: 28 },
  { month: "May", total: 19 },
  { month: "Jun", total: 35 },
];

export default function ApplicationsChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-[#083139]">
        Applications
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" />

            <Tooltip />

            <Bar
              dataKey="total"
              radius={[8, 8, 0, 0]}
              fill="#083139"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}