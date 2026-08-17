import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // --------------------------------------------------
  // 1. Create Supabase Server Client
  // --------------------------------------------------

  const supabase = await createClient();

  // --------------------------------------------------
  // 2. Get Current Authenticated User
  // --------------------------------------------------

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // --------------------------------------------------
  // 3. Protect Dashboard
  // --------------------------------------------------

  if (error || !user) {
    redirect("/login");
  }

  // --------------------------------------------------
  // 4. Dashboard Layout
  // --------------------------------------------------

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Area */}

      <div className="flex min-w-0 flex-1 flex-col">

        {/* Topbar */}

        <Topbar />

        {/* Page Content */}

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}