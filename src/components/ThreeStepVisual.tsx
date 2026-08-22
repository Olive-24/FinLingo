import React from 'react';
import { Mic, BookOpen, Sliders } from 'lucide-react';
import type { LanguageCode } from '../types';

interface ThreeStepVisualProps {
  currentLang: LanguageCode;
  onOpenOnboarding: () => void;
}

export const ThreeStepVisual: React.FC<ThreeStepVisualProps> = ({ onOpenOnboarding }) => {
  return (
    <section id="how-it-works" className="py-20 border-t border-[#1B2632]/10 bg-[#EEE9DF] text-[#1B2632]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Centered Header with mb-12 */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="bg-[#A35139]/10 text-[#A35139] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider inline-block">
            3-STEP SIMPLE GUIDE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#1B2632] leading-[1.25]">
            Three Steps to Financial Clarity
          </h2>
          <p className="text-base text-[#5C6B7A] leading-relaxed">
            No banking manuals or complex formulas. Just speak, listen, and simulate live.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Step 01 */}
          <div className="bg-white p-7 rounded-2xl border border-[#1B2632]/10 shadow-sm flex flex-col justify-between hover:border-[#1B2632]/30 transition space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#1B2632] text-white flex items-center justify-center font-bold">
                  <Mic className="w-5 h-5" />
                </div>
                <span className="bg-[#FFB162]/20 text-[#A35139] px-3 py-1 rounded-full text-xs font-mono font-bold">
                  Step 01
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1B2632] leading-snug">
                Bolo (Speak)
              </h3>

              <p className="text-sm text-[#5C6B7A] leading-relaxed">
                Ask your question naturally in Hindi, Tamil, Telugu, or Marathi. No financial terminology required.
              </p>
            </div>

            <button
              onClick={onOpenOnboarding}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A35139] hover:text-[#1B2632] transition"
            >
              <span>Try Step 01 →</span>
            </button>
          </div>

          {/* Card 2: Step 02 */}
          <div className="bg-white p-7 rounded-2xl border border-[#1B2632]/10 shadow-sm flex flex-col justify-between hover:border-[#1B2632]/30 transition space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#1B2632] text-white flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="bg-[#FFB162]/20 text-[#A35139] px-3 py-1 rounded-full text-xs font-mono font-bold">
                  Step 02
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1B2632] leading-snug">
                Samjho (Understand)
              </h3>

              <p className="text-sm text-[#5C6B7A] leading-relaxed">
                Listen to a clear, zero-jargon audio response explaining terms like interest, tenure, and compounding.
              </p>
            </div>

            <button
              onClick={onOpenOnboarding}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A35139] hover:text-[#1B2632] transition"
            >
              <span>Try Step 02 →</span>
            </button>
          </div>

          {/* Card 3: Step 03 */}
          <div className="bg-white p-7 rounded-2xl border border-[#1B2632]/10 shadow-sm flex flex-col justify-between hover:border-[#1B2632]/30 transition space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#1B2632] text-white flex items-center justify-center font-bold">
                  <Sliders className="w-5 h-5" />
                </div>
                <span className="bg-[#FFB162]/20 text-[#A35139] px-3 py-1 rounded-full text-xs font-mono font-bold">
                  Step 03
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1B2632] leading-snug">
                Simulate Karo
              </h3>

              <p className="text-sm text-[#5C6B7A] leading-relaxed">
                Adjust savings sliders live to visualize growth for child education, wedding funds, or tractor loans.
              </p>
            </div>

            <button
              onClick={onOpenOnboarding}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A35139] hover:text-[#1B2632] transition"
            >
              <span>Try Step 03 →</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ThreeStepVisual;
