import React, { useState, useEffect } from 'react';
import { Mic, Sparkles, Sliders, Play, Pause, Volume2, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AnimatedDemoStripProps {
  currentLang: LanguageCode;
}

export const AnimatedDemoStrip: React.FC<AnimatedDemoStripProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang].demo;

  // Active step state: 1 (Voice), 2 (AI Translation), 3 (Simulator)
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);

  // Simulator live interactive state
  const [loanAmount, setLoanAmount] = useState<number>(50000);
  const [tenureMonths, setTenureMonths] = useState<number>(24);
  const [interestRate, setInterestRate] = useState<number>(14);

  // Auto-play timer for step progression
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep === 3 ? 1 : ((prevStep + 1) as 1 | 2 | 3)));
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  // EMI Calculator logic
  const calculateEMI = (principal: number, annualRate: number, tenure: number) => {
    const monthlyRate = annualRate / 12 / 100;
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  };

  const currentEMI = calculateEMI(loanAmount, interestRate, tenureMonths);
  const totalPayment = currentEMI * tenureMonths;
  const totalInterest = Math.max(0, totalPayment - loanAmount);

  return (
    <section id="how-it-works" className="py-16 md:py-24 relative overflow-hidden bg-slate-950/60 border-y border-white/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-4">
            <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            {t.subtitle}
          </p>
        </div>

        {/* Step Progress Controller Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 max-w-3xl mx-auto">
          <button
            onClick={() => {
              setActiveStep(1);
              setIsAutoplay(false);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeStep === 1
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 scale-105'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>{t.step1Tag}</span>
          </button>

          <button
            onClick={() => {
              setActiveStep(2);
              setIsAutoplay(false);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeStep === 2
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 scale-105'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.step2Tag}</span>
          </button>

          <button
            onClick={() => {
              setActiveStep(3);
              setIsAutoplay(false);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeStep === 3
                ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/30 scale-105'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>{t.step3Tag}</span>
          </button>

          {/* Autoplay Pause / Play Toggle */}
          <button
            onClick={() => setIsAutoplay(!isAutoplay)}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1.5"
            title={isAutoplay ? 'Pause autoplay loop' : 'Resume autoplay loop'}
          >
            {isAutoplay ? <Pause className="w-4 h-4 text-emerald-400" /> : <Play className="w-4 h-4 text-slate-300" />}
            <span className="hidden sm:inline">{isAutoplay ? 'Loop On' : 'Paused'}</span>
          </button>
        </div>

        {/* Demo Stage Container */}
        <div className="max-w-4xl mx-auto glass-panel p-6 sm:p-10 border-slate-800 relative bg-slate-900/90 shadow-2xl rounded-3xl">
          {/* STEP 1: VOICE INPUT STAGE */}
          {activeStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <Mic className="w-5 h-5 text-emerald-400 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{t.step1Title}</h3>
                    <p className="text-xs text-slate-400">{t.step1Desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listening...</span>
                </div>
              </div>

              {/* Voice Speech Bubble Mockup */}
              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/60 relative overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shrink-0 shadow-md">
                    <Mic className="w-6 h-6 text-slate-950" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      User Speech Input
                    </div>
                    <p className="text-base sm:text-lg font-medium text-slate-100 italic leading-relaxed">
                      {t.voiceSample}
                    </p>

                    {/* Animated Waveform Equalizer */}
                    <div className="flex items-center gap-1 pt-2">
                      <div className="waveform-bar" />
                      <div className="waveform-bar" />
                      <div className="waveform-bar" />
                      <div className="waveform-bar" />
                      <div className="waveform-bar" />
                      <div className="waveform-bar" />
                      <div className="waveform-bar" />
                      <div className="waveform-bar" />
                      <span className="text-[11px] text-slate-400 ml-2 font-mono">Audio match 99.4%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transition CTA inside Demo */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    setActiveStep(2);
                    setIsAutoplay(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-emerald-400 flex items-center gap-2 border border-slate-700"
                >
                  <span>See AI Breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: AI JARGON BREAKDOWN STAGE */}
          {activeStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{t.step2Title}</h3>
                    <p className="text-xs text-slate-400">{t.step2Desc}</p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
                  Zero Jargon Engine
                </div>
              </div>

              {/* Jargon Translation Comparison Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Traditional Bank Jargon */}
                <div className="p-5 rounded-2xl bg-red-950/20 border border-red-900/30 space-y-2">
                  <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    Traditional Complex Jargon
                  </div>
                  <ul className="text-xs text-slate-300 space-y-2">
                    <li className="line-through text-slate-400 font-mono">"Floating Rate APR @ 14.0% p.a."</li>
                    <li className="line-through text-slate-400 font-mono">"2% Processing fee + GST 18%"</li>
                    <li className="line-through text-slate-400 font-mono">"Foreclosure penalty 4% on POS"</li>
                  </ul>
                </div>

                {/* FinLingo Vernacular Simplification */}
                <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    FinLingo Vernacular Meaning
                  </div>
                  <p className="text-sm text-slate-100 font-medium leading-relaxed">
                    {t.aiExplanation}
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    setActiveStep(3);
                    setIsAutoplay(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-indigo-300 flex items-center gap-2 border border-slate-700"
                >
                  <span>Test in Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: INTERACTIVE SIMULATOR STAGE */}
          {activeStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center">
                    <Sliders className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{t.step3Title}</h3>
                    <p className="text-xs text-slate-400">{t.step3Desc}</p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold">
                  Safe Sandbox Mode
                </div>
              </div>

              {/* Interactive Simulator Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Sliders Control Panel */}
                <div className="space-y-5 bg-slate-800/50 p-5 rounded-2xl border border-slate-700/60">
                  {/* Loan Amount Slider */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-300">Loan Amount</span>
                      <span className="text-emerald-400 font-mono text-sm">₹{loanAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="200000"
                      step="5000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                    />
                  </div>

                  {/* Tenure Slider */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-300">Tenure (Months)</span>
                      <span className="text-emerald-400 font-mono text-sm">{tenureMonths} Months</span>
                    </div>
                    <input
                      type="range"
                      min="6"
                      max="48"
                      step="6"
                      value={tenureMonths}
                      onChange={(e) => setTenureMonths(Number(e.target.value))}
                    />
                  </div>

                  {/* Interest Rate Slider */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-300">Interest Rate (% p.a.)</span>
                      <span className="text-emerald-400 font-mono text-sm">{interestRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="8"
                      max="24"
                      step="0.5"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                    />
                  </div>
                </div>

                {/* Calculation Output Cards */}
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/40 text-center">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1">
                      Calculated Monthly EMI
                    </div>
                    <div className="text-3xl font-extrabold text-white font-mono">
                      ₹{currentEMI.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Per month for {tenureMonths} months
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Interest</div>
                      <div className="text-sm font-bold text-amber-400 font-mono">
                        ₹{totalInterest.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Payment</div>
                      <div className="text-sm font-bold text-slate-200 font-mono">
                        ₹{totalPayment.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
