"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 14000 },
  { month: "Apr", revenue: 26000 },
  { month: "May", revenue: 22000 },
  { month: "Jun", revenue: 31000 },
];

export default function RevenueChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-[#083139]">
        Monthly Revenue
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="month" />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#1FD465"
              fill="#1FD46533"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}