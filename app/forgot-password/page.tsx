import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-4xl font-bold text-[#083139]">
          Forgot Password
        </h1>

        <p className="mb-8 text-gray-500">
          Enter your email to receive a password reset link.
        </p>

        <ForgotPasswordForm />
      </div>
    </main>
  );
}