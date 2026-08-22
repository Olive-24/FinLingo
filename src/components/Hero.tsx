import React from 'react';
import { ArrowRight, Mic, CheckCircle2, ShieldCheck, Languages, Building2, Volume2 } from 'lucide-react';
import type { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Button, Card, Badge, MicroLabel } from './ui/Primitives';

interface HeroProps {
  currentLang: LanguageCode;
  onOpenOnboarding: () => void;
  onOpenB2BModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onOpenOnboarding, onOpenB2BModal }) => {
  const t = TRANSLATIONS[currentLang].hero;

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-[#EEE9DF] text-[#1B2632] relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* LEFT COLUMN: Narrative & Editorial Headline */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            {/* Top Micro-label Pill */}
            <div className="inline-flex items-center gap-2">
              <Badge variant="default" icon={<Mic className="w-3.5 h-3.5 text-[#A35139]" />}>
                {t.badge}
              </Badge>
            </div>

            {/* Editorial Serif Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-[1.25] tracking-tight mb-4 text-[#1B2632]">
                Apni bhasha mein{' '}
                <span className="text-[#A35139] underline decoration-[#A35139]/20 underline-offset-8">
                  paison ki samajh
                </span>
              </h1>
              <div className="font-indic text-xl sm:text-2xl font-bold text-[#5C6B7A] tracking-tight">
                अपनी भाषा में पैसों की समझ
              </div>
            </div>

            {/* Subtext */}
            <p className="text-sm md:text-base leading-relaxed text-[#5C6B7A] mb-4 max-w-2xl mx-auto lg:mx-0 font-normal">
              {t.subTitle}
            </p>

            {/* Button Component Pair */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button variant="primary" size="lg" onClick={onOpenOnboarding}>
                <span>Start Free</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Button variant="secondary" size="lg" onClick={onOpenB2BModal}>
                <Building2 className="w-4 h-4 text-[#A35139]" />
                <span>For Banks & NBFCs</span>
              </Button>
            </div>

            {/* Trust Indicator Pill Row */}
            <div className="pt-6 border-t border-[#E6D2C8] flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Badge variant="outline" icon={<Languages className="w-3.5 h-3.5 text-[#8C7378]" />}>
                10+ Regional Languages
              </Badge>
              <Badge variant="outline" icon={<CheckCircle2 className="w-3.5 h-3.5 text-[#8C7378]" />}>
                Zero Bank Jargon
              </Badge>
              <Badge variant="outline" icon={<ShieldCheck className="w-3.5 h-3.5 text-[#8C7378]" />}>
                100% Safe Sandbox
              </Badge>
            </div>
          </div>

          {/* RIGHT COLUMN: Structure-First Panel (Styled like Reference Topology Panel) */}
          <div className="lg:col-span-5">
            <Card padding="md" className="space-y-5 bg-[#FBF2EC] border-[#E6D2C8] shadow-xl">
              {/* Card Header Micro-label */}
              <div className="flex items-center justify-between border-b border-[#E6D2C8] pb-3">
                <MicroLabel>ACTIVE VOICE SESSION</MicroLabel>
                <Badge variant="maroon">LIVE DEMO</Badge>
              </div>

              {/* Nested Sub-card 1: User Voice Question */}
              <div className="p-4 rounded-2xl bg-[#F4E6DF]/80 border border-[#E6D2C8] space-y-1.5">
                <MicroLabel>RAMESH (SALARIED • HINDI)</MicroLabel>
                <p className="text-xs sm:text-sm font-semibold text-[#2A1A20] italic">
                  "Agar main ₹2,500 har mahine bachaaoon 5 saal ke liye, toh bacchon ki college tuition ke liye kitna milega?"
                </p>
              </div>

              {/* Arrow Connector */}
              <div className="flex justify-center text-[#8C7378]">
                <ArrowRight className="w-4 h-4 rotate-90" />
              </div>

              {/* Nested Sub-card 2: AI Vernacular Answer */}
              <div className="p-4 rounded-2xl bg-[#FBF2EC] border-2 border-[#3B2530] space-y-2">
                <div className="flex items-center justify-between">
                  <MicroLabel className="text-[#3B2530]">FINLINGO AI ANSWER</MicroLabel>
                  <div className="flex items-center gap-1 text-[10px] text-[#8C7378] font-mono">
                    <Volume2 className="w-3 h-3 text-[#3B2530]" />
                    <span>AUDIO READY</span>
                  </div>
                </div>
                <p className="text-xs text-[#2A1A20] leading-relaxed font-medium">
                  Ramesh ji, ₹2,500 mahine ki SIP se 12% returns par 5 saal mein aapka ₹1.5 Lakh ka nivesh ban jayega <span className="font-bold text-[#3B2530] font-mono">₹2,06,216</span>!
                </p>
              </div>

              {/* Nested Sub-card 3: Large Bold Stat Number Callout */}
              <div className="p-4 rounded-2xl bg-[#F4E6DF]/80 border border-[#E6D2C8] space-y-1 text-center">
                <MicroLabel>SIMULATED MATURITY VALUE</MicroLabel>
                <div className="text-3xl font-black font-mono text-[#3B2530]">
                  ₹2,06,216
                </div>
                <div className="text-[11px] font-bold text-[#8C7378]">
                  Invested: ₹1.50 Lakh • Wealth Gain: +₹56,216
                </div>
              </div>

              <Button variant="secondary" size="sm" className="w-full" onClick={onOpenOnboarding}>
                <span>Try Voice Assistant in Your Language</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
