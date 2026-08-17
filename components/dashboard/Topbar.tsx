"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Bell,
  ChevronDown,
  LogOut,
  Search,
  Settings,
  User,
  X,
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

export default function Topbar() {
  const router = useRouter();

  const [user, setUser] = useState<UserData | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [search, setSearch] = useState("");

  const profileRef = useRef<HTMLDivElement>(null);

  // --------------------------------------------------
  // Load authenticated user
  // --------------------------------------------------

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user as UserData | null);
    }

    loadUser();

    // Keep user state synchronized with Supabase auth
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user as UserData | null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // --------------------------------------------------
  // Close dropdown when clicking outside
  // --------------------------------------------------

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target as Node
        )
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // --------------------------------------------------
  // User display information
  // --------------------------------------------------

  const email = user?.email || "";

  const metadataName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    "";

  const displayName =
    metadataName ||
    email.split("@")[0] ||
    "User";

  const initials = displayName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  // --------------------------------------------------
  // Logout
  // --------------------------------------------------

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

      setProfileOpen(false);

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout Error:", error);
      setLoggingOut(false);
    }
  }

  // --------------------------------------------------
  // Search
  // --------------------------------------------------

  function handleSearchSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const value = search.trim();

    if (!value) return;

    console.log("Dashboard Search:", value);

    // Future:
    // router.push(`/dashboard/search?q=${encodeURIComponent(value)}`);
  }

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 shadow-sm backdrop-blur-md sm:px-6 lg:px-8">

      {/* =====================================================
          SEARCH
      ====================================================== */}

      <form
        onSubmit={handleSearchSubmit}
        className="relative hidden w-full max-w-md md:block"
      >

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search customers, applications..."
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-10 text-sm text-[#083139] outline-none transition placeholder:text-slate-400 focus:border-[#1FD465] focus:bg-white focus:ring-4 focus:ring-[#1FD465]/10"
        />

        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#083139]"
            aria-label="Clear search"
          >
            <X size={17} />
          </button>
        )}

      </form>

      {/* Mobile Title */}

      <div className="md:hidden">

        <h2 className="text-lg font-bold text-[#083139]">
          Naaz Solution
        </h2>

        <p className="text-xs text-slate-400">
          ERP Dashboard
        </p>

      </div>

      {/* =====================================================
          RIGHT SIDE
      ====================================================== */}

      <div className="ml-auto flex items-center gap-2 sm:gap-4">

        {/* Notification */}

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 transition hover:bg-[#083139]/5 hover:text-[#083139]"
        >

          <Bell size={20} />

          {/* Notification dot */}

          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#1FD465] ring-2 ring-white" />

        </button>

        {/* Divider */}

        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {/* =================================================
            PROFILE
        ================================================== */}

        <div
          ref={profileRef}
          className="relative"
        >

          <button
            type="button"
            onClick={() =>
              setProfileOpen(!profileOpen)
            }
            className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-slate-50"
            aria-expanded={profileOpen}
          >

            {/* Avatar */}

            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#083139] text-sm font-bold text-white shadow-sm">

              {initials || (
                <User size={19} />
              )}

              {/* Online */}

              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-[#1FD465]" />

            </div>

            {/* User information */}

            <div className="hidden text-left sm:block">

              <p className="max-w-[150px] truncate text-sm font-semibold text-[#083139]">
                {displayName}
              </p>

              <p className="max-w-[180px] truncate text-xs text-slate-400">
                {email || "Authenticated User"}
              </p>

            </div>

            <ChevronDown
              size={17}
              className={`hidden text-slate-400 transition-transform sm:block ${
                profileOpen
                  ? "rotate-180"
                  : ""
              }`}
            />

          </button>

          {/* =================================================
              DROPDOWN
          ================================================== */}

          {profileOpen && (
            <div className="absolute right-0 top-[calc(100%+10px)] w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(8,49,57,0.15)]">

              {/* Header */}

              <div className="bg-[#083139] px-5 py-5 text-white">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1FD465] font-bold text-[#083139]">
                    {initials || (
                      <User size={20} />
                    )}
                  </div>

                  <div className="min-w-0">

                    <p className="truncate font-semibold">
                      {displayName}
                    </p>

                    <p className="truncate text-xs text-white/60">
                      {email}
                    </p>

                  </div>

                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-white/60">

                  <span className="h-2 w-2 rounded-full bg-[#1FD465]" />

                  Online

                </div>

              </div>

              {/* Menu */}

              <div className="p-2">

                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    router.push(
                      "/dashboard/settings"
                    );
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-slate-600 transition hover:bg-slate-50 hover:text-[#083139]"
                >

                  <Settings size={18} />

                  Account Settings

                </button>

              </div>

              {/* Logout */}

              <div className="border-t border-slate-100 p-2">

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  <LogOut size={18} />

                  {loggingOut
                    ? "Signing out..."
                    : "Sign out"}

                </button>

              </div>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}