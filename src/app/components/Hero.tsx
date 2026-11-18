import { ArrowRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { BookingModal } from "./BookingModal";
import heroImg from "../../imports/WhatsApp_Image_2026-04-15_at_21.02.56_(2).jpeg";

const stats = [
  ["1000+", "Students"],
  ["10+", "Years"],
];

export function Hero() {
  const navigate = useNavigate();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Yoga" loading="eager" className="w-full h-full object-cover object-[center_35%] md:object-right" />
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#faf8f5]/90 from-0% via-[#faf8f5]/40 via-50% to-transparent md:from-[#faf8f5]/95 md:via-[#faf8f5]/50 md:via-40% md:to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-[#5a7a5a] mb-4">Welcome to</p>
            <h1
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-6xl md:text-7xl lg:text-8xl text-[#2c2c2c] leading-[1.1] mb-6"
            >
              Find Your <br />
              <span className="italic text-[#5a7a5a]">Inner Peace</span>
            </h1>
            <p className="text-lg text-[#2c2c2c]/60 leading-relaxed max-w-md mb-10">
              Join Garima on a transformative journey through authentic yoga practice — blending
              ancient wisdom with modern living for a life of balance, strength, and serenity.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setBookingModalOpen(true)}
                className="px-8 py-4 bg-[#5a7a5a] text-white text-sm tracking-widest uppercase rounded-full hover:bg-[#4a6a4a] transition-all hover:shadow-lg cursor-pointer"
              >
                Book a Class
              </button>
              <button
                onClick={() => navigate("/about")}
                className="px-8 py-4 border border-[#5a7a5a] text-[#5a7a5a] text-sm tracking-widest uppercase rounded-full hover:bg-[#5a7a5a]/10 transition-all flex items-center gap-2 cursor-pointer"
              >
                About Garima <ArrowRight size={16} />
              </button>
            </div>

            <div className="mt-14 flex gap-10">
              {stats.map(([num, label]) => (
                <div key={label}>
                  <p className="text-4xl text-[#5a7a5a] font-semibold">
                    {num}
                  </p>
                  <p className="text-xs tracking-widest uppercase text-[#2c2c2c]/50">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#2c2c2c]/40">
          <p className="text-xs tracking-widest uppercase">Scroll</p>
          <ChevronDown size={20} className="animate-bounce" />
        </div>
      </section>

      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </>
  );
}