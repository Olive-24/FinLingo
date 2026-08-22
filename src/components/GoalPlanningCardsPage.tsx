import React, { useState } from 'react';
import {
  GraduationCap,
  Heart,
  ShieldCheck,
  Home,
  Sun,
  Plus,
  ArrowRight,
  Sparkles,
  ArrowLeft,
  TrendingUp,
} from 'lucide-react';
import type { DetectedGoal, LanguageCode, OccupationType, UserProfile } from '../types';
import { LANGUAGES } from '../data/languages';
import { GoalSimulatorModal } from './GoalSimulatorModal';
import { Card, Badge, Button } from './ui/Primitives';

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
  accentColor: {
    badgeBg: string;
    iconColor: string;
    cardBorder: string;
    hoverBorder: string;
    accentBg: string;
    tagBg: string;
    tagText: string;
    buttonHoverBg: string;
  };
  isCustom?: boolean;
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
  const [tappedCardId, setTappedCardId] = useState<string | null>(null);

  // Helper to calculate 6-month expense target based on occupation
  const getEmergencyTargetByOccupation = (occ: OccupationType = 'salaried'): number => {
    switch (occ) {
      case 'student':
        return 48000; // ₹8,000/mo * 6
      case 'farmer':
        return 90000; // ₹15,000/mo * 6
      case 'gig_worker':
        return 108000; // ₹18,000/mo * 6
      case 'shopkeeper':
        return 150000; // ₹25,000/mo * 6
      case 'micro_entrepreneur':
        return 180000; // ₹30,000/mo * 6
      case 'salaried':
        return 210000; // ₹35,000/mo * 6
      case 'homemaker':
        return 120000; // ₹20,000/mo * 6
      default:
        return 150000; // ₹25,000/mo * 6
    }
  };

  // Helper to get monthly expense label for emergency fund description
  const getEmergencyMonthlyExpenseLabel = (occ: OccupationType = 'salaried'): string => {
    const monthly = Math.round(getEmergencyTargetByOccupation(occ) / 6);
    return `Save for 6 months of expenses (~₹${monthly.toLocaleString('en-IN')}/mo target)`;
  };

  // Curated 5 Accent Color Palettes (Teal, Warm Rose, Mint, Marigold, Sage-Indigo)
  const goalTemplates: GoalCardTemplate[] = [
    {
      id: 'g_education',
      category: 'education',
      title: "Child's Education",
      oneLiner: 'Secure college tuition & degree fees',
      description: 'Build an inflation-protected higher education fund with monthly compounding SIPs.',
      defaultTargetAmount: () => 800000,
      defaultTimeframeYears: 7,
      suggestedMonthlySavings: () => 7200,
      badgeIcon: <GraduationCap className="w-7 h-7 stroke-[2.2]" />,
      accentColor: {
        badgeBg: 'bg-emerald-50 text-emerald-600 border border-emerald-200/60',
        iconColor: 'text-emerald-600',
        cardBorder: 'border-emerald-200/80',
        hoverBorder: 'hover:border-emerald-500 hover:shadow-emerald-500/10',
        accentBg: 'bg-emerald-500/5',
        tagBg: 'bg-emerald-100/70 text-emerald-800',
        tagText: 'text-emerald-700',
        buttonHoverBg: 'group-hover:bg-emerald-600 group-hover:text-white',
      },
    },
    {
      id: 'g_wedding',
      category: 'wedding',
      title: 'Wedding',
      oneLiner: 'Plan venue, jewelry & celebrations',
      description: 'Save for wedding expenses step-by-step without taking high-interest personal loans.',
      defaultTargetAmount: () => 500000,
      defaultTimeframeYears: 5,
      suggestedMonthlySavings: () => 6500,
      badgeIcon: <Heart className="w-7 h-7 stroke-[2.2]" />,
      accentColor: {
        badgeBg: 'bg-rose-50 text-rose-500 border border-rose-200/60',
        iconColor: 'text-rose-500',
        cardBorder: 'border-rose-200/80',
        hoverBorder: 'hover:border-rose-400 hover:shadow-rose-500/10',
        accentBg: 'bg-rose-500/5',
        tagBg: 'bg-rose-100/70 text-rose-800',
        tagText: 'text-rose-700',
        buttonHoverBg: 'group-hover:bg-rose-500 group-hover:text-white',
      },
    },
    {
      id: 'g_emergency',
      category: 'emergency',
      title: 'Emergency Fund',
      oneLiner: getEmergencyMonthlyExpenseLabel(userOccupation),
      description: `Automatically calculated for 6 months of expenses based on your profile as ${userOccupation.replace('_', ' ')}.`,
      defaultTargetAmount: (occ) => getEmergencyTargetByOccupation(occ),
      defaultTimeframeYears: 2,
      suggestedMonthlySavings: (target) => Math.round(target / 24),
      badgeIcon: <ShieldCheck className="w-7 h-7 stroke-[2.2]" />,
      accentColor: {
        badgeBg: 'bg-teal-50 text-[#0F7173] border border-teal-200/60',
        iconColor: 'text-[#0F7173]',
        cardBorder: 'border-teal-200/80',
        hoverBorder: 'hover:border-[#0F7173] hover:shadow-[#0F7173]/10',
        accentBg: 'bg-[#0F7173]/5',
        tagBg: 'bg-teal-100/70 text-teal-900',
        tagText: 'text-[#0F7173]',
        buttonHoverBg: 'group-hover:bg-[#0F7173] group-hover:text-white',
      },
    },
    {
      id: 'g_home',
      category: 'home',
      title: 'Home Down Payment',
      oneLiner: 'Accumulate 20% down payment for house',
      description: 'Build your dream home down payment fund to get lower home loan interest rates.',
      defaultTargetAmount: () => 600000,
      defaultTimeframeYears: 4,
      suggestedMonthlySavings: () => 9500,
      badgeIcon: <Home className="w-7 h-7 stroke-[2.2]" />,
      accentColor: {
        badgeBg: 'bg-amber-50 text-[#D98D15] border border-amber-200/60',
        iconColor: 'text-[#D98D15]',
        cardBorder: 'border-amber-200/80',
        hoverBorder: 'hover:border-[#F5A623] hover:shadow-[#F5A623]/10',
        accentBg: 'bg-[#F5A623]/5',
        tagBg: 'bg-amber-100/80 text-amber-900',
        tagText: 'text-[#D98D15]',
        buttonHoverBg: 'group-hover:bg-[#F5A623] group-hover:text-[#1F1900]',
      },
    },
    {
      id: 'g_retirement',
      category: 'retirement',
      title: 'Retirement',
      oneLiner: 'Build long-term nest egg for post-work life',
      description: 'Create a worry-free retirement corpus that beats inflation and provides monthly passive cashflow.',
      defaultTargetAmount: () => 2500000,
      defaultTimeframeYears: 15,
      suggestedMonthlySavings: () => 5000,
      badgeIcon: <Sun className="w-7 h-7 stroke-[2.2]" />,
      accentColor: {
        badgeBg: 'bg-sky-50 text-sky-700 border border-sky-200/60',
        iconColor: 'text-sky-700',
        cardBorder: 'border-sky-200/80',
        hoverBorder: 'hover:border-sky-500 hover:shadow-sky-500/10',
        accentBg: 'bg-sky-500/5',
        tagBg: 'bg-sky-100/70 text-sky-900',
        tagText: 'text-sky-700',
        buttonHoverBg: 'group-hover:bg-sky-600 group-hover:text-white',
      },
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
      badgeIcon: <Plus className="w-7 h-7 stroke-[2.5]" />,
      accentColor: {
        badgeBg: 'bg-slate-100 text-slate-700 border border-slate-300',
        iconColor: 'text-slate-700',
        cardBorder: 'border-2 border-dashed border-slate-300',
        hoverBorder: 'hover:border-[#0F7173] hover:bg-white',
        accentBg: 'bg-slate-50',
        tagBg: 'bg-slate-200 text-slate-800',
        tagText: 'text-slate-600',
        buttonHoverBg: 'group-hover:bg-[#0F7173] group-hover:text-white',
      },
      isCustom: true,
    },
  ];

  const handleCardClick = (template: GoalCardTemplate) => {
    // 1. Tactile scale-down micro-interaction
    setTappedCardId(template.id);

    // 2. Compute defaults
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

    // 3. 100ms micro-delay for smooth scale-down tactile feedback before opening pre-filled simulator
    setTimeout(() => {
      setTappedCardId(null);
      setSelectedGoalForSim(detectedGoal);
      setIsModalOpen(true);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#F4E6DF] text-[#2A1A20] flex flex-col justify-between selection:bg-[#3B2530] selection:text-white">
      {/* HEADER BAR */}
      <header className="bg-[#F4E6DF]/95 backdrop-blur-md border-b border-[#E6D2C8] sticky top-0 z-40 px-4 py-3.5 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#3B2530] text-white font-black flex items-center justify-center shadow-sm">
                <Sparkles className="w-5 h-5 fill-white/20 stroke-[2.2]" />
              </div>
              <div>
                <h1 className="font-extrabold text-base text-[#2A1A20] tracking-tight flex items-center gap-2 font-sans">
                  <span>Goal-Based Financial Planning</span>
                  <span className="w-2 h-2 rounded-full bg-[#3B2530] animate-pulse" />
                </h1>
                <p className="text-[11px] text-[#8C7378]">
                  Pre-built Templates • Tailored for <span className="font-bold text-[#3B2530] capitalize">{userOccupation.replace('_', ' ')}</span> ({currentLangObj.flag} {currentLangObj.nativeName})
                </p>
              </div>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-3">
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
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="container mx-auto px-4 sm:px-6 py-10 flex-grow max-w-6xl space-y-8">
        {/* Title Callout Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="maroon">RECOMMENDED FOR YOU</Badge>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-[#2A1A20]">
            Pick a Goal to <span className="text-[#3B2530] underline decoration-[#3B2530]/20">Simulate Instantly</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#8C7378] leading-relaxed">
            Realistic baseline values suggested according to your onboarding profile. Tap any card to adjust parameters.
          </p>
        </div>

        {/* RESPONSIVE GRID LAYOUT: 3 cols desktop, 2 cols tablet, 1 col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {goalTemplates.map((template) => {
            const targetAmt = template.defaultTargetAmount(userOccupation);
            const monthlySip = template.suggestedMonthlySavings(targetAmt, template.defaultTimeframeYears);
            const isTapped = tappedCardId === template.id;

            return (
              <Card
                key={template.id}
                onClick={() => handleCardClick(template)}
                variant={template.isCustom ? 'outlined' : 'default'}
                padding="md"
                className={`group relative flex flex-col justify-between select-none ${
                  template.isCustom
                    ? 'border-2 border-dashed border-[#E6D2C8] hover:border-[#3B2530] bg-[#F4E6DF]/60'
                    : 'border-[#E6D2C8] hover:border-[#3B2530]'
                } ${isTapped ? 'scale-[0.98]' : 'scale-100'}`}
              >
                {/* Visual Distinction Tag for Custom vs Template */}
                {template.isCustom ? (
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline">Start Scratch</Badge>
                  </div>
                ) : template.id === 'g_emergency' ? (
                  <div className="absolute top-4 right-4">
                    <Badge variant="maroon">6-Mo Safety</Badge>
                  </div>
                ) : (
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline">{template.defaultTimeframeYears} Yrs</Badge>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Circular Badge Motif at Top of Card */}
                  <div className="w-12 h-12 rounded-full bg-[#3B2530] text-white flex items-center justify-center shadow-sm transition-transform group-hover:scale-110">
                    {template.badgeIcon}
                  </div>

                  {/* Goal Name in Bold */}
                  <div>
                    <h3 className="text-xl font-extrabold text-[#2A1A20] tracking-tight group-hover:text-[#3B2530] transition-colors">
                      {template.title}
                    </h3>

                    {/* Short One-line Description in Muted Text */}
                    <p className="text-xs sm:text-sm text-[#8C7378] mt-1 line-clamp-2 leading-relaxed">
                      {template.oneLiner}
                    </p>
                  </div>

                  {/* Realistic Default Values Summary Callout Box */}
                  {!template.isCustom ? (
                    <div className="p-3.5 rounded-2xl bg-[#F4E6DF] border border-[#E6D2C8] space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#8C7378] font-medium">Suggested Target</span>
                        <span className="font-extrabold font-mono text-[#2A1A20] text-sm">
                          ₹{targetAmt.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#8C7378]">
                        <span>Horizon: {template.defaultTimeframeYears} Years</span>
                        <span className="font-extrabold text-[#3B2530] font-mono">
                          ~₹{monthlySip.toLocaleString('en-IN')}/mo
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-2xl bg-[#F4E6DF] border border-[#E6D2C8] space-y-1 text-center">
                      <div className="text-xs font-bold text-[#2A1A20]">Flexible Goal Builder</div>
                      <div className="text-[11px] text-[#8C7378]">Customize target amount, ROI & duration</div>
                    </div>
                  )}
                </div>

                {/* Card Action Footer with Micro-feedback transition arrow */}
                <div className="pt-6 mt-4 border-t border-[#E6D2C8] flex items-center justify-between text-xs font-bold">
                  <span className="text-[#3B2530] flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{template.isCustom ? 'Create Custom Goal' : 'Simulate Goal'}</span>
                  </span>

                  <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-[#F4E6DF] text-[#3B2530] group-hover:bg-[#3B2530] group-hover:text-white">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* BOTTOM HELP FOOTER BANNER */}
        <div className="mt-12 p-6 rounded-3xl bg-white border border-slate-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="icon-badge icon-badge-marigold !w-12 !h-12 shrink-0">
              <Sparkles className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="font-extrabold text-[#2B2B2B] text-base">
                Prefer to speak in your own language?
              </div>
              <div className="text-xs text-[#6B6B6B]">
                You can also explain your goal by voice in Hindi, Tamil, Telugu, Marathi & more.
              </div>
            </div>
          </div>

          <button
            onClick={onBack}
            className="btn btn-marigold py-3 px-6 text-xs font-bold shadow-md shrink-0 flex items-center gap-2"
          >
            <span>Talk to AI Voice Assistant</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* EMBEDDED SIMULATOR MODAL FOR CARD CLICK */}
      <GoalSimulatorModal
        key={selectedGoalForSim?.id}
        goal={selectedGoalForSim}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostSimulationToChat={(_summary) => {
          setIsModalOpen(false);
          if (onOpenSimulatorWithGoal && selectedGoalForSim) {
            onOpenSimulatorWithGoal(selectedGoalForSim);
          } else {
            onBack();
          }
        }}
        currentLang={currentLang}
      />

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-4 text-xs text-center text-[#6B6B6B]">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-4">
          <span>FinLingo Goal Planner • Vernacular Financial Empowerment</span>
          <button onClick={onBack} className="text-[#0F7173] hover:underline font-bold">
            Return to App
          </button>
        </div>
      </footer>
    </div>
  );
};

export default GoalPlanningCardsPage;
