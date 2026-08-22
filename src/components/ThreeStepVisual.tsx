import React from 'react';
import { Mic, BookOpenCheck, LineChart, ArrowRight } from 'lucide-react';
import type { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Card, Badge, MicroLabel, Button } from './ui/Primitives';

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
    },
    {
      stepNum: '02',
      icon: BookOpenCheck,
      title: 'Samjho (Understand)',
      subtitle: t.understandTitle,
      desc: t.understandDesc,
    },
    {
      stepNum: '03',
      icon: LineChart,
      title: 'Simulate Karo (Simulate)',
      subtitle: t.simulateTitle,
      desc: t.simulateDesc,
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#F4E6DF] text-[#2A1A20] relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge variant="maroon">{t.badge}</Badge>
          <h2 className="font-serif-display text-3xl sm:text-5xl text-[#2A1A20]">
            Three Steps to <span className="text-[#3B2530] underline decoration-[#3B2530]/20">Financial Clarity</span>
          </h2>
          <p className="text-[#8C7378] text-base font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* 3-STEP EQUAL CARD SEQUENCE WITH CONNECTING LINE */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Connecting Line on Desktop */}
          <div className="hidden md:block absolute top-16 left-[15%] right-[15%] h-0.5 bg-[#E6D2C8] z-0" />

          {stepsList.map((step, idx) => {
            const IconComp = step.icon;

            return (
              <Card
                key={idx}
                padding="lg"
                className="relative z-10 flex flex-col justify-between space-y-6 hover:border-[#3B2530]"
              >
                <div className="space-y-5">
                  {/* Step Header with Large Circular Numbered Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-full bg-[#3B2530] text-white flex items-center justify-center font-mono font-bold text-lg shadow-sm">
                      {step.stepNum}
                    </div>

                    <div className="w-10 h-10 rounded-full bg-[#F4E6DF] border border-[#E6D2C8] flex items-center justify-center text-[#3B2530]">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <MicroLabel>STEP {step.stepNum}</MicroLabel>
                    <h3 className="font-serif-display text-2xl text-[#2A1A20]">
                      {step.title}
                    </h3>
                    <p className="text-xs font-bold text-[#3B2530]">
                      {step.subtitle}
                    </p>
                    <p className="text-xs text-[#8C7378] leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <Button variant="secondary" size="sm" className="w-full" onClick={onOpenOnboarding}>
                  <span>Try Step {step.stepNum}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ThreeStepVisual;
