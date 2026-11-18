import { useState } from "react";
import { Lock, Eye, EyeOff, LogOut } from "lucide-react";
import { useSession } from "../contexts/SessionProvider";
import { useNavigate, Link } from "react-router";
import logoFull from "../../imports/Yoga_with_Garima-_logo.jpg";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, signIn, signOut } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoggingIn(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message || "Invalid email or password. Please try again.");
      setPassword("");
    }

    setIsLoggingIn(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-[#5a7a5a] rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          {/* Login Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#e5ddd4]/50 my-8">
            <div className="text-center mb-6">
              <img
                src={logoFull}
                alt="Yoga with Garima"
                className="w-32 h-auto mx-auto mb-4 rounded-xl"
              />
              <h1
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="text-3xl text-[#2c2c2c] mb-2"
              >
                Teacher <span className="italic text-[#5a7a5a]">Access</span>
              </h1>
              <p className="text-sm text-[#2c2c2c]/60">
                Sign in with your teacher account to continue
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs tracking-widest uppercase text-[#2c2c2c]/50 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="teacher@yogawithgarima.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#e5ddd4] bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] text-[#2c2c2c] placeholder:text-[#2c2c2c]/30 transition-colors"
                  autoFocus
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs tracking-widest uppercase text-[#2c2c2c]/50">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-[#5a7a5a] hover:text-[#4a6a4a] transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-[#e5ddd4] bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] text-[#2c2c2c] placeholder:text-[#2c2c2c]/30 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2c2c2c]/40 hover:text-[#2c2c2c] transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                    <span>⚠️</span> {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 bg-[#5a7a5a] text-white text-sm tracking-widest uppercase rounded-full hover:bg-[#4a6a4a] hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoggingIn ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-[#e5ddd4]">
              <p className="text-xs text-center text-[#2c2c2c]/50">
                This area is restricted to authorized teachers only
              </p>
              <p className="text-xs text-center text-[#2c2c2c]/40 mt-1">
                Need an account? Contact the administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If authenticated, render children with logout button
  return (
    <>
      {children}
      {/* Floating Logout Button */}
      <button
        onClick={handleLogout}
        className="fixed bottom-8 right-8 px-6 py-3 bg-[#2c2c2c] text-white text-xs tracking-widest uppercase rounded-full hover:bg-[#1a1a1a] shadow-lg transition-all z-40 flex items-center gap-2 cursor-pointer"
      >
        <LogOut size={14} />
        Logout
      </button>
    </>
  );
}
