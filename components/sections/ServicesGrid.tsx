import {
  Globe,
  CreditCard,
  Bot,
  Train,
  Laptop,
  ShieldCheck,
} from "lucide-react";

const services = [
  { title: "Website Design", icon: Globe },
  { title: "PVC Card Printing", icon: CreditCard },
  { title: "AI Tools", icon: Bot },
  { title: "IRCTC Booking", icon: Train },
  { title: "Computer Courses", icon: Laptop },
  { title: "CSC Services", icon: ShieldCheck },
];

export default function ServicesGrid() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-center text-4xl font-bold">
          Our Premium Services
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-xl"
            >
              <item.icon className="mb-5 text-[#1FD465]" size={40} />
              <h3 className="text-xl font-semibold">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}