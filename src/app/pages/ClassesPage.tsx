import { Clock, Users, ChevronRight } from "lucide-react";
import { useState } from "react";
import { BookingModal } from "../components/BookingModal";

const classImg =
  "https://images.unsplash.com/photo-1761034114072-9ec9c3d2fbb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwY2xhc3MlMjBzdHVkaW8lMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NzI1Mjg3MjN8MA&ixlib=rb-4.1.0&q=80&w=1080";
const outdoorImg =
  "https://images.unsplash.com/photo-1707257969667-68804d47f5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwb3V0ZG9vciUyMG5hdHVyZSUyMHN1bnJpc2V8ZW58MXx8fHwxNzcyNjA1Mzk2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const poseImg =
  "https://images.unsplash.com/photo-1758599879647-8420b108cfae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwcG9zZSUyMHdhcnJpb3IlMjBmbGV4aWJpbGl0eXxlbnwxfHx8fDE3NzI2MDUzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080";
const heroImg =
  "https://images.unsplash.com/photo-1758274539654-23fa349cc090?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMHNlcmVuZSUyMHdvbWFufGVufDF8fHx8MTc3MjYwNTM5NHww&ixlib=rb-4.1.0&q=80&w=1080";
const meditationImg =
  "https://images.unsplash.com/photo-1758599879787-03999f72d994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwYnJlYXRoaW5nJTIwbWVkaXRhdGlvbiUyMHByYW5heWFtYXxlbnwxfHx8fDE3NzI2MDYzNDB8MA&ixlib=rb-4.1.0&q=80&w=1080";

const allClasses = [
  {
    title: "Hatha Yoga",
    level: "All Levels",
    levelColor: "bg-blue-100 text-blue-700",
    duration: "60 min",
    students: "Open",
    schedule: "Mon, Wed, Fri · 7:00 AM IST",
    desc: "A gentle introduction to yoga postures, breathing exercises, and meditation. Perfect for building a strong foundation and understanding the fundamentals of yoga.",
    img: classImg,
    price: "₹800 / class",
  },
  {
    title: "Vinyasa Flow",
    level: "Intermediate",
    levelColor: "bg-orange-100 text-orange-700",
    duration: "75 min",
    students: "Max 12",
    schedule: "Tue, Thu · 6:30 AM IST",
    desc: "Dynamic sequences that synchronize breath with movement, building strength, flexibility and mental clarity. Expect creative sequencing and energising flows.",
    img: outdoorImg,
    price: "₹1,000 / class",
  },
  {
    title: "Yin & Restore",
    level: "Beginner",
    levelColor: "bg-green-100 text-green-700",
    duration: "90 min",
    students: "Open",
    schedule: "Sat · 8:00 AM IST",
    desc: "Deep, passive stretches held for extended periods to target connective tissues and calm the nervous system. Perfect for unwinding and deep release.",
    img: poseImg,
    price: "₹900 / class",
  },
  {
    title: "Morning Meditation",
    level: "All Levels",
    levelColor: "bg-purple-100 text-purple-700",
    duration: "30 min",
    students: "Open",
    schedule: "Daily · 6:00 AM IST",
    desc: "Start your day with stillness. Guided breathwork, body scan, and seated meditation to cultivate focus, calm, and inner clarity before the day begins.",
    img: meditationImg,
    price: "₹500 / class",
  },
  {
    title: "Power Yoga",
    level: "Advanced",
    levelColor: "bg-red-100 text-red-700",
    duration: "60 min",
    students: "Max 8",
    schedule: "Mon, Thu · 6:00 PM IST",
    desc: "An athletically inspired yoga practice that builds endurance, core strength and flexibility. Challenging yet accessible with guidance for all modifications.",
    img: heroImg,
    price: "₹1,200 / class",
  },
  {
    title: "Pranayama & Breathwork",
    level: "All Levels",
    levelColor: "bg-teal-100 text-teal-700",
    duration: "45 min",
    students: "Open",
    schedule: "Sun · 9:00 AM IST",
    desc: "Dedicated breathwork sessions exploring classical pranayama techniques including Nadi Shodhana, Kapalabhati, and Bhramari for energy and nervous system balance.",
    img: classImg,
    price: "₹700 / class",
  },
];

const schedule = [
  { day: "Monday", classes: ["Hatha Yoga · 7:00 AM", "Power Yoga · 6:00 PM"] },
  { day: "Tuesday", classes: ["Vinyasa Flow · 6:30 AM"] },
  { day: "Wednesday", classes: ["Hatha Yoga · 7:00 AM"] },
  { day: "Thursday", classes: ["Vinyasa Flow · 6:30 AM", "Power Yoga · 6:00 PM"] },
  { day: "Friday", classes: ["Hatha Yoga · 7:00 AM"] },
  { day: "Saturday", classes: ["Yin & Restore · 8:00 AM"] },
  { day: "Sunday", classes: ["Pranayama & Breathwork · 9:00 AM"] },
];

export function ClassesPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <>
      <div className="pt-20">
        {/* Header */}
        <section className="py-20 bg-[#e8f0e8] text-center">
          <div className="max-w-2xl mx-auto px-6">
            <p className="text-sm tracking-[0.3em] uppercase text-[#5a7a5a] mb-4">What We Offer</p>
            <h1
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-6xl md:text-7xl text-[#2c2c2c] mb-6"
            >
              Classes & <span className="italic text-[#5a7a5a]">Programs</span>
            </h1>
            <p className="text-[#2c2c2c]/60 leading-relaxed">
              Whether you're a first-time yogi or a seasoned practitioner, there's a class here for
              you. All sessions are held online — join from anywhere in the world.
            </p>
          </div>
        </section>

        {/* Class Cards */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allClasses.map((cls) => (
              <div
                key={cls.title}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e5ddd4]/50 flex flex-col"
              >
                <div className="overflow-hidden h-52">
                  <img
                    src={cls.img}
                    alt={cls.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs tracking-widest uppercase px-3 py-1 rounded-full ${cls.levelColor}`}
                    >
                      {cls.level}
                    </span>
                    <span className="text-sm text-[#5a7a5a]">{cls.price}</span>
                  </div>
                  <h3
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    className="text-3xl text-[#2c2c2c] mb-2"
                  >
                    {cls.title}
                  </h3>
                  <p className="text-[#2c2c2c]/60 text-sm leading-relaxed mb-5 flex-1">{cls.desc}</p>
                  <div className="flex items-center gap-5 mb-6 text-xs text-[#2c2c2c]/50">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} /> {cls.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users size={13} /> {cls.students}
                    </span>
                  </div>
                  <p className="text-xs text-[#5a7a5a] bg-[#e8f0e8] px-3 py-2 rounded-lg mb-5">
                    🗓 {cls.schedule}
                  </p>
                  <button
                    className="w-full py-3 bg-[#5a7a5a] text-white text-sm tracking-widest uppercase rounded-full hover:bg-[#4a6a4a] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    onClick={() => setBookingModalOpen(true)}
                  >
                    Book This Class <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Weekly Schedule */}
        <section className="py-24 bg-[#f2ede8]">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-sm tracking-[0.3em] uppercase text-[#5a7a5a] mb-4">Plan Ahead</p>
              <h2
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="text-5xl text-[#2c2c2c]"
              >
                Weekly <span className="italic text-[#5a7a5a]">Schedule</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {schedule.map((day) => (
                <div key={day.day} className="bg-white rounded-2xl p-6">
                  <p className="text-xs tracking-widest uppercase text-[#5a7a5a] mb-3">{day.day}</p>
                  <ul className="flex flex-col gap-2">
                    {day.classes.map((cls) => (
                      <li key={cls} className="text-sm text-[#2c2c2c]/70 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5a7a5a] shrink-0" />
                        {cls}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center px-6">
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-5xl text-[#2c2c2c] mb-4"
          >
            Not sure where to <span className="italic text-[#5a7a5a]">start?</span>
          </h2>
          <p className="text-[#2c2c2c]/60 mb-8 max-w-md mx-auto">
            Book a free 15-minute discovery call and Garima will help you find the perfect class for
            your goals.
          </p>
          <button
            className="px-8 py-4 bg-[#5a7a5a] text-white text-sm tracking-widest uppercase rounded-full hover:bg-[#4a6a4a] transition-all cursor-pointer"
            onClick={() => setBookingModalOpen(true)}
          >
            Book a Free Call
          </button>
        </section>
      </div>

      {/* Booking Modal */}
      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </>
  );
}