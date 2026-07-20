export default function Stats() {
  const stats = [
    ["10,000+", "Applications"],
    ["500+", "Customers"],
    ["100+", "Services"],
    ["24/7", "Support"],
  ];

  return (
    <section className="bg-[#083139] py-20 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 text-center md:grid-cols-4">
        {stats.map(([value, label]) => (
          <div key={label}>
            <h2 className="text-5xl font-bold">{value}</h2>
            <p className="mt-2 opacity-80">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}