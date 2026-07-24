"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What services does Naaz Solution provide?",
    answer:
      "We provide Rajasthan e-Mitra services, CSC digital services, Aadhaar, PAN Card, Certificates, Website Development, AI Tools, Printing, IRCTC Booking and many more.",
  },
  {
    question: "Can I apply for government certificates online?",
    answer:
      "Yes. We help you apply for Income Certificate, Caste Certificate, Domicile Certificate, Birth Certificate, Jan Aadhaar and many other government services.",
  },
  {
    question: "Do you provide AI-powered services?",
    answer:
      "Yes. We offer AI Resume Builder, AI Invoice Generator, AI OCR, AI Letter Writer, AI Chat Assistant and PDF tools.",
  },
  {
    question: "Do you develop websites for businesses?",
    answer:
      "Yes. We build responsive business websites, school websites, hospital websites, portfolio websites and eCommerce websites.",
  },
  {
    question: "How can I contact Naaz Solution?",
    answer:
      "You can call us, WhatsApp us or visit our office in Hindaun City, Rajasthan during business hours.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-4">

        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="rounded-full bg-[#1FD465]/10 px-4 py-2 text-sm font-semibold text-[#1FD465]">
            Frequently Asked Questions
          </span>

          <h2 className="mt-5 text-4xl font-bold text-[#083139] md:text-5xl">
            Got Questions?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Find answers to the most common questions about our services.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-lg font-semibold text-[#083139]">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={22}
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-slate-600 leading-7">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}