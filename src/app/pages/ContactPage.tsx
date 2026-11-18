import { useState } from "react";
import { Mail, Instagram, Facebook, Youtube, MapPin, Clock, Send } from "lucide-react";

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 bg-[#e8f0e8] text-center px-6">
        <p className="text-sm tracking-[0.3em] uppercase text-[#5a7a5a] mb-4">Reach Out</p>
        <h1
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="text-6xl md:text-7xl text-[#2c2c2c] mb-4"
        >
          Get in <span className="italic text-[#5a7a5a]">Touch</span>
        </h1>
        <p className="text-[#2c2c2c]/60 max-w-md mx-auto">
          Whether you have a question about classes, retreats, or just want to say hello — I'd love
          to hear from you.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16">
        {/* Info */}
        <div>
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-4xl text-[#2c2c2c] mb-6"
          >
            Let's <span className="italic text-[#5a7a5a]">Connect</span>
          </h2>
          <p className="text-[#2c2c2c]/60 leading-relaxed mb-10">
            I personally read and respond to every message. Expect a reply within 24–48 hours. For
            urgent inquiries, Instagram DMs are the fastest way to reach me.
          </p>

          <div className="flex flex-col gap-6 mb-12">
            {[
              { icon: <Mail size={18} />, label: "Email", value: "yogawithgarima@gmail.com" },
              { icon: <MapPin size={18} />, label: "Location", value: "India & Online Worldwide" },
              { icon: <Clock size={18} />, label: "Response Time", value: "Within 24–48 hours" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#e8f0e8] text-[#5a7a5a] shrink-0">{item.icon}</div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-[#2c2c2c]/40 mb-1">{item.label}</p>
                  <p className="text-[#2c2c2c]/80">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase text-[#2c2c2c]/40 mb-4">Follow Along</p>
            <div className="flex gap-4">
              {[
                { icon: <Instagram size={20} />, label: "@yogawithgarima" },
                { icon: <Facebook size={20} />, label: "Yoga with Garima" },
                { icon: <Youtube size={20} />, label: "Yoga with Garima" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="p-3 rounded-full bg-[#e8f0e8] text-[#5a7a5a] hover:bg-[#5a7a5a] hover:text-white transition-colors"
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-[#e5ddd4]/50">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-6 py-16">
              <div className="w-16 h-16 rounded-full bg-[#e8f0e8] flex items-center justify-center text-[#5a7a5a] text-2xl">
                ✓
              </div>
              <h3
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="text-4xl text-[#2c2c2c]"
              >
                Message Sent!
              </h3>
              <p className="text-[#2c2c2c]/60 max-w-xs">
                Thank you for reaching out. Garima will get back to you within 24–48 hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                className="text-sm text-[#5a7a5a] underline underline-offset-4 cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <h3
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="text-3xl text-[#2c2c2c] mb-2"
              >
                Send a Message
              </h3>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-[#2c2c2c]/50">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="px-4 py-3 rounded-xl border border-[#e5ddd4] bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] text-[#2c2c2c] placeholder:text-[#2c2c2c]/30 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-[#2c2c2c]/50">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="px-4 py-3 rounded-xl border border-[#e5ddd4] bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] text-[#2c2c2c] placeholder:text-[#2c2c2c]/30 transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs tracking-widest uppercase text-[#2c2c2c]/50">Subject</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                  className="px-4 py-3 rounded-xl border border-[#e5ddd4] bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] text-[#2c2c2c] transition-colors"
                >
                  <option value="">Select a topic…</option>
                  <option>Class Enquiry</option>
                  <option>Retreat Booking</option>
                  <option>Private Session</option>
                  <option>Corporate Wellness</option>
                  <option>Something Else</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs tracking-widest uppercase text-[#2c2c2c]/50">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me how I can help…"
                  className="px-4 py-3 rounded-xl border border-[#e5ddd4] bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] text-[#2c2c2c] placeholder:text-[#2c2c2c]/30 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-[#5a7a5a] text-white text-sm tracking-widest uppercase rounded-full hover:bg-[#4a6a4a] transition-all flex items-center justify-center gap-2"
              >
                Send Message <Send size={15} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}