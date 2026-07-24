"use client";

import Link from "next/link";
import {
  Bot,
  FileText,
  FileSpreadsheet,
  ScanText,
  MessageSquare,
  FileImage,
  ArrowRight,
} from "lucide-react";

const aiTools = [
  {
    title: "AI Resume Builder",
    desc: "Create professional resumes in minutes.",
    icon: FileText,
  },
  {
    title: "AI Invoice Generator",
    desc: "Generate GST & business invoices instantly.",
    icon: FileSpreadsheet,
  },
  {
    title: "AI Letter Writer",
    desc: "Write applications and official letters.",
    icon: Bot,
  },
  {
    title: "AI OCR Scanner",
    desc: "Convert image or PDF into editable text.",
    icon: ScanText,
  },
  {
    title: "AI Chat Assistant",
    desc: "Get instant answers for government services.",
    icon: MessageSquare,
  },
  {
    title: "AI PDF Tools",
    desc: "Merge, split, compress and convert PDF files.",
    icon: FileImage,
  },
];

export default function AITools() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">

        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="rounded-full bg-[#1FD465]/10 px-4 py-2 text-sm font-semibold text-[#1FD465]">
            AI Powered Services
          </span>

          <h2 className="mt-5 text-4xl font-bold text-[#083139]">
            Smart AI Tools for Everyone
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Save time with our AI-powered tools for resumes, invoices,
            OCR, PDF management, letters and digital assistance.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {aiTools.map((tool) => {
            const Icon = tool.icon;

            return (
              <Link
                href="#"
                key={tool.title}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#1FD465] hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#083139] text-white">
                  <Icon size={28} />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-[#083139]">
                  {tool.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {tool.desc}
                </p>

                <div className="mt-6 flex items-center gap-2 font-semibold text-[#2563EB]">
                  Try Now
                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
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