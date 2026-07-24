"use client";

import { Bell, Search, UserCircle } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-6">
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-3 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-xl border py-2 pl-10 pr-4 outline-none focus:border-[#083139]"
        />
      </div>

      <div className="flex items-center gap-5">
        <Bell className="cursor-pointer" />

        <div className="flex items-center gap-2">
          <UserCircle size={34} />

          <div>
            <h4 className="font-semibold">
              Mohammad Saif
            </h4>

            <p className="text-sm text-gray-500">
              Customer
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}