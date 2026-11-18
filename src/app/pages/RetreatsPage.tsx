import { useState } from "react";
import { MapPin, Calendar, Bell, Send, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

const bgImg =
  "https://images.unsplash.com/photo-1766434773090-bfc6bdbf8b78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjBtb3VudGFpbnMlMjBtaXN0eSUyMHN1bnJpc2UlMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NzI4MjE5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080";

const dreamDestinations = [
  { icon: <MapPin size={16} />, label: "Rishikesh, India" },
  { icon: <MapPin size={16} />, label: "Goa, India" },
  { icon: <MapPin size={16} />, label: "Bali, Indonesia" },
];

export function RetreatsPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Full-screen hero with coming soon overlay */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img
          src={bgImg}
          alt="Mountains"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c2c2c]/70 via-[#2c2c2c]/55 to-[#2c2c2c]/80" />

        <div className="relative text-center text-white max-w-3xl mx-auto px-4 sm:px-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs tracking-widest uppercase px-4 sm:px-5 py-2.5 rounded-full mb-6 sm:mb-8">
            <Sparkles size={13} className="text-[#a8c4a8]" />
            Something beautiful is coming
          </div>

          <h1
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-5xl sm:text-6xl md:text-8xl leading-tight mb-4 sm:mb-6"
          >
            Retreats <br />
            <span className="italic text-[#a8c4a8]">Coming Soon</span>
          </h1>

          <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10 px-2">
            We're currently crafting deeply transformative retreat experiences for you — in the
            mountains, by the coast, and beyond. Sign up to be the very first to know when
            they're ready.
          </p>

          {/* Notify form */}
          {submitted ? (
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-[#a8c4a8]/40 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full">
              <span className="text-[#a8c4a8] text-lg">✓</span>
              <span className="text-xs sm:text-sm tracking-wide">You're on the list — we'll be in touch!</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-5 sm:px-6 py-3 sm:py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#a8c4a8] transition-colors text-sm"
              />
              <button
                type="submit"
                className="px-6 sm:px-7 py-3 sm:py-4 bg-[#5a7a5a] hover:bg-[#4a6a4a] text-white text-sm tracking-widest uppercase rounded-full transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Notify Me <Send size={14} />
              </button>
            </form>
          )}
        </div>

      </section>

      {/* What to expect teaser */}
      <section className="py-16 sm:py-20 md:py-24 bg-[#faf8f5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#5a7a5a] mb-3 sm:mb-4">A Glimpse Ahead</p>
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-4xl sm:text-5xl text-[#2c2c2c]"
          >
            What to <span className="italic text-[#5a7a5a]">Expect</span>
          </h2>
          <p className="text-[#2c2c2c]/60 mt-3 sm:mt-4 max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
            Every retreat will be a thoughtfully curated, intimate experience — small groups, sacred
            locations, and Garima's warm, personalised guidance throughout.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {[
            { emoji: "🧘", title: "Daily Yoga", desc: "Morning asana and evening restorative sessions in breathtaking settings." },
            { emoji: "🌿", title: "Nourishing Meals", desc: "Plant-based, seasonal, and lovingly prepared to fuel your practice." },
            { emoji: "🌬️", title: "Pranayama & Meditation", desc: "Deep breathwork and guided meditations to quiet the mind." },
            { emoji: "🏔️", title: "Sacred Locations", desc: "Carefully chosen destinations with natural beauty and spiritual significance." },
            { emoji: "🤝", title: "Intimate Groups", desc: "Maximum 12 participants for a deeply personal and connected experience." },
            { emoji: "📿", title: "Soulful Rituals", desc: "Evening circles, journalling, sound healing, and sacred ceremonies." },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-[#e5ddd4]/60 rounded-2xl p-6 sm:p-7 text-center">
              <div className="text-3xl mb-3 sm:mb-4">{item.emoji}</div>
              <h3
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="text-xl sm:text-2xl text-[#2c2c2c] mb-2"
              >
                {item.title}
              </h3>
              <p className="text-sm text-[#2c2c2c]/55 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dream destinations teaser */}
      <section className="py-16 sm:py-20 bg-[#e8f0e8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#5a7a5a] mb-3 sm:mb-4">On Our Radar</p>
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-4xl sm:text-5xl text-[#2c2c2c] mb-4 sm:mb-6"
          >
            Dream <span className="italic text-[#5a7a5a]">Destinations</span>
          </h2>
          <p className="text-[#2c2c2c]/60 mb-8 sm:mb-10 leading-relaxed text-sm sm:text-base">
            We're scouting the most beautiful and serene locations for our first retreats.
            Here's where we're dreaming of taking you.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {dreamDestinations.map((d) => (
              <span
                key={d.label}
                className="flex items-center gap-2 bg-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm text-[#5a7a5a] shadow-sm"
              >
                {d.icon} {d.label}
              </span>
            ))}
            <span className="flex items-center gap-2 bg-white/60 border border-dashed border-[#5a7a5a]/40 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm text-[#5a7a5a]/60">
              + More TBA
            </span>
          </div>
        </div>
      </section>

      {/* CTA to explore classes */}
      <section className="py-16 sm:py-20 text-center px-4 sm:px-6 bg-[#faf8f5]">
        <p className="text-[#2c2c2c]/50 text-xs sm:text-sm mb-3">While you wait…</p>
        <h2
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="text-3xl sm:text-4xl text-[#2c2c2c] mb-4"
        >
          Join a <span className="italic text-[#5a7a5a]">Live Class</span> Today
        </h2>
        <p className="text-[#2c2c2c]/60 mb-6 sm:mb-8 max-w-sm mx-auto text-sm leading-relaxed">
          Can't wait for a retreat? Experience Garima's teaching through our online classes
          — available daily from anywhere in the world.
        </p>
        <button
          onClick={() => navigate("/classes")}
          className="px-7 sm:px-8 py-3 sm:py-4 bg-[#5a7a5a] text-white text-sm tracking-widest uppercase rounded-full hover:bg-[#4a6a4a] transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <Bell size={15} /> Explore Classes
        </button>
      </section>
    </div>
  );
}