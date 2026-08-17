"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowLeft, RefreshCw, CheckCircle2 } from "lucide-react";

import { supabase } from "@/lib/supabase/client";

export default function VerifyEmailPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleResendEmail() {
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const { error: resendError } =
        await supabase.auth.resend({
          type: "signup",
          email: email.trim(),
        });

      if (resendError) {
        throw resendError;
      }

      setMessage(
        "Verification email has been sent again. Please check your inbox."
      );
    } catch (err: any) {
      setError(
        err?.message ||
          "Unable to resend verification email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f8f9] px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">

        <div className="grid w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_25px_70px_rgba(8,49,57,0.12)] lg:grid-cols-2">

          {/* =====================================================
              LEFT BRAND PANEL
          ====================================================== */}

          <div className="relative hidden overflow-hidden bg-[#083139] lg:flex">

            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#1FD465]/10 blur-2xl" />

            <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#1FD465]/10 blur-2xl" />

            <div className="relative flex w-full flex-col justify-between p-12 xl:p-16">

              <div>

                {/* Logo */}

                <div className="flex items-center gap-4">

                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg">

                    <Image
                      src="/images/dashboard-preview.png"
                      alt="Naaz Solution Logo"
                      width={64}
                      height={64}
                      className="h-full w-full object-contain"
                    />

                  </div>

                  <div>

                    <h1 className="text-2xl font-bold text-white">
                      Naaz Solution
                    </h1>

                    <p className="text-sm text-white/60">
                      ERP & Digital Services
                    </p>

                  </div>

                </div>

                {/* Content */}

                <div className="mt-20 max-w-md">

                  <span className="inline-flex items-center gap-2 rounded-full border border-[#1FD465]/20 bg-[#1FD465]/10 px-4 py-2 text-sm font-medium text-[#1FD465]">

                    <CheckCircle2 size={17} />

                    Account Security

                  </span>

                  <h2 className="mt-7 text-4xl font-bold leading-tight text-white xl:text-5xl">

                    Verify your
                    <span className="text-[#1FD465]">
                      {" "}email address.
                    </span>

                  </h2>

                  <p className="mt-6 text-base leading-7 text-white/65">

                    Email verification helps us keep your
                    Naaz Solution account secure and ensures
                    that you can recover your account when needed.

                  </p>

                </div>

                {/* Features */}

                <div className="mt-10 space-y-4">

                  <div className="flex items-center gap-3 text-sm text-white/80">

                    <CheckCircle2
                      size={19}
                      className="text-[#1FD465]"
                    />

                    Secure account verification

                  </div>

                  <div className="flex items-center gap-3 text-sm text-white/80">

                    <CheckCircle2
                      size={19}
                      className="text-[#1FD465]"
                    />

                    Protected business data

                  </div>

                  <div className="flex items-center gap-3 text-sm text-white/80">

                    <CheckCircle2
                      size={19}
                      className="text-[#1FD465]"
                    />

                    Easy account recovery

                  </div>

                </div>

              </div>

              <p className="mt-12 text-xs text-white/40">
                © {new Date().getFullYear()} Naaz Solution.
                All Rights Reserved.
              </p>

            </div>

          </div>

          {/* =====================================================
              VERIFY EMAIL CARD
          ====================================================== */}

          <div className="px-6 py-12 sm:px-10 lg:px-12 xl:px-16">

            {/* Mobile Logo */}

            <div className="mb-10 flex items-center gap-3 lg:hidden">

              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-[#083139]">

                <Image
                  src="/images/dashboard-preview.png"
                  alt="Naaz Solution Logo"
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                />

              </div>

              <div>

                <h1 className="text-lg font-bold text-[#083139]">
                  Naaz Solution
                </h1>

                <p className="text-xs text-slate-500">
                  ERP & Digital Services
                </p>

              </div>

            </div>

            {/* Email Icon */}

            <div className="flex justify-center">

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#1FD465]/10">

                <Mail
                  size={38}
                  className="text-[#1a9f50]"
                />

              </div>

            </div>

            {/* Heading */}

            <div className="mt-7 text-center">

              <p className="text-sm font-semibold text-[#1a9f50]">
                EMAIL VERIFICATION
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#083139]">
                Check your inbox
              </h2>

              <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500">

                We have sent a verification link to your
                email address. Please open the email and
                click the verification button to activate
                your account.

              </p>

            </div>

            {/* Instructions */}

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">

              <div className="space-y-4">

                <div className="flex gap-3">

                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#083139] text-xs font-bold text-white">
                    1
                  </div>

                  <p className="text-sm leading-6 text-slate-600">
                    Open your email inbox.
                  </p>

                </div>

                <div className="flex gap-3">

                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#083139] text-xs font-bold text-white">
                    2
                  </div>

                  <p className="text-sm leading-6 text-slate-600">
                    Find the email from Naaz Solution.
                  </p>

                </div>

                <div className="flex gap-3">

                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#083139] text-xs font-bold text-white">
                    3
                  </div>

                  <p className="text-sm leading-6 text-slate-600">
                    Click the verification link.
                  </p>

                </div>

              </div>

            </div>

            {/* Success Message */}

            {message && (
              <div className="mt-5 flex gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm leading-6 text-green-700">

                <CheckCircle2
                  size={19}
                  className="mt-0.5 shrink-0"
                />

                <span>
                  {message}
                </span>

              </div>
            )}

            {/* Error Message */}

            {error && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-600">
                {error}
              </div>
            )}

            {/* Resend Section */}

            <div className="mt-8">

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#083139]"
              >
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="you@example.com"
                  className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-[#083139] outline-none transition placeholder:text-slate-400 focus:border-[#1FD465] focus:bg-white focus:ring-4 focus:ring-[#1FD465]/10"
                />

              </div>

              <button
                type="button"
                onClick={handleResendEmail}
                disabled={loading}
                className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#083139] bg-white text-sm font-semibold text-[#083139] transition hover:bg-[#083139] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >

                <RefreshCw
                  size={17}
                  className={
                    loading
                      ? "animate-spin"
                      : ""
                  }
                />

                {loading
                  ? "Sending..."
                  : "Resend Verification Email"}

              </button>

            </div>

            {/* Back Login */}

            <div className="mt-8 text-center">

              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#083139] transition hover:text-[#1a9f50]"
              >

                <ArrowLeft size={17} />

                Back to Login

              </Link>

            </div>

            {/* Security */}

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">

              <ShieldCheck size={15} />

              Your information is securely protected.

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}