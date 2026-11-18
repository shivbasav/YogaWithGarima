import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  iconBgColor?: string;
  iconTextColor?: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  iconBgColor = "bg-[#e8f0e8]",
  iconTextColor = "text-[#5a7a5a]",
  className = "",
}: FeatureCardProps) {
  return (
    <div className={`flex gap-4 items-start ${className}`}>
      <div className={`p-3 ${iconBgColor} ${iconTextColor} rounded-xl shrink-0`}>
        {icon}
      </div>
      <div>
        <h4 className="text-lg text-[#2c2c2c] mb-1">{title}</h4>
        <p className="text-sm text-[#2c2c2c]/60">{description}</p>
      </div>
    </div>
  );
}
