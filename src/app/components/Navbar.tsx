import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { BookingModal } from "./BookingModal";
import logoTransparent from "../../imports/Yoga_with_Garima-_logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Classes", path: "/classes" },
  { label: "Retreats", path: "/retreats" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
  { label: "Schedule", path: "/schedule" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#e5ddd4]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <NavLink
            to="/"
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              src={logoTransparent}
              alt="Yoga with Garima"
              className="h-12 w-auto transition-transform group-hover:scale-105"
            />
            <span
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="hidden sm:inline text-xl tracking-wide text-[#5a7a5a] italic"
            >
              Yoga with Garima
            </span>
          </NavLink>

          <ul className="hidden md:flex gap-8">
            {navLinks.map((l) => (
              <li key={l.label}>
                <NavLink
                  to={l.path}
                  end={l.path === "/"}
                  className={({ isActive }) =>
                    `text-sm tracking-widest uppercase transition-colors cursor-pointer ${
                      isActive ? "text-[#5a7a5a]" : "text-[#2c2c2c]/70 hover:text-[#5a7a5a]"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setBookingModalOpen(true)}
            className="hidden md:inline-block px-6 py-2 bg-[#5a7a5a] text-white text-sm tracking-widest uppercase rounded-full hover:bg-[#4a6a4a] transition-colors cursor-pointer"
          >
            Book Now
          </button>

          <button className="md:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#faf8f5] border-t border-[#e5ddd4] px-6 py-6 flex flex-col gap-4">
            {navLinks.map((l) => (
              <NavLink
                key={l.label}
                to={l.path}
                end={l.path === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm tracking-widest uppercase transition-colors cursor-pointer ${
                    isActive ? "text-[#5a7a5a]" : "text-[#2c2c2c]/70 hover:text-[#5a7a5a]"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <button
              onClick={() => { setMenuOpen(false); setBookingModalOpen(true); }}
              className="mt-2 px-6 py-3 bg-[#5a7a5a] text-white text-sm tracking-widest uppercase rounded-full text-center cursor-pointer"
            >
              Book Now
            </button>
          </div>
        )}
      </nav>

      {/* Backdrop blur overlay when mobile menu is open */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-[#2c2c2c]/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Booking Modal */}
      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </>
  );
}