import React, { useState, useEffect } from 'react';
import { Mic, Sparkles, Sliders, Check, AlertTriangle } from 'lucide-react';
import type { LanguageCode } from '../types';
import { Card, Badge, MicroLabel } from './ui/Primitives';

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
    <section id="how-it-works" className="py-24 md:py-32 bg-[#F4E6DF] border-y border-[#E6D2C8] text-[#2A1A20]">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <Badge variant="maroon" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Zero Jargon Engine
          </Badge>

          <h2 className="font-serif-display text-3xl sm:text-5xl text-[#2A1A20]">
            See How FinLingo Replaces <span className="text-[#3B2530] underline decoration-[#3B2530]/20">Bank Jargon</span>
          </h2>
          <p className="text-[#8C7378] text-sm sm:text-base max-w-2xl mx-auto font-normal">
            Traditional banking terms are designed to intimidate. We translate every complex clause into simple, empowering vernacular sentences.
          </p>
        </div>

        {/* Step Controller Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 max-w-3xl mx-auto">
          <Badge
            variant={activeStep === 1 ? 'active' : 'outline'}
            onClick={() => {
              setActiveStep(1);
              setIsAutoplay(false);
            }}
            icon={<Mic className="w-3.5 h-3.5" />}
          >
            1. Vernacular Voice Input
          </Badge>

          <Badge
            variant={activeStep === 2 ? 'active' : 'outline'}
            onClick={() => {
              setActiveStep(2);
              setIsAutoplay(false);
            }}
            icon={<Sparkles className="w-3.5 h-3.5" />}
          >
            2. Zero-Jargon Translation
          </Badge>

          <Badge
            variant={activeStep === 3 ? 'active' : 'outline'}
            onClick={() => {
              setActiveStep(3);
              setIsAutoplay(false);
            }}
            icon={<Sliders className="w-3.5 h-3.5" />}
          >
            3. Interactive Sandbox
          </Badge>
        </div>

        {/* STEP CONTENT 2: TWO SIDE-BY-SIDE CARDS */}
        {activeStep === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* LEFT CARD: TRADITIONAL BANK JARGON (DESATURATED MUTED TREATMENT) */}
            <Card variant="muted" padding="lg" className="space-y-6 opacity-85">
              <div className="border-b border-[#E6D2C8] pb-4 space-y-1">
                <MicroLabel>TRADITIONAL BANK JARGON</MicroLabel>
                <div className="flex items-center gap-2 text-xs font-bold text-[#8C7378]">
                  <AlertTriangle className="w-4 h-4 text-[#8C7378]" />
                  <span>Confusing, legalistic & intimidating terms</span>
                </div>
              </div>

              <div className="space-y-4">
                {jargonComparison.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#F4E6DF] border border-[#E6D2C8] space-y-1">
                    <div className="text-xs font-bold text-[#8C7378] line-through">{item.term}</div>
                    <div className="text-xs text-[#8C7378] font-mono italic">"{item.jargon}"</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* RIGHT CARD: FINLINGO PLAIN MEANING (FULL CREAM & MAROON ACCENT BORDER) */}
            <Card variant="default" padding="lg" className="border-2 border-[#3B2530] space-y-6 shadow-xl relative">
              <div className="border-b border-[#E6D2C8] pb-4 space-y-1">
                <div className="flex items-center justify-between">
                  <MicroLabel className="text-[#3B2530]">FINLINGO PLAIN MEANING</MicroLabel>
                  <Badge variant="active">100% CLEAR</Badge>
                </div>
                <div className="text-xs font-bold text-[#2A1A20]">
                  Zero-jargon vernacular explanations in your language
                </div>
              </div>

              <div className="space-y-4">
                {jargonComparison.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#F4E6DF]/70 border border-[#E6D2C8] space-y-1.5">
                    <div className="text-xs font-extrabold text-[#3B2530] flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>{item.term}</span>
                    </div>
                    <div className="text-xs text-[#2A1A20] leading-relaxed font-medium">
                      "{item.meaning}"
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* STEP CONTENT 1: VOICE INPUT */}
        {activeStep === 1 && (
          <Card padding="lg" className="max-w-2xl mx-auto text-center space-y-6">
            <div className="w-14 h-14 rounded-full bg-[#3B2530] text-white flex items-center justify-center mx-auto shadow-md">
              <Mic className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif-display text-2xl text-[#2A1A20]">Speak Naturally in Your Native Language</h3>
              <p className="text-xs text-[#8C7378]">
                No typing, no complicated financial forms. Just tap and ask your doubt in Hindi, Tamil, Telugu or Marathi.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4E6DF] border border-[#E6D2C8] font-mono text-xs text-[#3B2530] italic font-semibold">
              "Kisan Credit Card par 4% byaaj kaise lagta hai?"
            </div>
          </Card>
        )}

        {/* STEP CONTENT 3: INTERACTIVE SIMULATOR */}
        {activeStep === 3 && (
          <Card padding="lg" className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6D2C8] pb-4">
              <div>
                <MicroLabel>INTERACTIVE CALCULATOR</MicroLabel>
                <h3 className="font-serif-display text-xl text-[#2A1A20] flex items-center gap-2">
                  <span>Loan EMI & Interest Sandbox</span>
                </h3>
              </div>

              <div className="text-right font-mono">
                <MicroLabel>ESTIMATED MONTHLY EMI</MicroLabel>
                <div className="text-3xl font-black text-[#3B2530]">
                  ₹{currentEMI.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-[#2A1A20] font-bold">
                  <span>Loan Amount</span>
                  <span className="font-mono text-[#3B2530]">₹{loanAmount.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={500000}
                  step={5000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="h-2 w-full bg-[#3B2530]/10 rounded-lg appearance-none cursor-pointer accent-[#3B2530]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-[#2A1A20] font-bold">
                  <span>Tenure (Months)</span>
                  <span className="font-mono text-[#3B2530]">{tenureMonths} Months</span>
                </div>
                <input
                  type="range"
                  min={6}
                  max={60}
                  step={6}
                  value={tenureMonths}
                  onChange={(e) => setTenureMonths(Number(e.target.value))}
                  className="h-2 w-full bg-[#3B2530]/10 rounded-lg appearance-none cursor-pointer accent-[#3B2530]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-[#2A1A20] font-bold">
                  <span>Interest Rate</span>
                  <span className="font-mono text-[#3B2530]">{interestRate}% p.a.</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={24}
                  step={0.5}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="h-2 w-full bg-[#3B2530]/10 rounded-lg appearance-none cursor-pointer accent-[#3B2530]"
                />
              </div>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};

export default AnimatedDemoStrip;
