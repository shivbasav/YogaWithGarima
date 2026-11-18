import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { ref, isVisible } = useScrollReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      ref={ref}
      className={`py-24 max-w-4xl mx-auto px-6 text-center transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <p className="text-sm tracking-[0.3em] uppercase text-[#5a7a5a] mb-4">Stay Connected</p>
      <h2
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
        className="text-5xl md:text-6xl text-[#2c2c2c] mb-6"
      >
        Join the <span className="italic text-[#5a7a5a]">Community</span>
      </h2>
      <p className="text-[#2c2c2c]/60 mb-10 max-w-xl mx-auto leading-relaxed">
        Receive weekly yoga tips, free guided meditations, retreat announcements, and soulful
        inspiration — straight to your inbox.
      </p>

      {submitted ? (
        <div className="inline-flex items-center gap-3 px-8 py-4 bg-[#e8f0e8] text-[#5a7a5a] rounded-full">
          <span>✓</span>
          <span className="text-sm tracking-wide">Thank you! You're on the list.</span>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1 px-6 py-4 rounded-full border border-[#e5ddd4] bg-white text-[#2c2c2c] placeholder:text-[#2c2c2c]/40 focus:outline-none focus:border-[#5a7a5a] transition-colors"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-[#5a7a5a] text-white text-sm tracking-widest uppercase rounded-full hover:bg-[#4a6a4a] transition-all whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
}