import * as React from "react";
import { useState } from "react";
import { Mail, ArrowLeft, Check } from "lucide-react";
import { useSession } from "../contexts/SessionProvider";
import { Link } from "react-router";
import logoFull from "../../imports/Yoga_with_Garima-_logo.jpg";

export function ForgotPasswordPage() {
  const { resetPassword } = useSession();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const { error: resetError } = await resetPassword(email);

    if (resetError) {
      setError(resetError.message || "Failed to send reset email. Please try again.");
      setIsSubmitting(false);
    } else {
      setSuccess(true);
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-6 pt-20">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#e5ddd4]/50 my-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600" />
              </div>
              <h1
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="text-3xl text-[#2c2c2c] mb-3"
              >
                Check Your <span className="italic text-[#5a7a5a]">Email</span>
              </h1>
              <p className="text-sm text-[#2c2c2c]/70 leading-relaxed">
                We've sent a password reset link to <strong>{email}</strong>.
                Click the link in the email to reset your password.
              </p>
            </div>

            <div className="bg-[#e8f0e8] rounded-xl p-3 mb-6">
              <p className="text-xs text-[#2c2c2c]/60">
                💡 If you don't see the email, check your spam folder or try again.
              </p>
            </div>

            <Link
              to="/admin"
              className="block w-full py-3 bg-[#5a7a5a] text-white text-sm tracking-widest uppercase rounded-full hover:bg-[#4a6a4a] hover:shadow-lg transition-all text-center"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-6 pt-20">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#e5ddd4]/50 mt-8">
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
              Reset <span className="italic text-[#5a7a5a]">Password</span>
            </h1>
            <p className="text-sm text-[#2c2c2c]/60">
              Enter your email and we'll send you a link to reset your password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#2c2c2c]/50 mb-2">
                Email Address
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
              {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                  <span>⚠️</span> {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#5a7a5a] text-white text-sm tracking-widest uppercase rounded-full hover:bg-[#4a6a4a] hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-[#e5ddd4]">
            <Link
              to="/admin"
              className="flex items-center justify-center gap-2 text-sm text-[#5a7a5a] hover:text-[#4a6a4a] transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
