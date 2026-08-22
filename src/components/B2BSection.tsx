import React from 'react';
import { Building2, TrendingUp, ShieldCheck, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import type { LanguageCode } from '../types';

interface B2BSectionProps {
  currentLang: LanguageCode;
  onOpenB2BModal: () => void;
}

export const B2BSection: React.FC<B2BSectionProps> = ({ onOpenB2BModal }) => {
  return (
    <section id="b2b-partners" className="py-24 relative bg-[#0A0A0F] text-white overflow-hidden">
      {/* VIOLET & AMBER AMBIENT BACKGROUND GLOW ORB MIX (SUBTLE TONAL SHIFT FOR B2B AUDIENCE) */}
      <div className="orb-violet top-10 left-10 opacity-30" />
      <div className="orb-amber bottom-10 right-10 opacity-25" />

      <div className="container mx-auto px-4 relative z-20 max-w-6xl">
        <div className="glass-card p-8 sm:p-14 bg-[#0A0A0F]/90 border border-white/15 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Business Value Props */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>Enterprise White-Label Licensing & SDK</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Reach <span className="gradient-text-amber">190M+ underserved customers</span> through one integration
              </h2>

              <p className="text-slate-400 text-base leading-relaxed">
                Empower vernacular borrowers with automated AI voice guidance. Reduce NPA rates, boost lead qualification, and audit compliance for Banks, NBFCs, and MFIs.
              </p>

              {/* Bullet Value Props */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/30">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white">3.4x Higher Vernacular Conversion</h4>
                    <p className="text-xs text-slate-400">Educated borrowers complete credit applications significantly faster.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-white">42% Lower NPA & Default Rates</h4>
                    <p className="text-xs text-slate-400">Borrowers who simulate EMIs have significantly higher on-time repayment.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-violet-500/15 text-violet-400 flex items-center justify-center shrink-0 mt-0.5 border border-violet-500/30">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-white">Plug & Play Vernacular Voice SDK</h4>
                    <p className="text-xs text-slate-400">Embed FinLingo simulator directly into your existing Android & iOS mobile app.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onOpenB2BModal}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-[#14B8A6] text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Request White-Label Demo & API Specs</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Column: Bento-Grid Highlight Stat Trio in Amber Accent */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:border-amber-500/40 transition-colors">
                <div className="text-4xl font-black font-mono text-amber-400">3.4x</div>
                <div className="text-xs font-bold text-white">Credit Application Completion Rate</div>
                <div className="text-[11px] text-slate-400">Verified across rural & semi-urban bank pilot programs</div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:border-emerald-500/40 transition-colors">
                <div className="text-4xl font-black font-mono text-emerald-400">42%</div>
                <div className="text-xs font-bold text-white">Reduction in Loan NPA Defaults</div>
                <div className="text-[11px] text-slate-400">Through clear EMI interest subvention transparency</div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:border-violet-500/40 transition-colors">
                <div className="text-4xl font-black font-mono text-violet-400">190M+</div>
                <div className="text-xs font-bold text-white">Target Vernacular Borrowers in India</div>
                <div className="text-[11px] text-slate-400">8 regional languages supported out-of-the-box</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default B2BSection;
