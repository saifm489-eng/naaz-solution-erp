import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-lg rounded-3xl bg-white p-10 shadow-xl">
        <h1 className="mb-2 text-4xl font-bold text-[#083139]">
          Create Account
        </h1>

        <p className="mb-8 text-gray-500">
          Join Naaz Solution ERP
        </p>

        <RegisterForm />
      </div>
    </main>
  );
}