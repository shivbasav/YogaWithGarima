interface InfoCardProps {
  title: string;
  subtitle?: string;
  bgColor?: string;
  className?: string;
}

export function InfoCard({
  title,
  subtitle,
  bgColor = "bg-[#e8f0e8]",
  className = "",
}: InfoCardProps) {
  return (
    <div className={`${bgColor} rounded-2xl p-6 h-48 flex flex-col justify-center ${className}`}>
      <p
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
        className="text-3xl text-[#5a7a5a] mb-2"
      >
        {title}
      </p>
      {subtitle && <p className="text-sm text-[#2c2c2c]/60">{subtitle}</p>}
    </div>
  );
}
