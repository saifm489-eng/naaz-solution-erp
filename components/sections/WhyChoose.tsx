export default function WhyChoose() {
  const items = [
    "Trusted Rajasthan e-Mitra & CSC Centre",
    "Fast Online Application Process",
    "AI Powered Digital Services",
    "Experienced Support Team",
  ];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-8 text-4xl font-bold">
          Why Choose Naaz Solution?
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              ✅ {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}