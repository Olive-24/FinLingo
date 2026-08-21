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

    // Auto-advance focus to next digit box (UPI app convention)
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-box-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOTP = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      setErrorMsg('Please enter all 6 digits of the OTP code.');
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
    }, 800);
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
    }, 900);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090D16]/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md card-surface p-8 sm:p-10 bg-white border border-slate-200 shadow-2xl rounded-3xl overflow-hidden text-[#2B2B2B]">
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-[#2B2B2B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Centered FinLingo Wordmark / Logo Near Top */}
        <div className="text-center mb-8">
          <div className="icon-badge icon-badge-teal mx-auto mb-3 shadow-sm !w-14 !h-14">
            <Sparkles className="w-7 h-7 stroke-[2.2]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2B2B2B] tracking-tight">
            FinLingo
          </h2>
          <p className="text-xs text-[#6B6B6B] mt-1 font-medium">
            Financial understanding in your own language
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-[#E85D5D] text-xs text-center font-bold">
            {errorMsg}
          </div>
        )}

        {/* STEP 1: PHONE NUMBER INPUT */}
        {step === 'phone' ? (
          <form onSubmit={handleSendOTP} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
                Enter Mobile Number
              </label>

              {/* Large Keypad-Friendly Input Field */}
              <div className="flex gap-2.5">
                <div className="px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-base font-extrabold text-[#2B2B2B] flex items-center gap-1.5 shrink-0 shadow-inner">
                  <span className="text-lg">🇮🇳</span>
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
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border-2 border-slate-200 text-lg font-bold font-mono text-[#2B2B2B] placeholder-slate-400 focus:border-[#0F7173] focus:ring-2 focus:ring-[#0F7173]/20 shadow-sm"
                  />
                  <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
                </div>
              </div>
            </div>

            {/* Single Primary Button: Get OTP */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn btn-primary py-4 text-base font-bold shadow-md shadow-[#0F7173]/20 group"
            >
              {isSubmitting ? (
                <span>Sending OTP...</span>
              ) : (
                <>
                  <span>Get OTP</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative px-3 bg-white text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Or
              </span>
            </div>

            {/* Bordered Google OAuth Backup Button */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 text-[#2B2B2B] text-xs font-bold flex items-center justify-center gap-3 transition-all shadow-sm"
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

            {/* Quick Demo Login Link */}
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2 text-xs font-bold text-[#0F7173] hover:underline text-center block"
            >
              ⚡ Instant Demo Login (Skip SMS typing)
            </button>
          </form>
        ) : (
          /* STEP 2: DEDICATED 6 BOXED DIGIT OTP ENTRY SCREEN (UPI App Convention) */
          <form onSubmit={handleVerifyOTP} className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F7173] bg-[#0F7173]/10 px-3 py-1.5 rounded-full">
                <Lock className="w-3.5 h-3.5" />
                <span>OTP sent to +91 {phone}</span>
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-[10px] text-slate-500 hover:text-[#2B2B2B] underline ml-1"
                >
                  Edit
                </button>
              </div>
              <p className="text-xs text-[#6B6B6B]">
                Enter the 6-digit verification code below:
              </p>
            </div>

            {/* 6 Individual Boxed Digit Inputs (UPI Style) */}
            <div className="flex justify-between gap-2 my-6">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-box-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-12 h-14 text-center text-2xl font-black font-mono rounded-2xl bg-slate-50 border-2 border-slate-200 text-[#0F7173] focus:outline-none focus:border-[#0F7173] focus:ring-2 focus:ring-[#0F7173]/20 shadow-sm"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn btn-primary py-4 text-base font-bold shadow-md shadow-[#0F7173]/20"
            >
              {isSubmitting ? 'Verifying...' : 'Verify OTP & Continue'}
            </button>

            <div className="flex items-center justify-between text-xs text-[#6B6B6B] pt-2">
              <button
                type="button"
                disabled={timer > 0}
                onClick={() => setTimer(30)}
                className={`flex items-center gap-1 font-bold ${
                  timer > 0 ? 'text-slate-400 cursor-not-allowed' : 'text-[#0F7173] hover:underline'
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
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-[#6B6B6B]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0F7173]" />
          <span>Encrypted phone verification • Zero spam guaranteed</span>
        </div>
      </div>
    </div>
  );
};
