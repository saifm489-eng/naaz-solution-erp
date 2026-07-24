import { createClient } from "@/lib/supabase/server";

/* ===========================
   Dashboard Statistics
=========================== */

export async function getDashboardStats() {
  const supabase = await createClient();

  const [
    customers,
    applications,
    pendingApplications,
    payments,
    notifications,
  ] = await Promise.all([
    supabase
      .from("customers")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("applications")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("applications")
      .select("*", { count: "exact", head: true })
      .eq("status", "Pending"),

    supabase
      .from("payments")
      .select("amount"),

    supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false),
  ]);

  const totalRevenue =
    payments.data?.reduce(
      (sum, payment) => sum + Number(payment.amount ?? 0),
      0
    ) ?? 0;

  return {
    customers: customers.count ?? 0,
    applications: applications.count ?? 0,
    pending: pendingApplications.count ?? 0,
    revenue: totalRevenue,
    notifications: notifications.count ?? 0,
  };
}

/* ===========================
   Recent Applications
=========================== */

export async function getRecentApplications() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    throw error;
  }

  return data;
}

/* ===========================
   Recent Notifications
=========================== */

export async function getNotifications() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    throw error;
  }

  return data;
}