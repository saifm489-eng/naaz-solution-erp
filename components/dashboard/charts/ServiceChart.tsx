"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "PAN", value: 35 },
  { name: "Aadhaar", value: 25 },
  { name: "CSC", value: 20 },
  { name: "Others", value: 20 },
];

const COLORS = [
  "#083139",
  "#1FD465",
  "#2563EB",
  "#F59E0B",
];

export default function ServiceChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-[#083139]">
        Service Distribution
      </h2>

      <div className="h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              outerRadius={100}
              dataKey="value"
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}