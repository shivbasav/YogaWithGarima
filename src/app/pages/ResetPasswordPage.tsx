import * as React from "react";
import { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, Check } from "lucide-react";
import { useSession } from "../contexts/SessionProvider";
import { useNavigate } from "react-router";
import logoFull from "../../imports/Yoga_with_Garima-_logo.jpg";

export function ResetPasswordPage() {
  const { updatePassword, user } = useSession();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user has a valid session (from email link)
    if (!user) {
      setError("Invalid or expired reset link. Please request a new password reset.");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password length
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsSubmitting(true);

    const { error: updateError } = await updatePassword(newPassword);

    if (updateError) {
      setError(updateError.message || "Failed to update password. Please try again.");
      setIsSubmitting(false);
    } else {
      setSuccess(true);
      setIsSubmitting(false);
      // Redirect to admin after 2 seconds
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
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
                Password <span className="italic text-[#5a7a5a]">Updated</span>
              </h1>
              <p className="text-sm text-[#2c2c2c]/70 leading-relaxed">
                Your password has been successfully updated. Redirecting you to login...
              </p>
            </div>

            <div className="flex justify-center">
              <div className="animate-pulse w-2 h-2 bg-[#5a7a5a] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-6 pt-20">
      <div className="max-w-md w-full">
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
              Create New <span className="italic text-[#5a7a5a]">Password</span>
            </h1>
            <p className="text-sm text-[#2c2c2c]/60">
              Enter your new password below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#2c2c2c]/50 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-[#e5ddd4] bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] text-[#2c2c2c] placeholder:text-[#2c2c2c]/30 transition-colors"
                  autoFocus
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2c2c2c]/40 hover:text-[#2c2c2c] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase text-[#2c2c2c]/50 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-[#e5ddd4] bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] text-[#2c2c2c] placeholder:text-[#2c2c2c]/30 transition-colors"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2c2c2c]/40 hover:text-[#2c2c2c] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                  <span>⚠️</span> {error}
                </p>
              )}
            </div>

            <div className="bg-[#e8f0e8] rounded-xl p-3">
              <p className="text-xs text-[#2c2c2c]/60">
                💡 Password must be at least 6 characters long
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !user}
              className="w-full py-3 bg-[#5a7a5a] text-white text-sm tracking-widest uppercase rounded-full hover:bg-[#4a6a4a] hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
