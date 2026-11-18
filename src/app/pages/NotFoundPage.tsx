import { useNavigate } from "react-router";
import { Home, ArrowLeft } from "lucide-react";

const meditationImg = "https://images.unsplash.com/photo-1545389336-cf090694435e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwcGVhY2VmdWwlMjBzZXJlbmUlMjBtZWRpdGF0aW9ufGVufDF8fHx8MTc3MjYwNTM5NHww&ixlib=rb-4.1.0&q=80&w=1080";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <img
        src={meditationImg}
        alt="Peaceful meditation"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[#2c2c2c]/70 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 py-20 max-w-2xl mx-auto">
        <p className="text-[#a8c4a8] text-sm tracking-[0.3em] uppercase mb-4">
          Lost on the path?
        </p>
        <h1
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="text-7xl md:text-8xl mb-6 leading-tight"
        >
          404
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-4 leading-relaxed">
          This page doesn't exist
        </p>
        <p className="text-white/60 text-sm leading-relaxed max-w-md mx-auto mb-10">
          Sometimes we wander off the mat. That's okay — let's gently guide you back to where you
          need to be.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm tracking-widest uppercase rounded-full hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-[#5a7a5a] text-white text-sm tracking-widest uppercase rounded-full hover:bg-[#4a6a4a] transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home size={16} /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}