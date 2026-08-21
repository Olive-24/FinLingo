import React, { useState } from 'react';
import { X, Mic, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import type { LanguageCode } from '../types';
import { LANGUAGES } from '../data/languages';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: LanguageCode;
  onSelectLang: (code: LanguageCode) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onSelectLang,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedGoal, setSelectedGoal] = useState<string>('personal');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) setIsCompleted(true);
  };

  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl glass-panel p-6 sm:p-8 bg-slate-900 border-slate-700 shadow-2xl rounded-3xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isCompleted ? (
          <div>
            {/* Header & Step Indicator */}
            <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">FinLingo Onboarding Flow</h3>
                  <p className="text-[11px] text-slate-400">Step {step} of 3 • Quick 30-Second Setup</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-full ${step >= 1 ? 'bg-emerald-400' : 'bg-slate-700'}`} />
                <div className={`w-2.5 h-2.5 rounded-full ${step >= 2 ? 'bg-emerald-400' : 'bg-slate-700'}`} />
                <div className={`w-2.5 h-2.5 rounded-full ${step >= 3 ? 'bg-emerald-400' : 'bg-slate-700'}`} />
              </div>
            </div>

            {/* STEP 1: SELECT PREFERRED LANGUAGE */}
            {step === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div className="text-center">
                  <h4 className="text-lg font-bold text-white mb-1">Select your preferred audio language</h4>
                  <p className="text-xs text-slate-400">FinLingo will speak and simplify financial terms in this language.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => onSelectLang(lang.code)}
                      className={`p-3.5 rounded-xl border text-center transition-all ${
                        currentLang === lang.code
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold shadow-md shadow-emerald-500/10'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <div className="text-xl mb-1">{lang.flag}</div>
                      <div className="text-xs font-bold">{lang.nativeName}</div>
                      <div className="text-[10px] text-slate-400">{lang.name}</div>
                    </button>
                  ))}
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleNextStep}
                    className="w-full btn btn-primary py-3 text-sm font-bold flex items-center justify-center gap-2"
                  >
                    <span>Continue in {currentLangObj.nativeName}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SELECT FINANCIAL INTENT */}
            {step === 2 && (
              <div className="space-y-5 animate-fade-in">
                <div className="text-center">
                  <h4 className="text-lg font-bold text-white mb-1">What would you like to explore today?</h4>
                  <p className="text-xs text-slate-400">We will tailor your voice simulator and explanations accordingly.</p>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    { id: 'personal', label: 'Personal Loan & Daily EMIs', desc: 'Understand personal loan interest, processing charges & monthly payments.' },
                    { id: 'agri', label: 'Agriculture & KCC Kisan Credit', desc: 'Government subsidized crop loan terms, interest subvention & repayment.' },
                    { id: 'business', label: 'Small Business / MSME Loan', desc: 'Equipment purchase loan, Mudra scheme terms & collateral guidance.' },
                    { id: 'savings', label: 'Savings & Fixed Deposit Compound Return', desc: 'Calculate exact interest earned over time in your native language.' },
                  ].map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => setSelectedGoal(goal.id)}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                        selectedGoal === goal.id
                          ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border mt-1 flex items-center justify-center ${selectedGoal === goal.id ? 'border-emerald-400 bg-emerald-400' : 'border-slate-500'}`}>
                        {selectedGoal === goal.id && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-100">{goal.label}</div>
                        <div className="text-xs text-slate-400 font-normal">{goal.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="btn btn-secondary px-5 py-3 text-xs font-bold"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="flex-1 btn btn-primary py-3 text-sm font-bold flex items-center justify-center gap-2"
                  >
                    <span>Next: Voice Setup</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PHONE & VOICE PREFERENCE */}
            {step === 3 && (
              <div className="space-y-5 animate-fade-in">
                <div className="text-center">
                  <h4 className="text-lg font-bold text-white mb-1">Enter mobile number for free simulator access</h4>
                  <p className="text-xs text-slate-400">No OTP required for demo. Receive audio notes via WhatsApp if enabled.</p>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Mobile Number (India)
                    </label>
                    <div className="flex gap-2">
                      <div className="px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm font-bold text-slate-300 flex items-center gap-1">
                        🇮🇳 +91
                      </div>
                      <input
                        type="tel"
                        placeholder="98765 43210"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-3">
                    <Mic className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="text-xs text-slate-200">
                      Voice input enabled in <span className="text-emerald-400 font-bold">{currentLangObj.nativeName}</span>. Speak anytime!
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="btn btn-secondary px-5 py-3 text-xs font-bold"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="flex-1 btn btn-primary py-3 text-sm font-bold flex items-center justify-center gap-2"
                  >
                    <span>Launch Free Simulator</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Onboarding Success Screen */
          <div className="py-8 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">Welcome to FinLingo!</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Your profile is configured in <span className="text-emerald-400 font-bold">{currentLangObj.nativeName}</span> for{' '}
              <span className="text-teal-300 font-bold">{selectedGoal.toUpperCase()}</span> questions. You can now use the interactive simulator seamlessly.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsCompleted(false);
                  setStep(1);
                  onClose();
                  // Smooth scroll to demo simulator section
                  const el = document.getElementById('how-it-works');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-primary px-8 py-3 text-sm font-bold shadow-lg shadow-emerald-500/20"
              >
                Start Voice & Simulator Demo Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
