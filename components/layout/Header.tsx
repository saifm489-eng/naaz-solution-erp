"use client";

import Link from "next/link";
import { Search, Menu, User } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#083139] text-white font-bold text-xl">
            N
          </div>

          <div>
            <h1 className="text-xl font-bold text-[#083139]">
              Naaz Solution
            </h1>

            <p className="text-xs text-gray-500">
              Your Trusted Digital Service Partner
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-[#1FD465]">
            Home
          </Link>

          <Link href="/services" className="hover:text-[#1FD465]">
            Services
          </Link>

          <Link href="/ai-tools" className="hover:text-[#1FD465]">
            AI Tools
          </Link>

          <Link href="/downloads" className="hover:text-[#1FD465]">
            Downloads
          </Link>

          <Link href="/blog" className="hover:text-[#1FD465]">
            Blog
          </Link>

          <Link href="/contact" className="hover:text-[#1FD465]">
            Contact
          </Link>
        </nav>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-3">

          <button className="rounded-xl border border-slate-200 p-2 hover:bg-slate-100">
            <Search size={18} />
          </button>

          <Link
            href="/login"
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-100"
          >
            <User size={16} />
            Login
          </Link>

          <a
            href="https://wa.me/918005707575"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-[#1FD465] px-5 py-2 text-sm font-semibold text-white shadow-lg hover:opacity-90"
          >
            Apply Online
          </a>

        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden">
          <Menu size={26} />
        </button>

      </div>
    </header>
  );
}