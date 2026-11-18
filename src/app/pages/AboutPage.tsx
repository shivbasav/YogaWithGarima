import { ArrowRight, Award, BookOpen, Globe, Users, Presentation, MapPin, Calendar } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { BookingModal } from "../components/BookingModal";
import retreatImg from "../../imports/WhatsApp_Image_2026-04-15_at_21.02.56_(1).jpeg";
const poseImg =
  "https://images.unsplash.com/photo-1758599879647-8420b108cfae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwcG9zZSUyMHdhcnJpb3IlMjBmbGV4aWJpbGl0eXxlbnwxfHx8fDE3NzI2MDUzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080";

const certifications = [
  {
    title: "RYT 200 – Ashtanga Yoga",
    school: "Abhijna School, Kerala",
    year: "2015",
  },
  {
    title: "RYT 200 – Hatha & Vinyasa Yoga",
    school: "Trimurti Yoga, Goa",
    year: "2018",
  },
  {
    title: "Diploma in Dance & Movement Therapy",
    school: "Sancheti Hospital, Pune (in affiliation with Kinections, New York, USA)",
    year: "2020",
  },
  {
    title: "Restorative Yoga & Yoga Therapy Training",
    school: "Grace Yoga, California",
    year: "2021",
  },
  {
    title: "Ashtanga Yoga Immersion Course",
    school: "Purna Yoga, Bali",
    year: "2022",
  },
  {
    title: "Functional Fitness",
    school: "Professional Training",
    year: "2022",
  },
  {
    title: "Certification in Nutritional Sciences",
    school: "Institute of Nutrition and Fitness Sciences",
    year: "In Progress (Expected 2027)",
    inProgress: true,
  },
];

const workshops = [
  {
    title: "Corporate Wellness at TCS Mumbai",
    location: "Mumbai, India",
    date: "Feb 2026",
    attendees: "120+ employees",
    type: "Corporate",
    image: "https://images.unsplash.com/photo-1551649081-716ed4a46706?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjB5b2dhJTIwd2VsbG5lc3MlMjBjbGFzc3xlbnwxfHx8fDE3NzMyMDk1NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "A transformative two-day wellness program designed for TCS employees, focusing on stress management through yoga, mindfulness, and breathwork techniques. The sessions helped participants build sustainable daily practices for better work-life balance.",
  },
  {
    title: "Himalayan Yoga Retreat",
    location: "Rishikesh, India",
    date: "Jan 2026",
    attendees: "25 participants",
    type: "Retreat",
    image: "https://images.unsplash.com/photo-1758797315311-07c928608c04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjB5b2dhJTIwcmV0cmVhdCUyMG1vdW50YWluc3xlbnwxfHx8fDE3NzMxMzMwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "A week-long immersive retreat in the foothills of the Himalayas, combining daily asana practice, meditation, pranayama, and spiritual teachings. Participants experienced deep transformation in the birthplace of yoga.",
  },
  {
    title: "Women's Wellness Workshop",
    location: "Online",
    date: "Dec 2025",
    attendees: "80+ students",
    type: "Online",
    image: "https://images.unsplash.com/photo-1602827114685-efbb2717da9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHlvZ2ElMjB3b3Jrc2hvcCUyMGdyb3VwfGVufDF8fHx8MTc3MzIwOTU0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "A holistic workshop celebrating women's health through yoga and Ayurvedic wisdom. Topics included hormonal balance, moon cycle practices, restorative yoga for stress relief, and building a supportive sisterhood community.",
  },
  {
    title: "Advanced Pranayama Intensive",
    location: "Bangalore, India",
    date: "Nov 2025",
    attendees: "35 students",
    type: "Workshop",
    image: "https://images.unsplash.com/photo-1758599879787-03999f72d994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmFuYXlhbWElMjBicmVhdGhpbmclMjBtZWRpdGF0aW9uJTIwcHJhY3RpY2V8ZW58MXx8fHwxNzczMjA5NTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "An intensive weekend exploring classical pranayama techniques including Nadi Shodhana, Kapalabhati, Bhastrika, and Bhramari. Students learned to harness the power of breath for energy regulation and nervous system healing.",
  },
  {
    title: "Corporate Wellness at Google India",
    location: "Bangalore, India",
    date: "Oct 2025",
    attendees: "200+ employees",
    type: "Corporate",
    image: "https://images.unsplash.com/photo-1551649081-716ed4a46706?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjB5b2dhJTIwd2VsbG5lc3MlMjBjbGFzc3xlbnwxfHx8fDE3NzMyMDk1NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "A comprehensive wellness program for Google India's Bangalore office, featuring desk yoga sequences, mindfulness meditation for focus, and breathing exercises to combat tech fatigue. The sessions were designed to fit seamlessly into the workday.",
  },
  {
    title: "Yoga Teacher Training (YTT 200)",
    location: "Goa, India",
    date: "Sep 2025",
    attendees: "18 trainees",
    type: "Training",
    image: "https://images.unsplash.com/photo-1764661441867-473a59a765bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwdGVhY2hlciUyMHRyYWluaW5nJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzczMjA5NTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "A 200-hour Yoga Alliance certified teacher training intensive covering asana alignment, teaching methodology, anatomy, philosophy, and practicum. Graduates left equipped with confidence and skills to guide their own students on the yoga path.",
  },
];

export function AboutPage() {
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleBookClass = () => {
    setBookingModalOpen(true);
  };

  const handleModalClose = () => {
    setBookingModalOpen(false);
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-[#e8f0e8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-[#5a7a5a] mb-4">My Story</p>
            <h1
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-6xl md:text-7xl text-[#2c2c2c] leading-tight mb-6"
            >
              Hello, I'm <br />
              <span className="italic text-[#5a7a5a]">Garima</span>
            </h1>
            <p className="text-[#2c2c2c]/60 leading-relaxed mb-5">
              Internationally trained in Yoga, Movement Therapy & Holistic Wellness — I'm a certified yoga teacher, meditation guide, and wellness coach based in India, teaching students across the world through online classes, retreats, and immersive programs.
            </p>
            <p className="text-[#2c2c2c]/60 leading-relaxed mb-8">
              My approach blends the classical roots of Hatha yoga with the dynamic energy of
              Vinyasa, and the deep stillness of Yin. I believe yoga is not just a practice — it's
              a way of returning home to yourself.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#5a7a5a] text-white text-sm tracking-widest uppercase rounded-full hover:bg-[#4a6a4a] transition-all cursor-pointer"
              onClick={handleBookClass}
            >
              Book a Class <ArrowRight size={16} />
            </a>
          </div>
          <div className="relative">
            <img src={retreatImg} alt="Garima" loading="eager" className="w-full h-[520px] object-cover rounded-2xl" />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl px-8 py-6 shadow-xl">
              <p className="text-4xl text-[#5a7a5a] font-semibold">
                10+
              </p>
              <p className="text-xs tracking-widest uppercase text-[#2c2c2c]/60">Years of Practice</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Training */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-[#5a7a5a] mb-4">Professional Training</p>
            <h2
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-5xl text-[#2c2c2c]"
            >
              Certifications & <span className="italic text-[#5a7a5a]">Training</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border-2 transition-all hover:shadow-lg ${
                  cert.inProgress
                    ? "bg-[#e8f0e8]/30 border-[#5a7a5a] border-dashed"
                    : "bg-[#faf8f5] border-[#e5ddd4] hover:border-[#5a7a5a]"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#2c2c2c] mb-2">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-[#2c2c2c]/60 mb-1">
                      {cert.school}
                    </p>
                  </div>
                  <div className={`ml-4 px-3 py-1 rounded-full text-xs tracking-wide font-medium ${
                    cert.inProgress
                      ? "bg-[#5a7a5a]/10 text-[#5a7a5a]"
                      : "bg-[#e8f0e8] text-[#5a7a5a]"
                  }`}>
                    {cert.year}
                  </div>
                </div>
                {cert.inProgress && (
                  <div className="mt-3 pt-3 border-t border-[#5a7a5a]/20">
                    <p className="text-xs text-[#5a7a5a] font-medium">Currently Enrolled</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy image */}
      <section className="py-24 bg-[#f2ede8]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <img src={poseImg} alt="Practice" className="w-full h-[420px] object-cover rounded-2xl" />
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-[#5a7a5a] mb-4">My Philosophy</p>
            <h2
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-5xl text-[#2c2c2c] leading-tight mb-6"
            >
              Yoga is a <span className="italic text-[#5a7a5a]">Homecoming</span>
            </h2>
            <p className="text-[#2c2c2c]/60 leading-relaxed mb-5">
              I teach yoga as a living practice — one that evolves with you through every season of
              life. Whether you come for the physical benefits, the stress relief, or the spiritual
              depth, there is space for you here.
            </p>
            <p className="text-[#2c2c2c]/60 leading-relaxed">
              My classes honour the traditional eight-limbed path of Patanjali while remaining
              deeply practical and grounded in everyday experience.
            </p>
          </div>
        </div>
      </section>

      {/* Workshops */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-[#5a7a5a] mb-4">Experience</p>
            <h2
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-5xl text-[#2c2c2c] mb-4"
            >
              Past Workshops & <span className="italic text-[#5a7a5a]">Retreats</span>
            </h2>
            <p className="text-[#2c2c2c]/60 max-w-2xl mx-auto">
              From corporate wellness programs to international retreats, I've had the privilege of guiding diverse groups on their yoga journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {workshops.map((workshop) => (
              <div
                key={workshop.title}
                className="bg-white rounded-2xl overflow-hidden border border-[#e5ddd4]/50 hover:shadow-xl transition-all group"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={workshop.image} 
                    alt={workshop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-xs tracking-wide font-medium backdrop-blur-sm ${
                        workshop.type === "Corporate"
                          ? "bg-blue-100/90 text-blue-700"
                          : workshop.type === "Retreat"
                          ? "bg-green-100/90 text-green-700"
                          : workshop.type === "Online"
                          ? "bg-purple-100/90 text-purple-700"
                          : workshop.type === "Training"
                          ? "bg-orange-100/90 text-orange-700"
                          : "bg-teal-100/90 text-teal-700"
                      }`}
                    >
                      {workshop.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    className="text-3xl text-[#2c2c2c] mb-4"
                  >
                    {workshop.title}
                  </h3>

                  <p className="text-[#2c2c2c]/70 leading-relaxed mb-5">
                    {workshop.description}
                  </p>

                  <div className="flex flex-col gap-2 text-sm text-[#2c2c2c]/60 pt-4 border-t border-[#e5ddd4]">
                    <p className="flex items-center gap-2">
                      <MapPin size={14} className="text-[#5a7a5a]" />
                      {workshop.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar size={14} className="text-[#5a7a5a]" />
                      {workshop.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <Users size={14} className="text-[#5a7a5a]" />
                      {workshop.attendees}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-20 bg-[#e8f0e8] text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-5xl text-[#2c2c2c] mb-6"
          >
            Ready to Begin Your <span className="italic text-[#5a7a5a]">Journey?</span>
          </h2>
          <p className="text-[#2c2c2c]/60 mb-8 leading-relaxed">
            Whether you're new to yoga or deepening your practice, there's a place for you here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleBookClass}
              className="px-8 py-4 bg-[#5a7a5a] text-white text-sm tracking-widest uppercase rounded-full hover:bg-[#4a6a4a] transition-all cursor-pointer"
            >
              Book a Class
            </button>
            <button
              onClick={() => navigate("/schedule")}
              className="px-8 py-4 border-2 border-[#5a7a5a] text-[#5a7a5a] text-sm tracking-widest uppercase rounded-full hover:bg-[#5a7a5a] hover:text-white transition-all cursor-pointer"
            >
              Schedule Call
            </button>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingModalOpen} onClose={handleModalClose} />
    </div>
  );
}