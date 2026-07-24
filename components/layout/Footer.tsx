"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  ArrowUp,
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
  return (
    <footer className="bg-[#083139] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <h2 className="text-3xl font-bold">Naaz Solution</h2>

            <p className="mt-4 leading-7 text-white/70">
              Your Trusted e-Mitra, CSC & AI Digital Service Partner.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="rounded-xl bg-white/10 p-3 transition hover:bg-[#1FD465] hover:text-[#083139]"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="rounded-xl bg-white/10 p-3 transition hover:bg-[#1FD465] hover:text-[#083139]"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="rounded-xl bg-white/10 p-3 transition hover:bg-[#1FD465] hover:text-[#083139]"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 transition hover:text-[#1FD465]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">
              Popular Services
            </h3>

            <ul className="space-y-3">
              {services.map((service) => (
                <li
                  key={service}
                  className="text-white/70"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">
              Contact Info
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin
                  size={18}
                  className="mt-1 text-[#1FD465]"
                />

                <p className="text-white/70">
                  In Front of Amar Singh Mill,
                  <br />
                  Dhakad Putha,
                  <br />
                  Hindaun City,
                  <br />
                  Rajasthan – 322230
                </p>
              </div>

              <div className="flex gap-3">
                <Phone
                  size={18}
                  className="text-[#1FD465]"
                />

                <a
                  href="tel:+918005707575"
                  className="text-white/70 transition hover:text-[#1FD465]"
                >
                  +91 8005707575
                </a>
              </div>

              <div className="flex gap-3">
                <Mail
                  size={18}
                  className="text-[#1FD465]"
                />

                <a
                  href="mailto:helpdesk@naazsolution.hindaun.co.in"
                  className="text-white/70 transition hover:text-[#1FD465]"
                >
                  helpdesk@naazsolution.hindaun.co.in
                </a>
              </div>

              <div className="flex gap-3">
                <Globe
                  size={18}
                  className="text-[#1FD465]"
                />

                <a
                  href="https://naazsolution.hindaun.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition hover:text-[#1FD465]"
                >
                  naazsolution.hindaun.co.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Naaz Solution. All Rights Reserved.
          </p>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="rounded-full bg-[#1FD465] p-3 text-[#083139] transition hover:scale-110"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}