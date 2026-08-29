import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const LoginScreen: React.FC = () => {
  const { login } = useApp();
  const [email, setEmail] = useState('provider@ruralhealth.org');
  const [password, setPassword] = useState('password123');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setShowForgotModal(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-[#f8f9fa] text-[#191c1d]">
      <div className="w-full max-w-md bg-white border-2 border-[#CED4DA] p-6 md:p-8 flex flex-col gap-8 rounded">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center gap-4">
          <span
            className="material-symbols-outlined text-[#001939]"
            style={{ fontSize: '64px', fontVariationSettings: "'FILL' 1" }}
          >
            health_and_safety
          </span>
          <div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-[#001939] font-bold">
              RuralHealth
            </h1>
            <p className="font-body-md text-body-md text-[#5b5f64] mt-2 font-medium">
              Provider Access Portal
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-label-caps text-[#191c1d]" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="provider@ruralhealth.org"
              className="h-12 border border-[#CED4DA] bg-[#f8f9fa] px-4 font-body-lg text-body-lg text-[#191c1d] placeholder:text-[#747780] focus:border-2 focus:border-[#002d5e] focus:outline-none rounded transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="font-label-caps text-label-caps text-[#191c1d]" htmlFor="password">
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setForgotEmail(email);
                  setShowForgotModal(true);
                }}
                className="font-body-md text-sm text-[#002d5e] font-bold hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-12 border border-[#CED4DA] bg-[#f8f9fa] px-4 font-body-lg text-body-lg text-[#191c1d] placeholder:text-[#747780] focus:border-2 focus:border-[#002d5e] focus:outline-none rounded transition-colors"
            />
          </div>

          {/* Quick Demo Credentials hint */}
          <div className="bg-[#f3f4f5] border border-[#CED4DA] p-3 rounded text-xs text-[#5b5f64] flex items-center justify-between">
            <div>
              <span className="font-bold text-[#001939]">Demo Access:</span> Dr. Samuel Tadesse
            </div>
            <button
              type="button"
              onClick={() => {
                setEmail('provider@ruralhealth.org');
                setPassword('alpha123');
              }}
              className="text-[#002d5e] font-bold hover:underline cursor-pointer font-label-caps text-[11px]"
            >
              Autofill
            </button>
          </div>

          <button
            type="submit"
            className="h-12 bg-[#002d5e] hover:bg-[#001939] text-white font-headline-md text-headline-md w-full flex items-center justify-center rounded active:scale-[0.98] transition-all cursor-pointer font-semibold shadow-sm"
          >
            Sign In
          </button>
        </form>

        {/* Secondary Info */}
        <div className="text-center pt-4 border-t border-[#CED4DA]">
          <p className="font-body-md text-sm text-[#43474f]">
            Don't have an account? <br className="md:hidden" /> Contact your facility administrator.
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#CED4DA] p-6 rounded max-w-md w-full">
            <h3 className="font-headline-md text-headline-md text-[#001939] mb-2">Reset Password</h3>
            <p className="font-body-md text-sm text-[#5b5f64] mb-4">
              Enter your registered provider email to receive password recovery instructions.
            </p>
            {resetSent ? (
              <div className="bg-[#E8F5E9] text-[#1E4620] p-4 rounded border border-[#1E4620] font-status-badge text-center mb-4">
                Recovery instructions dispatched to your facility email!
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="provider@ruralhealth.org"
                  className="w-full h-12 border border-[#CED4DA] bg-[#f8f9fa] px-4 font-body-md rounded focus:border-2 focus:border-[#002d5e] focus:outline-none"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-4 py-2 border border-[#CED4DA] text-[#5b5f64] rounded font-label-caps text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#002d5e] text-white rounded font-label-caps text-xs font-bold"
                  >
                    Send Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
