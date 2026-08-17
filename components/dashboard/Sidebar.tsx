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
  User,
} from "lucide-react";

import { supabase } from "@/lib/supabase/client";

interface UserData {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    name?: string;
  };
}

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

  const [user, setUser] = useState<UserData | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user as UserData | null);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(
          session?.user as UserData | null
        );
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const email = user?.email || "";

  const metadataName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    "";

  const displayName =
    metadataName ||
    email.split("@")[0] ||
    "Guest";

  const initials =
    displayName
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "N";

  async function handleLogout() {
    if (loggingOut) return;

    try {
      setLoggingOut(true);

      const { error } =
        await supabase.auth.signOut();

      if (error) {
        console.error(
          "Logout Error:",
          error.message
        );

        setLoggingOut(false);
        return;
      }

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error(
        "Logout Error:",
        error
      );

      setLoggingOut(false);
    }
  }

  return (
    <aside className="hidden w-72 shrink-0 flex-col bg-[#083139] text-white lg:flex">

      {/* Logo */}
      <div className="border-b border-white/10 px-6 py-6">
        <motion.div
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1FD465] shadow-lg">
            <span className="text-xl font-black text-[#083139]">
              N
            </span>
          </div>

          <div>
            <h1 className="text-xl font-bold">
              Naaz Solution
            </h1>

            <p className="mt-0.5 text-xs text-[#1FD465]">
              ERP Dashboard
            </p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto p-4">

        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
          Main Menu
        </p>

        {menu.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(
              item.href + "/"
            );

          return (
            <Link
              key={item.href}
              href={item.href}
            >
              <motion.div
                whileHover={{
                  x: active ? 0 : 4,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  active
                    ? "bg-[#1FD465] font-semibold text-[#083139] shadow-lg"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={19} />

                <span className="text-sm">
                  {item.title}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-white/10 p-4">

        <div className="mb-3 rounded-2xl bg-white/5 p-3">

          <div className="flex items-center gap-3">

            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1FD465] font-bold text-[#083139]">
              {initials}

              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#083139] bg-[#1FD465]" />
            </div>

            <div className="min-w-0">

              <p className="truncate text-sm font-semibold text-white">
                {displayName}
              </p>

              <p className="truncate text-xs text-white/45">
                {email || "Not Logged In"}
              </p>

            </div>

          </div>

          <div className="mt-3 flex items-center gap-2 text-[11px] text-white/45">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1FD465]" />
            Active session
          </div>

        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <LogOut size={18} />

          {loggingOut
            ? "Signing out..."
            : "Sign Out"}
        </button>

      </div>
    </aside>
  );
}