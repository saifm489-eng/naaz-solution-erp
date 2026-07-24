"use client";

import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  Send,
} from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4">

        {/* Heading */}
        <div className="mb-16 text-center">
          <span className="rounded-full bg-[#1FD465]/10 px-4 py-2 text-sm font-semibold text-[#1FD465]">
            Contact Us
          </span>

          <h2 className="mt-5 text-4xl font-bold text-[#083139] md:text-5xl">
            Let's Connect
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Need help with e-Mitra, CSC, AI tools or website development?
            Contact our team today.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* Left */}
          <div className="space-y-6">

            <div className="flex gap-4 rounded-2xl bg-white p-6 shadow">
              <MapPin className="text-[#1FD465]" />
              <div>
                <h3 className="font-semibold text-[#083139]">Office Address</h3>
                <p className="text-slate-600">
                  In Front of Amar Singh Mill,
                  Dhakad Putha,
                  Hindaun City,
                  Rajasthan - 322230
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl bg-white p-6 shadow">
              <Phone className="text-[#1FD465]" />
              <div>
                <h3 className="font-semibold text-[#083139]">Phone / WhatsApp</h3>
                <a
                  href="tel:+918005707575"
                  className="text-slate-600 hover:text-[#1FD465]"
                >
                  +91 8005707575
                </a>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl bg-white p-6 shadow">
              <Mail className="text-[#1FD465]" />
              <div>
                <h3 className="font-semibold text-[#083139]">Email</h3>
                <a
                  href="mailto:helpdesk@naazsolution.hindaun.co.in"
                  className="text-slate-600 hover:text-[#1FD465]"
                >
                  helpdesk@naazsolution.hindaun.co.in
                </a>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl bg-white p-6 shadow">
              <Clock3 className="text-[#1FD465]" />
              <div>
                <h3 className="font-semibold text-[#083139]">Working Hours</h3>
                <p className="text-slate-600">
                  Monday - Saturday
                  <br />
                  09:00 AM – 07:00 PM
                </p>
              </div>
            </div>

          </div>

          {/* Right */}
          <div className="rounded-3xl bg-white p-8 shadow">

            <h3 className="mb-6 text-2xl font-bold text-[#083139]">
              Send a Message
            </h3>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-xl border p-4 outline-none focus:border-[#1FD465]"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl border p-4 outline-none focus:border-[#1FD465]"
              />

              <input
                type="tel"
                placeholder="Mobile Number"
                className="w-full rounded-xl border p-4 outline-none focus:border-[#1FD465]"
              />

              <textarea
                rows={5}
                placeholder="How can we help you?"
                className="w-full rounded-xl border p-4 outline-none focus:border-[#1FD465]"
              />

              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-[#1FD465] px-8 py-4 font-semibold text-[#083139] transition hover:scale-105"
              >
                <Send size={18} />
                Send Message
              </button>

            </form>

          </div>

        </div>

        {/* Google Map */}

        <div className="mt-16 overflow-hidden rounded-3xl shadow-lg">

          <iframe
            title="Naaz Solution Location"
            src="https://www.google.com/maps?q=Hindaun+City+Rajasthan&output=embed"
            width="100%"
            height="450"
            loading="lazy"
            className="border-0"
          />

        </div>

      </div>
    </section>
  );
}