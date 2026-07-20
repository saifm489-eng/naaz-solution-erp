"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
} from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="hidden lg:block w-full border-b border-white/10 bg-[#083139] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">

        {/* Left */}
        <div className="flex items-center gap-6 text-sm">

          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-[#1FD465]" />
            <span>
              In Front of Amar Singh Mill, Hindaun City, Rajasthan 322230
            </span>
          </div>

          <a
            href="tel:+918005707575"
            className="flex items-center gap-2 hover:text-[#1FD465] transition"
          >
            <Phone size={15} className="text-[#1FD465]" />
            <span>8005707575</span>
          </a>

          <a
            href="mailto:helpdesk@naazsolution.hindaun.co.in"
            className="flex items-center gap-2 hover:text-[#1FD465] transition"
          >
            <Mail size={15} className="text-[#1FD465]" />
            <span>helpdesk@naazsolution.hindaun.co.in</span>
          </a>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <Link href="#" className="hover:text-[#1FD465]">
            <Facebook size={17} />
          </Link>

          <Link href="#" className="hover:text-[#1FD465]">
            <Instagram size={17} />
          </Link>

          <Link href="#" className="hover:text-[#1FD465]">
            <Youtube size={17} />
          </Link>

          <a
            href="https://wa.me/918005707575"
            target="_blank"
            className="hover:text-[#1FD465]"
          >
            <MessageCircle size={17} />
          </a>

        </div>

      </div>
    </div>
  );
}