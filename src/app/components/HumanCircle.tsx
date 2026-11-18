import { Users, Heart, Sparkles, Calendar, Instagram } from "lucide-react";
import { useState } from "react";
import { BookingModal } from "./BookingModal";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { SectionHeader } from "./ui/section-header";
import { FeatureCard } from "./ui/feature-card";
import { Tag } from "./ui/tag";
import { PrimaryButton } from "./ui/primary-button";
import { SocialLinkCard } from "./ui/social-link-card";
import { InfoCard } from "./ui/info-card";
import circleImg from "../../imports/WhatsApp_Image_2026-04-15_at_16.50.26_(1).jpeg";
import artImg from "../../imports/WhatsApp_Image_2026-04-15_at_16.50.26_(2).jpeg";

const features = [
  {
    icon: <Users size={24} />,
    title: "Meaningful Connections",
    desc: "Build authentic relationships through guided activities and conversations",
  },
  {
    icon: <Heart size={24} />,
    title: "Safe Space",
    desc: "A judgment-free environment where everyone can express themselves freely",
  },
  {
    icon: <Sparkles size={24} />,
    title: "Creative Expression",
    desc: "Engage through movement, art, and playful games that inspire openness",
  },
];

const venues = [
  "Corporate Retreats",
  "Yoga Schools",
  "Cafes",
  "Social Events",
  "Workshops",
  "Family Functions",
  "Community Gatherings",
];

export function HumanCircle() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const { ref, isVisible } = useScrollReveal();

  return (
    <>
      <section ref={ref} className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <SectionHeader
              subtitle="Beyond Yoga"
              title={
                <>
                  Human <span className="italic text-[#5a7a5a]">Circle</span>
                </>
              }
              description="Build meaningful connections through movement, art, and authentic conversations"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Image Collage */}
            <div
              className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden h-64">
                  <img
                    src={circleImg}
                    alt="Human Circle gathering"
                    loading="eager"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="bg-[#e8f0e8] rounded-2xl p-6 h-48 flex flex-col justify-center">
                  <p
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    className="text-3xl text-[#5a7a5a] mb-2"
                  >
                    Connect
                  </p>
                  <p className="text-sm text-[#2c2c2c]/60">
                    Free from small talk, full of meaning
                  </p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-[#f2ede8] rounded-2xl p-6 h-48 flex flex-col justify-center">
                  <p
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    className="text-3xl text-[#5a7a5a] mb-2"
                  >
                    Express
                  </p>
                  <p className="text-sm text-[#2c2c2c]/60">
                    Through art, movement & conversation
                  </p>
                </div>
                <div className="rounded-2xl overflow-hidden h-64">
                  <img
                    src={artImg}
                    alt="Creative expression"
                    loading="eager"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div
              className={`transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <h3
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="text-4xl text-[#2c2c2c] mb-6"
              >
                What is a <span className="italic text-[#5a7a5a]">Human Circle?</span>
              </h3>
              <p className="text-[#2c2c2c]/70 leading-relaxed mb-6">
                A Human Circle is a structured yet relaxed gathering where participants engage in
                playful movement, creative expression, and guided discussions. It's a safe space for
                people to connect, share stories, and build meaningful relationships, free from small
                talk.
              </p>
              <p className="text-[#2c2c2c]/70 leading-relaxed mb-8">
                Whether through art, movement games, or simply sharing experiences, the circle fosters
                self-expression and mindfulness, creating a sense of openness and belonging. It's a
                refreshing way for people to make friends, bond, and connect on a deeper level—instead
                of the typical party scene.
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {features.map((feature) => (
                  <FeatureCard
                    key={feature.title}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.desc}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Venues Section */}
          <div
            className={`bg-[#f2ede8] rounded-3xl p-12 mb-12 transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 text-[#5a7a5a] mb-4">
                <Calendar size={20} />
                <p className="text-sm tracking-[0.3em] uppercase">Where We Gather</p>
              </div>
              <h3
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="text-4xl text-[#2c2c2c]"
              >
                Host a Circle at <span className="italic text-[#5a7a5a]">Your Venue</span>
              </h3>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {venues.map((venue) => (
                <Tag key={venue} variant="outline">
                  {venue}
                </Tag>
              ))}
            </div>

            <p className="text-center text-[#2c2c2c]/60 max-w-2xl mx-auto leading-relaxed">
              Garima hosts Human Circles in a variety of spaces, bringing people together in
              meaningful and memorable ways. Each circle is tailored to your group's needs and
              environment.
            </p>
          </div>

          {/* CTA */}
          <div
            className={`text-center transition-all duration-700 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h3
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-4xl text-[#2c2c2c] mb-4"
            >
              Interested in hosting a <span className="italic text-[#5a7a5a]">Human Circle?</span>
            </h3>
            <p className="text-[#2c2c2c]/60 mb-8 max-w-xl mx-auto">
              Book a free consultation call with us, and let's create something unforgettable together!
            </p>
            <PrimaryButton onClick={() => setBookingModalOpen(true)}>
              Book Free Consultation
            </PrimaryButton>
          </div>

          {/* Instagram Handle */}
          <div
            className={`mt-16 text-center transition-all duration-700 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <SocialLinkCard
              href="https://instagram.com/human_circle"
              label="Follow our Human Circle journey"
              icon={<Instagram size={22} />}
              handle="@human_circle"
            />
          </div>
        </div>
      </section>

      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </>
  );
}