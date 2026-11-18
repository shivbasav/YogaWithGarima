import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const faqs = [
  {
    q: "Do I need prior experience to join?",
    a: "Not at all! Garima welcomes students of all levels, from complete beginners to seasoned practitioners. Every class offers modifications.",
  },
  {
    q: "What do I need for online classes?",
    a: "A yoga mat, comfortable clothing, and a stable internet connection. Props like blocks and a blanket are helpful but not required.",
  },
  {
    q: "How do I book a class?",
    a: "Simply click the 'Book a Class' button, choose your preferred session, and complete the simple registration process.",
  },
  {
    q: "Are classes available on-demand?",
    a: "Yes! All live sessions are recorded and made available to registered students within 24 hours, so you can practice at your own pace.",
  },
];

export function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 bg-[#e8f0e8]">
      <div className="max-w-3xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-[#5a7a5a] mb-4">Questions</p>
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-5xl md:text-6xl text-[#2c2c2c]"
          >
            Frequently <span className="italic text-[#5a7a5a]">Asked</span>
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl overflow-hidden transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <button
                className="w-full flex items-center justify-between px-8 py-6 text-left cursor-pointer"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="text-[#2c2c2c] pr-4">{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`text-[#5a7a5a] shrink-0 transition-transform duration-300 ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="px-8 pb-6 text-[#2c2c2c]/60 leading-relaxed">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}