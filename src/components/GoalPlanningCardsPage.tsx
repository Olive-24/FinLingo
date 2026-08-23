import React, { useState } from 'react';
import {
  GraduationCap,
  Heart,
  ShieldCheck,
  Home,
  Sun,
  Plus,
  ArrowLeft,
} from 'lucide-react';
import type { DetectedGoal, LanguageCode, OccupationType, UserProfile } from '../types';
import { LANGUAGES } from '../data/languages';
import { GoalSimulatorModal } from './GoalSimulatorModal';

interface GoalPlanningCardsPageProps {
  userProfile?: Partial<UserProfile> | null;
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  onBack: () => void;
  onOpenSimulatorWithGoal: (goal: DetectedGoal) => void;
}

export interface GoalCardTemplate {
  id: string;
  category: DetectedGoal['category'] | 'custom';
  title: string;
  oneLiner: string;
  description: string;
  defaultTargetAmount: (occupation?: OccupationType) => number;
  defaultTimeframeYears: number;
  suggestedMonthlySavings: (target: number, years: number) => number;
  badgeIcon: React.ReactNode;
}

export const GoalPlanningCardsPage: React.FC<GoalPlanningCardsPageProps> = ({
  userProfile,
  currentLang,
  onSelectLang,
  onBack,
  onOpenSimulatorWithGoal,
}) => {
  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];
  const userOccupation: OccupationType = userProfile?.occupation || 'salaried';

  // Active modal state if user simulates directly from this page
  const [selectedGoalForSim, setSelectedGoalForSim] = useState<DetectedGoal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const goalTemplates: GoalCardTemplate[] = [
    {
      id: 'g_wedding',
      category: 'wedding',
      title: "Children's Wedding Fund",
      oneLiner: 'Accumulate sum for marriage expenses',
      description: 'Build a secure wedding fund without taking high-interest personal loans or pledging jewelry.',
      defaultTargetAmount: () => 500000,
      defaultTimeframeYears: 7,
      suggestedMonthlySavings: () => 4800,
      badgeIcon: <Heart className="w-5 h-5" />,
    },
    {
      id: 'g_education',
      category: 'education',
      title: "Children's Higher Education",
      oneLiner: 'College fees, engineering & medical funds',
      description: 'Beat annual 10% education inflation by starting early SIPs for professional degree fees.',
      defaultTargetAmount: () => 400000,
      defaultTimeframeYears: 5,
      suggestedMonthlySavings: () => 5200,
      badgeIcon: <GraduationCap className="w-5 h-5" />,
    },
    {
      id: 'g_emergency',
      category: 'emergency',
      title: 'Emergency Buffer Fund',
      oneLiner: '6 months of household living expenses',
      description: 'Keep liquid emergency cash for unexpected medical bills, monsoon crop loss, or repair needs.',
      defaultTargetAmount: () => 150000,
      defaultTimeframeYears: 2,
      suggestedMonthlySavings: () => 5500,
      badgeIcon: <ShieldCheck className="w-5 h-5" />,
    },
    {
      id: 'g_home',
      category: 'home',
      title: 'Home Down Payment',
      oneLiner: 'Accumulate 20% down payment for house',
      description: 'Build your dream home down payment fund to qualify for lower bank home loan interest rates.',
      defaultTargetAmount: () => 600000,
      defaultTimeframeYears: 4,
      suggestedMonthlySavings: () => 9500,
      badgeIcon: <Home className="w-5 h-5" />,
    },
    {
      id: 'g_retirement',
      category: 'retirement',
      title: 'Retirement Nest Egg',
      oneLiner: 'Build long-term nest egg for post-work life',
      description: 'Create a worry-free retirement corpus that beats inflation and provides monthly passive cashflow.',
      defaultTargetAmount: () => 2500000,
      defaultTimeframeYears: 15,
      suggestedMonthlySavings: () => 5000,
      badgeIcon: <Sun className="w-5 h-5" />,
    },
    {
      id: 'g_custom',
      category: 'custom',
      title: 'Custom Goal',
      oneLiner: 'Define your own target, horizon & savings',
      description: 'Start from scratch with custom target values, return parameters, and personalized AI tips.',
      defaultTargetAmount: () => 200000,
      defaultTimeframeYears: 3,
      suggestedMonthlySavings: () => 4500,
      badgeIcon: <Plus className="w-5 h-5" />,
    },
  ];

  const handleCardClick = (template: GoalCardTemplate) => {
    const targetAmount = template.defaultTargetAmount(userOccupation);
    const timeframeYears = template.defaultTimeframeYears;
    const suggestedMonthlySavings = template.suggestedMonthlySavings(targetAmount, timeframeYears);

    const detectedGoal: DetectedGoal = {
      id: template.id,
      title: template.title,
      category: template.category === 'custom' ? 'business' : template.category,
      targetAmount,
      timeframeYears,
      suggestedMonthlySavings,
      description: template.description,
    };

    setSelectedGoalForSim(detectedGoal);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#EEE9DF] text-[#1B2632] flex flex-col items-center selection:bg-[#FFB162]/30 overflow-x-hidden">
      
      {/* 1. TOP HEADER NAVBAR */}
      <header className="w-full border-b border-[#1B2632]/10 bg-[#EEE9DF]/90 backdrop-blur sticky top-0 z-50 py-4 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-full bg-white border border-[#C9C1B1] text-xs font-bold text-[#1B2632] flex items-center gap-1.5 hover:bg-[#F4F0E8] transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Console</span>
            </button>

            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#1B2632] flex items-center justify-center font-bold shrink-0">
                <svg className="w-4 h-4 fill-[#FFB162]" viewBox="0 0 24 24">
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
              </div>
              <span className="font-serif font-bold text-lg text-[#1B2632]">Goal Cards</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={currentLang}
              onChange={(e) => onSelectLang(e.target.value as LanguageCode)}
              className="px-3.5 py-1.5 rounded-full bg-white border border-[#C9C1B1] text-xs font-bold text-[#1B2632] focus:outline-none cursor-pointer"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.nativeName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* 2. MAIN CENTERED CONTENT CANVAS */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 flex flex-col gap-8 sm:gap-12">
        
        {/* Page Header */}
        <div className="w-full text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#A35139] bg-[#A35139]/10 px-3.5 py-1 rounded-full">
            GOAL-BASED SIMULATORS
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1B2632] leading-[1.2]">
            Plan Your Wealth Goals in Plain Terms
          </h1>
          <p className="text-sm sm:text-base text-[#5C6B7A] leading-relaxed">
            Select a pre-configured goal template below. Simulate target amounts, monthly SIP inputs, and expected returns tailored for <strong className="text-[#1B2632] capitalize">{userOccupation.replace('_', ' ')}</strong> in ({currentLangObj.flag} {currentLangObj.nativeName}).
          </p>
        </div>

        {/* Structured Responsive Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {goalTemplates.map((template) => {
            const targetAmount = template.defaultTargetAmount(userOccupation);
            const monthlySavings = template.suggestedMonthlySavings(targetAmount, template.defaultTimeframeYears);

            return (
              <div
                key={template.id}
                className="bg-white rounded-3xl border border-[#1B2632]/10 p-5 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition group space-y-6"
              >
                <div>
                  {/* Top Row: Icon + Horizon Pill */}
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#1B2632] text-white flex items-center justify-center font-bold shadow-xs shrink-0">
                      {template.badgeIcon}
                    </div>
                    <span className="bg-[#FFB162]/20 text-[#A35139] px-3 py-1 rounded-full text-xs font-mono font-bold shrink-0">
                      {template.defaultTimeframeYears} Years Horizon
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1B2632] mb-2 leading-snug">
                    {template.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C6B7A] leading-relaxed mb-6">
                    {template.description}
                  </p>

                  {/* Target Metric Box */}
                  <div className="bg-[#F4F0E8] p-4 rounded-2xl mb-4 flex justify-between items-center text-xs gap-2">
                    <div>
                      <div className="text-[#5C6B7A] font-semibold">Target Corpus</div>
                      <div className="font-serif font-bold text-[#1B2632] text-base sm:text-lg break-words">
                        ₹{targetAmount.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#5C6B7A] font-semibold">Monthly SIP</div>
                      <div className="font-mono font-bold text-emerald-700 text-xs sm:text-sm break-words">
                        ₹{monthlySavings.toLocaleString('en-IN')}/mo
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleCardClick(template)}
                  className="w-full bg-[#1B2632] hover:bg-[#2C3B4D] text-white py-3 rounded-full text-xs font-semibold transition mt-auto cursor-pointer"
                >
                  Simulate Goal →
                </button>
              </div>
            );
          })}
        </div>

      </main>

      {/* Goal Simulator Modal */}
      {selectedGoalForSim && (
        <GoalSimulatorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          goal={selectedGoalForSim}
          currentLang={currentLang}
          onPostSimulationToChat={() => {
            setIsModalOpen(false);
            if (selectedGoalForSim) {
              onOpenSimulatorWithGoal(selectedGoalForSim);
            }
          }}
        />
      )}
    </div>
  );
};

export default GoalPlanningCardsPage;
