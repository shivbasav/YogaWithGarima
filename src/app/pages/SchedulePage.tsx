import { Calendar, Clock, User, Phone, Mail, CheckCircle2 } from "lucide-react";
import { useState } from "react";

// Separate time slots for consultation calls (15 min)
const consultationTimeSlots = [
  { time: "9:00 AM", available: true },
  { time: "9:30 AM", available: false },
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "11:30 AM", available: true },
  { time: "2:00 PM", available: true },
  { time: "2:30 PM", available: true },
  { time: "3:00 PM", available: false },
  { time: "3:30 PM", available: true },
  { time: "4:00 PM", available: true },
  { time: "4:30 PM", available: true },
];

// Separate time slots for personal classes (60 min)
const personalClassTimeSlots = [
  { time: "6:00 AM", available: true },
  { time: "7:00 AM", available: true },
  { time: "8:00 AM", available: false },
  { time: "9:00 AM", available: true },
  { time: "10:00 AM", available: false },
  { time: "11:00 AM", available: true },
  { time: "3:00 PM", available: true },
  { time: "4:00 PM", available: false },
  { time: "5:00 PM", available: true },
  { time: "6:00 PM", available: true },
  { time: "7:00 PM", available: true },
];

// Different available dates for consultation
const consultationDates = [
  { date: "March 15", day: "Mon", available: 8 },
  { date: "March 16", day: "Tue", available: 6 },
  { date: "March 17", day: "Wed", available: 10 },
  { date: "March 18", day: "Thu", available: 7 },
  { date: "March 19", day: "Fri", available: 5 },
  { date: "March 22", day: "Mon", available: 9 },
  { date: "March 23", day: "Tue", available: 8 },
];

// Different available dates for personal classes
const personalClassDates = [
  { date: "March 15", day: "Mon", available: 4 },
  { date: "March 17", day: "Wed", available: 5 },
  { date: "March 18", day: "Thu", available: 3 },
  { date: "March 20", day: "Sat", available: 6 },
  { date: "March 22", day: "Mon", available: 4 },
  { date: "March 24", day: "Wed", available: 5 },
  { date: "March 27", day: "Sat", available: 6 },
];

export function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [callType, setCallType] = useState<"consultation" | "personal-class">("consultation");
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleCallTypeChange = (type: "consultation" | "personal-class") => {
    setCallType(type);
    // Reset date and time when switching between types since availability is different
    setSelectedDate(null);
    setSelectedTime(null);
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 bg-[#e8f0e8] text-center px-6">
        <p className="text-sm tracking-[0.3em] uppercase text-[#5a7a5a] mb-4">Book Your Time</p>
        <h1
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="text-6xl md:text-7xl text-[#2c2c2c] mb-4"
        >
          Schedule a <span className="italic text-[#5a7a5a]">Session</span>
        </h1>
        <p className="text-[#2c2c2c]/60 max-w-md mx-auto">
          Book a consultation call or check availability for personal classes
        </p>
      </section>

      {submitted ? (
        <section className="max-w-2xl mx-auto px-6 py-24 text-center">
          <div className="bg-white rounded-2xl p-16 shadow-sm border border-[#e5ddd4]/50">
            <div className="w-20 h-20 rounded-full bg-[#e8f0e8] flex items-center justify-center text-[#5a7a5a] mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-5xl text-[#2c2c2c] mb-4"
            >
              Session Booked!
            </h2>
            <p className="text-[#2c2c2c]/60 mb-6 leading-relaxed">
              Your {callType === "consultation" ? "consultation call" : "personal class"} is
              scheduled for <span className="font-semibold">{selectedDate}</span> at{" "}
              <span className="font-semibold">{selectedTime}</span>.
            </p>
            <p className="text-sm text-[#2c2c2c]/50 mb-8">
              You'll receive a confirmation email with class details at {form.email}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setSelectedDate(null);
                setSelectedTime(null);
                setForm({ name: "", email: "", phone: "", notes: "" });
              }}
              className="text-sm text-[#5a7a5a] underline underline-offset-4 hover:text-[#4a6a4a] transition-colors cursor-pointer"
            >
              Book Another Session
            </button>
          </div>
        </section>
      ) : (
        <section className="max-w-6xl mx-auto px-6 py-24">
          {/* Type Selection */}
          <div className="mb-12 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <button
              onClick={() => handleCallTypeChange("consultation")}
              className={`flex-1 p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                callType === "consultation"
                  ? "border-[#5a7a5a] bg-[#e8f0e8]"
                  : "border-[#e5ddd4] bg-white hover:border-[#5a7a5a]/30"
              }`}
            >
              <Phone className="mx-auto mb-3 text-[#5a7a5a]" size={24} />
              <h3 className="text-xl text-[#2c2c2c] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Consultation Call
              </h3>
              <p className="text-xs text-[#2c2c2c]/60">15-min free call to discuss your goals</p>
            </button>
            <button
              onClick={() => handleCallTypeChange("personal-class")}
              className={`flex-1 p-6 rounded-2xl border-2 transition-all ${
                callType === "personal-class"
                  ? "border-[#5a7a5a] bg-[#e8f0e8]"
                  : "border-[#e5ddd4] bg-white hover:border-[#5a7a5a]/30"
              }`}
            >
              <User className="mx-auto mb-3 text-[#5a7a5a]" size={24} />
              <h3 className="text-xl text-[#2c2c2c] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Personal Class
              </h3>
              <p className="text-xs text-[#2c2c2c]/60">1-on-1 session tailored to your needs</p>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Calendar & Time Selection */}
            <div>
              <h3
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="text-3xl text-[#2c2c2c] mb-6 flex items-center gap-3"
              >
                <Calendar className="text-[#5a7a5a]" size={28} />
                Select Date & Time
              </h3>

              {/* Date Selection */}
              <div className="mb-6">
                <p className="text-xs tracking-widest uppercase text-[#2c2c2c]/50 mb-3">
                  Available Dates
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {callType === "consultation"
                    ? consultationDates.map((d) => (
                        <button
                          key={`consultation-${d.date}`}
                          onClick={() => setSelectedDate(d.date)}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            selectedDate === d.date
                              ? "border-[#5a7a5a] bg-[#e8f0e8]"
                              : "border-[#e5ddd4] bg-white hover:border-[#5a7a5a]/30"
                          }`}
                        >
                          <p className="text-xs text-[#5a7a5a] tracking-wider uppercase mb-1">{d.day}</p>
                          <p className="text-[#2c2c2c] font-semibold">{d.date}</p>
                          <p className="text-xs text-[#2c2c2c]/50 mt-1">{d.available} slots</p>
                        </button>
                      ))
                    : personalClassDates.map((d) => (
                        <button
                          key={`personal-${d.date}`}
                          onClick={() => setSelectedDate(d.date)}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            selectedDate === d.date
                              ? "border-[#5a7a5a] bg-[#e8f0e8]"
                              : "border-[#e5ddd4] bg-white hover:border-[#5a7a5a]/30"
                          }`}
                        >
                          <p className="text-xs text-[#5a7a5a] tracking-wider uppercase mb-1">{d.day}</p>
                          <p className="text-[#2c2c2c] font-semibold">{d.date}</p>
                          <p className="text-xs text-[#2c2c2c]/50 mt-1">{d.available} slots</p>
                        </button>
                      ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <p className="text-xs tracking-widest uppercase text-[#2c2c2c]/50 mb-3 flex items-center gap-2">
                    <Clock size={14} /> Time Slots - {selectedDate}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {callType === "consultation"
                      ? consultationTimeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            onClick={() => slot.available && setSelectedTime(slot.time)}
                            disabled={!slot.available}
                            className={`p-3 rounded-lg text-sm transition-all ${
                              selectedTime === slot.time
                                ? "bg-[#5a7a5a] text-white"
                                : slot.available
                                ? "bg-white border border-[#e5ddd4] text-[#2c2c2c] hover:border-[#5a7a5a]"
                                : "bg-[#f5f5f5] text-[#2c2c2c]/30 cursor-not-allowed"
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))
                      : personalClassTimeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            onClick={() => slot.available && setSelectedTime(slot.time)}
                            disabled={!slot.available}
                            className={`p-3 rounded-lg text-sm transition-all ${
                              selectedTime === slot.time
                                ? "bg-[#5a7a5a] text-white"
                                : slot.available
                                ? "bg-white border border-[#e5ddd4] text-[#2c2c2c] hover:border-[#5a7a5a]"
                                : "bg-[#f5f5f5] text-[#2c2c2c]/30 cursor-not-allowed"
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#e5ddd4]/50 self-start">
              <h3
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="text-3xl text-[#2c2c2c] mb-6"
              >
                Your Details
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-[#2c2c2c]/50">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="px-4 py-3 rounded-xl border border-[#e5ddd4] bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] text-[#2c2c2c] placeholder:text-[#2c2c2c]/30 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-[#2c2c2c]/50">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="px-4 py-3 rounded-xl border border-[#e5ddd4] bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] text-[#2c2c2c] placeholder:text-[#2c2c2c]/30 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-[#2c2c2c]/50">Phone</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="px-4 py-3 rounded-xl border border-[#e5ddd4] bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] text-[#2c2c2c] placeholder:text-[#2c2c2c]/30 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-[#2c2c2c]/50">
                    Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Any specific goals or requirements..."
                    className="px-4 py-3 rounded-xl border border-[#e5ddd4] bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] text-[#2c2c2c] placeholder:text-[#2c2c2c]/30 transition-colors resize-none"
                  />
                </div>

                {/* Summary */}
                {selectedDate && selectedTime && (
                  <div className="bg-[#e8f0e8]/50 rounded-xl p-4 mt-2">
                    <p className="text-xs tracking-widest uppercase text-[#2c2c2c]/50 mb-2">
                      Booking Summary
                    </p>
                    <p className="text-sm text-[#2c2c2c] mb-1">
                      <span className="font-semibold">Type:</span>{" "}
                      {callType === "consultation" ? "Consultation Call (15 min)" : "Personal Class (60 min)"}
                    </p>
                    <p className="text-sm text-[#2c2c2c]">
                      <span className="font-semibold">When:</span> {selectedDate} at {selectedTime}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!selectedDate || !selectedTime}
                  className={`w-full py-4 text-white text-sm tracking-widest uppercase rounded-full transition-all flex items-center justify-center gap-2 ${
                    selectedDate && selectedTime
                      ? "bg-[#5a7a5a] hover:bg-[#4a6a4a]"
                      : "bg-[#2c2c2c]/20 cursor-not-allowed"
                  }`}
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}