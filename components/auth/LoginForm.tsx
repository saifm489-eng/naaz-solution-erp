"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";


/* ============================================================
   VALIDATION
============================================================ */

const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters."),
});


type FormData = z.infer<typeof schema>;


/* ============================================================
   LOGIN FORM
============================================================ */

export default function LoginForm() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  /* ==========================================================
     LOGIN SUBMIT
  ========================================================== */

  const onSubmit = async (data: FormData) => {

    try {

      setLoading(true);


      const { error } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });


      /* --------------------------------------------------------
         ERROR
      -------------------------------------------------------- */

      if (error) {

        console.error("Login Error:", error);

        toast.error(
          error.message || "Unable to login. Please try again."
        );

        return;
      }


      /* --------------------------------------------------------
         SUCCESS
      -------------------------------------------------------- */

      toast.success("Login Successful");

      router.replace("/dashboard");

      router.refresh();


    } catch (error) {

      console.error("Login Exception:", error);

      toast.error(
        "Something went wrong. Please try again."
      );


    } finally {

      setLoading(false);

    }

  };


  /* ==========================================================
     UI
  ========================================================== */

  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >


      {/* ======================================================
          EMAIL
      ====================================================== */}

      <div>

        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-[#083139]"
        >
          Email Address
        </label>


        <div className="relative">

          {/* Email Icon */}

          <Mail
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />


          {/* Input */}

          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            {...register("email")}
            disabled={loading}
            className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-[#083139] outline-none transition-all placeholder:text-slate-400
              ${
                errors.email
                  ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                  : "border-slate-200 focus:border-[#1FD465] focus:bg-white focus:ring-4 focus:ring-[#1FD465]/10"
              }
              disabled:cursor-not-allowed disabled:opacity-60
            `}
          />

        </div>


        {/* Error */}

        {errors.email && (

          <p className="mt-1.5 text-xs font-medium text-red-500">
            {errors.email.message}
          </p>

        )}

      </div>



      {/* ======================================================
          PASSWORD
      ====================================================== */}

      <div>

        {/* Password Label + Forgot Link */}

        <div className="mb-2 flex items-center justify-between">

          <label
            htmlFor="password"
            className="text-sm font-semibold text-[#083139]"
          >
            Password
          </label>


          {/* ==================================================
              FORGOT PASSWORD
          ================================================== */}

          <Link
            href="/forgot-password"
            className="text-xs font-bold text-[#0dbb67] transition-colors hover:text-[#083139]"
          >
            Forgot Password?
          </Link>

        </div>


        {/* Password Input */}

        <div className="relative">

          {/* Lock Icon */}

          <Lock
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />


          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            {...register("password")}
            disabled={loading}
            className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-12 text-sm text-[#083139] outline-none transition-all placeholder:text-slate-400
              ${
                errors.password
                  ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                  : "border-slate-200 focus:border-[#1FD465] focus:bg-white focus:ring-4 focus:ring-[#1FD465]/10"
              }
              disabled:cursor-not-allowed disabled:opacity-60
            `}
          />


          {/* Show / Hide Password */}

          <button
            type="button"
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
            onClick={() =>
              setShowPassword((value) => !value)
            }
            disabled={loading}
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-[#083139] disabled:opacity-50"
          >

            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}

          </button>

        </div>


        {/* Error */}

        {errors.password && (

          <p className="mt-1.5 text-xs font-medium text-red-500">
            {errors.password.message}
          </p>

        )}

      </div>



      {/* ======================================================
          LOGIN BUTTON
      ====================================================== */}

      <button
        type="submit"
        disabled={loading}
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#083139] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#083139]/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0b4854] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >

        {loading ? (

          <>
            <Loader2
              size={18}
              className="animate-spin"
            />

            Signing In...
          </>

        ) : (

          <>
            Login

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </>

        )}

      </button>



      {/* ======================================================
          SECURITY NOTE
      ====================================================== */}

      <div className="flex items-center justify-center gap-2 pt-1">

        <div className="h-1.5 w-1.5 rounded-full bg-[#1FD465]" />

        <p className="text-xs text-slate-400">
          Your login information is securely protected
        </p>

      </div>

    </form>
  );
}