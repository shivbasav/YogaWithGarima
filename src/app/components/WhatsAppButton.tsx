import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = "918698575395";
  const message = encodeURIComponent("Hi Garima! I'd like to learn more about your yoga classes.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-24 right-8 z-40">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-3 bg-white rounded-2xl shadow-xl border border-[#e5ddd4] p-4 w-64 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-[#2c2c2c]/40 hover:text-[#2c2c2c] cursor-pointer"
          >
            <X size={16} />
          </button>
          <p
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-lg text-[#2c2c2c] mb-1"
          >
            Quick Question?
          </p>
          <p className="text-xs text-[#2c2c2c]/60 leading-relaxed mb-3">
            Chat with me directly on WhatsApp — I usually respond within a few hours!
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center px-4 py-2 bg-[#25D366] text-white text-xs tracking-wide rounded-full hover:bg-[#20bd5a] transition-colors"
          >
            Start Chat
          </a>
        </div>
      )}

      {/* Button */}
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        className="group relative p-4 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer"
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle size={24} className="animate-pulse" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
      </button>
    </div>
  );
}