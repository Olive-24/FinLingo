import React from 'react';
import { ArrowRight, Mic, CheckCircle2, ShieldCheck, Languages, Building2, Volume2, Sparkles, Sliders } from 'lucide-react';
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
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#FBF7F2]">
      {/* Background Soft Mesh Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#0F7173]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT COLUMN: Narrative & Single Unmistakable Primary CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Feature Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F7173]/10 border border-[#0F7173]/20 text-[#0F7173] text-xs font-bold shadow-sm">
              <Mic className="w-4 h-4 text-[#0F7173] animate-pulse" />
              <span>{t.badge}</span>
            </div>

            {/* Primary Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2B2B2B] tracking-tight leading-[1.15]">
                Apni bhasha mein{' '}
                <span className="text-[#0F7173] block sm:inline drop-shadow-sm">
                  paison ki samajh
                </span>
              </h1>
              <div className="text-lg sm:text-xl font-semibold text-[#0F7173]/90">
                अपनी भाषा में पैसों की समझ
              </div>
            </div>

            {/* Subtext in Muted Text */}
            <p className="text-base sm:text-lg text-[#6B6B6B] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {t.subTitle}
            </p>

            {/* Single Unmistakable Primary CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenOnboarding}
                className="btn btn-primary text-lg px-8 py-4 w-full sm:w-auto shadow-lg shadow-[#0F7173]/20 group"
              >
                <span>Start Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenB2BModal}
                className="btn btn-secondary text-sm px-6 py-3.5 w-full sm:w-auto text-[#0F7173] border-[#0F7173]/40 hover:bg-[#0F7173]/10"
              >
                <Building2 className="w-4 h-4" />
                <span>For Banks & NBFCs</span>
              </button>
            </div>

            {/* Trust Stat Strip */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#6B6B6B] font-semibold border-t border-black/5">
              <div className="flex items-center gap-2">
                <div className="icon-badge icon-badge-teal !w-8 !h-8 !min-w-[32px]">
                  <Languages className="w-4 h-4" />
                </div>
                <span>10+ Regional Languages</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="icon-badge icon-badge-marigold !w-8 !h-8 !min-w-[32px]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Zero Bank Jargon</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="icon-badge icon-badge-mint !w-8 !h-8 !min-w-[32px]">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                </div>
                <span>100% Safe Simulation</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Silent Autoplay Demo (Spoken Query -> Transcription -> AI Bubble -> Simulator) */}
          <div className="lg:col-span-5">
            <div className="card-surface p-6 bg-white shadow-xl relative overflow-hidden border border-slate-200 rounded-3xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0F7173]">
                    Live Flow Preview
                  </span>
                </div>
                <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                  Silent Demo Loop
                </span>
              </div>

              {/* Step 1: Voice Speech Bubble */}
              <div className="p-4 rounded-2xl bg-[#FBF7F2] border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#0F7173]">
                  <span className="flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5 text-[#F5A623]" /> Spoken Voice Input
                  </span>
                  <span className="text-slate-400 font-mono">Hindi Dialect</span>
                </div>
                <p className="text-xs font-semibold text-[#2B2B2B] italic">
                  “मुझे ₹50,000 के पर्सनल लोन पर महीने की EMI समझनी है...”
                </p>
                <div className="flex items-center gap-1 pt-1">
                  <div className="waveform-bar" />
                  <div className="waveform-bar" />
                  <div className="waveform-bar" />
                  <div className="waveform-bar" />
                  <div className="waveform-bar" />
                  <span className="text-[10px] text-slate-400 font-mono ml-1">Live Transcription</span>
                </div>
              </div>

              {/* Step 2: AI Simplified Explanation */}
              <div className="p-4 rounded-2xl bg-[#0F7173]/10 border border-[#0F7173]/20 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#0F7173]">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> AI Zero-Jargon Answer
                  </span>
                  <Volume2 className="w-3.5 h-3.5 text-[#0F7173]" />
                </div>
                <p className="text-xs text-[#2B2B2B] font-medium leading-relaxed">
                  Personal Loan ₹50,000 @ 14% p.a. over 2 years → Monthly EMI: ₹2,401. Total Interest: ₹7,624. Zero prepayment penalty!
                </p>
              </div>

              {/* Step 3: Animated Simulator Chart Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 space-y-2 text-center">
                <div className="flex items-center justify-between text-[11px] font-bold text-emerald-800">
                  <span className="flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-emerald-600" /> EMI Simulator Chart
                  </span>
                  <span className="text-emerald-700 font-mono text-[10px]">Calculated</span>
                </div>
                <div className="text-2xl font-black text-[#2B2B2B] font-mono">
                  ₹2,401<span className="text-xs text-slate-500 font-normal">/month</span>
                </div>
                <button
                  onClick={onOpenOnboarding}
                  className="w-full py-2 rounded-xl bg-[#2ECC91] hover:bg-emerald-500 text-[#073622] font-extrabold text-xs transition-colors shadow-sm"
                >
                  Simulate Live Sandbox
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
