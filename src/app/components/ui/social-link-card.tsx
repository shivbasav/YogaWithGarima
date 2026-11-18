interface SocialLinkCardProps {
  href: string;
  icon: React.ReactNode;
  handle: string;
  label: string;
  className?: string;
}

export function SocialLinkCard({ href, icon, handle, label, className = "" }: SocialLinkCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex flex-col items-center gap-3 px-8 py-6 bg-gradient-to-br from-[#e8f0e8] to-[#f2ede8] rounded-2xl border border-[#e5ddd4]/50 hover:border-[#5a7a5a] transition-all cursor-pointer group ${className}`}
    >
      <p className="text-sm text-[#2c2c2c]/60">{label}</p>
      <div className="inline-flex items-center gap-2 text-lg text-[#5a7a5a] group-hover:text-[#4a6a4a] tracking-wide transition-colors">
        <span className="group-hover:scale-110 transition-transform">{icon}</span>
        <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl">
          {handle}
        </span>
      </div>
    </a>
  );
}
