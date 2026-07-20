"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  MessageCircle,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#083139] via-[#0d4b59] to-[#2563EB] text-white">
      {/* Background Blur */}
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#1FD465]/20 blur-3xl" />
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
            Rajasthan's Most Trusted Digital Service Center
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight lg:text-6xl">
            Digital Service
            <br />
            Platform
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/80">
            e-Mitra, CSC, AI Tools, Website Design, Loan, Insurance,
            PAN Card, Aadhaar Update, Certificates and 500+ Digital Services
            under one trusted platform.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/apply"
              className="flex items-center gap-2 rounded-xl bg-[#1FD465] px-6 py-3 font-semibold text-[#083139] transition hover:scale-105"
            >
              Apply Online
              <ArrowRight size={18} />
            </Link>

            <a
              href="https://wa.me/918005707575"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 backdrop-blur hover:bg-white/10"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>

            <a
              href="tel:+918005707575"
              className="flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 backdrop-blur hover:bg-white/10"
            >
              <Phone size={18} />
              Call Now
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["10K+", "Happy Customers"],
              ["25K+", "Applications"],
              ["500+", "Services"],
              ["5+", "Years"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur"
              >
                <h3 className="text-2xl font-bold">{value}</h3>
                <p className="text-sm text-white/70">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <img
              src="/images/dashboard-preview.png"
              alt="Naaz Solution Dashboard"
              className="rounded-2xl"
            />
          </div>

          {/* Floating Cards */}
          <div className="absolute -left-8 top-10 rounded-2xl bg-white p-4 text-[#083139] shadow-xl">
            <ShieldCheck className="mb-2 text-[#1FD465]" />
            <p className="text-sm font-semibold">Secure Services</p>
          </div>

          <div className="absolute -right-8 bottom-10 rounded-2xl bg-white p-4 text-[#083139] shadow-xl">
            <BadgeCheck className="mb-2 text-[#2563EB]" />
            <p className="text-sm font-semibold">Verified Platform</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}