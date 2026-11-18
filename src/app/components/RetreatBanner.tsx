import { useNavigate } from "react-router";
import { Sparkles } from "lucide-react";

const outdoorImg =
  "https://images.unsplash.com/photo-1707257969667-68804d47f5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwb3V0ZG9vciUyMG5hdHVyZSUyMHN1bnJpc2V8ZW58MXx8fHwxNzcyNjA1Mzk2fDA&ixlib=rb-4.1.0&q=80&w=1080";

export function RetreatBanner() {
  const navigate = useNavigate();
  return (
    <section className="relative py-32 overflow-hidden">
      <img src={outdoorImg} alt="Retreat" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[#2c2c2c]/60" />
      <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs tracking-widest uppercase px-5 py-2.5 rounded-full mb-6">
          <Sparkles size={13} className="text-[#a8c4a8]" />
          Coming Soon
        </div>
        <h2
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="text-5xl md:text-7xl leading-tight mb-6"
        >
          Transformative <span className="italic text-[#a8c4a8]">Yoga Retreats</span>
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          We're crafting deeply immersive retreat experiences in sacred locations around the world. 
          Join the journey as we explore the Himalayas, coastal sanctuaries, and beyond.
        </p>
        <button
          onClick={() => navigate("/retreats")}
          className="px-10 py-4 bg-white text-[#5a7a5a] text-sm tracking-widest uppercase rounded-full hover:bg-[#e8f0e8] transition-all cursor-pointer"
        >
          Notify Me
        </button>
      </div>
    </section>
  );
}