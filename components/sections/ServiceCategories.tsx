"use client";

import Link from "next/link";
import {
  Building2,
  Landmark,
  Bot,
  Globe,
  Printer,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    title: "Rajasthan e-Mitra",
    desc: "Government certificates, Jan Aadhaar, SSO & more.",
    icon: Landmark,
    href: "/services/emitra",
  },
  {
    title: "CSC Digital Services",
    desc: "Banking, Insurance, PAN, Passport & CSC services.",
    icon: Building2,
    href: "/services/csc",
  },
  {
    title: "AI Solutions",
    desc: "AI Resume, OCR, Invoice & Letter Writer.",
    icon: Bot,
    href: "/services/ai",
  },
  {
    title: "Website Development",
    desc: "Business, School & eCommerce websites.",
    icon: Globe,
    href: "/services/web-development",
  },
  {
    title: "Printing & Design",
    desc: "PVC Cards, Flex, Visiting Cards & Graphics.",
    icon: Printer,
    href: "/services/printing",
  },
  {
    title: "Computer Courses",
    desc: "RS-CIT, CCC, Tally & Professional Training.",
    icon: GraduationCap,
    href: "/services/courses",
  },
];

export default function ServiceCategories() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">

        <div className="mb-12 text-center">
          <span className="rounded-full bg-[#1FD465]/10 px-4 py-2 text-sm font-semibold text-[#1FD465]">
            Explore Categories
          </span>

          <h2 className="mt-5 text-4xl font-bold text-[#083139]">
            Services by Category
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Find the right service quickly from our major categories.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                href={category.href}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#1FD465] hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#083139] text-white">
                  <Icon size={30} />
                </div>

                <h3 className="mt-5 text-2xl font-bold text-[#083139]">
                  {category.title}
                </h3>

                <p className="mt-3 text-slate-600">
                  {category.desc}
                </p>

                <div className="mt-6 flex items-center gap-2 font-semibold text-[#2563EB]">
                  Explore
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