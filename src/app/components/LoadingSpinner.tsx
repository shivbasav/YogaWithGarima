export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-[#faf8f5] flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-[#e8f0e8] rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-[#5a7a5a] rounded-full animate-spin"></div>
        </div>
        <p 
          style={{ fontFamily: "'Cormorant Garamond', serif" }} 
          className="text-2xl text-[#5a7a5a] italic"
        >
          Loading...
        </p>
      </div>
    </div>
  );
}
