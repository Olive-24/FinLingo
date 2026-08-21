import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, ShieldCheck, Sparkles, RefreshCw, X, Lock } from 'lucide-react';
import type { UserProfile, LanguageCode } from '../types';

interface AuthScreenProps {
  onSuccess: (user: Partial<UserProfile>) => void;
  onClose?: () => void;
  currentLang: LanguageCode;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccess, onClose, currentLang }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState<string>('');
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(30);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Countdown timer for OTP resend
  useEffect(() => {
    if (step !== 'otp' || timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp');
      setTimer(30);
      // Pre-fill demo OTP (123456)
      setOtp(['1', '2', '3', '4', '5', '6']);
    }, 800);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance to next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOTP = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      setErrorMsg('Please enter the 6-digit OTP code sent to your phone.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess({
        phone: `+91 ${phone}`,
        authProvider: 'phone',
        preferredLanguage: currentLang,
      });
    }, 900);
  };

  const handleGoogleAuth = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess({
        phone: '+91 9876543210',
        email: 'user.demo@gmail.com',
        name: 'Rahul Sharma',
        authProvider: 'google',
        preferredLanguage: currentLang,
      });
    }, 1000);
  };

  const handleQuickDemoLogin = () => {
    onSuccess({
      phone: '+91 9812345678',
      name: 'Sunita Devi',
      authProvider: 'demo',
      preferredLanguage: currentLang,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg animate-fade-in">
      <div className="relative w-full max-w-md glass-panel p-6 sm:p-8 bg-slate-900 border-slate-700 shadow-2xl rounded-3xl overflow-hidden">
        {/* Close Button if modal */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header Icon */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/25">
            <Sparkles className="w-7 h-7 text-slate-950 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Welcome to FinLingo</h2>
          <p className="text-xs text-slate-400 mt-1">
            Financial understanding in your own language
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-red-300 text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        {/* STEP 1: PHONE NUMBER INPUT */}
        {step === 'phone' ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
                <span>Enter Mobile Number</span>
                <span className="text-[10px] text-emerald-400 font-normal">Fastest for Tier 2/3 Users</span>
              </label>

              <div className="flex gap-2">
                <div className="px-3.5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-sm font-bold text-slate-200 flex items-center gap-1.5 shrink-0">
                  <span className="text-base">🇮🇳</span>
                  <span>+91</span>
                </div>

                <div className="relative flex-1">
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono tracking-wider"
                  />
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn btn-primary py-3.5 text-sm font-bold shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group"
            >
              {isSubmitting ? (
                <span>Sending OTP...</span>
              ) : (
                <>
                  <span>Send OTP Code</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <span className="relative px-3 bg-slate-900 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Or Continue With
              </span>
            </div>

            {/* Google OAuth Backup */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-3 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.27v3.15C3.25 21.3 7.31 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.27C.46 8.23 0 10.06 0 12s.46 3.77 1.27 5.39l4.01-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.61l4.01 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
                />
              </svg>
              <span>Continue with Google Account</span>
            </button>

            {/* Quick Demo Login */}
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2 text-[11px] font-semibold text-emerald-400 hover:underline text-center block"
            >
              ⚡ Instant Quick Demo Login (Skip SMS typing)
            </button>
          </form>
        ) : (
          /* STEP 2: OTP VERIFICATION INPUT */
          <form onSubmit={handleVerifyOTP} className="space-y-5 animate-fade-in">
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800 px-3 py-1 rounded-full mb-2">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>OTP sent to <span className="text-emerald-400 font-mono">+91 {phone}</span></span>
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-[10px] text-slate-400 hover:text-white underline ml-1"
                >
                  Edit
                </button>
              </div>
              <p className="text-xs text-slate-400">
                Enter the 6-digit verification code below:
              </p>
            </div>

            {/* 6 Digit Input Boxes */}
            <div className="flex justify-between gap-2 my-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-11 h-13 text-center text-xl font-bold font-mono rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn btn-primary py-3.5 text-sm font-bold shadow-lg shadow-emerald-500/20"
            >
              {isSubmitting ? 'Verifying OTP...' : 'Verify OTP & Continue'}
            </button>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <button
                type="button"
                disabled={timer > 0}
                onClick={() => setTimer(30)}
                className={`flex items-center gap-1 ${
                  timer > 0 ? 'text-slate-600 cursor-not-allowed' : 'text-emerald-400 hover:underline font-semibold'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Resend OTP</span>
              </button>
              <span className="font-mono text-[11px]">
                {timer > 0 ? `Resend in ${timer}s` : 'Ready'}
              </span>
            </div>
          </form>
        )}

        {/* Security Footer Note */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/70" />
          <span>Encrypted phone verification • Zero spam guaranteed</span>
        </div>
      </div>
    </div>
  );
};
