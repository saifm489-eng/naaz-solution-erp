"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";

import { toast } from "sonner";

import { supabase } from "@/lib/supabase/client";

const schema = z
  .object({
    fullName: z.string().min(3, "Full Name is required"),
    email: z.string().email("Enter valid email"),
    mobile: z
      .string()
      .min(10, "Enter valid mobile number")
      .max(10, "Enter valid mobile number"),
    password: z.string().min(6, "Minimum 6 characters"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          mobile: data.mobile,
          role: "customer",
        },
      },
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Registration Successful");

    router.push("/login");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label>Full Name</label>

        <input
          {...register("fullName")}
          className="w-full rounded-xl border p-3"
        />

        <p className="text-red-500 text-sm">
          {errors.fullName?.message}
        </p>
      </div>

      <div>
        <label>Email</label>

        <input
          type="email"
          {...register("email")}
          className="w-full rounded-xl border p-3"
        />

        <p className="text-red-500 text-sm">
          {errors.email?.message}
        </p>
      </div>

      <div>
        <label>Mobile</label>

        <input
          {...register("mobile")}
          className="w-full rounded-xl border p-3"
        />

        <p className="text-red-500 text-sm">
          {errors.mobile?.message}
        </p>
      </div>

      <div>
        <label>Password</label>

        <input
          type="password"
          {...register("password")}
          className="w-full rounded-xl border p-3"
        />

        <p className="text-red-500 text-sm">
          {errors.password?.message}
        </p>
      </div>

      <div>
        <label>Confirm Password</label>

        <input
          type="password"
          {...register("confirmPassword")}
          className="w-full rounded-xl border p-3"
        />

        <p className="text-red-500 text-sm">
          {errors.confirmPassword?.message}
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[#083139] py-3 text-white"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <p className="text-center">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-[#083139] font-semibold"
        >
          Login
        </Link>
      </p>
    </form>
  );
}