"use client";

import { useEffect, useState } from "react";
import { CircleUserRound } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/getUser";

export default function UserProfile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }

    loadUser();
  }, []);

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <CircleUserRound
        className="text-[#083139]"
        size={42}
      />

      <div>
        <h4 className="font-semibold text-[#083139]">
          {user?.email?.split("@")[0] || "Guest"}
        </h4>

        <p className="text-sm text-slate-500">
          {user?.email}
        </p>
      </div>
    </div>
  );
}