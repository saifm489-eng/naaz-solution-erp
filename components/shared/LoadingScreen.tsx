"use client";

import { LoaderCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  loading: boolean;
}

export default function LoadingScreen({
  loading,
}: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#083139]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#1FD465] shadow-2xl">
            <span className="text-4xl font-black text-[#083139]">
              N
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-white">
            Naaz Solution
          </h1>

          <p className="mt-3 text-white/70">
            Your Trusted e-Mitra, CSC & AI Digital Service Partner
          </p>

          {/* Loader */}
          <LoaderCircle
            className="mt-10 animate-spin text-[#1FD465]"
            size={42}
          />

          <p className="mt-5 text-sm text-white/50">
            Loading...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}