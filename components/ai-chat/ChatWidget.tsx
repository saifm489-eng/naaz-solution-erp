"use client";

import { useState } from "react";
import { Bot,X, Sparkles, Trash2, ShieldCheck,
} 
from "lucide-react";import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#083139] text-white shadow-2xl transition hover:scale-110"
      >
        {open ? <X size={28} /> : <Bot size={30} />}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 .z-50 {
 z-index: 50;
}
  overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-[#083139] p-4 text-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1FD465]">
                <Bot size={24} />
              </div>

              <div>
                <h2 className="font-semibold">
                  Naaz Solution AI
                </h2>

                <p className="text-sm text-green-300">
                  ● Online
                </p>
              </div>
            </div>

            {/* Body */}
            <div className=".h-\[430px\] {
 height: 430px;
} items-center justify-center p-6">
              <div className="text-center">
                <Bot
                  size={60}
                  className="mx-auto text-[#083139]"
                />

                <h3 className="mt-4 text-xl font-bold">
                  Welcome 👋
                </h3>

                <p className="mt-2 text-gray-500">
                  Ask anything about
                  <br />
                  e-Mitra, CSC, PAN, Aadhaar,
                  Website & AI Services.
                </p>
              </div>
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full rounded-xl border p-3 outline-none focus:border-[#1FD465]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}