import { Instagram, Facebook, Youtube } from "lucide-react";
import { Link } from "react-router";
import logoTransparent from "../../imports/Yoga_with_Garima-_logo.png";

const quickLinks = [
  { label: "About Garima", path: "/about" },
  { label: "All Classes", path: "/classes" },
  { label: "Online Programs", path: "/classes" },
  { label: "Retreats", path: "/retreats" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-[#2c2c2c] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Link
            to="/"
            className="inline-flex items-center gap-3 mb-6 group"
          >
            <img
              src={logoTransparent}
              alt="Yoga with Garima"
              className="h-16 w-auto brightness-125 transition-transform group-hover:scale-105"
            />
            <span
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-3xl italic text-[#a8c4a8]"
            >
              Yoga with Garima
            </span>
          </Link>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
            Authentic yoga for the modern soul — classes, retreats, and online programs rooted in
            tradition and heart.
          </p>
          <div className="flex gap-4">
            {[
              { Icon: Instagram, href: "https://instagram.com/yogawithgarima", label: "@yogawithgarima" },
              { Icon: Facebook, href: "https://facebook.com/yogawithgarima", label: "Yoga with Garima" },
              { Icon: Youtube, href: "https://youtube.com/@yogawithgarima", label: "Yoga with Garima" },
            ].map(({ Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-[#5a7a5a] transition-colors"
                title={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Quick Links</p>
          <ul className="flex flex-col gap-2">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.path}
                  className="text-sm text-white/60 hover:text-[#a8c4a8] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Contact</p>
          <ul className="flex flex-col gap-3 text-sm text-white/60">
            <li>yogawithgarima@gmail.com</li>
            <li>+91 86985 75395</li>
            <li>Online Classes</li>
            <li>India & Worldwide</li>
          </ul>
          <Link
            to="/contact"
            className="inline-block mt-6 px-5 py-2.5 border border-white/20 text-white/60 text-xs tracking-widest uppercase rounded-full hover:border-[#a8c4a8] hover:text-[#a8c4a8] transition-colors"
          >
            Send a Message
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
        <p>© 2026 Yoga with Garima. All rights reserved.</p>
        <p>Made with ♡ and presence</p>
      </div>
    </footer>
  );
}