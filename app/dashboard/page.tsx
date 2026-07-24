import DashboardHome from "@/components/dashboard/DashboardHome";
import {
  getDashboardStats,
  getRecentApplications,
} from "@/lib/dashboard";

export default async function DashboardPage() {
  const [stats, applications] = await Promise.all([
    getDashboardStats(),
    getRecentApplications(),
  ]);

  return (
    <DashboardHome
      stats={stats}
      applications={applications}
    />
  );
}