import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import type { LanguageCode } from '../types';

interface B2BSectionProps {
  currentLang: LanguageCode;
  onOpenB2BModal: () => void;
}

export const B2BSection: React.FC<B2BSectionProps> = ({ onOpenB2BModal }) => {
  return (
    <section className="py-12 sm:py-20 bg-[#EEE9DF] text-[#1B2632] overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Split Container Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 md:p-12 border border-[#1B2632]/10 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Narrative & Bullets */}
          <div className="space-y-6">
            <span className="bg-[#A35139]/10 text-[#A35139] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider inline-block">
              ENTERPRISE B2B PARTNER CONSOLE
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#1B2632] leading-snug">
              Reach 190M+ Underserved Borrowers in Tier-2/3 India
            </h2>

            <p className="text-sm sm:text-base text-[#5C6B7A] leading-relaxed">
              Banks and NBFCs use FinLingo's white-label voice engine to onboard first-time borrowers, reduce drop-offs, and lower NPA risks.
            </p>

            <ul className="space-y-3 text-xs sm:text-sm text-[#1B2632]">
              <li className="flex items-center gap-2.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Multi-lingual voice guidance in 10+ regional Indian dialects</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pre-packaged SIP & Loan EMI simulators for easy customer onboarding</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Aggregate anonymized analytical dashboards for risk benchmarking</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenB2BModal}
                className="bg-[#1B2632] hover:bg-[#2C3B4D] text-white px-7 py-3.5 rounded-full text-sm font-semibold transition inline-flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto cursor-pointer"
              >
                <span>Request White-Label Demo →</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Clean Stacked Metric Stat Boxes */}
          <div className="space-y-4">
            
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F4F0E8] border border-[#C9C1B1]/60 flex items-center justify-between gap-4">
              <div>
                <div className="text-2xl sm:text-4xl font-serif font-bold text-[#1B2632] break-words">3.4x</div>
                <div className="text-xs text-[#5C6B7A] font-semibold mt-1">Higher Loan Application Conversion</div>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white text-[#A35139] flex items-center justify-center font-bold shadow-xs shrink-0">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#F4F0E8] border border-[#C9C1B1]/60 flex items-center justify-between gap-4">
              <div>
                <div className="text-2xl sm:text-4xl font-serif font-bold text-[#1B2632] break-words">42%</div>
                <div className="text-xs text-[#5C6B7A] font-semibold mt-1">Lower NPA Defaults via Informed Borrowers</div>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white text-[#A35139] flex items-center justify-center font-bold shadow-xs shrink-0">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#F4F0E8] border border-[#C9C1B1]/60 flex items-center justify-between gap-4">
              <div>
                <div className="text-2xl sm:text-4xl font-serif font-bold text-[#1B2632] break-words">190M+</div>
                <div className="text-xs text-[#5C6B7A] font-semibold mt-1">Addressable Vernacular Market in India</div>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white text-[#A35139] flex items-center justify-center font-bold shadow-xs shrink-0">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default B2BSection;
