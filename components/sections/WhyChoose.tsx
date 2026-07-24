"use client";

import {
  ShieldCheck,
  Clock3,
  BadgeCheck,
  Users,
  Headphones,
  Wallet,
} from "lucide-react";

const features = [
  {
    title: "Trusted Digital Service",
    description:
      "Reliable Rajasthan e-Mitra, CSC and AI powered digital services.",
    icon: ShieldCheck,
  },
  {
    title: "Fast Processing",
    description:
      "Quick document processing with minimum waiting time.",
    icon: Clock3,
  },
  {
    title: "Verified Services",
    description:
      "Government compliant and secure service workflow.",
    icon: BadgeCheck,
  },
  {
    title: "Experienced Team",
    description:
      "Professional support for citizens, students and businesses.",
    icon: Users,
  },
  {
    title: "Dedicated Support",
    description:
      "Phone, WhatsApp and in-office assistance whenever required.",
    icon: Headphones,
  },
  {
    title: "Transparent Pricing",
    description:
      "Clear pricing with no hidden charges.",
    icon: Wallet,
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4">

        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-full bg-[#1FD465]/10 px-4 py-2 text-sm font-semibold text-[#1FD465]">
            Why Choose Us
          </span>

          <h2 className="mt-5 text-4xl font-bold text-[#083139] md:text-5xl">
            Why Choose Naaz Solution?
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            We provide trusted digital services with fast processing,
            transparent pricing and dedicated customer support.
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#1FD465] hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#083139] text-white transition-colors duration-300 group-hover:bg-[#1FD465] group-hover:text-[#083139]">
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-[#083139]">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 rounded-3xl bg-[#083139] p-10 text-center text-white">
          <h3 className="text-3xl font-bold">
            Ready to Get Started?
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Visit our office or contact us today for fast and reliable
            digital services.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918005707575"
              className="rounded-xl bg-[#1FD465] px-6 py-3 font-semibold text-[#083139] transition hover:scale-105"
            >
              Call Now
            </a>

            <a
              href="https://wa.me/918005707575"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/30 px-6 py-3 font-semibold transition hover:bg-white/10"
            >
              WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}