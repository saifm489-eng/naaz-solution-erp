"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { supabase } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] =
    useState(true);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkRecoverySession() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          setError(
            "This password reset link is invalid or has expired. Please request a new reset link."
          );
        }
      } catch {
        setError(
          "Unable to verify your password reset session."
        );
      } finally {
        setCheckingSession(false);
      }
    }

    checkRecoverySession();
  }, []);

  async function handleResetPassword(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setError(
          "Your reset session has expired. Please request a new password reset link."
        );
        return;
      }

      const { error: updateError } =
        await supabase.auth.updateUser({
          password,
        });

      if (updateError) {
        throw updateError;
      }

      setSuccess(
        "Your password has been updated successfully. Redirecting you to login..."
      );

      setTimeout(async () => {
        await supabase.auth.signOut();
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(
        err?.message ||
          "Unable to update your password. Please try again."
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
              LEFT PANEL
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

                    <ShieldCheck size={17} />

                    Secure Password

                  </span>

                  <h2 className="mt-7 text-4xl font-bold leading-tight text-white xl:text-5xl">

                    Create a
                    <span className="text-[#1FD465]">
                      {" "}new password.
                    </span>

                  </h2>

                  <p className="mt-6 text-base leading-7 text-white/65">

                    Choose a strong password to protect your
                    Naaz Solution ERP account and business data.

                  </p>

                </div>

                {/* Features */}

                <div className="mt-10 space-y-4">

                  <div className="flex items-center gap-3 text-sm text-white/80">

                    <CheckCircle2
                      size={19}
                      className="text-[#1FD465]"
                    />

                    Minimum 6 characters

                  </div>

                  <div className="flex items-center gap-3 text-sm text-white/80">

                    <CheckCircle2
                      size={19}
                      className="text-[#1FD465]"
                    />

                    Secure account access

                  </div>

                  <div className="flex items-center gap-3 text-sm text-white/80">

                    <CheckCircle2
                      size={19}
                      className="text-[#1FD465]"
                    />

                    Password encrypted by Supabase

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
              RIGHT PANEL
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

            {/* Icon */}

            <div className="flex justify-center">

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#1FD465]/10">

                <Lock
                  size={38}
                  className="text-[#1a9f50]"
                />

              </div>

            </div>

            {/* Heading */}

            <div className="mt-7 text-center">

              <p className="text-sm font-semibold text-[#1a9f50]">
                RESET PASSWORD
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#083139]">
                Create new password
              </h2>

              <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500">

                Enter your new password below. Make sure
                it is at least 6 characters long.

              </p>

            </div>

            {/* Checking Session */}

            {checkingSession ? (
              <div className="mt-10 flex flex-col items-center justify-center">

                <Loader2
                  size={30}
                  className="animate-spin text-[#1a9f50]"
                />

                <p className="mt-3 text-sm text-slate-500">
                  Verifying reset link...
                </p>

              </div>
            ) : (
              <>

                {/* SUCCESS */}

                {success && (
                  <div className="mt-7 flex gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-4 text-sm leading-6 text-green-700">

                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0"
                    />

                    <span>{success}</span>

                  </div>
                )}

                {/* ERROR */}

                {error && (
                  <div className="mt-7 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm leading-6 text-red-600">
                    {error}
                  </div>
                )}

                {/* FORM */}

                {!success && !error && (
                  <form
                    onSubmit={handleResetPassword}
                    className="mt-8 space-y-5"
                  >

                    {/* Password */}

                    <div>

                      <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-semibold text-[#083139]"
                      >
                        New Password
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
                          placeholder="Enter new password"
                          autoComplete="new-password"
                          disabled={loading}
                          className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm text-[#083139] outline-none transition placeholder:text-slate-400 focus:border-[#1FD465] focus:bg-white focus:ring-4 focus:ring-[#1FD465]/10 disabled:cursor-not-allowed disabled:opacity-60"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(
                              !showPassword
                            )
                          }
                          disabled={loading}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#083139]"
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

                    {/* Confirm Password */}

                    <div>

                      <label
                        htmlFor="confirmPassword"
                        className="mb-2 block text-sm font-semibold text-[#083139]"
                      >
                        Confirm New Password
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
                            setConfirmPassword(
                              e.target.value
                            )
                          }
                          placeholder="Confirm new password"
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
                        >

                          {showConfirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}

                        </button>

                      </div>

                    </div>

                    {/* Submit */}

                    <button
                      type="submit"
                      disabled={loading}
                      className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#083139] px-5 text-sm font-semibold text-white shadow-lg shadow-[#083139]/10 transition hover:bg-[#0b424b] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                    >

                      {loading ? (
                        <>
                          <Loader2
                            size={19}
                            className="animate-spin"
                          />

                          Updating Password...
                        </>
                      ) : (
                        <>
                          Update Password

                          <ArrowRight
                            size={18}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </>
                      )}

                    </button>

                  </form>
                )}

                {/* Invalid / Expired Link */}

                {error && (
                  <div className="mt-6 text-center">

                    <Link
                      href="/forgot-password"
                      className="inline-flex items-center justify-center rounded-xl bg-[#083139] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b424b]"
                    >
                      Request New Reset Link
                    </Link>

                  </div>
                )}

              </>
            )}

            {/* Login */}

            <div className="mt-8 text-center text-sm text-slate-500">

              Remember your password?{" "}

              <Link
                href="/login"
                className="font-semibold text-[#083139] transition hover:text-[#1a9f50]"
              >
                Sign in
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