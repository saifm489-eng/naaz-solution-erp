"use client";

import { useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";

import { toast } from "sonner";

import { supabase } from "@/lib/supabase/client";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    try {
      setLoading(true);

      const { error } = await supabase.auth.resetPasswordForEmail(
        data.email,
        {
          redirectTo:
            "http://localhost:3000/reset-password",
        }
      );

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Password reset email sent.");

      reset();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block font-medium">
          Email
        </label>

        <input
          type="email"
          {...register("email")}
          className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#083139]"
          placeholder="Enter your email"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[#083139] py-3 font-semibold text-white transition hover:bg-[#0b4854]"
      >
        {loading
          ? "Sending..."
          : "Send Reset Link"}
      </button>

      <div className="text-center">
        <Link
          href="/login"
          className="font-semibold text-[#083139]"
        >
          Back to Login
        </Link>
      </div>
    </form>
  );
}