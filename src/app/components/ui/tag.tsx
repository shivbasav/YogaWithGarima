interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}

export function Tag({ children, variant = "default", className = "" }: TagProps) {
  const baseClass = "px-5 py-2 text-sm rounded-full transition-colors";
  
  const variantClass =
    variant === "outline"
      ? "bg-white text-[#2c2c2c]/70 border border-[#e5ddd4] hover:border-[#5a7a5a] hover:text-[#5a7a5a]"
      : "bg-[#e8f0e8] text-[#5a7a5a]";

  return <span className={`${baseClass} ${variantClass} ${className}`}>{children}</span>;
}
