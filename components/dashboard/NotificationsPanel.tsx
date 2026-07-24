"use client";

import { motion } from "framer-motion";
import { BellDot } from "lucide-react";

const notifications = [
  "Your PAN Card application has been approved.",
  "Payment received successfully.",
  "New AI Resume feature is available.",
];

export default function NotificationsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-[#083139]">
        <BellDot size={22} />
        Notifications
      </h2>

      <div className="space-y-4">
        {notifications.map((item, index) => (
          <div
            key={index}
            className="rounded-xl bg-slate-50 p-4"
          >
            {item}
          </div>
        ))}
      </div>
    </motion.div>
  );
}