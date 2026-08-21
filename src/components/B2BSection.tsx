import React from 'react';
import { Building2, TrendingUp, ShieldCheck, Zap, ArrowRight, Award } from 'lucide-react';
import type { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface B2BSectionProps {
  currentLang: LanguageCode;
  onOpenB2BModal: () => void;
}

export const B2BSection: React.FC<B2BSectionProps> = ({ currentLang, onOpenB2BModal }) => {
  const t = TRANSLATIONS[currentLang].b2b;

  return (
    <section id="b2b-partners" className="py-20 relative overflow-hidden bg-gradient-to-b from-[#090D16] via-[#0F172A] to-[#090D16]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Card Banner */}
        <div className="glass-panel p-8 sm:p-14 border-indigo-500/30 bg-slate-900/90 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
                <Building2 className="w-4 h-4 text-indigo-400" />
                <span>{t.badge}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {t.title}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {t.subtitle}
              </p>

              {/* B2B Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">Higher Lead Conversion</h4>
                    <p className="text-[11px] text-slate-400">Educated borrowers complete applications 3.4x faster.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">NPA & Default Reduction</h4>
                    <p className="text-[11px] text-slate-400">Borrowers who simulate EMIs have 42% lower default rates.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">Plug & Play SDK / APIs</h4>
                    <p className="text-[11px] text-slate-400">Embed FinLingo vernacular simulator directly in your mobile app.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <Award className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">RBI Compliance & Audit</h4>
                    <p className="text-[11px] text-slate-400">Full audit trail of transparent vernacular customer disclosures.</p>
                  </div>
                </div>
              </div>

              {/* B2B CTA */}
              <div className="pt-4">
                <button
                  onClick={onOpenB2BModal}
                  className="btn btn-indigo btn-lg shadow-xl shadow-indigo-500/25 group"
                >
                  <Building2 className="w-5 h-5" />
                  <span>{t.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Metrics Cards Column */}
            <div className="lg:col-span-5 space-y-4">
              {/* Metric 1 */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 to-slate-900 border border-indigo-500/30 flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 font-extrabold text-xl">
                  3.4x
                </div>
                <div>
                  <div className="text-2xl font-black text-white">{t.metric1}</div>
                  <div className="text-xs font-medium text-slate-300">{t.metric1Label}</div>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 font-extrabold text-xl">
                  42%
                </div>
                <div>
                  <div className="text-2xl font-black text-white">{t.metric2}</div>
                  <div className="text-xs font-medium text-slate-300">{t.metric2Label}</div>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/40 to-slate-900 border border-teal-500/30 flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-400 shrink-0 font-extrabold text-xl">
                  12+
                </div>
                <div>
                  <div className="text-2xl font-black text-white">{t.metric3}</div>
                  <div className="text-xs font-medium text-slate-300">{t.metric3Label}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
