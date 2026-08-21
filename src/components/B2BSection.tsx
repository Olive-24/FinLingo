import React from 'react';
import { Building2, TrendingUp, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import type { LanguageCode } from '../types';

interface B2BSectionProps {
  currentLang: LanguageCode;
  onOpenB2BModal: () => void;
}

export const B2BSection: React.FC<B2BSectionProps> = ({ onOpenB2BModal }) => {

  return (
    <section id="b2b-partners" className="py-20 relative bg-[#1E2761] text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto p-8 sm:p-14 rounded-3xl bg-[#1E2761] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Business Value Props */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-teal-300 text-xs font-bold">
                <Building2 className="w-4 h-4 text-teal-300" />
                <span>B2B Institutional Licensing</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Reach 190M underserved customers through one integration
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Empower vernacular borrowers with automated AI voice guidance. Reduce NPA rates, boost lead qualification, and audit compliance for Banks, NBFCs, and MFIs.
              </p>

              {/* Bullet Value Props */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">3.4x Higher Vernacular Conversion</h4>
                    <p className="text-xs text-slate-300">Educated borrowers complete credit applications faster.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">42% Lower NPA & Default Rates</h4>
                    <p className="text-xs text-slate-300">Borrowers who simulate EMIs have significantly higher on-time repayment.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Plug & Play Voice SDK</h4>
                    <p className="text-xs text-slate-300">Embed FinLingo vernacular simulator directly into your mobile app.</p>
                  </div>
                </div>
              </div>

              {/* Outlined White Button CTA */}
              <div className="pt-4">
                <button
                  onClick={onOpenB2BModal}
                  className="btn btn-b2b-white text-base font-bold py-3.5 px-8 flex items-center gap-2 group"
                >
                  <Building2 className="w-5 h-5" />
                  <span>Partner With Us</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Column: Stat Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 font-extrabold text-xl font-mono">
                  3.4x
                </div>
                <div>
                  <div className="text-2xl font-black text-white font-mono">3.4x Conversion</div>
                  <div className="text-xs text-slate-300">Vernacular Lead Uplift</div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 font-extrabold text-xl font-mono">
                  42%
                </div>
                <div>
                  <div className="text-2xl font-black text-white font-mono">42% NPA Reduction</div>
                  <div className="text-xs text-slate-300">Fewer Loan Defaults</div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 font-extrabold text-xl font-mono">
                  10+
                </div>
                <div>
                  <div className="text-2xl font-black text-white font-mono">10+ Dialects</div>
                  <div className="text-xs text-slate-300">Indian Vernacular Languages</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
