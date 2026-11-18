import { useScrollReveal } from "../hooks/useScrollReveal";
import { Star, Quote } from "lucide-react";

// Manual student reviews
const studentReviews = [
  {
    name: "Student Name 1",
    location: "Mumbai, India",
    image: "https://images.unsplash.com/photo-1580746453801-37b0bc56f3b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHBvcnRyYWl0JTIwc21pbGV8ZW58MXx8fHwxNzcyNjA2MzM3fDA&ixlib=rb-4.1.0&q=80&w=400",
    text: "Add your student review here. This is a placeholder for reviews shared directly by students.",
    stars: 5,
    date: "March 2026",
  },
  {
    name: "Student Name 2",
    location: "Delhi, India",
    image: "https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwaGVhZHNob3QlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcyNTU3MjIxfDA&ixlib=rb-4.1.0&q=80&w=400",
    text: "Add another student review here. These reviews showcase feedback from your amazing students.",
    stars: 5,
    date: "February 2026",
  },
  {
    name: "Student Name 3",
    location: "Bangalore, India",
    image: "https://images.unsplash.com/photo-1565611948073-cb0dd26f233b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwbmF0dXJhbCUyMGxpZ2h0JTIwaGFwcHl8ZW58MXx8fHwxNzcyNjA2MzM4fDA&ixlib=rb-4.1.0&q=80&w=400",
    text: "Add more reviews as you receive them from your students. You can add as many as you'd like!",
    stars: 5,
    date: "January 2026",
  },
];

export function ReviewWidgets() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 bg-[#f2ede8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Student Reviews */}
        <div>
          <div
            className={`text-center mb-12 transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Quote size={20} className="text-[#5a7a5a]" />
              <p className="text-sm tracking-[0.3em] uppercase text-[#5a7a5a]">Student Feedback</p>
            </div>
            <h3
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-4xl md:text-5xl text-[#2c2c2c]"
            >
              Student <span className="italic text-[#5a7a5a]">Reviews</span>
            </h3>
            <p className="text-[#2c2c2c]/60 mt-3">
              Heartfelt testimonials from our wonderful students
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {studentReviews.map((review, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg border-2 border-[#e8f0e8] hover:border-[#5a7a5a] transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${500 + index * 100}ms` }}
              >
                {/* Student Photo */}
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#5a7a5a]/20"
                  />
                  <div className="flex-1">
                    <p className="text-[#2c2c2c] font-semibold">{review.name}</p>
                    <p className="text-xs text-[#5a7a5a] tracking-wide">{review.location}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <Star key={i} size={18} className="fill-[#c4a882] text-[#c4a882]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-[#2c2c2c]/70 leading-relaxed mb-4 italic">
                  "{review.text}"
                </p>

                {/* Date */}
                <p className="text-xs text-[#2c2c2c]/50 pt-4 border-t border-[#e5ddd4]">
                  {review.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
