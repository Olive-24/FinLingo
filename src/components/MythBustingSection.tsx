import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  Pause,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sliders,
  Volume2,
} from 'lucide-react';
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
    // 1. Brief solid teal fill micro-feedback
    setTappedMythId(myth.id);
    setIsPlayingAudio(false);

    // 2. 150ms micro-delay for smooth tap visual before answer streams below
    setTimeout(() => {
      setSelectedMyth(myth);
      setTappedMythId(null);
    }, 150);
  };

  const getMythQuestionLabel = (myth: MythItem): string => {
    return myth.chipLabelVernacular[currentLang] || myth.chipLabelVernacular.hi || myth.chipLabel;
  };

  const getMythAnswerText = (myth: MythItem): string => {
    return myth.answerVernacular[currentLang] || myth.answerVernacular.hi || myth.answer;
  };

  const handleAskAI = () => {
    const q = getMythQuestionLabel(selectedMyth);
    const a = getMythAnswerText(selectedMyth);
    if (onAskAIWithQuestion) {
      onAskAIWithQuestion(q, a);
    }
  };

  return (
    <div className={`w-full ${standalonePage ? 'min-h-screen bg-[#FBF7F2] text-[#2B2B2B] flex flex-col justify-between' : 'space-y-6'}`}>
      {/* STANDALONE PAGE HEADER (if rendered as full page) */}
      {standalonePage && (
        <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-4 py-3.5 shadow-sm">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#2B2B2B] transition-colors text-xs font-bold"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <div className="flex items-center gap-2.5">
                <div className="icon-badge icon-badge-teal !w-9 !h-9 !min-w-[36px]">
                  <HelpCircle className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h1 className="font-extrabold text-base text-[#2B2B2B] tracking-tight flex items-center gap-2">
                    <span>Myth-Busting & Financial Doubts</span>
                    <span className="w-2 h-2 rounded-full bg-[#0F7173] animate-pulse" />
                  </h1>
                  <p className="text-[11px] text-[#6B6B6B]">
                    Instant Honest Answers • <span className="text-[#0F7173] font-bold">{currentLangObj.flag} {currentLangObj.nativeName}</span>
                  </p>
                </div>
              </div>
            </div>

            {onSelectLang && (
              <select
                value={currentLang}
                onChange={(e) => onSelectLang(e.target.value as LanguageCode)}
                className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-[#0F7173] focus:outline-none cursor-pointer shadow-sm"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.nativeName}
                  </option>
                ))}
              </select>
            )}
          </div>
        </header>
      )}

      {/* SECTION CONTENT CONTAINER */}
      <div className={`${standalonePage ? 'container mx-auto px-4 py-8 max-w-4xl flex-1 space-y-8' : 'space-y-6'}`}>
        {/* HEADER BADGE & TITLE */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F7173]/10 border border-[#0F7173]/20 text-[#0F7173] text-xs font-extrabold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Myth-Busting & Trust Builder</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2B2B2B] tracking-tight">
            Common Financial Doubts & Honest Answers
          </h2>

          <p className="text-xs sm:text-sm text-[#6B6B6B]">
            Tap any question chip below to see FinLingo's instant jargon-free breakdown in your language.
          </p>
        </div>

        {/* CATEGORY FILTER PILLS */}
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          {[
            { id: 'all', label: 'All Doubts' },
            { id: 'safety', label: 'Safety & Risk' },
            { id: 'returns', label: 'SIP vs RD / FDs' },
            { id: 'legal', label: 'Legal & Privacy' },
            { id: 'budgeting', label: 'Savings Rules' },
            { id: 'credit', label: 'Loan & CIBIL' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#0F7173] text-white shadow-sm font-bold'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[#0F7173]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* HORIZONTALLY SCROLLABLE ROW OF ROUNDED CHIP BUTTONS */}
        <div className="space-y-2">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#6B6B6B] flex items-center justify-between">
            <span>Tap a question chip to stream answer:</span>
            <span className="text-[#0F7173] text-[10px] font-mono">Scroll horizontal →</span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 px-1 scrollbar-none snap-x">
            {filteredMyths.map((myth) => {
              const isSelected = selectedMyth.id === myth.id;
              const isTapped = tappedMythId === myth.id;
              const chipText = getMythQuestionLabel(myth);

              return (
                <button
                  key={myth.id}
                  onClick={() => handleChipTap(myth)}
                  className={`snap-start shrink-0 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-150 select-none cursor-pointer flex items-center gap-2 shadow-sm ${
                    isTapped || isSelected
                      ? 'bg-[#0F7173] text-white border-2 border-[#0F7173] shadow-md shadow-[#0F7173]/25 scale-95'
                      : 'bg-white text-[#0F7173] border-2 border-[#0F7173]/30 hover:border-[#0F7173] hover:bg-[#0F7173]/5 active:scale-95'
                  }`}
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isSelected || isTapped ? 'text-amber-300' : 'text-[#0F7173]'}`} />
                  <span>{chipText}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ANSWER CONTAINER (USING EXACT AI CHAT BUBBLE STYLING) */}
        <div className="space-y-4 animate-fade-in">
          <div className="flex gap-3 sm:gap-4 items-start">
            {/* AI Brand Avatar Badge (Top-Left of AI Bubble) */}
            <div className="icon-badge icon-badge-teal !w-10 !h-10 !min-w-[40px] shadow-sm mt-1 shrink-0">
              <Sparkles className="w-5 h-5 stroke-[2.2]" />
            </div>

            {/* CHAT BUBBLE WITH ASYMMETRIC SPEECH TAIL (Exact Main App Styling) */}
            <div className="flex-1 bg-[#0F7173]/10 border border-[#0F7173]/20 text-[#2B2B2B] rounded-3xl rounded-tl-sm p-5 sm:p-6 shadow-sm space-y-4">
              {/* Question Header Callout */}
              <div className="pb-3 border-b border-[#0F7173]/15 flex items-center justify-between">
                <h3 className="font-extrabold text-base sm:text-lg text-[#0F7173] flex items-center gap-2">
                  <span>{selectedMyth.question}</span>
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-white/80 border border-[#0F7173]/30 text-[#0F7173] font-mono text-[10px] font-bold shrink-0">
                  {selectedMyth.trustTag}
                </span>
              </div>

              {/* Answer Content Stream */}
              <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line text-[#2B2B2B] font-medium">
                {getMythAnswerText(selectedMyth)}
              </p>

              {/* DUAL-MODE AUDIO PLAYER CONTROL (TTS - Exact Main App Styling) */}
              <div className="pt-3 border-t border-[#0F7173]/15 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className={`p-2 px-3.5 rounded-full flex items-center gap-2 font-bold transition-all ${
                      isPlayingAudio
                        ? 'bg-[#F5A623] text-slate-950 shadow-md animate-pulse'
                        : 'bg-white text-[#0F7173] border border-[#0F7173]/30 hover:border-[#0F7173]'
                    }`}
                  >
                    {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isPlayingAudio ? 'Playing Vernacular Audio...' : 'Listen in Audio'}</span>
                  </button>

                  {/* Audio Speed Controller */}
                  <button
                    onClick={() => setAudioSpeed((prev) => (prev === 1.0 ? 1.25 : prev === 1.25 ? 1.5 : 1.0))}
                    className="px-2.5 py-1 rounded-full bg-white text-[11px] font-mono text-[#6B6B6B] border border-slate-200 hover:border-[#0F7173]"
                  >
                    {audioSpeed}x Speed
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#6B6B6B] font-mono">
                  <Volume2 className="w-3.5 h-3.5 text-[#0F7173]" />
                  <span>Duration: {selectedMyth.audioDuration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ACTIONABLE FOLLOW-UP BUTTONS */}
          <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
            {onOpenSimulator && (
              <button
                onClick={onOpenSimulator}
                className="btn btn-secondary text-xs px-4 py-2.5 border-[#0F7173]/40"
              >
                <Sliders className="w-4 h-4" />
                <span>Test in Interactive Simulator</span>
              </button>
            )}

            <button
              onClick={handleAskAI}
              className="btn btn-primary text-xs px-5 py-2.5 shadow-md flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask FinLingo AI About This Doubt</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* STANDALONE PAGE FOOTER */}
      {standalonePage && (
        <footer className="bg-white border-t border-slate-200 py-4 text-xs text-center text-[#6B6B6B]">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-4">
            <span>FinLingo Trust & Myth-Buster • Apni bhasha mein paison ki samajh</span>
            {onBack && (
              <button onClick={onBack} className="text-[#0F7173] hover:underline font-bold">
                Return to Main App
              </button>
            )}
          </div>
        </footer>
      )}
    </div>
  );
};

export default MythBustingSection;
