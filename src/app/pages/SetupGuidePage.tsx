import { CheckCircle2, Lock, Mail, Key, ExternalLink, Shield } from "lucide-react";

export function SetupGuidePage() {
  return (
    <div className="pt-20 min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <section className="py-20 bg-[#e8f0e8] text-center px-6">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield size={36} className="text-[#5a7a5a]" />
        </div>
        <h1
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="text-6xl md:text-7xl text-[#2c2c2c] mb-4"
        >
          Authentication <span className="italic text-[#5a7a5a]">Setup</span>
        </h1>
        <p className="text-[#2c2c2c]/60 max-w-2xl mx-auto">
          Your website now has secure Supabase authentication! Follow these steps to create your first admin user.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-24">
        {/* Success Banner */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-12 flex items-start gap-4">
          <CheckCircle2 size={24} className="text-green-600 shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-green-900 mb-2">Setup Complete!</h3>
            <p className="text-green-800 text-sm">
              Authentication is configured and ready to use. Now you just need to create your admin user.
            </p>
          </div>
        </div>

        {/* What's Implemented */}
        <div className="mb-16">
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-4xl text-[#2c2c2c] mb-6"
          >
            What's <span className="italic text-[#5a7a5a]">Implemented</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Lock />, text: "Secure password-based authentication" },
              { icon: <Shield />, text: "Protected admin routes" },
              { icon: <Key />, text: "Session persistence across refreshes" },
              { icon: <CheckCircle2 />, text: "Auto logout on session expiry" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#e5ddd4]">
                <div className="text-[#5a7a5a]">{item.icon}</div>
                <span className="text-sm text-[#2c2c2c]/80">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step by Step Guide */}
        <div className="mb-16">
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-4xl text-[#2c2c2c] mb-8"
          >
            Create Your <span className="italic text-[#5a7a5a]">Admin User</span>
          </h2>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 border border-[#e5ddd4] shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#5a7a5a] text-white flex items-center justify-center shrink-0 font-semibold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#2c2c2c] mb-3">
                    Go to Supabase Dashboard
                  </h3>
                  <p className="text-[#2c2c2c]/60 mb-4">
                    Open your Supabase project dashboard and navigate to the Authentication section.
                  </p>
                  <a
                    href="https://supabase.com/dashboard/project/vnrjuoedmumtjonqyrzl/auth/users"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#5a7a5a] text-white rounded-full hover:bg-[#4a6a4a] transition-colors text-sm cursor-pointer"
                  >
                    Open Supabase Dashboard
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 border border-[#e5ddd4] shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#5a7a5a] text-white flex items-center justify-center shrink-0 font-semibold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#2c2c2c] mb-3">
                    Add a New User
                  </h3>
                  <ul className="space-y-2 text-[#2c2c2c]/60 mb-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={18} className="text-[#5a7a5a] shrink-0 mt-0.5" />
                      <span>Click the <strong>"Add User"</strong> button</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={18} className="text-[#5a7a5a] shrink-0 mt-0.5" />
                      <span>Choose <strong>"Create new user"</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Mail size={18} className="text-[#5a7a5a] shrink-0 mt-0.5" />
                      <span>Enter your admin email (e.g., <code className="bg-[#f0f0f0] px-2 py-0.5 rounded text-sm">garima@yogawithgarima.com</code>)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Key size={18} className="text-[#5a7a5a] shrink-0 mt-0.5" />
                      <span>Create a secure password (minimum 6 characters)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={18} className="text-green-600 shrink-0 mt-0.5" />
                      <span><strong>Important:</strong> Check <strong>"Auto Confirm User"</strong></span>
                    </li>
                  </ul>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <p className="text-sm text-amber-900">
                      <strong>⚠️ Don't forget:</strong> Make sure to check "Auto Confirm User" so you don't need email verification!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 border border-[#e5ddd4] shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#5a7a5a] text-white flex items-center justify-center shrink-0 font-semibold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#2c2c2c] mb-3">
                    Test Your Login
                  </h3>
                  <p className="text-[#2c2c2c]/60 mb-4">
                    Try accessing the protected pages with your new credentials:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="/admin"
                      className="px-6 py-3 bg-[#e8f0e8] text-[#5a7a5a] rounded-full hover:bg-[#5a7a5a] hover:text-white transition-colors text-sm font-medium cursor-pointer"
                    >
                      Test Admin Login
                    </a>
                    <a
                      href="/attendance"
                      className="px-6 py-3 bg-[#e8f0e8] text-[#5a7a5a] rounded-full hover:bg-[#5a7a5a] hover:text-white transition-colors text-sm font-medium cursor-pointer"
                    >
                      Test Attendance Login
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <Shield size={24} className="text-blue-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Security Improvements</h3>
              <div className="text-blue-800 text-sm space-y-2">
                <p><strong>Before:</strong> Hardcoded password "yoga2026" visible in browser code</p>
                <p><strong>Now:</strong> Secure authentication with encrypted passwords, JWT tokens, and backend verification</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-12 border-t border-[#e5ddd4]">
          <h3 className="text-sm tracking-widest uppercase text-[#2c2c2c]/40 mb-4">Quick Links</h3>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://supabase.com/docs/guides/auth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#5a7a5a] hover:underline cursor-pointer"
            >
              Supabase Auth Documentation →
            </a>
            <a
              href="https://supabase.com/dashboard/project/vnrjuoedmumtjonqyrzl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#5a7a5a] hover:underline cursor-pointer"
            >
              Your Supabase Dashboard →
            </a>
            <a
              href="/"
              className="text-sm text-[#5a7a5a] hover:underline cursor-pointer"
            >
              Back to Home →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
