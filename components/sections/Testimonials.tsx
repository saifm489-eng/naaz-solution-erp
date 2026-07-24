"use client";

import { Star, Quote, BadgeCheck } from "lucide-react";

const testimonials = [
  {
    name: "Rakesh Sharma",
    role: "Business Owner",
    review:
      "Naaz Solution provided fast and reliable e-Mitra services. The staff was professional and the process was smooth.",
  },
  {
    name: "Pooja Verma",
    role: "Student",
    review:
      "I used the AI Resume Builder and document services. Everything was completed quickly with excellent quality.",
  },
  {
    name: "Amit Kumar",
    role: "Government Service Applicant",
    review:
      "From PAN Card to Income Certificate, all services were completed on time. Highly recommended.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4">

        {/* Heading */}
        <div className="mb-16 text-center">
          <span className="rounded-full bg-[#1FD465]/10 px-4 py-2 text-sm font-semibold text-[#1FD465]">
            Customer Reviews
          </span>

          <h2 className="mt-5 text-4xl font-bold text-[#083139] md:text-5xl">
            What Our Customers Say
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-600">
            Thousands of customers trust Naaz Solution for government,
            digital and AI-powered services.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <Quote className="text-[#1FD465]" size={36} />

              <p className="mt-6 leading-7 text-slate-600">
                "{item.review}"
              </p>

              <div className="mt-6 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[#083139]">
                    {item.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {item.role}
                  </p>
                </div>

                <BadgeCheck
                  className="text-[#1FD465]"
                  size={28}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}