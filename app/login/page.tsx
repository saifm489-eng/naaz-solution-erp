import Image from "next/image";
import Link from "next/link";

import {
  ShieldCheck,
  Zap,
  BarChart3,
  Headphones,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f7fafb]">

      <div className="grid min-h-screen lg:grid-cols-[43%_57%]">

        {/* =========================================================
            LEFT BRAND PANEL
        ========================================================= */}

        <section className="relative hidden overflow-hidden bg-[#083139] lg:flex">

          {/* Background Glow */}
          <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#1FD465]/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#1FD465]/10 blur-3xl" />

          {/* Decorative Circles */}
          <div className="pointer-events-none absolute right-16 top-20 h-32 w-32 rounded-full border border-[#1FD465]/10" />

          <div className="pointer-events-none absolute right-24 top-28 h-16 w-16 rounded-full border border-[#1FD465]/10" />

          <div className="pointer-events-none absolute bottom-32 left-10 h-20 w-20 rounded-full border border-white/5" />

          <div className="relative z-10 flex min-h-screen w-full flex-col justify-between px-10 py-10 xl:px-14 xl:py-12">

            {/* =====================================================
                BRAND HEADER
            ===================================================== */}

            <div className="flex items-center gap-4">

              {/* Logo */}
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white p-1 shadow-lg">

                <Image
                  src="/images/dashboard-preview.png"
                  alt="Naaz Solution Logo"
                  fill
                  sizes="56px"
                  priority
                  className="object-contain"
                />

              </div>

              {/* Brand Name */}
              <div>

                <h1 className="text-2xl font-black tracking-tight text-white">
                  Naaz Solution
                </h1>

                <p className="mt-0.5 text-sm text-white/55">
                  e-Mitra, CSC & AI Digital Services
                </p>

              </div>

            </div>


            {/* =====================================================
                LEFT MAIN CONTENT
            ===================================================== */}

            <div className="max-w-xl">

              {/* Small Label */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#1FD465]/20 bg-[#1FD465]/10 px-4 py-2">

                <span className="h-2 w-2 rounded-full bg-[#1FD465]" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1FD465]">
                  Naaz Solution ERP
                </span>

              </div>


              {/* Heading */}
              <h2 className="text-5xl font-black leading-[1.05] tracking-tight text-white xl:text-6xl">

                Welcome

                <br />

                <span className="text-[#1FD465]">
                  Back!
                </span>

              </h2>


              {/* Accent */}
              <div className="mt-6 h-1 w-16 rounded-full bg-[#1FD465]" />


              {/* Description */}
              <p className="mt-6 max-w-lg text-base leading-7 text-white/60 xl:text-lg">

                अपने business को एक ही जगह से manage करें।
                Applications, customers, documents और digital
                services को आसानी से manage करें।

              </p>


              {/* =================================================
                  FEATURES
              ================================================= */}

              <div className="mt-10 space-y-5">

                <Feature
                  icon={<ShieldCheck size={21} />}
                  title="Secure & Reliable"
                  description="आपका business data सुरक्षित और protected रहता है।"
                />

                <Feature
                  icon={<Zap size={21} />}
                  title="Fast & Efficient"
                  description="अपने सभी digital services तक तेजी से पहुँचें।"
                />

                <Feature
                  icon={<BarChart3 size={21} />}
                  title="Smart Dashboard"
                  description="Customers और applications को आसानी से track करें।"
                />

                <Feature
                  icon={<Headphones size={21} />}
                  title="24/7 Support"
                  description="जब जरूरत हो, हमारी support team आपके साथ है।"
                />

              </div>

            </div>


            {/* =====================================================
                LEFT FOOTER
            ===================================================== */}

            <div className="flex items-center justify-between border-t border-white/10 pt-5">

              <p className="text-xs text-white/35">
                © {new Date().getFullYear()} Naaz Solution
              </p>

              <p className="text-xs text-white/35">
                Secure Digital Services
              </p>

            </div>

          </div>

        </section>


        {/* =========================================================
            RIGHT LOGIN PANEL
        ========================================================= */}

        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-10 sm:px-8 lg:px-10 xl:px-16">

          {/* Background Decorations */}

          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#1FD465]/5 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#083139]/5 blur-3xl" />


          {/* =====================================================
              CONTENT CONTAINER
          ===================================================== */}

          <div className="relative z-10 w-full max-w-xl">


            {/* =================================================
                MOBILE BRAND
            ================================================= */}

            <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">

              {/* Mobile Logo */}

              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-sm">

                <Image
                  src="/images/dashboard-preview.png"
                  alt="Naaz Solution Logo"
                  fill
                  sizes="48px"
                  priority
                  className="object-contain"
                />

              </div>


              {/* Mobile Brand Text */}

              <div>

                <h1 className="text-lg font-black text-[#083139]">
                  Naaz Solution
                </h1>

                <p className="text-xs text-slate-500">
                  ERP System
                </p>

              </div>

            </div>


            {/* =================================================
                LOGIN CARD
            ================================================= */}

            <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_25px_80px_rgba(8,49,57,0.10)] sm:p-9 md:p-10">


              {/* =================================================
                  MAIN LOGO
              ================================================= */}

              <div className="mb-7 flex justify-center">

                <div className="relative h-20 w-20">

                  {/* Logo Glow */}

                  <div className="absolute inset-0 rounded-3xl bg-[#1FD465]/10 blur-xl" />


                  {/* Logo Box */}

                  <div className="relative h-20 w-20 overflow-hidden rounded-3xl border border-[#1FD465]/20 bg-white shadow-lg">

                    <Image
                      src="/images/dashboard-preview.png"
                      alt="Naaz Solution Logo"
                      fill
                      sizes="80px"
                      priority
                      className="object-contain p-2"
                    />

                  </div>

                </div>

              </div>


              {/* =================================================
                  LOGIN HEADING
              ================================================= */}

              <div className="mb-8 text-center">

                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#1FD465]">
                  Naaz Solution ERP
                </p>

                <h2 className="text-2xl font-black tracking-tight text-[#083139] sm:text-3xl">
                  Sign in to your account
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Enter your credentials to continue
                </p>

              </div>


              {/* =================================================
                  LOGIN FORM
              ================================================= */}

              <LoginForm />


              {/* =================================================
                  REGISTER LINK
              ================================================= */}

              <div className="mt-8 border-t border-slate-100 pt-7 text-center">

                <p className="text-sm text-slate-500">

                  Don't have an account?{" "}

                  <Link
                    href="/register"
                    className="inline-flex items-center gap-1 font-bold text-[#0dbb67] transition hover:text-[#083139]"
                  >

                    Create Account

                    <ArrowRight size={14} />

                  </Link>

                </p>

              </div>

            </div>


            {/* =================================================
                TRUST BAR
            ================================================= */}

            <div className="mt-5 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">

              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs font-medium text-slate-500">


                {/* Secure Login */}

                <span className="flex items-center gap-2">

                  <CheckCircle2
                    size={15}
                    className="text-[#1FD465]"
                  />

                  Secure Login

                </span>


                <span className="hidden h-4 w-px bg-slate-200 sm:block" />


                {/* e-Mitra */}

                <span>
                  e-Mitra Services
                </span>


                <span className="hidden h-4 w-px bg-slate-200 sm:block" />


                {/* CSC */}

                <span>
                  CSC Services
                </span>


                <span className="hidden h-4 w-px bg-slate-200 sm:block" />


                {/* AI */}

                <span>
                  AI Digital Services
                </span>

              </div>

            </div>


            {/* =================================================
                RIGHT FOOTER
            ================================================= */}

            <p className="mt-6 text-center text-xs text-slate-400">

              © {new Date().getFullYear()} Naaz Solution ·
              Secure & Trusted Digital Services

            </p>

          </div>

        </section>

      </div>

    </main>
  );
}


/* ===============================================================
   FEATURE COMPONENT
================================================================ */

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex items-center gap-4">

      {/* Icon */}

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1FD465]/10 text-[#1FD465] ring-1 ring-[#1FD465]/10 transition-all duration-300 group-hover:bg-[#1FD465]/15 group-hover:ring-[#1FD465]/20">

        {icon}

      </div>


      {/* Text */}

      <div>

        <h3 className="font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm text-white/45">
          {description}
        </p>

      </div>

    </div>
  );
}