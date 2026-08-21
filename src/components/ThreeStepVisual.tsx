import React from 'react';
import { Mic, BookOpenCheck, LineChart, CheckCircle2, ArrowRight } from 'lucide-react';
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
      num: '01',
      icon: Mic,
      title: t.speakTitle,
      desc: t.speakDesc,
      color: 'from-emerald-500/20 to-teal-500/10',
      border: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
      accentBg: 'bg-emerald-500/20',
      highlights: ['Voice Recognition in 12+ Languages', 'Accent-Tolerant AI Engine', 'No Typing Required'],
    },
    {
      num: '02',
      icon: BookOpenCheck,
      title: t.understandTitle,
      desc: t.understandDesc,
      color: 'from-indigo-500/20 to-purple-500/10',
      border: 'border-indigo-500/30',
      iconColor: 'text-indigo-400',
      accentBg: 'bg-indigo-500/20',
      highlights: ['Zero Complex Jargon', 'Hidden Fee Transparency', 'Audio & Visual Breakdown'],
    },
    {
      num: '03',
      icon: LineChart,
      title: t.simulateTitle,
      desc: t.simulateDesc,
      color: 'from-teal-500/20 to-emerald-500/10',
      border: 'border-teal-500/30',
      iconColor: 'text-teal-400',
      accentBg: 'bg-teal-500/20',
      highlights: ['Risk-Free Sandbox Testing', 'Stress Test Budget Scenarios', 'Instant EMI recalculation'],
    },
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-4">
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            {t.subtitle}
          </p>
        </div>

        {/* 3 Step Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {stepsList.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className={`glass-panel glass-card-hover p-8 relative overflow-hidden flex flex-col justify-between border ${step.border} bg-slate-900/70`}
              >
                {/* Background Gradient Spot */}
                <div className={`absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br ${step.color} blur-2xl pointer-events-none`} />

                <div>
                  {/* Top Row: Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${step.accentBg} flex items-center justify-center border border-white/10`}>
                      <Icon className={`w-7 h-7 ${step.iconColor}`} />
                    </div>
                    <span className="text-4xl font-black text-slate-700 font-mono tracking-tighter">
                      {step.num}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                {/* Feature Highlights List */}
                <div className="pt-4 border-t border-white/5 space-y-2">
                  {step.highlights.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${step.iconColor} shrink-0`} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenOnboarding}
            className="btn btn-primary px-8 py-3.5 text-sm font-bold shadow-lg shadow-emerald-500/20"
          >
            <span>Try the 3-Step Simulator Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
