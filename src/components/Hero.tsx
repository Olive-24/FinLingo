import React from 'react';
import { ArrowRight, Mic, CheckCircle2, ShieldCheck, Languages, Building2 } from 'lucide-react';
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
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Decorative Mesh Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-indigo-500/10 blur-[110px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 text-center">
        {/* Top Feature Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold mb-8 animate-fade-in shadow-lg shadow-emerald-500/10">
          <Mic className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>{t.badge}</span>
        </div>

        {/* Hero Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-5xl mx-auto mb-6">
          {t.titleStart}{' '}
          <span className="gradient-emerald inline-block drop-shadow-sm">
            {t.titleHighlight}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          {t.subTitle}
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={onOpenOnboarding}
            className="btn btn-primary btn-lg w-full sm:w-auto shadow-xl shadow-emerald-500/25 group"
          >
            <span>{t.startFree}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenB2BModal}
            className="btn btn-secondary btn-lg w-full sm:w-auto text-slate-200 border-slate-700 hover:border-indigo-500/50 hover:bg-indigo-500/10 group"
          >
            <Building2 className="w-5 h-5 text-indigo-400" />
            <span>{t.partnerUs}</span>
          </button>
        </div>

        {/* Key Pillars Badge List */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
          <div className="glass-panel p-4 flex items-center justify-center gap-3 border-emerald-500/20 bg-slate-900/60">
            <Languages className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-slate-200">{t.languagesSupported}</span>
          </div>
          <div className="glass-panel p-4 flex items-center justify-center gap-3 border-emerald-500/20 bg-slate-900/60">
            <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-slate-200">{t.noJargon}</span>
          </div>
          <div className="glass-panel p-4 flex items-center justify-center gap-3 border-emerald-500/20 bg-slate-900/60">
            <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-slate-200">{t.riskFree}</span>
          </div>
        </div>

        {/* Social Proof Bar */}
        <div className="inline-flex items-center gap-3 text-xs sm:text-sm text-slate-400 bg-white/[0.03] px-6 py-2.5 rounded-full border border-white/5">
          <div className="flex -space-x-2 overflow-hidden">
            <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100" alt="User 1" />
            <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="User 2" />
            <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" alt="User 3" />
          </div>
          <span className="font-medium text-slate-300">{t.statsText}</span>
        </div>
      </div>
    </section>
  );
};
