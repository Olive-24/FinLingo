import React, { useState, useEffect } from 'react';
import { ArrowRight, Mic, CheckCircle2, ShieldCheck, Languages, Building2, Sparkles, Sliders, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import type { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeroProps {
  currentLang: LanguageCode;
  onOpenOnboarding: () => void;
  onOpenB2BModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onOpenOnboarding, onOpenB2BModal }) => {
  const t = TRANSLATIONS[currentLang].hero;

  // Mouse Spotlight Effect State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-[#0A0A0F] text-[#E4E4E7]">
      {/* FLOATING AMBIENT BACKGROUND GRADIENT ORBS */}
      <div className="orb-teal top-10 -left-20 opacity-30" />
      <div className="orb-violet top-40 right-0 opacity-25" />

      {/* CURSOR SPOTLIGHT EFFECT */}
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 opacity-40"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(20, 184, 166, 0.12), transparent 80%)`,
        }}
      />

      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT COLUMN: Narrative & Signature CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-7 text-center lg:text-left"
          >
            {/* Top Glowing Feature Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#14B8A6] text-xs font-bold shadow-lg shadow-[#14B8A6]/10 backdrop-blur-md">
              <Mic className="w-4 h-4 text-[#14B8A6] animate-pulse" />
              <span className="tracking-wide">{t.badge}</span>
            </div>

            {/* Primary Headline with Selective Keyword Gradient */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
                Apni bhasha mein{' '}
                <span className="gradient-text block sm:inline">
                  paison ki samajh
                </span>
              </h1>
              <div className="text-xl sm:text-2xl font-bold text-slate-300 tracking-tight">
                अपनी भाषा में पैसों की समझ
              </div>
            </div>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {t.subTitle}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenOnboarding}
                className="btn-gradient text-base px-8 py-4 rounded-full w-full sm:w-auto flex items-center justify-center gap-2 group shadow-xl shadow-[#14B8A6]/20"
              >
                <span>Start Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenB2BModal}
                className="px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 text-sm font-extrabold w-full sm:w-auto transition-all flex items-center justify-center gap-2"
              >
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>For Banks & NBFCs</span>
              </button>
            </div>

            {/* Trust Stat Strip */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-semibold border-t border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#14B8A6]/15 border border-[#14B8A6]/30 flex items-center justify-center text-[#14B8A6]">
                  <Languages className="w-3.5 h-3.5" />
                </div>
                <span>10+ Regional Languages</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Zero Bank Jargon</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>100% Safe Sandbox</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Interactive Floating Glass Frame Preview Device */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Device Glow Aura */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#14B8A6] to-[#8B5CF6] rounded-3xl blur-2xl opacity-25 animate-pulse" />

            {/* Glass Device Frame */}
            <div className="relative glass-card p-6 sm:p-7 space-y-5 bg-[#0A0A0F]/80 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl">
              {/* Device Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-slate-400 ml-2">FinLingo Live Simulation</span>
                </div>
                <div className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                  ACTIVE VOICE SESSION
                </div>
              </div>

              {/* Simulated User Voice Input Bubble */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-bold text-[#14B8A6]">Ramesh (Salaried • Hindi)</span>
                  <span>Audio Record • 0:04</span>
                </div>
                <p className="text-sm font-semibold text-white italic">
                  "Agar main ₹2,500 har mahine bachaaoon 5 saal ke liye, toh bacchon ki college tuition ke liye kitna milega?"
                </p>
              </div>

              {/* AI Vernacular Stream Response */}
              <div className="p-4 rounded-2xl bg-[#14B8A6]/10 border border-[#14B8A6]/25 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#14B8A6] text-slate-950 flex items-center justify-center font-bold">
                      <Sparkles className="w-3.5 h-3.5 fill-slate-950 stroke-none" />
                    </div>
                    <span className="text-xs font-bold text-white">FinLingo AI Answer</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-slate-300">
                    <Volume2 className="w-3 h-3 text-[#14B8A6]" />
                    <span>Hindi Audio</span>
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  Ramesh ji, ₹2,500 mahine ki SIP se 12% returns par 5 saal mein aapka ₹1.5 Lakh ka nivesh ban jayega <span className="font-bold text-[#14B8A6] font-mono">₹2,06,216</span>!
                </p>
              </div>

              {/* Real-time Growth Calculation Box */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span className="flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-[#8B5CF6]" />
                    SIP Growth Calculation
                  </span>
                  <span className="text-emerald-400 font-mono">+₹56,216 Profit</span>
                </div>

                {/* Mini Visual Bar */}
                <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
                  <div className="h-full bg-slate-500 w-[70%]" title="Invested ₹1,50,000" />
                  <div className="h-full bg-[#14B8A6] w-[30%]" title="Wealth Gain ₹56,216" />
                </div>

                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Invested: ₹1.50 Lakh</span>
                  <span className="text-white font-bold">Total: ₹2.06 Lakh</span>
                </div>
              </div>

              <button
                onClick={onOpenOnboarding}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Try Voice Assistant in Your Language</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
