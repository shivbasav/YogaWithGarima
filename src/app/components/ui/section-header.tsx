interface SectionHeaderProps {
  subtitle?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeader({
  subtitle,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";

  return (
    <div className={`${alignClass} ${className}`}>
      {subtitle && (
        <p className="text-sm tracking-[0.3em] uppercase text-[#5a7a5a] mb-4">{subtitle}</p>
      )}
      <h2
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
        className="text-5xl md:text-6xl text-[#2c2c2c] mb-6"
      >
        {title}
      </h2>
      {description && (
        <p className="text-[#2c2c2c]/70 leading-relaxed max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
}
