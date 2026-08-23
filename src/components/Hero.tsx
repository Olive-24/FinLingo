import React from 'react';
import { ArrowRight, Mic, Building2, Sparkles } from 'lucide-react';
import type { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeroProps {
  currentLang: LanguageCode;
  onOpenOnboarding: () => void;
  onOpenB2BModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onOpenOnboarding, onOpenB2BModal }) => {
  const t = TRANSLATIONS[currentLang].hero;

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-[#EEE9DF] text-[#1B2632] overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: 7 Columns */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Small Pill Tag */}
            <div>
              <span className="bg-[#A35139]/10 text-[#A35139] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 border border-[#A35139]/20">
                <Mic className="w-3.5 h-3.5" />
                <span>VERNACULAR AI PLATFORM</span>
              </span>
            </div>

            {/* H1 Serif Headline */}
            <div>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-medium tracking-tight text-[#1B2632] leading-[1.15] mb-4">
                Apni bhasha mein{' '}
                <span className="text-[#A35139] underline decoration-[#A35139]/20 underline-offset-8">
                  paison ki samajh
                </span>
              </h1>
              <div className="font-indic text-lg sm:text-2xl font-bold text-[#5C6B7A] tracking-tight">
                अपनी भाषा में पैसों की समझ
              </div>
            </div>

            {/* Body Paragraph */}
            <p className="text-sm sm:text-base text-[#5C6B7A] leading-relaxed max-w-2xl">
              {t.subTitle}
            </p>

            {/* CTA Button Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onOpenOnboarding}
                className="bg-[#1B2632] hover:bg-[#2C3B4D] text-white px-7 py-3.5 rounded-full text-sm font-semibold transition flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto cursor-pointer"
              >
                <span>Start Free →</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenB2BModal}
                className="bg-transparent text-[#1B2632] border border-[#C9C1B1] hover:bg-white/80 px-7 py-3.5 rounded-full text-sm font-semibold transition flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-[#A35139]" />
                <span>For Banks & NBFCs</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: 5 Columns (Floating Voice Demo Card) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-5 sm:p-8 rounded-3xl border border-[#1B2632]/10 shadow-lg space-y-4">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-[#C9C1B1]/40 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFB162] animate-pulse shrink-0" />
                  <span className="text-[10px] font-bold text-[#A35139] uppercase tracking-wider truncate">
                    ACTIVE VOICE SESSION • LIVE DEMO
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#5C6B7A] shrink-0">0:14 / 1.0x</span>
              </div>

              {/* Conversation Thread Preview */}
              <div className="space-y-3">
                {/* User Question Bubble */}
                <div className="bg-[#F4F0E8] p-3.5 rounded-2xl border border-[#C9C1B1]/40 space-y-1">
                  <div className="text-[10px] font-bold text-[#5C6B7A]">Ramesh (Salaried • Hindi)</div>
                  <p className="font-indic text-xs sm:text-sm text-[#1B2632] italic font-semibold leading-relaxed">
                    "Agar main ₹2,500 har mahine bachaaoon 5 saal ke liye, toh kitna milega?"
                  </p>
                </div>

                {/* AI Vernacular Breakdown Response */}
                <div className="bg-[#1B2632]/5 p-3.5 rounded-2xl border border-[#1B2632]/15 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-[#1B2632] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#A35139]" />
                      <span>FinLingo AI Breakdown</span>
                    </span>
                    <span className="bg-[#1B2632] text-white px-2 py-0.5 rounded-full text-[9px] font-mono shrink-0">
                      Native Voice Ready
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1B2632] leading-relaxed break-words">
                    ₹2,500/mo SIP par 12% returns se 5 saal mein total amount banega <strong className="text-[#A35139] font-mono font-bold break-words">₹2,06,216</strong>!
                  </p>
                </div>

                {/* Simulated Maturity Value Display */}
                <div className="p-3.5 bg-[#F4F0E8] rounded-2xl border border-[#C9C1B1]/60 flex items-center justify-between text-xs sm:text-sm gap-2">
                  <span className="text-[#5C6B7A] font-semibold">Simulated Maturity</span>
                  <span className="font-serif font-bold text-[#1B2632] text-lg sm:text-xl font-mono break-words text-right">₹2,06,216</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
