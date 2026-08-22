import React, { useState } from 'react';
import { Play, Pause, CheckCircle2, Volume2, ShieldCheck, ArrowLeft } from 'lucide-react';
import type { LanguageCode } from '../types';
import { MYTHS_DATA } from '../data/mythsData';
import { LANGUAGES } from '../data/languages';

interface MythBustingSectionProps {
  standalonePage?: boolean;
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  onBack?: () => void;
  onOpenSimulator?: () => void;
  onAskAIWithQuestion?: (questionText: string) => void;
}

export const MythBustingSection: React.FC<MythBustingSectionProps> = ({
  standalonePage = false,
  currentLang,
  onSelectLang,
  onBack,
}) => {
  const [activeMythId, setActiveMythId] = useState<string>(MYTHS_DATA[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const activeMyth = MYTHS_DATA.find((m) => m.id === activeMythId) || MYTHS_DATA[0];

  return (
    <section className={`py-20 ${standalonePage ? 'bg-[#EEE9DF] min-h-screen' : 'bg-[#F4F0E8]/60 border-t border-[#1B2632]/10'} text-[#1B2632]`}>
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Back navigation for standalone page */}
        {standalonePage && onBack && (
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-full bg-white border border-[#C9C1B1] text-xs font-bold text-[#1B2632] flex items-center gap-1.5 hover:bg-[#F4F0E8] transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <select
              value={currentLang}
              onChange={(e) => onSelectLang(e.target.value as LanguageCode)}
              className="px-3 py-1.5 rounded-full bg-white border border-[#C9C1B1] text-xs font-bold text-[#1B2632]"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.nativeName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="bg-[#A35139]/10 text-[#A35139] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider inline-block">
            MYTH-BUSTER ENGINE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#1B2632] leading-[1.25]">
            Financial Myths Busted in Plain Words
          </h2>
          <p className="text-base text-[#5C6B7A] leading-relaxed">
            Fear and misconceptions are the biggest barriers to investing. Tap any question below for a honest, jargon-free breakdown.
          </p>
        </div>

        {/* Horizontal Scrollable Filter Chips */}
        <div className="flex items-center justify-center gap-2.5 overflow-x-auto pb-4 scrollbar-none mb-6">
          {MYTHS_DATA.map((myth) => {
            const isActive = myth.id === activeMythId;
            return (
              <button
                key={myth.id}
                onClick={() => {
                  setActiveMythId(myth.id);
                  setIsPlaying(false);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-[#1B2632] text-white border-[#1B2632] shadow-sm'
                    : 'bg-white text-[#5C6B7A] border-[#C9C1B1] hover:text-[#1B2632]'
                }`}
              >
                {myth.chipLabelVernacular[currentLang] || myth.chipLabelVernacular.hi || myth.question}
              </button>
            );
          })}
        </div>

        {/* Bounded White Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#1B2632]/10 shadow-sm max-w-4xl mx-auto space-y-6">
          
          {/* Active Question */}
          <div className="flex items-start justify-between gap-4 border-b border-[#C9C1B1]/40 pb-4">
            <div>
              <div className="text-[10px] font-bold text-[#A35139] uppercase tracking-wider mb-1">
                POPULAR QUESTION
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1B2632] leading-snug">
                "{activeMyth.chipLabelVernacular[currentLang] || activeMyth.chipLabelVernacular.hi || activeMyth.question}"
              </h3>
            </div>
            
            <div className="shrink-0">
              <span className="bg-[#FFB162]/20 text-[#A35139] px-3 py-1 rounded-full text-xs font-mono font-bold">
                {activeMyth.category}
              </span>
            </div>
          </div>

          {/* Audio Player Bar */}
          <div className="p-3.5 rounded-xl bg-[#F4F0E8] border border-[#C9C1B1]/60 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-full bg-[#1B2632] text-white flex items-center justify-center hover:bg-[#2C3B4D] transition shadow-xs"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <div className="flex items-center gap-1.5 text-[#1B2632] font-semibold">
                <Volume2 className="w-4 h-4 text-[#A35139]" />
                <span>Native Audio 1.0x</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#5C6B7A]">Hindi / Regional Vernacular</span>
          </div>

          {/* Answer Breakdown Text */}
          <div className="space-y-3">
            <p className="text-sm sm:text-base text-[#1B2632] leading-relaxed">
              {activeMyth.answerVernacular[currentLang] || activeMyth.answerVernacular.hi || activeMyth.answer}
            </p>
            
            <div className="bg-[#F4F0E8]/80 p-4 rounded-xl text-xs space-y-1.5 text-[#5C6B7A]">
              <div className="font-bold text-[#1B2632] flex items-center gap-1">
                <span>Key Takeaway:</span>
              </div>
              <p className="leading-relaxed">
                Market risk is manageable over time through diversification and disciplined Monthly SIPs.
              </p>
            </div>
          </div>

          {/* Footer Compliance Badge */}
          <div className="pt-4 border-t border-[#C9C1B1]/40 flex items-center justify-between text-xs text-[#5C6B7A]">
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>SEBI & RBI Transparency Compliant</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#A35139] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Fact</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default MythBustingSection;
