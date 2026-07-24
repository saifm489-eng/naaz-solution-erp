"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  iconBg: string;
}

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
}: DashboardCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-[#083139]">
            {value}
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            {subtitle}
          </p>
        </div>

        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
          style={{ background: iconBg }}
        >
          <Icon size={28} />
        </div>
      </div>
    </motion.div>
  );
}