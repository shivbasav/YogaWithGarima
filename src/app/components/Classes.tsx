import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useState } from "react";
import { BookingModal } from "./BookingModal";

const classImg =
  "https://images.unsplash.com/photo-1761034114072-9ec9c3d2fbb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwY2xhc3MlMjBzdHVkaW8lMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NzI1Mjg3MjN8MA&ixlib=rb-4.1.0&q=80&w=1080";
const outdoorImg =
  "https://images.unsplash.com/photo-1707257969667-68804d47f5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwb3V0ZG9vciUyMG5hdHVyZSUyMHN1bnJpc2V8ZW58MXx8fHwxNzcyNjA1Mzk2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const poseImg =
  "https://images.unsplash.com/photo-1758599879647-8420b108cfae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwcG9zZSUyMHdhcnJpb3IlMjBmbGV4aWJpbGl0eXxlbnwxfHx8fDE3NzI2MDUzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080";

const classes = [
  {
    title: "Group sessions",
    //level: "All Levels",
    //duration: "60 min",
    desc: "A great choice for those who enjoy practicing in a group, staying consistent, and being part of a like-minded community. Group classes are fun, motivating, and a more economical way to build a regular yoga routine.",
    img: classImg,
  },
  {
    title: "Private sessions",
    //level: "Beginner",
    //duration: "60 min",
    desc: "Personalized yoga sessions designed around your goals, health concerns, and comfort level. Perfect for those who prefer a flexible schedule, individual attention, and the freedom to progress at their own pace. ",
    img: outdoorImg,
  },
  {
    title: "Yoga for elders (50+)",
    //level: "Beginner",
    //duration: "90 min",
    desc: "Senior yoga classes focused on joint health, knee & back support, mobility, and posture. Each class is customized to individual concerns, making the practice safe, gentle, and effective.",
    img: poseImg,
  },
];

export function Classes() {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollReveal();
  const [bookingModalOpen, setBookingModalOpen] =
    useState(false);

  return (
    <>
      <section ref={ref} className="py-24 bg-[#f2ede8]">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-sm tracking-[0.3em] uppercase text-[#5a7a5a] mb-4">
              What We Offer
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
              className="text-5xl md:text-6xl text-[#2c2c2c]"
            >
              Classes &{" "}
              <span className="italic text-[#5a7a5a]">
                Programs
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {classes.map((cls, index) => (
              <div
                key={cls.title}
                className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${200 + index * 100}ms`,
                }}
              >
                <div className="overflow-hidden h-56">
                  <img
                    src={cls.img}
                    alt={cls.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                    className="text-3xl text-[#2c2c2c] mb-3"
                  >
                    {cls.title}
                  </h3>
                  <p className="text-[#2c2c2c]/60 text-sm leading-relaxed mb-6">
                    {cls.desc}
                  </p>
                  <button
                    onClick={() => setBookingModalOpen(true)}
                    className="inline-flex items-center gap-2 text-sm text-[#5a7a5a] tracking-wide hover:gap-4 transition-all cursor-pointer"
                  >
                    Book Now <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="text-center mt-12">
            <button
              onClick={() => navigate("/classes")}
              className="px-8 py-4 bg-[#5a7a5a] text-white text-sm tracking-widest uppercase rounded-full hover:bg-[#4a6a4a] transition-all hover:shadow-lg cursor-pointer"
            >
              View All Classes
            </button>
          </div> */}
        </div>
      </section>
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </>
  );
}