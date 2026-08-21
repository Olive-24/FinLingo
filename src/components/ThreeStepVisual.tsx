import React from 'react';
import { Mic, BookOpenCheck, LineChart, ArrowRight } from 'lucide-react';
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
      badgeClass: 'icon-badge-teal',
      iconColor: 'text-[#0F7173]',
    },
    {
      stepNum: '02',
      icon: BookOpenCheck,
      title: 'Samjho (Understand)',
      subtitle: t.understandTitle,
      desc: t.understandDesc,
      badgeClass: 'icon-badge-marigold',
      iconColor: 'text-[#F5A623]',
    },
    {
      stepNum: '03',
      icon: LineChart,
      title: 'Simulate Karo (Simulate)',
      subtitle: t.simulateTitle,
      desc: t.simulateDesc,
      badgeClass: 'icon-badge-mint',
      iconColor: 'text-[#2ECC91]',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#FBF7F2] relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F7173]/10 border border-[#0F7173]/20 text-[#0F7173] text-xs font-bold mb-3">
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2B2B2B] tracking-tight mb-3">
            {t.title}
          </h2>
          <p className="text-[#6B6B6B] text-base">
            {t.subtitle}
          </p>
        </div>

        {/* 3-Step Equal-Width Card Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stepsList.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="card-surface p-8 relative flex flex-col justify-between hover:scale-102 transition-all bg-white border border-slate-100"
              >
                <div className="space-y-4">
                  {/* Icon in 48px Circular Badge Motif */}
                  <div className="flex items-center justify-between">
                    <div className={`icon-badge ${step.badgeClass}`}>
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="text-3xl font-black text-slate-300 font-mono tracking-tight">
                      {step.stepNum}
                    </span>
                  </div>

                  {/* 2-3 Word Bold Label & Short Supporting Sentence */}
                  <div>
                    <h3 className="text-xl font-extrabold text-[#2B2B2B] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#6B6B6B] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between text-xs font-bold text-[#0F7173]">
                  <span>Step {step.stepNum}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bottom Callout */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenOnboarding}
            className="btn btn-primary px-8 py-3.5 text-base font-bold shadow-md"
          >
            <span>Try the 3-Step Assistant Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
