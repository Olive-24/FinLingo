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
import type { LanguageCode } from '../types';
import { LANGUAGES } from '../data/languages';
import { MYTHS_DATA, type MythItem } from '../data/mythsData';
import { Card, Badge, MicroLabel, Button } from './ui/Primitives';

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

  // Active selected myth item (Default to first myth)
  const [selectedMyth, setSelectedMyth] = useState<MythItem>(MYTHS_DATA[0]);

  // Audio Playback State (TTS)
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);

  // Category filter
  const [activeCategory, setActiveCategory] = useState<'all' | 'safety' | 'returns' | 'legal' | 'budgeting' | 'credit'>('all');

  const filteredMyths = activeCategory === 'all'
    ? MYTHS_DATA
    : MYTHS_DATA.filter((m) => m.category === activeCategory);

  const handleChipTap = (myth: MythItem) => {
    setSelectedMyth(myth);
    setIsPlayingAudio(false);
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
    <section className={`${standalonePage ? 'min-h-screen bg-[#F4E6DF] py-10' : 'py-24 bg-[#F4E6DF]'} text-[#2A1A20] relative`}>
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        {/* STANDALONE PAGE HEADER BAR */}
        {standalonePage && (
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E6D2C8]">
            <Button variant="secondary" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Workspace</span>
            </Button>

            {onSelectLang && (
              <select
                value={currentLang}
                onChange={(e) => onSelectLang(e.target.value as LanguageCode)}
                className="px-3.5 py-1.5 rounded-full bg-[#FBF2EC] border border-[#E6D2C8] text-xs font-bold text-[#3B2530] focus:outline-none cursor-pointer"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.nativeName}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <Badge variant="maroon" icon={<HelpCircle className="w-3.5 h-3.5" />}>
            Myth-Buster & Instant Vernacular Doubts
          </Badge>

          <h2 className="font-serif-display text-3xl sm:text-5xl text-[#2A1A20]">
            Financial Myths <span className="text-[#3B2530] underline decoration-[#3B2530]/20">Busted in Plain Words</span>
          </h2>
          <p className="text-[#8C7378] text-sm sm:text-base">
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
            <Badge
              key={cat.id}
              variant={activeCategory === cat.id ? 'active' : 'outline'}
              onClick={() => setActiveCategory(cat.id as any)}
            >
              {cat.label}
            </Badge>
          ))}
        </div>

        {/* HORIZONTALLY SCROLLABLE QUESTION CHIPS AS BADGE PILLS */}
        <div className="relative mb-10">
          <div className="flex items-center gap-3 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x px-1">
            {filteredMyths.map((myth) => {
              const isSelected = selectedMyth.id === myth.id;
              const vernacularQ = getVernacularQuestion(myth);

              return (
                <button
                  key={myth.id}
                  onClick={() => handleChipTap(myth)}
                  className={`snap-start shrink-0 px-5 py-3 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-[#3B2530] text-white border-[#3B2530] shadow-md scale-[1.02]'
                      : 'bg-[#FBF2EC] border-[#E6D2C8] text-[#2A1A20] hover:border-[#3B2530]'
                  }`}
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#3B2530]'}`} />
                  <span>{vernacularQ}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STREAMED ANSWER DISPLAYED INSIDE A FULL-WIDTH CARD WITH MICRO-LABEL */}
        <Card padding="lg" className="space-y-6 shadow-xl relative">
          {/* Card Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6D2C8] pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3B2530] text-white flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5 fill-white/20" />
              </div>
              <div>
                <MicroLabel>HONEST VERNACULAR ANSWER</MicroLabel>
                <h3 className="font-extrabold text-base sm:text-lg text-[#2A1A20]">
                  {getVernacularQuestion(selectedMyth)}
                </h3>
              </div>
            </div>

            {/* Audio Playback Control */}
            <div className="flex items-center gap-3 bg-[#F4E6DF] border border-[#E6D2C8] p-2 rounded-2xl shrink-0">
              <button
                onClick={toggleAudio}
                className="w-9 h-9 rounded-full bg-[#3B2530] text-white flex items-center justify-center font-bold shadow-sm transition-transform active:scale-95"
                title={isPlayingAudio ? 'Pause Audio' : 'Listen in Native Language'}
              >
                {isPlayingAudio ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>

              <div className="text-[11px] font-bold text-[#8C7378]">
                {isPlayingAudio ? 'PLAYING AUDIO' : 'NATIVE AUDIO'}
              </div>

              <select
                value={audioSpeed}
                onChange={(e) => setAudioSpeed(Number(e.target.value))}
                className="bg-transparent text-[#3B2530] text-xs font-mono font-bold focus:outline-none cursor-pointer border-l border-[#E6D2C8] pl-2"
              >
                <option value={1.0}>1.0x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
              </select>
            </div>
          </div>

          {/* Vernacular Answer Text */}
          <div className="space-y-4 text-[#2A1A20]">
            <p className="text-base sm:text-lg leading-relaxed font-medium">
              {getVernacularAnswer(selectedMyth)}
            </p>

            {(selectedMyth as any).subventionBreakdown && (
              <div className="p-4 rounded-2xl bg-[#F4E6DF] border border-[#E6D2C8] text-xs leading-relaxed text-[#2A1A20]">
                <MicroLabel className="text-[#3B2530] mb-1">GOVERNMENT SUBSIDY BENEFIT</MicroLabel>
                {(selectedMyth as any).subventionBreakdown}
              </div>
            )}
          </div>

          {/* Action Footer Buttons */}
          <div className="pt-4 border-t border-[#E6D2C8] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#8C7378] flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#3B2530]" />
              <span>SEBI & RBI Regulatory Transparency Compliant</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {onOpenSimulator && (
                <Button variant="secondary" size="sm" onClick={onOpenSimulator}>
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Simulate Growth</span>
                </Button>
              )}

              {onAskAIWithQuestion && (
                <Button variant="primary" size="sm" onClick={() => onAskAIWithQuestion(getVernacularQuestion(selectedMyth), getVernacularAnswer(selectedMyth))}>
                  <span>Ask AI Follow-Up</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default MythBustingSection;
