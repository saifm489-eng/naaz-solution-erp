"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  FilePlus2,
  CreditCard,
  ScanText,
  Bot,
} from "lucide-react";

const actions = [
  {
    title: "Apply Service",
    href: "/dashboard/apply",
    icon: FilePlus2,
  },
  {
    title: "Payments",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    title: "Upload Documents",
    href: "/dashboard/documents",
    icon: ScanText,
  },
  {
    title: "AI Assistant",
    href: "/dashboard/ai",
    icon: Bot,
  },
];

export default function QuickActions() {
  return (
    <div className="mt-10">
      <h2 className="mb-5 text-2xl font-bold text-[#083139]">
        Quick Actions
      </h2>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              whileHover={{ scale: 1.03 }}
            >
              <Link
                href={item.href}
                className="flex flex-col items-center rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-[#1FD465]"
              >
                <Icon
                  size={34}
                  className="mb-4 text-[#083139]"
                />

                <span className="font-semibold">
                  {item.title}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}