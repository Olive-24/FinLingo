import React, { useState } from 'react';
import { Volume2, ArrowRight, CheckCircle2, User, Briefcase, HelpCircle, Sparkles, Languages, Check } from 'lucide-react';
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
    initialUser.preferredLanguage || 'en'
  );
  const [name, setName] = useState<string>(initialUser.name || '');
  const [ageBracket, setAgeBracket] = useState<AgeBracket>('25-34');
  const [occupation, setOccupation] = useState<OccupationType>('shopkeeper');
  const [financialComfort, setFinancialComfort] =
    useState<FinancialComfortLevel>('beginner');

  // Simulated audio sample player
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

  const currentLangObj = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];

  return (
    <div className="min-h-screen bg-[#090D16] flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Mesh Background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="w-full max-w-2xl glass-panel p-6 sm:p-10 bg-slate-900 border-slate-700 shadow-2xl rounded-3xl relative z-10">
        {/* Top Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step {step} of 3</span>
            </span>
            <span className="text-slate-400">
              {step === 1 && 'Language Selection'}
              {step === 2 && 'Basic Profile'}
              {step === 3 && 'Financial Comfort Level'}
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* SCREEN 1: LANGUAGE SELECTION */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-md mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <Languages className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-white">Choose Your Language</h2>
              <p className="text-xs text-slate-300 mt-1">
                FinLingo will speak and simplify financial concepts in your chosen mother tongue.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {LANGUAGES.map((lang) => {
                const isSelected = selectedLang === lang.code;
                const isPlaying = playingAudioLang === lang.code;

                return (
                  <div
                    key={lang.code}
                    onClick={() => setSelectedLang(lang.code)}
                    className={`p-4 rounded-2xl border cursor-pointer relative transition-all text-center flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-500 shadow-lg shadow-emerald-500/15 scale-102'
                        : 'bg-slate-800/60 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}

                    <div className="text-2xl mb-1">{lang.flag}</div>
                    <div>
                      <div className="text-sm font-bold text-slate-100">{lang.nativeName}</div>
                      <div className="text-[10px] text-slate-400">{lang.name}</div>
                    </div>

                    {/* Audio Sample Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playSampleAudio(lang.code);
                      }}
                      className={`mt-3 py-1 px-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-colors ${
                        isPlaying
                          ? 'bg-emerald-400 text-slate-950 animate-pulse'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300'
                      }`}
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>{isPlaying ? 'Playing...' : 'Audio Sample'}</span>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn btn-primary py-3 px-8 text-sm font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-2 group"
              >
                <span>Next: Profile Info</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 2: BASIC PROFILE INFO */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-md mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-white">Basic Profile Info</h2>
              <p className="text-xs text-slate-300 mt-1">
                Help us personalize loan & savings advice for your lifestyle.
              </p>
            </div>

            <div className="space-y-5 pt-2">
              {/* Name Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Your Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunita Devi or Ramesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              {/* Age Bracket */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Select Age Bracket
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['18-24', '25-34', '35-44', '45-59', '60+'] as AgeBracket[]).map((bracket) => (
                    <button
                      key={bracket}
                      type="button"
                      onClick={() => setAgeBracket(bracket)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        ageBracket === bracket
                          ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/25'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
                      }`}
                    >
                      {bracket} yrs
                    </button>
                  ))}
                </div>
              </div>

              {/* Occupation Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Occupation Type</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'shopkeeper', label: 'Shopkeeper / Kirana', emoji: '🏪' },
                    { id: 'gig_worker', label: 'Gig Worker / Driver', emoji: '🚗' },
                    { id: 'student', label: 'Student', emoji: '🎓' },
                    { id: 'salaried', label: 'Salaried Employee', emoji: '💼' },
                    { id: 'farmer', label: 'Farmer / Agriculture', emoji: '🌾' },
                    { id: 'micro_entrepreneur', label: 'Micro-Entrepreneur', emoji: '🛠️' },
                    { id: 'homemaker', label: 'Homemaker', emoji: '🏡' },
                    { id: 'other', label: 'Other', emoji: '✨' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setOccupation(item.id as OccupationType)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all ${
                        occupation === item.id
                          ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 font-bold'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <span className="text-base">{item.emoji}</span>
                      <span className="leading-tight">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn btn-secondary py-2.5 px-5 text-xs font-bold"
              >
                Back
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="btn btn-primary py-3 px-8 text-sm font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-2 group"
              >
                <span>Next: Financial Comfort</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3: FINANCIAL COMFORT LEVEL */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-md mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center mx-auto mb-3">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-white">Financial Comfort Assessment</h2>
              <p className="text-xs text-slate-300 mt-1">
                "Have you heard of SIPs or mutual funds before?"
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {[
                {
                  id: 'beginner',
                  title: 'No, I am completely new',
                  desc: 'Explain banking terms like I am 10 years old, using simple everyday real-life examples.',
                  badge: 'Zero Jargon Mode',
                },
                {
                  id: 'basic',
                  title: 'I have heard the name, but don\'t know details',
                  desc: 'I know basic savings & bank accounts, but want easy breakdown of SIPs & loans.',
                  badge: 'Guided Learning Mode',
                },
                {
                  id: 'moderate',
                  title: 'Yes, I know FDs & savings, want exact SIP math',
                  desc: 'Give me clear interest calculations, monthly returns, and tenure breakdowns.',
                  badge: 'Standard Simulator Mode',
                },
                {
                  id: 'advanced',
                  title: 'Yes, I understand mutual funds, APR & stocks',
                  desc: 'Provide comprehensive financial metrics, comparisons, and risk profiles.',
                  badge: 'Pro Mode',
                },
              ].map((opt) => {
                const isSelected = financialComfort === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setFinancialComfort(opt.id as FinancialComfortLevel)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-emerald-400 bg-emerald-400' : 'border-slate-500'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-slate-950" />}
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-100">{opt.title}</h4>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          {opt.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-normal leading-relaxed">{opt.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Profile Summary Pill */}
            <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs flex items-center justify-between text-slate-300">
              <div>
                Selected Language: <span className="text-emerald-400 font-bold">{currentLangObj.nativeName}</span> • Profile:{' '}
                <span className="text-indigo-300 font-bold">{name || 'User'} ({occupation})</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn btn-secondary py-2.5 px-5 text-xs font-bold"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleFinishOnboarding}
                className="btn btn-primary py-3.5 px-8 text-sm font-bold shadow-xl shadow-emerald-500/25 flex items-center gap-2 group"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Launch Main Voice Assistant</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
