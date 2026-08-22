import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  Pause,
  HelpCircle,
  ArrowRight,
  Sliders,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { LanguageCode } from '../types';
import { LANGUAGES } from '../data/languages';
import { MYTHS_DATA, type MythItem } from '../data/mythsData';

interface MythBustingSectionProps {
  currentLang: LanguageCode;
  onSelectLang?: (lang: LanguageCode) => void;
  onAskAIWithQuestion?: (questionText: string, answerText: string) => void;
  onOpenSimulator?: () => void;
  standalonePage?: boolean;
  onBack?: () => void;
}

export const MythBustingSection: React.FC<MythBustingSectionProps> = ({
  currentLang,
  onSelectLang,
  onAskAIWithQuestion,
  onOpenSimulator,
  standalonePage = false,
  onBack,
}) => {
  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  // Active selected myth item (Default to first myth: "Can I lose money in mutual funds?")
  const [selectedMyth, setSelectedMyth] = useState<MythItem>(MYTHS_DATA[0]);
  const [tappedMythId, setTappedMythId] = useState<string | null>(null);

  // Audio Playback State (TTS)
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);

  // Category filter
  const [activeCategory, setActiveCategory] = useState<'all' | 'safety' | 'returns' | 'legal' | 'budgeting' | 'credit'>('all');

  const filteredMyths = activeCategory === 'all'
    ? MYTHS_DATA
    : MYTHS_DATA.filter((m) => m.category === activeCategory);

  const handleChipTap = (myth: MythItem) => {
    setTappedMythId(myth.id);
    setSelectedMyth(myth);
    setIsPlayingAudio(false);

    setTimeout(() => {
      setTappedMythId(null);
    }, 250);
  };

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const getVernacularQuestion = (myth: MythItem) => {
    const item = myth as any;
    switch (currentLang) {
      case 'hi': return item.questionHindi || myth.question;
      case 'ta': return item.questionTamil || myth.question;
      case 'te': return item.questionTelugu || myth.question;
      case 'mr': return item.questionMarathi || myth.question;
      default: return myth.question;
    }
  };

  const getVernacularAnswer = (myth: MythItem) => {
    const item = myth as any;
    switch (currentLang) {
      case 'hi': return item.answerHindi || myth.answer;
      case 'ta': return item.answerTamil || myth.answer;
      case 'te': return item.answerTelugu || myth.answer;
      case 'mr': return item.answerMarathi || myth.answer;
      default: return myth.answer;
    }
  };

  return (
    <section className={`${standalonePage ? 'min-h-screen bg-[#0A0A0F] py-10' : 'py-20 bg-[#0A0A0F]'} text-white relative overflow-hidden`}>
      {/* AMBIENT GLOW ORB */}
      <div className="orb-teal top-1/3 left-10 opacity-20" />

      <div className="container mx-auto px-4 relative z-20 max-w-5xl">
        {/* STANDALONE PAGE HEADER BAR */}
        {standalonePage && (
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center gap-2 border border-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Workspace</span>
            </button>

            {onSelectLang && (
              <select
                value={currentLang}
                onChange={(e) => onSelectLang(e.target.value as LanguageCode)}
                className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#14B8A6] focus:outline-none cursor-pointer"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-[#0A0A0F] text-white">
                    {lang.flag} {lang.nativeName}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-extrabold backdrop-blur-md">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Myth-Buster & Instant Vernacular Doubts</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Financial Myths <span className="gradient-text-amber">Busted in Plain Words</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Tap any common doubt below for zero-jargon answers in {currentLangObj.nativeName} with audio playback.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {[
            { id: 'all', label: 'All Doubts' },
            { id: 'safety', label: 'Safety & Risk' },
            { id: 'returns', label: 'SIP vs RD' },
            { id: 'legal', label: 'Legal & Safety' },
            { id: 'budgeting', label: 'Low Income' },
            { id: 'credit', label: 'CIBIL Score' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#14B8A6] to-[#8B5CF6] text-white shadow-lg shadow-[#14B8A6]/20'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* HORIZONTALLY SCROLLABLE QUESTION CHIPS AS GLASS PILLS WITH GRADIENT HOVER BORDER */}
        <div className="relative mb-10">
          <div className="flex items-center gap-3 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x px-1">
            {filteredMyths.map((myth) => {
              const isSelected = selectedMyth.id === myth.id;
              const isTapped = tappedMythId === myth.id;
              const vernacularQ = getVernacularQuestion(myth);

              return (
                <button
                  key={myth.id}
                  onClick={() => handleChipTap(myth)}
                  className={`snap-start shrink-0 px-5 py-3 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2.5 backdrop-blur-md shadow-md ${
                    isTapped
                      ? 'bg-gradient-to-r from-[#14B8A6] to-[#8B5CF6] text-white scale-95'
                      : isSelected
                      ? 'bg-gradient-to-r from-[#14B8A6] to-[#8B5CF6] text-white shadow-lg shadow-[#14B8A6]/25 border border-[#14B8A6]'
                      : 'bg-white/5 border border-white/10 text-slate-200 hover:border-[#14B8A6]/50 hover:bg-white/10'
                  }`}
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#14B8A6]'}`} />
                  <span>{vernacularQ}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STREAMED ANSWER DISPLAYED INSIDE A LARGER GLASS PANEL BELOW */}
        <motion.div
          key={selectedMyth.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card p-6 sm:p-9 bg-[#0A0A0F]/90 border border-white/15 rounded-3xl space-y-6 shadow-2xl relative"
        >
          {/* Answer Card Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#14B8A6] to-[#8B5CF6] text-white flex items-center justify-center font-bold shadow-lg shadow-[#14B8A6]/20">
                <Sparkles className="w-6 h-6 fill-white/20" />
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-white">
                  {getVernacularQuestion(selectedMyth)}
                </h3>
                <p className="text-xs text-slate-400">
                  FinLingo Verified Explanation • <span className="text-[#14B8A6] font-bold">{selectedMyth.trustTag}</span>
                </p>
              </div>
            </div>

            {/* MINIMAL WAVEFORM VISUALIZATION AUDIO PLAYBACK CONTROL */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-2 rounded-2xl shrink-0">
              <button
                onClick={toggleAudio}
                className="w-10 h-10 rounded-full bg-[#14B8A6] hover:bg-[#0D9488] text-slate-950 flex items-center justify-center font-bold shadow-md transition-all"
                title={isPlayingAudio ? 'Pause Audio' : 'Listen in Native Language'}
              >
                {isPlayingAudio ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 ml-0.5" />}
              </button>

              {/* Animated Waveform Lines */}
              <div className="flex items-center gap-1 h-6 px-1">
                {[0.4, 0.9, 0.6, 1.0, 0.5, 0.8].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full bg-[#14B8A6] transition-all duration-300 ${
                      isPlayingAudio ? 'animate-pulse' : 'opacity-40'
                    }`}
                    style={{ height: isPlayingAudio ? `${h * 24}px` : '8px' }}
                  />
                ))}
              </div>

              <select
                value={audioSpeed}
                onChange={(e) => setAudioSpeed(Number(e.target.value))}
                className="bg-transparent text-slate-300 text-xs font-mono font-bold focus:outline-none cursor-pointer border-l border-white/10 pl-2"
              >
                <option value={1.0} className="bg-[#0A0A0F]">1.0x</option>
                <option value={1.25} className="bg-[#0A0A0F]">1.25x</option>
                <option value={1.5} className="bg-[#0A0A0F]">1.5x</option>
              </select>
            </div>
          </div>

          {/* Vernacular Answer Text */}
          <div className="space-y-4 text-slate-200">
            <p className="text-base sm:text-lg leading-relaxed font-medium">
              {getVernacularAnswer(selectedMyth)}
            </p>

            {(selectedMyth as any).subventionBreakdown && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs leading-relaxed">
                <span className="font-bold text-amber-300 block mb-1">Government Subsidy Benefit:</span>
                {(selectedMyth as any).subventionBreakdown}
              </div>
            )}
          </div>

          {/* Action Footer Buttons */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
              <span>SEBI & RBI Regulatory Transparency Compliant</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {onOpenSimulator && (
                <button
                  onClick={onOpenSimulator}
                  className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-white/10 transition-all flex items-center justify-center gap-1.5 flex-1 sm:flex-none"
                >
                  <Sliders className="w-4 h-4 text-[#14B8A6]" />
                  <span>Simulate Growth</span>
                </button>
              )}

              {onAskAIWithQuestion && (
                <button
                  onClick={() => onAskAIWithQuestion(getVernacularQuestion(selectedMyth), getVernacularAnswer(selectedMyth))}
                  className="px-6 py-2.5 rounded-full btn-gradient text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 flex-1 sm:flex-none"
                >
                  <span>Ask AI Follow-Up</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MythBustingSection;
