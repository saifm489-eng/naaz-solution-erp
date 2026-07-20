"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa6";

export default function AnnouncementBar() {
  return (
    <div className="hidden lg:block w-full bg-[#083139] text-white border-b border-white/10">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 xl:px-6">

        {/* Left */}
        <div className="flex items-center gap-6 text-xs xl:text-sm">

          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-[#1FD465]" />
            <span>
              In Front of Amar Singh Mill, Hindaun City, Rajasthan 322230
            </span>
          </div>

          <a
            href="tel:+918005707575"
            className="flex items-center gap-2 transition hover:text-[#1FD465]"
          >
            <Phone size={14} className="text-[#1FD465]" />
            <span>8005707575</span>
          </a>

          <a
            href="mailto:helpdesk@naazsolution.hindaun.co.in"
            className="flex items-center gap-2 transition hover:text-[#1FD465]"
          >
            <Mail size={14} className="text-[#1FD465]" />
            <span>helpdesk@naazsolution.hindaun.co.in</span>
          </a>

        </div>

        {/* Right */}
        <div className="flex items-center gap-3">

          <Link
            href="https://www.facebook.com/"
            target="_blank"
            aria-label="Facebook"
            className="transition hover:text-[#1FD465]"
          >
            <FaFacebookF size={15} />
          </Link>

          <Link
            href="https://www.instagram.com/"
            target="_blank"
            aria-label="Instagram"
            className="transition hover:text-[#1FD465]"
          >
            <FaInstagram size={15} />
          </Link>

          <Link
            href="https://www.youtube.com/"
            target="_blank"
            aria-label="YouTube"
            className="transition hover:text-[#1FD465]"
          >
            <FaYoutube size={15} />
          </Link>

          <a
            href="https://wa.me/918005707575"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="transition hover:text-[#1FD465]"
          >
            <FaWhatsapp size={16} />
          </a>

        </div>

      </div>
    </div>
  );
}