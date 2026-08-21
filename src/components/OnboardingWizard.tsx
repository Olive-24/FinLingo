import React, { useState } from 'react';
import { Volume2, ArrowRight, Check, User, Briefcase, Sparkles } from 'lucide-react';
import type { UserProfile, LanguageCode, AgeBracket, OccupationType, FinancialComfortLevel } from '../types';
import { LANGUAGES } from '../data/languages';

interface OnboardingWizardProps {
  initialUser: Partial<UserProfile>;
  onComplete: (completedProfile: UserProfile) => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  initialUser,
  onComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [playingAudioLang, setPlayingAudioLang] = useState<LanguageCode | null>(null);

  // Profile Form States
  const [selectedLang, setSelectedLang] = useState<LanguageCode>(
    initialUser.preferredLanguage || 'hi'
  );
  const [name, setName] = useState<string>(initialUser.name || '');
  const [ageBracket] = useState<AgeBracket>('25-34');
  const [occupation, setOccupation] = useState<OccupationType>('shopkeeper');
  const [financialComfort, setFinancialComfort] = useState<FinancialComfortLevel>('beginner');

  // Audio sample playback simulation
  const playSampleAudio = (code: LanguageCode) => {
    setPlayingAudioLang(code);
    setTimeout(() => {
      setPlayingAudioLang(null);
    }, 2000);
  };

  const handleFinishOnboarding = () => {
    const fullProfile: UserProfile = {
      id: initialUser.id || `user_${Date.now()}`,
      phone: initialUser.phone || '+91 9876543210',
      email: initialUser.email,
      authProvider: initialUser.authProvider || 'phone',
      name: name.trim() || 'Valued User',
      preferredLanguage: selectedLang,
      ageBracket,
      occupation,
      financialComfort,
      isOnboardingCompleted: true,
      createdAt: new Date().toISOString(),
    };

    onComplete(fullProfile);
  };

  const handleSkip = () => {
    handleFinishOnboarding();
  };

  const currentLangObj = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];

  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#2B2B2B] flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#0F7173]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="w-full max-w-2xl card-surface p-8 sm:p-12 bg-white border border-slate-200 shadow-2xl rounded-3xl relative z-10 space-y-8">
        {/* SLIM PROGRESS INDICATOR (3 Small Dots / Thin Progress Bar - No Fractions) */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="icon-badge icon-badge-teal !w-8 !h-8 !min-w-[32px]">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs font-extrabold text-[#0F7173] uppercase tracking-wider">
              FinLingo Setup
            </span>
          </div>

          {/* 3 Slim Dots */}
          <div className="flex items-center gap-2">
            <div className={`h-2 rounded-full transition-all duration-300 ${step >= 1 ? 'w-8 bg-[#0F7173]' : 'w-2 bg-slate-200'}`} />
            <div className={`h-2 rounded-full transition-all duration-300 ${step >= 2 ? 'w-8 bg-[#0F7173]' : 'w-2 bg-slate-200'}`} />
            <div className={`h-2 rounded-full transition-all duration-300 ${step >= 3 ? 'w-8 bg-[#0F7173]' : 'w-2 bg-slate-200'}`} />
          </div>
        </div>

        {/* SCREEN 1: LANGUAGE SELECTION (Large Native Script Cards) */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-md mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2B2B2B]">
                Choose your preferred language
              </h2>
              <p className="text-xs text-[#6B6B6B]">
                FinLingo will speak and explain financial concepts in your mother tongue.
              </p>
            </div>

            {/* Grid of Large Tappable Native Script Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
              {LANGUAGES.map((lang) => {
                const isSelected = selectedLang === lang.code;
                const isPlaying = playingAudioLang === lang.code;

                return (
                  <div
                    key={lang.code}
                    onClick={() => setSelectedLang(lang.code)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer relative transition-all text-center flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#0F7173]/10 border-[#0F7173] shadow-md scale-102'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#0F7173] text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}

                    <div className="text-2xl mb-1">{lang.flag}</div>
                    
                    {/* Large Native Script Text */}
                    <div>
                      <div className="text-xl font-extrabold text-[#2B2B2B] leading-snug">
                        {lang.nativeName}
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                        {lang.name}
                      </div>
                    </div>

                    {/* Audio Sample Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playSampleAudio(lang.code);
                      }}
                      className={`mt-3 py-1 px-2.5 rounded-full text-[10px] font-bold flex items-center justify-center gap-1 transition-colors ${
                        isPlaying
                          ? 'bg-[#F5A623] text-slate-950 animate-pulse'
                          : 'bg-slate-100 hover:bg-slate-200 text-[#0F7173]'
                      }`}
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>{isPlaying ? 'Playing...' : 'Audio'}</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Bottom Primary Button + Skip link */}
            <div className="pt-6 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full btn btn-primary py-4 text-base font-bold shadow-md shadow-[#0F7173]/20 flex items-center justify-center gap-2 group"
              >
                <span>Continue in {currentLangObj.nativeName}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={handleSkip}
                className="text-xs font-semibold text-[#6B6B6B] hover:text-[#0F7173] underline py-1"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 2: PROFILE INFO (Tappable Occupation Icon Chips) */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-md mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2B2B2B]">
                Tell us a bit about yourself
              </h2>
              <p className="text-xs text-[#6B6B6B]">
                This helps FinLingo customize examples specifically for your work.
              </p>
            </div>

            <div className="space-y-6 pt-2">
              {/* Single Name Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B6B] mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#0F7173]" />
                  <span>Your Name</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sunita Devi or Ramesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-white border-2 border-slate-200 text-base font-semibold text-[#2B2B2B] placeholder-slate-400 focus:border-[#0F7173] focus:ring-2 focus:ring-[#0F7173]/20 shadow-sm"
                />
              </div>

              {/* Tappable Occupation Icon Chips (No Dropdown Select Menu) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B6B] mb-3 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#0F7173]" />
                  <span>Select Occupation</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'shopkeeper', label: 'Shopkeeper / Kirana', emoji: '🏪' },
                    { id: 'gig_worker', label: 'Gig Worker / Driver', emoji: '🚗' },
                    { id: 'student', label: 'Student', emoji: '🎓' },
                    { id: 'salaried', label: 'Salaried Employee', emoji: '💼' },
                    { id: 'homemaker', label: 'Homemaker', emoji: '🏡' },
                    { id: 'other', label: 'Other', emoji: '✨' },
                  ].map((item) => {
                    const isSelected = occupation === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setOccupation(item.id as OccupationType)}
                        className={`p-3.5 rounded-2xl border-2 text-left text-xs font-bold flex items-center gap-2.5 transition-all ${
                          isSelected
                            ? 'bg-[#0F7173]/10 border-[#0F7173] text-[#0F7173] shadow-sm'
                            : 'bg-white border-slate-200 text-[#2B2B2B] hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-xl">{item.emoji}</span>
                        <span className="leading-tight">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Action Controls */}
            <div className="pt-6 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-full btn btn-primary py-4 text-base font-bold shadow-md shadow-[#0F7173]/20 flex items-center justify-center gap-2 group"
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={handleSkip}
                className="text-xs font-semibold text-[#6B6B6B] hover:text-[#0F7173] underline py-1"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3: FINANCIAL COMFORT LEVEL (First-Person Option Cards) */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-md mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2B2B2B]">
                How comfortable are you with financial terms?
              </h2>
              <p className="text-xs text-[#6B6B6B]">
                Select the option that best describes you:
              </p>
            </div>

            {/* Large First-Person Option Cards */}
            <div className="space-y-3.5 pt-2">
              {[
                {
                  id: 'beginner',
                  title: "I'm completely new to this",
                  desc: 'Explain banking & loan terms simply, using zero jargon and clear everyday examples.',
                  badge: 'Zero Jargon Mode',
                },
                {
                  id: 'basic',
                  title: "I've heard some terms, but I'm not confident",
                  desc: 'I know basic savings & bank accounts, but want guided explanations before deciding.',
                  badge: 'Guided Mode',
                },
                {
                  id: 'moderate',
                  title: "I understand the basics & want exact numbers",
                  desc: 'Give me clear interest rate calculations, EMI breakdowns, and return math.',
                  badge: 'Standard Mode',
                },
              ].map((opt) => {
                const isSelected = financialComfort === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setFinancialComfort(opt.id as FinancialComfortLevel)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                      isSelected
                        ? 'bg-[#0F7173]/10 border-[#0F7173] shadow-md'
                        : 'bg-white border-slate-200 text-[#2B2B2B] hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-[#0F7173] bg-[#0F7173]' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-extrabold text-[#2B2B2B]">{opt.title}</h4>
                        <span className="text-[10px] font-bold text-[#0F7173] bg-[#0F7173]/10 px-2.5 py-0.5 rounded-full">
                          {opt.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#6B6B6B] font-medium leading-relaxed">{opt.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Action Controls */}
            <div className="pt-6 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={handleFinishOnboarding}
                className="w-full btn btn-primary py-4 text-base font-bold shadow-lg shadow-[#0F7173]/20 flex items-center justify-center gap-2 group"
              >
                <span>Continue & Start Voice Assistant</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={handleSkip}
                className="text-xs font-semibold text-[#6B6B6B] hover:text-[#0F7173] underline py-1"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
