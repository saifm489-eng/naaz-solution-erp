"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Check,
  X,
  Loader2,
  ArrowRight,
} from "lucide-react";

import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";


/* ============================================================
   VALIDATION
============================================================ */

const schema = z
  .object({

    fullName: z
      .string()
      .min(2, "Please enter your full name."),

    email: z
      .string()
      .min(1, "Email is required.")
      .email("Please enter a valid email."),

    mobile: z
      .string()
      .min(10, "Please enter a valid mobile number.")
      .max(10, "Please enter a valid mobile number.")
      .regex(/^[0-9]+$/, "Mobile number must contain only digits."),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters."),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password."),

  })

  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    }
  );


type FormData = z.infer<typeof schema>;


/* ============================================================
   COMPONENT
============================================================ */

export default function RegisterForm() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [passwordValue, setPasswordValue] =
    useState("");


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),

    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    },
  });


  /* ==========================================================
     PASSWORD CHECKS
  ========================================================== */

  const passwordChecks = {

    length: passwordValue.length >= 8,

    uppercase: /[A-Z]/.test(passwordValue),

    lowercase: /[a-z]/.test(passwordValue),

    number: /[0-9]/.test(passwordValue),

  };


  const passwordScore =
    Object.values(passwordChecks).filter(Boolean).length;


  /* ==========================================================
     SUBMIT
  ========================================================== */

  const onSubmit = async (data: FormData) => {

    try {

      setLoading(true);


      /* ------------------------------------------------------
         SUPABASE SIGN UP
      ------------------------------------------------------ */

      const {
        data: authData,
        error,
      } = await supabase.auth.signUp({

        email: data.email,

        password: data.password,

        options: {

          data: {

            full_name: data.fullName,

            mobile: data.mobile,

          },

        },

      });


      /* ------------------------------------------------------
         ERROR
      ------------------------------------------------------ */

      if (error) {

        console.error(
          "Registration Error:",
          error
        );

        toast.error(
          error.message ||
          "Unable to create account."
        );

        return;
      }


      /* ------------------------------------------------------
         SUCCESS
      ------------------------------------------------------ */

      console.log(
        "Registration Data:",
        authData
      );


      toast.success(
        "Account created successfully!"
      );


      /*
       * Supabase may require email confirmation.
       */

      if (!authData.session) {

        toast.success(
          "Please check your email to verify your account."
        );

        router.push("/login");

        return;
      }


      router.replace("/dashboard");

      router.refresh();


    } catch (error) {

      console.error(
        "Registration Exception:",
        error
      );

      toast.error(
        "Something went wrong. Please try again."
      );


    } finally {

      setLoading(false);

    }

  };


  /* ==========================================================
     INPUT CLASS
  ========================================================== */

  const inputClass = (
    hasError: boolean
  ) => `
    w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-4
    text-sm text-[#083139] outline-none transition-all
    placeholder:text-slate-400
    ${
      hasError
        ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
        : "border-slate-200 focus:border-[#1FD465] focus:bg-white focus:ring-4 focus:ring-[#1FD465]/10"
    }
    disabled:cursor-not-allowed disabled:opacity-60
  `;


  /* ==========================================================
     UI
  ========================================================== */

  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >


      {/* ======================================================
          FULL NAME
      ====================================================== */}

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
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />


          <input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            autoComplete="name"
            {...register("fullName")}
            disabled={loading}
            className={inputClass(
              !!errors.fullName
            )}
          />

        </div>


        {errors.fullName && (

          <p className="mt-1.5 text-xs font-medium text-red-500">
            {errors.fullName.message}
          </p>

        )}

      </div>



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

          <Mail
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />


          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            {...register("email")}
            disabled={loading}
            className={inputClass(
              !!errors.email
            )}
          />

        </div>


        {errors.email && (

          <p className="mt-1.5 text-xs font-medium text-red-500">
            {errors.email.message}
          </p>

        )}

      </div>



      {/* ======================================================
          MOBILE
      ====================================================== */}

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
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />


          <input
            id="mobile"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="Enter 10-digit mobile number"
            autoComplete="tel"
            {...register("mobile")}
            disabled={loading}
            className={inputClass(
              !!errors.mobile
            )}
          />

        </div>


        {errors.mobile && (

          <p className="mt-1.5 text-xs font-medium text-red-500">
            {errors.mobile.message}
          </p>

        )}

      </div>



      {/* ======================================================
          PASSWORD
      ====================================================== */}

      <div>

        <div className="mb-2 flex items-center justify-between">

          <label
            htmlFor="password"
            className="text-sm font-semibold text-[#083139]"
          >
            Password
          </label>

          <span className="text-xs text-slate-400">
            Min. 8 characters
          </span>

        </div>


        <div className="relative">

          <Lock
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />


          <input
            id="password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Create a strong password"
            autoComplete="new-password"
            {...register("password", {

              onChange: (event) => {

                setPasswordValue(
                  event.target.value
                );

              },

            })}
            disabled={loading}
            className={inputClass(
              !!errors.password
            )}
          />


          <button
            type="button"
            onClick={() =>
              setShowPassword(
                (value) => !value
              )
            }
            disabled={loading}
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-[#083139]"
          >

            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}

          </button>

        </div>


        {/* Password Strength */}

        {passwordValue.length > 0 && (

          <div className="mt-3">

            <div className="mb-2 flex gap-1">

              {[1, 2, 3, 4].map(
                (level) => (

                  <div
                    key={level}
                    className={`h-1.5 flex-1 rounded-full transition ${
                      passwordScore >= level
                        ? "bg-[#1FD465]"
                        : "bg-slate-200"
                    }`}
                  />

                )
              )}

            </div>


            <div className="grid grid-cols-2 gap-x-3 gap-y-1">

              <PasswordCheck
                valid={
                  passwordChecks.length
                }
                text="8+ characters"
              />

              <PasswordCheck
                valid={
                  passwordChecks.uppercase
                }
                text="Uppercase letter"
              />

              <PasswordCheck
                valid={
                  passwordChecks.lowercase
                }
                text="Lowercase letter"
              />

              <PasswordCheck
                valid={
                  passwordChecks.number
                }
                text="Number"
              />

            </div>

          </div>

        )}


        {errors.password && (

          <p className="mt-1.5 text-xs font-medium text-red-500">
            {errors.password.message}
          </p>

        )}

      </div>



      {/* ======================================================
          CONFIRM PASSWORD
      ====================================================== */}

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
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />


          <input
            id="confirmPassword"
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Re-enter your password"
            autoComplete="new-password"
            {...register("confirmPassword")}
            disabled={loading}
            className={inputClass(
              !!errors.confirmPassword
            )}
          />


          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                (value) => !value
              )
            }
            disabled={loading}
            aria-label={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-[#083139]"
          >

            {showConfirmPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}

          </button>

        </div>


        {errors.confirmPassword && (

          <p className="mt-1.5 text-xs font-medium text-red-500">
            {errors.confirmPassword.message}
          </p>

        )}

      </div>



      {/* ======================================================
          TERMS
      ====================================================== */}

      <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">

        <div className="flex items-start gap-3">

          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#1FD465]/10">

            <Check
              size={13}
              className="text-[#0dbb67]"
            />

          </div>


          <p className="text-xs leading-5 text-slate-500">

            By creating an account, you agree to our{" "}

            <Link
              href="/terms"
              className="font-semibold text-[#083139] hover:text-[#0dbb67]"
            >
              Terms & Conditions
            </Link>

            {" "}and{" "}

            <Link
              href="/privacy"
              className="font-semibold text-[#083139] hover:text-[#0dbb67]"
            >
              Privacy Policy
            </Link>

            .

          </p>

        </div>

      </div>



      {/* ======================================================
          CREATE ACCOUNT BUTTON
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

            Creating Account...
          </>

        ) : (

          <>
            Create Account

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </>

        )}

      </button>


      {/* ======================================================
          LOGIN LINK
      ====================================================== */}

      <div className="pt-1 text-center">

        <p className="text-sm text-slate-500">

          Already registered?{" "}

          <Link
            href="/login"
            className="font-bold text-[#0dbb67] transition hover:text-[#083139]"
          >
            Sign In
          </Link>

        </p>

      </div>

    </form>
  );
}


/* ===============================================================
   PASSWORD CHECK
================================================================ */

function PasswordCheck({
  valid,
  text,
}: {
  valid: boolean;
  text: string;
}) {
  return (

    <div className="flex items-center gap-1.5">

      {valid ? (

        <Check
          size={13}
          className="text-[#0dbb67]"
        />

      ) : (

        <X
          size={13}
          className="text-slate-300"
        />

      )}

      <span
        className={
          valid
            ? "text-[11px] text-[#0dbb67]"
            : "text-[11px] text-slate-400"
        }
      >
        {text}
      </span>

    </div>
  );
}