import { Instagram } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const gallery = [
  "https://images.unsplash.com/photo-1761034114091-6d30447e25aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwY2xhc3MlMjBncm91cCUyMHByYWN0aWNlJTIwc3R1ZGlvfGVufDF8fHx8MTc3MjgwMTcyNXww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1758274539654-23fa349cc090?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMHBlYWNlZnVsJTIwd29tYW58ZW58MXx8fHwxNzcyODM1NTY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1657203214371-39d4088f71a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwcG9zZSUyMG91dGRvb3JzJTIwbmF0dXJlfGVufDF8fHx8MTc3Mjg2OTAwNXww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1758797316117-8d133af25f8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwcmV0cmVhdCUyMG1vdW50YWlucyUyMHBlYWNlZnVsfGVufDF8fHx8MTc3Mjg2OTAwNXww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1767611128717-3ae036c56d93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwc3R1ZGlvJTIwY2FsbSUyMGludGVyaW9yfGVufDF8fHx8MTc3Mjg2OTAwNnww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1707257969667-68804d47f5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwcHJhY3RpY2UlMjBzdW5yaXNlJTIwbW9ybmluZ3xlbnwxfHx8fDE3NzI4NjkwMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
];

export function InstagramGallery() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div 
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-[#5a7a5a] mb-4">Follow Along</p>
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-5xl md:text-6xl text-[#2c2c2c] mb-4"
          >
            On <span className="italic text-[#5a7a5a]">Instagram</span>
          </h2>
          <a
            href="https://instagram.com/yogawithgarima"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#5a7a5a] hover:text-[#4a6a4a] tracking-wide transition-colors"
          >
            <Instagram size={18} />
            @yogawithgarima
          </a>
        </div>

        <div 
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {gallery.map((img, i) => (
            <a
              key={i}
              href="https://instagram.com/yogawithgarima"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg"
              style={{ transitionDelay: `${300 + i * 50}ms` }}
            >
              <img
                src={img}
                alt={`Instagram post ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#5a7a5a]/0 group-hover:bg-[#5a7a5a]/20 transition-all duration-300 flex items-center justify-center">
                <Instagram 
                  size={24} 
                  className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" 
                />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://instagram.com/yogawithgarima"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white text-sm tracking-widest uppercase rounded-full hover:shadow-lg transition-all"
          >
            <Instagram size={16} /> Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
