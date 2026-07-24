"use client";

import {
  ClipboardList,
  Users,
  WalletCards,
  BellDot,
} from "lucide-react";

import DashboardCard from "./DashboardCard";
import QuickActions from "./QuickActions";
import RecentApplications from "./RecentApplications";
import NotificationsPanel from "./NotificationsPanel";
import RevenueChart from "./charts/RevenueChart";
import ApplicationsChart from "./charts/ApplicationsChart";
import ServiceChart from "./charts/ServiceChart";

export type DashboardStats = {
  customers: number;
  applications: number;
  pending: number;
  revenue: number;
  notifications: number;
};

export type Application = {
  id: string;
  application_no: string;
  service_name: string;
  status: string;
  amount: number | null;
  created_at: string;
};

interface DashboardHomeProps {
  stats: DashboardStats;
  applications: Application[];
}

export default function DashboardHome({
  stats,
  applications,
}: DashboardHomeProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-[#083139]">
          Welcome Back 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Here's what's happening in your account today.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Applications"
          value={String(stats.applications)}
          subtitle={`${stats.pending} Pending`}
          icon={ClipboardList}
          iconBg="#083139"
        />

        <DashboardCard
          title="Customers"
          value={String(stats.customers)}
          subtitle="Registered Customers"
          icon={Users}
          iconBg="#1FD465"
        />

        <DashboardCard
          title="Revenue"
          value={`₹${stats.revenue.toLocaleString("en-IN")}`}
          subtitle="Total Revenue"
          icon={WalletCards}
          iconBg="#2563EB"
        />

        <DashboardCard
          title="Notifications"
          value={String(stats.notifications)}
          subtitle="Unread Notifications"
          icon={BellDot}
          iconBg="#F59E0B"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-2">
        <RevenueChart />
        <ApplicationsChart />
      </div>

      {/* Service Analytics */}
      <ServiceChart />

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Applications & Notifications */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentApplications applications={applications} />
        </div>

        <NotificationsPanel />
      </div>
    </div>
  );
}