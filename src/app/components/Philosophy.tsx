import { Leaf, Heart, Sun } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const items = [
  {
    icon: <Leaf size={28} />,
    title: "Rooted in Tradition",
    desc: "Classical Hatha lineage with a contemporary, accessible approach.",
  },
  {
    icon: <Heart size={28} />,
    title: "Heart-Led Teaching",
    desc: "Every class is held with compassion, presence, and deep care.",
  },
  {
    icon: <Sun size={28} />,
    title: "Holistic Wellness",
    desc: "Blending asana, pranayama, and meditation for whole-body balance.",
  },
];

export function Philosophy() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="bg-[#5a7a5a] py-14">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-white">
        {items.map((item, index) => (
          <div 
            key={item.title} 
            className={`flex flex-col items-center text-center gap-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="p-4 rounded-full bg-white/10">{item.icon}</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl">
              {item.title}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}