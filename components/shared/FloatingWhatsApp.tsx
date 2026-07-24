"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/918005707575"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-[9999]"
    >
      {/* Pulse Ring */}
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />

      {/* Button */}
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition duration-300 hover:scale-110 hover:shadow-green-500/40">
        <MessageCircle size={30} strokeWidth={2.2} />
      </div>

      {/* Tooltip */}
      <div className="pointer-events-none absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-[#083139] px-4 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
        Chat on WhatsApp
      </div>
    </a>
  );
}