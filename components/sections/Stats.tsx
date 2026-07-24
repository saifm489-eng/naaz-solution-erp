"use client";
import Counter from "@/components/shared/Counter";
import {
  Users,
  FileText,
  Briefcase,
  Star,
} from "lucide-react";

const stats = [
  {
    value: 10000,
    suffix: "+",
    label: "Happy Customers",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
  },
  {
    value: 25000,
    suffix: "+",
    label: "Applications Processed",
    icon: FileText,
    color: "bg-green-50 text-green-600",
  },
  {
    value: 500,
    suffix: "+",
    label: "Digital Services",
    icon: Briefcase,
    color: "bg-orange-50 text-orange-600",
  },
  {
    value: 5,
    suffix: "+",
    label: "Years of Experience",
    icon: Star,
    color: "bg-yellow-50 text-yellow-600",
  },
];

export default function Stats() {
  return (
    <section className="bg-gradient-to-br from-[#083139] via-[#0A4B5A] to-[#2563EB] py-24 text-white">
      <div className="mx-auto max-w-7xl px-4">

        {/* Heading */}

        <div className="mb-16 text-center">
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
            Trusted by Thousands
          </span>

          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
            Our Achievements
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-white/80">
            Delivering reliable government, digital and AI services
            across Rajasthan with customer satisfaction.
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="group rounded-3xl border border-white/10 bg-white/10 p-8 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:bg-white/20"
              >

                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${item.color}`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-5xl font-black">
  <Counter
    end={item.value}
    suffix={item.suffix}
  />
</h3>

                <p className="mt-3 text-white/80">
                  {item.label}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}