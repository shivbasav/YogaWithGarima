interface StatBadgeProps {
  value: string;
  label: string;
  className?: string;
}

export function StatBadge({ value, label, className = "" }: StatBadgeProps) {
  return (
    <div className={`bg-[#e8f0e8] rounded-2xl px-8 py-6 shadow-xl ${className}`}>
      <p className="text-4xl text-[#5a7a5a] font-semibold">
        {value}
      </p>
      <p className="text-xs tracking-widest uppercase text-[#2c2c2c]/60">{label}</p>
    </div>
  );
}
