"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { supabase } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleRegister(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Full Name
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    // Email
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    // Mobile
    if (!mobile.trim()) {
      setError("Please enter your mobile number.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError(
        "Please enter a valid 10-digit Indian mobile number."
      );
      return;
    }

    // Password
    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    // Confirm Password
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const { data, error: signUpError } =
        await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              full_name: fullName.trim(),
              mobile: mobile.trim(),
            },
          },
        });

      if (signUpError) {
        throw signUpError;
      }

      if (data.user) {
        setSuccess(
          "Account created successfully. Please check your email to verify your account."
        );

        setTimeout(() => {
          router.push("/login");
        }, 2500);
      }
    } catch (err: any) {
      setError(
        err?.message ||
          "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f8f9] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">

        <div className="grid w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_25px_70px_rgba(8,49,57,0.12)] lg:grid-cols-2">

          {/* =====================================================
              LEFT BRAND PANEL
          ====================================================== */}

          <div className="relative hidden overflow-hidden bg-[#083139] lg:flex">

            {/* Background Decorations */}
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#1FD465]/10 blur-2xl" />

            <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#1FD465]/10 blur-2xl" />

            <div className="relative flex w-full flex-col justify-between p-12 xl:p-16">

              <div>

                {/* Brand */}
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

                {/* Hero Text */}
                <div className="mt-20 max-w-md">

                  <span className="inline-flex items-center gap-2 rounded-full border border-[#1FD465]/20 bg-[#1FD465]/10 px-4 py-2 text-sm font-medium text-[#1FD465]">

                    <ShieldCheck size={17} />

                    Secure Business Platform

                  </span>

                  <h2 className="mt-7 text-4xl font-bold leading-tight text-white xl:text-5xl">

                    Manage your

                    <span className="text-[#1FD465]">
                      {" "}business smarter.
                    </span>

                  </h2>

                  <p className="mt-6 text-base leading-7 text-white/65">
                    Create your Naaz Solution ERP account and
                    manage customers, applications, services
                    and business operations from one professional
                    platform.
                  </p>

                </div>

                {/* Features */}
                <div className="mt-10 space-y-4">

                  <div className="flex items-center gap-3 text-sm text-white/80">

                    <CheckCircle2
                      size={19}
                      className="text-[#1FD465]"
                    />

                    Customer Management

                  </div>

                  <div className="flex items-center gap-3 text-sm text-white/80">

                    <CheckCircle2
                      size={19}
                      className="text-[#1FD465]"
                    />

                    Application Management

                  </div>

                  <div className="flex items-center gap-3 text-sm text-white/80">

                    <CheckCircle2
                      size={19}
                      className="text-[#1FD465]"
                    />

                    Secure Business Dashboard

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
              REGISTER FORM
          ====================================================== */}

          <div className="px-6 py-10 sm:px-10 lg:px-12 xl:px-16">

            {/* Mobile Logo */}

            <div className="mb-8 flex items-center gap-3 lg:hidden">

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

            {/* Heading */}

            <div className="mb-8">

              <p className="mb-2 text-sm font-semibold text-[#1a9f50]">
                GET STARTED
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-[#083139] sm:text-4xl">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Join Naaz Solution ERP and manage your business
                efficiently.
              </p>

            </div>

            {/* Error */}

            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-600">
                {error}
              </div>
            )}

            {/* Success */}

            {success && (
              <div className="mb-5 flex gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm leading-6 text-green-700">

                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0"
                />

                <span>
                  {success}
                </span>

              </div>
            )}

            {/* Register Form */}

            <form
              onSubmit={handleRegister}
              className="space-y-5"
            >

              {/* =================================================
                  FULL NAME
              ================================================== */}

              <div>

                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-semibold text-[#083139]"
                >
                  Full Name
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) =>
                      setFullName(e.target.value)
                    }
                    placeholder="Enter your full name"
                    autoComplete="name"
                    disabled={loading}
                    className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-[#083139] outline-none transition placeholder:text-slate-400 focus:border-[#1FD465] focus:bg-white focus:ring-4 focus:ring-[#1FD465]/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                </div>

              </div>

              {/* =================================================
                  EMAIL
              ================================================== */}

              <div>

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
                    autoComplete="email"
                    disabled={loading}
                    className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-[#083139] outline-none transition placeholder:text-slate-400 focus:border-[#1FD465] focus:bg-white focus:ring-4 focus:ring-[#1FD465]/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                </div>

              </div>

              {/* =================================================
                  MOBILE
              ================================================== */}

              <div>

                <label
                  htmlFor="mobile"
                  className="mb-2 block text-sm font-semibold text-[#083139]"
                >
                  Mobile Number
                </label>

                <div className="relative">

                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <span className="absolute left-11 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                    +91
                  </span>

                  <input
                    id="mobile"
                    type="tel"
                    value={mobile}
                    onChange={(e) =>
                      setMobile(
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10)
                      )
                    }
                    placeholder="9876543210"
                    autoComplete="tel"
                    disabled={loading}
                    className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 pl-20 pr-4 text-sm tracking-wide text-[#083139] outline-none transition placeholder:text-slate-400 focus:border-[#1FD465] focus:bg-white focus:ring-4 focus:ring-[#1FD465]/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                </div>

              </div>

              {/* =================================================
                  PASSWORD
              ================================================== */}

              <div>

                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-[#083139]"
                >
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Create a password"
                    autoComplete="new-password"
                    disabled={loading}
                    className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm text-[#083139] outline-none transition placeholder:text-slate-400 focus:border-[#1FD465] focus:bg-white focus:ring-4 focus:ring-[#1FD465]/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    disabled={loading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#083139]"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Minimum 6 characters
                </p>

              </div>

              {/* =================================================
                  CONFIRM PASSWORD
              ================================================== */}

              <div>

                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-[#083139]"
                >
                  Confirm Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    disabled={loading}
                    className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm text-[#083139] outline-none transition placeholder:text-slate-400 focus:border-[#1FD465] focus:bg-white focus:ring-4 focus:ring-[#1FD465]/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    disabled={loading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#083139]"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

              </div>

              {/* =================================================
                  TERMS
              ================================================== */}

              <div className="flex items-start gap-3 pt-1">

                <input
                  id="terms"
                  type="checkbox"
                  required
                  disabled={loading}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-[#1FD465]"
                />

                <label
                  htmlFor="terms"
                  className="text-xs leading-5 text-slate-500"
                >
                  I agree to the Naaz Solution{" "}
                  <span className="font-medium text-[#083139]">
                    Terms & Conditions
                  </span>{" "}
                  and Privacy Policy.
                </label>

              </div>

              {/* =================================================
                  SUBMIT BUTTON
              ================================================== */}

              <button
                type="submit"
                disabled={loading}
                className="group mt-2 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#083139] px-5 text-sm font-semibold text-white shadow-lg shadow-[#083139]/10 transition hover:bg-[#0b424b] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <>
                    <Loader2
                      size={19}
                      className="animate-spin"
                    />

                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account

                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}

              </button>

            </form>

            {/* =================================================
                LOGIN LINK
            ================================================== */}

            <div className="mt-7 text-center text-sm text-slate-500">

              Already have an account?{" "}

              <Link
                href="/login"
                className="font-semibold text-[#083139] transition hover:text-[#1a9f50]"
              >
                Sign in
              </Link>

            </div>

            {/* =================================================
                SECURITY
            ================================================== */}

            <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-400">

              <ShieldCheck size={15} />

              Your information is securely protected.

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}