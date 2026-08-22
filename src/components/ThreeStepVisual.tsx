import React from 'react';
import { Mic, BookOpenCheck, LineChart, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import type { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ThreeStepVisualProps {
  currentLang: LanguageCode;
  onOpenOnboarding: () => void;
}

export const ThreeStepVisual: React.FC<ThreeStepVisualProps> = ({ currentLang, onOpenOnboarding }) => {
  const t = TRANSLATIONS[currentLang].steps;

  const stepsList = [
    {
      stepNum: '01',
      icon: Mic,
      title: 'Bolo (Speak)',
      subtitle: t.speakTitle,
      desc: t.speakDesc,
      glowColor: 'from-[#14B8A6] to-[#A855F7]',
      accentColor: '#14B8A6',
    },
    {
      stepNum: '02',
      icon: BookOpenCheck,
      title: 'Samjho (Understand)',
      subtitle: t.understandTitle,
      desc: t.understandDesc,
      glowColor: 'from-[#A855F7] to-[#8B5CF6]',
      accentColor: '#A855F7',
    },
    {
      stepNum: '03',
      icon: LineChart,
      title: 'Simulate Karo (Simulate)',
      subtitle: t.simulateTitle,
      desc: t.simulateDesc,
      glowColor: 'from-[#8B5CF6] to-[#F59E0B]',
      accentColor: '#F59E0B',
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#0A0A0F] relative overflow-hidden text-white">
      {/* AMBIENT GLOW ORB */}
      <div className="orb-teal top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />

      <div className="container mx-auto px-4 relative z-20">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#14B8A6] text-xs font-extrabold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Three Steps to <span className="gradient-text">Financial Freedom</span>
          </h2>
          <p className="text-slate-400 text-base">
            {t.subtitle}
          </p>
        </div>

        {/* 3-STEP GLASS CARDS SEQUENCE WITH CONNECTING GRADIENT LINE */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Animated Connecting Gradient Line for Desktop */}
          <div className="hidden md:block absolute top-24 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-[#14B8A6] via-[#8B5CF6] to-[#F59E0B] opacity-40 z-0" />

          {stepsList.map((step, idx) => {
            const IconComp = step.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="glass-card p-8 bg-[#0A0A0F]/80 border border-white/15 rounded-3xl relative z-10 flex flex-col justify-between space-y-6 hover:border-[#14B8A6]/50 group transition-all"
              >
                <div className="space-y-5">
                  {/* Step Header with Gradient Outlined Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.glowColor} p-0.5 shadow-xl`}>
                      <div className="w-full h-full rounded-[14px] bg-[#0A0A0F] flex items-center justify-center text-white font-black text-xl font-mono">
                        {step.stepNum}
                      </div>
                    </div>

                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-[#14B8A6] group-hover:scale-110 transition-all">
                      <IconComp className="w-6 h-6 stroke-[2.2]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-white group-hover:text-[#14B8A6] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs font-bold text-slate-300">
                      {step.subtitle}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onOpenOnboarding}
                  className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 group-hover:border-[#14B8A6]/30 border border-transparent"
                >
                  <span>Try {step.title.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4 text-[#14B8A6]" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ThreeStepVisual;
