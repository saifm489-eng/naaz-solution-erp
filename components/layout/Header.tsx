export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold text-[#083139]">
            Naaz Solution
          </h1>

          <p className="text-xs text-gray-500">
            Rajasthan e-Mitra • CSC • AI Services
          </p>
        </div>

        <nav className="hidden gap-8 md:flex">
          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">AI Tools</a>
          <a href="#">Contact</a>
        </nav>

        <a
          href="https://wa.me/918005707575"
          className="rounded-xl bg-[#1FD465] px-5 py-2 font-semibold text-white"
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}