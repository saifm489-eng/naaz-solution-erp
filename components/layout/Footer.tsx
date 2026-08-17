"use client";

import Link from "next/link";
import Image from "next/image";

import {
  MapPin,
  Phone,
  Mail,
  Globe,
  ArrowUp,
  ChevronRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "AI Tools", href: "/ai-tools" },
  { name: "Website Design", href: "/website-development" },
  { name: "Contact", href: "#contact" },
];

const services = [
  "Rajasthan e-Mitra",
  "CSC Services",
  "PAN Card",
  "Aadhaar Update",
  "Jan Aadhaar",
  "Income Certificate",
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden bg-[#083139] text-white">

      {/* =========================================================
          DECORATIVE BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#1FD465]/5 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#1FD465]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        {/* =======================================================
            MAIN FOOTER GRID
        ======================================================= */}

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* =====================================================
              COMPANY
          ===================================================== */}

          <div>

            {/* Logo + Name */}
            <div className="flex items-center gap-3">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white shadow-lg">

                <Image
                  src="/images/dashboard-preview.png"
                  alt="Naaz Solution Logo"
                  width={56}
                  height={56}
                  priority
                  className="h-full w-full object-contain"
                />

              </div>

              <div>
                <h2 className="text-2xl font-black tracking-tight">
                  Naaz Solution
                </h2>

                <p className="mt-0.5 text-xs font-medium text-[#1FD465]">
                  Digital Service Partner
                </p>
              </div>

            </div>

            {/* Description */}
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
              Your Trusted e-Mitra, CSC & AI Digital Service Partner.
              हम आपको reliable और professional digital services
              एक ही जगह उपलब्ध कराते हैं।
            </p>

            {/* Social Media */}
            <div className="mt-7 flex gap-3">

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-[#1FD465] hover:bg-[#1FD465] hover:text-[#083139]"
              >
                <FaFacebookF size={17} />
              </a>

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-[#1FD465] hover:bg-[#1FD465] hover:text-[#083139]"
              >
                <FaInstagram size={18} />
              </a>

              {/* YouTube */}
              <a
                href="#"
                aria-label="YouTube"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-[#1FD465] hover:bg-[#1FD465] hover:text-[#083139]"
              >
                <FaYoutube size={18} />
              </a>

            </div>

          </div>


          {/* =====================================================
              QUICK LINKS
          ===================================================== */}

          <div>

            <h3 className="mb-6 text-lg font-bold">
              Quick Links
            </h3>

            <div className="mb-5 h-1 w-10 rounded-full bg-[#1FD465]" />

            <ul className="space-y-3">

              {quickLinks.map((link) => (
                <li key={link.name}>

                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-[#1FD465]"
                  >

                    <ChevronRight
                      size={15}
                      className="text-[#1FD465] transition-transform group-hover:translate-x-1"
                    />

                    <span>
                      {link.name}
                    </span>

                  </Link>

                </li>
              ))}

            </ul>

          </div>


          {/* =====================================================
              POPULAR SERVICES
          ===================================================== */}

          <div>

            <h3 className="mb-6 text-lg font-bold">
              Popular Services
            </h3>

            <div className="mb-5 h-1 w-10 rounded-full bg-[#1FD465]" />

            <ul className="space-y-3">

              {services.map((service) => (
                <li key={service}>

                  <Link
                    href="/services"
                    className="group flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-[#1FD465]"
                  >

                    <ChevronRight
                      size={15}
                      className="text-[#1FD465] transition-transform group-hover:translate-x-1"
                    />

                    <span>
                      {service}
                    </span>

                  </Link>

                </li>
              ))}

            </ul>

          </div>


          {/* =====================================================
              CONTACT INFO
          ===================================================== */}

          <div>

            <h3 className="mb-6 text-lg font-bold">
              Contact Info
            </h3>

            <div className="mb-5 h-1 w-10 rounded-full bg-[#1FD465]" />

            <div className="space-y-5">

              {/* Address */}
              <div className="flex gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1FD465]/10">
                  <MapPin
                    size={17}
                    className="text-[#1FD465]"
                  />
                </div>

                <p className="text-sm leading-6 text-white/65">
                  In Front of Amar Singh Mill,
                  <br />
                  Dhakad Putha,
                  <br />
                  Hindaun City,
                  <br />
                  Rajasthan – 322230
                </p>

              </div>


              {/* Phone */}
              <div className="flex gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1FD465]/10">
                  <Phone
                    size={17}
                    className="text-[#1FD465]"
                  />
                </div>

                <div>
                  <p className="mb-0.5 text-xs text-white/40">
                    Call Us
                  </p>

                  <a
                    href="tel:+918005707575"
                    className="text-sm text-white/70 transition hover:text-[#1FD465]"
                  >
                    +91 8005707575
                  </a>
                </div>

              </div>


              {/* Email */}
              <div className="flex gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1FD465]/10">
                  <Mail
                    size={17}
                    className="text-[#1FD465]"
                  />
                </div>

                <div className="min-w-0">

                  <p className="mb-0.5 text-xs text-white/40">
                    Email
                  </p>

                  <a
                    href="mailto:support@naazsolution.hindaun.co.in"
                    className="break-all text-sm text-white/70 transition hover:text-[#1FD465]"
                  >
                    support@naazsolution.hindaun.co.in
                  </a>

                </div>

              </div>


              {/* Website */}
              <div className="flex gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1FD465]/10">
                  <Globe
                    size={17}
                    className="text-[#1FD465]"
                  />
                </div>

                <div>

                  <p className="mb-0.5 text-xs text-white/40">
                    Website
                  </p>

                  <a
                    href="https://naazsolution.hindaun.co.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 transition hover:text-[#1FD465]"
                  >
                    naazsolution.hindaun.co.in
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =======================================================
            DIVIDER
        ======================================================= */}

        <div className="my-10 h-px bg-white/10" />


        {/* =======================================================
            BOTTOM FOOTER
        ======================================================= */}

        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">

          {/* Copyright */}
          <div className="text-center md:text-left">

            <p className="text-sm text-white/55">
              © {currentYear}{" "}
              <span className="font-semibold text-white/75">
                Naaz Solution
              </span>
              . All Rights Reserved.
            </p>

            <p className="mt-1 text-xs text-white/35">
              e-Mitra • CSC • AI Digital Services
            </p>

          </div>


          {/* Legal Links */}
          <div className="flex items-center gap-5 text-xs text-white/45">

            <Link
              href="/privacy-policy"
              className="transition hover:text-[#1FD465]"
            >
              Privacy Policy
            </Link>

            <span className="h-3 w-px bg-white/15" />

            <Link
              href="/terms"
              className="transition hover:text-[#1FD465]"
            >
              Terms & Conditions
            </Link>

          </div>


          {/* Back To Top */}
          <button
            type="button"
            aria-label="Back to top"
            onClick={scrollToTop}
            className="group flex h-11 w-11 items-center justify-center rounded-full bg-[#1FD465] text-[#083139] shadow-lg shadow-[#1FD465]/10 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
          >

            <ArrowUp
              size={18}
              className="transition-transform group-hover:-translate-y-0.5"
            />

          </button>

        </div>

      </div>
    </footer>
  );
}