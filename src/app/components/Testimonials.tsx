import { Star } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const testimonials = [
  {
    name: "Priya S.",
    role: "Student since 2022",
    img: "https://images.unsplash.com/photo-1580746453801-37b0bc56f3b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHBvcnRyYWl0JTIwc21pbGV8ZW58MXx8fHwxNzcyNjA2MzM3fDA&ixlib=rb-4.1.0&q=80&w=400",
    text: "Garima's classes have completely transformed my relationship with my body and mind. Her gentle guidance and deep knowledge make every session profoundly healing.",
    stars: 5,
    platform: "google",
  },
  {
    name: "Ananya M.",
    role: "Student since 2021",
    img: "https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwaGVhZHNob3QlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcyNTU3MjIxfDA&ixlib=rb-4.1.0&q=80&w=400",
    text: "I've tried many yoga teachers but Garima's approach is unique. She truly sees each student and tailors her cues beautifully. Life-changing!",
    stars: 5,
    platform: "facebook",
  },
  {
    name: "Rachel T.",
    role: "Retreat participant",
    img: "https://images.unsplash.com/photo-1565611948073-cb0dd26f233b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwbmF0dXJhbCUyMGxpZ2h0JTIwaGFwcHl8ZW58MXx8fHwxNzcyNjA2MzM4fDA&ixlib=rb-4.1.0&q=80&w=400",
    text: "The online retreat was everything I needed. Peaceful, structured, and deeply nourishing. I return to the recordings again and again.",
    stars: 5,
    platform: "google",
  },
];

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export function Testimonials() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 max-w-7xl mx-auto px-6">
      <div
        className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <p className="text-sm tracking-[0.3em] uppercase text-[#5a7a5a] mb-4">Kind Words</p>
        <h2
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="text-5xl md:text-6xl text-[#2c2c2c]"
        >
          Student <span className="italic text-[#5a7a5a]">Stories</span>
        </h2>
        <p className="text-[#2c2c2c]/60 mt-4 max-w-2xl mx-auto">
          Read what our students have to say on Google and Facebook
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <div
            key={t.name}
            className={`bg-[#f2ede8] rounded-2xl p-8 flex flex-col transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${200 + index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} size={16} className="fill-[#c4a882] text-[#c4a882]" />
                ))}
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full shadow-sm">
                {t.platform === "google" ? <GoogleIcon /> : <FacebookIcon />}
                <span className="text-xs font-medium text-[#2c2c2c]/70">
                  {t.platform === "google" ? "Google" : "Facebook"}
                </span>
              </div>
            </div>
            <p className="text-[#2c2c2c]/70 leading-relaxed mb-8 italic flex-1">"{t.text}"</p>
            <div className="flex items-center gap-4">
              <img
                src={t.img}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover object-top border-2 border-[#5a7a5a]/20"
              />
              <div>
                <p className="text-sm text-[#2c2c2c]">{t.name}</p>
                <p className="text-xs text-[#5a7a5a] tracking-wide">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review CTA */}
      <div
        className={`mt-16 text-center transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="bg-[#e8f0e8] rounded-3xl p-10 max-w-3xl mx-auto">
          <h3
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-3xl text-[#2c2c2c] mb-4"
          >
            Share Your <span className="italic text-[#5a7a5a]">Experience</span>
          </h3>
          <p className="text-[#2c2c2c]/60 mb-8">
            Have you taken a class with Garima? We'd love to hear about your journey!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.google.com/search?q=yoga+with+garima"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#2c2c2c] text-sm tracking-wide rounded-full hover:shadow-lg transition-all border border-[#e5ddd4]"
            >
              <GoogleIcon />
              <span>Review on Google</span>
            </a>
            <a
              href="https://www.facebook.com/yogawithgarima"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#2c2c2c] text-sm tracking-wide rounded-full hover:shadow-lg transition-all border border-[#e5ddd4]"
            >
              <FacebookIcon />
              <span>Review on Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}