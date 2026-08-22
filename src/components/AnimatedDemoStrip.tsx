import React, { useState, useEffect } from 'react';
import { Mic, Sparkles, Sliders, Check, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import type { LanguageCode } from '../types';

interface AnimatedDemoStripProps {
  currentLang: LanguageCode;
}

export const AnimatedDemoStrip: React.FC<AnimatedDemoStripProps> = () => {

  // Active step state: 1 (Voice), 2 (AI Translation / Jargon Engine), 3 (Simulator)
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(2);
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
    }, 5500);
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

  // Traditional Jargon vs FinLingo Translation Items
  const jargonComparison = [
    {
      term: 'Compounding Frequency & Portfolio Yield',
      jargon: 'Biannual compound interest accrued on capital outlay',
      meaning: 'Aapke jamaa paison par har 6 mahine mein jo byaaj milta hai, woh bhi aage byaaj kamata hai.',
    },
    {
      term: 'KCC Interest Subvention Benefit',
      jargon: '7% p.a. ROI with 3% prompt repayment incentive subvention',
      meaning: 'Kisan Credit Card par waqt par kist bharne par byaaj 7% se ghat kar kewal 4% reh jata hai!',
    },
    {
      term: 'SIP Systematic Installment',
      jargon: 'Monthly Rupee Cost Averaging via NACH Mandate',
      meaning: 'Har mahine bank se chhota amount auto-save hakar mutual funds mein lagta hai.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative overflow-hidden bg-[#111116] border-y border-white/10">
      {/* BACKGROUND GLOW ORB */}
      <div className="orb-violet top-10 right-10 opacity-20" />

      <div className="container mx-auto px-4 relative z-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 text-[#14B8A6] text-xs font-extrabold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zero Jargon Translation Engine</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            See How FinLingo Destroys <span className="gradient-text">Bank Jargon</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Traditional banking terms are designed to intimidate. We translate every complex clause into simple, empowering vernacular sentences.
          </p>
        </div>

        {/* Step Controller Glass Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 max-w-3xl mx-auto">
          <button
            onClick={() => {
              setActiveStep(1);
              setIsAutoplay(false);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              activeStep === 1
                ? 'btn-gradient text-white shadow-lg shadow-[#14B8A6]/20 scale-105'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>1. Vernacular Voice Input</span>
          </button>

          <button
            onClick={() => {
              setActiveStep(2);
              setIsAutoplay(false);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              activeStep === 2
                ? 'btn-gradient text-white shadow-lg shadow-[#14B8A6]/20 scale-105'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>2. Zero-Jargon Translation</span>
          </button>

          <button
            onClick={() => {
              setActiveStep(3);
              setIsAutoplay(false);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              activeStep === 3
                ? 'btn-gradient text-white shadow-lg shadow-[#14B8A6]/20 scale-105'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>3. Interactive Sandbox</span>
          </button>
        </div>

        {/* STEP CONTENT 2: TWO-COLUMN BEFORE/AFTER JARGON COMPARISON */}
        {activeStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          >
            {/* LEFT COLUMN: TRADITIONAL BANK JARGON (DESATURATED GRAYSCALE "OLD, CONFUSING") */}
            <div className="glass-card p-6 sm:p-8 bg-slate-900/40 border border-slate-800 rounded-3xl space-y-5 opacity-75 grayscale hover:grayscale-0 transition-all">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-4 h-4 text-slate-400" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-300">Traditional Bank Jargon</h3>
                  <p className="text-[11px] text-slate-500">Confusing, legalistic & intimidating terms</p>
                </div>
              </div>

              <div className="space-y-4">
                {jargonComparison.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                    <div className="text-xs font-bold text-slate-400 line-through">{item.term}</div>
                    <div className="text-xs text-slate-500 font-mono italic">"{item.jargon}"</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: FINLINGO PLAIN MEANING (FULL VIBRANT COLOR & GRADIENT BORDER "NEW, CLEAR") */}
            <div className="glass-card p-6 sm:p-8 bg-[#0A0A0F]/90 border-2 border-[#14B8A6]/60 rounded-3xl space-y-5 shadow-2xl shadow-[#14B8A6]/10 relative">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#14B8A6] to-[#8B5CF6] text-slate-950 flex items-center justify-center font-bold shadow-md">
                  <Sparkles className="w-4 h-4 fill-slate-950 stroke-none" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                    <span>FinLingo Plain Meaning</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#14B8A6]/20 text-[#14B8A6]">
                      100% CLEAR
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400">Zero-jargon vernacular explanations</p>
                </div>
              </div>

              <div className="space-y-4">
                {jargonComparison.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 hover:border-[#14B8A6]/40 transition-colors">
                    <div className="text-xs font-extrabold text-[#14B8A6] flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>{item.term}</span>
                    </div>
                    <div className="text-xs text-white leading-relaxed font-medium">
                      "{item.meaning}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP CONTENT 1: VOICE INPUT */}
        {activeStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto glass-card p-8 bg-[#0A0A0F]/80 border border-white/15 rounded-3xl text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#14B8A6] to-[#8B5CF6] text-white flex items-center justify-center mx-auto shadow-xl shadow-[#14B8A6]/20 animate-pulse">
              <Mic className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">Speak Naturally in Your Native Language</h3>
              <p className="text-xs text-slate-400">
                No typing, no complicated financial forms. Just tap and ask your doubt in Hindi, Tamil, Telugu or Marathi.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 font-mono text-sm text-[#14B8A6] italic">
              "Kisan Credit Card par 4% byaaj kaise lagta hai?"
            </div>
          </motion.div>
        )}

        {/* STEP CONTENT 3: INTERACTIVE SIMULATOR */}
        {activeStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto glass-card p-6 sm:p-8 bg-[#0A0A0F]/90 border border-white/15 rounded-3xl space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-[#14B8A6]" />
                  <span>Interactive Loan EMI Sandbox</span>
                </h3>
                <p className="text-xs text-slate-400">Drag sliders to simulate loan monthly payments</p>
              </div>

              <div className="text-right font-mono">
                <div className="text-2xl font-black text-[#14B8A6]">
                  ₹{currentEMI.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-400">/mo EMI</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300 font-bold">
                  <span>Loan Amount</span>
                  <span className="font-mono text-[#14B8A6]">₹{loanAmount.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={500000}
                  step={5000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-[#14B8A6] cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300 font-bold">
                  <span>Tenure (Months)</span>
                  <span className="font-mono text-[#14B8A6]">{tenureMonths} Months</span>
                </div>
                <input
                  type="range"
                  min={6}
                  max={60}
                  step={6}
                  value={tenureMonths}
                  onChange={(e) => setTenureMonths(Number(e.target.value))}
                  className="w-full accent-[#14B8A6] cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300 font-bold">
                  <span>Interest Rate</span>
                  <span className="font-mono text-[#14B8A6]">{interestRate}% p.a.</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={24}
                  step={0.5}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-[#14B8A6] cursor-pointer"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AnimatedDemoStrip;
