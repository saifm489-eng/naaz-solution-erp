"use client";

import { Search, ChevronDown } from "lucide-react";

const quickServices = [
  "e-Mitra",
  "CSC",
  "AI Tools",
  "Website",
  "Loan",
  "IRCTC",
  "PVC Card",
  "Courses",
];

export default function SearchSection() {
  return (
    <section className="relative -mt-12 z-20">
      <div className="mx-auto max-w-7xl px-4">

        {/* Search Box */}
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl">

          <div className="flex flex-col gap-3 lg:flex-row">

            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search any service..."
                className="h-14 w-full rounded-2xl border border-slate-200 pl-12 pr-4 outline-none transition focus:border-[#1FD465]"
              />
            </div>

            {/* Category */}

            <button className="flex h-14 items-center justify-between rounded-2xl border border-slate-200 px-5 lg:w-64">
              <span>All Categories</span>

              <ChevronDown size={18} />
            </button>

            {/* Button */}

            <button className="h-14 rounded-2xl bg-[#1FD465] px-8 font-semibold text-[#083139] transition hover:scale-105">
              Search
            </button>

          </div>

        </div>

        {/* Quick Services */}

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">

          {quickServices.map((item) => (
            <button
              key={item}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-medium shadow-sm transition hover:-translate-y-1 hover:border-[#1FD465] hover:shadow-lg"
            >
              {item}
            </button>
          ))}

        </div>

      </div>
    </section>
  );
}