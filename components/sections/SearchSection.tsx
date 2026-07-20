import { Search } from "lucide-react";

export default function SearchSection() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex items-center rounded-2xl border bg-white p-2 shadow-lg">
          <Search className="ml-3 text-gray-500" size={22} />

          <input
            className="w-full bg-transparent px-4 py-3 outline-none"
            placeholder="Search e-Mitra, PAN Card, Income Certificate..."
          />

          <button className="rounded-xl bg-[#1FD465] px-6 py-3 font-semibold text-white">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}