"use client";
import Reveal from "@/components/shared/Reveal";
import Link from "next/link";
import {
  ArrowRight,
  CreditCard,
  FileText,
  ShieldCheck,
  Landmark,
  UserRound,
  HeartPulse,
  Train,
  Globe,
  Bot,
  Printer,
  GraduationCap,
} from "lucide-react";

const services = [
  {
    title: "Aadhaar Update",
    desc: "Update Mobile, Address & Biometrics",
    icon: CreditCard,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "PAN Card",
    desc: "New & Correction Services",
    icon: FileText,
    color: "bg-red-50 text-red-600",
  },
  {
    title: "Income Certificate",
    desc: "Apply Online",
    icon: Landmark,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Domicile Certificate",
    desc: "Permanent Residence",
    icon: ShieldCheck,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Jan Aadhaar",
    desc: "Registration & Update",
    icon: UserRound,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Ayushman Card",
    desc: "Health Card Services",
    icon: HeartPulse,
    color: "bg-pink-50 text-pink-600",
  },
  {
    title: "IRCTC Booking",
    desc: "Train Ticket Booking",
    icon: Train,
    color: "bg-cyan-50 text-cyan-600",
  },
  {
    title: "Website Design",
    desc: "Business Websites",
    icon: Globe,
    color: "bg-violet-50 text-violet-600",
  },
  {
    title: "AI Tools",
    desc: "Resume, OCR & Invoice",
    icon: Bot,
    color: "bg-sky-50 text-sky-600",
  },
  {
    title: "PVC Card Printing",
    desc: "Premium PVC Cards",
    icon: Printer,
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "Computer Courses",
    desc: "RS-CIT, CCC & More",
    icon: GraduationCap,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "View All Services",
    desc: "500+ Digital Services",
    icon: ArrowRight,
    color: "bg-[#083139] text-white",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4">

        {/* Heading */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-[#1FD465]">
              Government & Digital Services
            </span>
            <Reveal>
            <h2 className="mt-2 text-4xl font-bold text-[#083139]">
              Popular Services
            </h2>
             </Reveal>
            <p className="mt-3 max-w-2xl text-slate-600">
              Rajasthan e-Mitra, CSC, AI Tools, Website Design and
              500+ trusted digital services available under one platform.
            </p>
          </div>

          <Link
            href="/services"
            className="hidden lg:flex items-center gap-2 font-semibold text-[#2563EB]"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                href="#"
                key={service.title}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#1FD465] hover:shadow-xl"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${service.color}`}
                >
                  <Icon size={28} />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-[#083139]">
                  {service.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {service.desc}
                </p>

                <div className="mt-6 flex items-center gap-2 font-semibold text-[#2563EB]">
  {service.title === "View All Services" ? "Explore All" : "Apply Now"}

  <ArrowRight
    size={18}
    className="transition-transform duration-300 group-hover:translate-x-1"
  />
</div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}