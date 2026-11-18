import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useScrollReveal } from "../hooks/useScrollReveal";
import aboutImg from "../../imports/WhatsApp_Image_2026-04-15_at_21.02.55.jpeg";

const retreatImg =
  "https://images.unsplash.com/photo-1767327863182-a5395c2db77d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMG1pbmRmdWxuZXNzJTIwY2FsbSUyMHJldHJlYXR8ZW58MXx8fHwxNzcyNjA1Mzk3fDA&ixlib=rb-4.1.0&q=80&w=1080";

const tags = ["RYT 500 Certified", "Yin Yoga Trained", "Meditation Guide", "Pranayama Expert"];

export function About() {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <div
          className={`relative transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
        >
          <img
            src={aboutImg}
            alt="Garima"
            loading="eager"
            className="w-full h-[500px] object-cover rounded-2xl"
          />
          <div className="absolute -bottom-6 -right-6 bg-[#e8f0e8] rounded-2xl px-8 py-6 shadow-xl">
            <p className="text-4xl text-[#5a7a5a] font-semibold">
              10+
            </p>
            <p className="text-xs tracking-widest uppercase text-[#2c2c2c]/60">Years of Teaching</p>
          </div>
        </div>

        {/* Text */}
        <div
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-[#5a7a5a] mb-4">About Garima</p>
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-5xl md:text-6xl text-[#2c2c2c] leading-tight mb-6"
          >
            A Journey of{" "}
            <span className="italic text-[#5a7a5a]">Authentic</span> Practice
          </h2>
          <p className="text-[#2c2c2c]/60 leading-relaxed mb-5">
            Garima's journey with yoga began over a decade ago, leading her to study with
            renowned masters across India. Trained in classical Hatha, Vinyasa, and Yin
            traditions, she weaves ancient teachings into modern life with grace.
          </p>
          <p className="text-[#2c2c2c]/60 leading-relaxed mb-8">
            Her classes are known for their warmth, precision, and transformative depth —
            whether you're stepping onto the mat for the first time or deepening an established
            practice.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-[#e8f0e8] text-[#5a7a5a] text-sm rounded-full tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={() => navigate("/about")}
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-[#5a7a5a] border-b border-[#5a7a5a] pb-1 hover:gap-4 transition-all cursor-pointer"
          >
            Read Full Story <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}