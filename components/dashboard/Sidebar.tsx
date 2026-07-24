"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  ClipboardList,
  UsersRound,
  FolderKanban,
  WalletCards,
  Sparkles,
  ChartColumn,
  Settings2,
  LogOut,
} from "lucide-react";

import { supabase } from "@/lib/supabase/client";

const menu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Applications",
    href: "/dashboard/applications",
    icon: ClipboardList,
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: UsersRound,
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: FolderKanban,
  },
  {
    title: "Payments",
    href: "/dashboard/payments",
    icon: WalletCards,
  },
  {
    title: "AI Tools",
    href: "/dashboard/ai",
    icon: Sparkles,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: ChartColumn,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings2,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout Error:", error.message);
      return;
    }

    router.replace("/login");
    router.refresh();
  };

  return (
    <aside className="hidden lg:flex lg:w-72 flex-col bg-[#083139] text-white border-r border-white/10">

      {/* Logo */}
      <div className="border-b border-white/10 p-6">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold">
            Naaz Solution
          </h1>

          <p className="mt-1 text-sm text-emerald-300">
            ERP Dashboard
          </p>
        </motion.div>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2 p-4">
        {menu.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 ${
                  active
                    ? "bg-[#1FD465] text-[#083139] font-semibold shadow-lg"
                    : "hover:bg-white/10"
                }`}
              >
                <Icon size={20} />
                <span>{item.title}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-white/10 p-5">
        <div className="mb-5">
          <h3 className="font-semibold">
            {user?.email?.split("@")[0] || "Guest"}
          </h3>

          <p className="truncate text-sm text-emerald-300">
            {user?.email || "Not Logged In"}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 font-medium transition hover:bg-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </aside>
  );
}