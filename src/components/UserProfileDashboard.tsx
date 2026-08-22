import React, { useState } from 'react';
import {
  Flame,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Globe,
  Bell,
  ShieldCheck,
  RotateCcw,
  LogOut,
  Sliders,
  TrendingUp,
  Award,
  GraduationCap,
  Heart,
  Home,
  Sun,
  Plus,
  Briefcase,
  Check,
} from 'lucide-react';
import type { UserProfile, LanguageCode, SavedGoalProgress, DetectedGoal, OccupationType } from '../types';
import { LANGUAGES } from '../data/languages';
import { GoalSimulatorModal } from './GoalSimulatorModal';

interface UserProfileDashboardProps {
  userProfile?: Partial<UserProfile> | null;
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  onBack: () => void;
  onLogout?: () => void;
  onReOnboard?: () => void;
  onOpenSimulatorWithGoal?: (goal: DetectedGoal) => void;
  onOpenGoalPlanning?: () => void;
}

export const UserProfileDashboard: React.FC<UserProfileDashboardProps> = ({
  userProfile,
  currentLang,
  onSelectLang,
  onBack,
  onLogout,
  onReOnboard,
  onOpenSimulatorWithGoal,
  onOpenGoalPlanning,
}) => {
  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];
  const user: Partial<UserProfile> = userProfile || {
    name: 'Ramesh Kumar',
    phone: '+91 98765 43210',
    occupation: 'salaried',
    financialComfort: 'basic',
    preferredLanguage: currentLang,
  };

  const userOccupation: OccupationType = user.occupation || 'salaried';

  // Gamified Financial Health Score & Streak State
  const healthScore = 84; // out of 100
  const learningStreakDays = 7;

  // Toggle States for Notifications (De-emphasized Settings)
  const [weeklyTipsEnabled, setWeeklyTipsEnabled] = useState<boolean>(true);
  const [sipRemindersEnabled, setSipRemindersEnabled] = useState<boolean>(true);

  // Default Saved Goals List (Compact Cards)
  const savedGoals: SavedGoalProgress[] = [
    {
      id: 'g_saved_edu',
      title: "Children's Higher Education",
      category: 'education',
      targetAmount: 800000,
      currentSavedAmount: 192000, // 24% completed
      timeframeYears: 7,
      suggestedMonthlySavings: 7200,
      description: 'Mutual fund SIP for college tuition fees.',
      lastUpdated: '2 days ago',
    },
    {
      id: 'g_saved_emerg',
      title: 'Family Emergency Fund',
      category: 'emergency',
      targetAmount: 210000,
      currentSavedAmount: 126000, // 60% completed
      timeframeYears: 2,
      suggestedMonthlySavings: 8750,
      description: '6-month expense safety cushion.',
      lastUpdated: 'Yesterday',
    },
    {
      id: 'g_saved_wedding',
      title: "Daughter's / Son's Wedding",
      category: 'wedding',
      targetAmount: 500000,
      currentSavedAmount: 75000, // 15% completed
      timeframeYears: 5,
      suggestedMonthlySavings: 6500,
      description: 'Gold & venue savings fund without debt.',
      lastUpdated: '3 days ago',
    },
  ];

  // Modal State for simulating a saved goal
  const [selectedGoalForSim, setSelectedGoalForSim] = useState<DetectedGoal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const getGoalIcon = (category: string) => {
    switch (category) {
      case 'education':
        return <GraduationCap className="w-5 h-5 text-emerald-600" />;
      case 'wedding':
        return <Heart className="w-5 h-5 text-rose-500" />;
      case 'emergency':
        return <ShieldCheck className="w-5 h-5 text-[#0F7173]" />;
      case 'home':
        return <Home className="w-5 h-5 text-[#D98D15]" />;
      case 'retirement':
        return <Sun className="w-5 h-5 text-sky-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#0F7173]" />;
    }
  };

  const handleSavedGoalClick = (goal: SavedGoalProgress) => {
    const detectedGoal: DetectedGoal = {
      id: goal.id,
      title: goal.title,
      category: goal.category,
      targetAmount: goal.targetAmount,
      timeframeYears: goal.timeframeYears,
      suggestedMonthlySavings: goal.suggestedMonthlySavings,
      description: goal.description,
    };

    if (onOpenSimulatorWithGoal) {
      onOpenSimulatorWithGoal(detectedGoal);
    } else {
      setSelectedGoalForSim(detectedGoal);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#2B2B2B] flex flex-col justify-between selection:bg-[#0F7173] selection:text-white">
      {/* HEADER BAR */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-4 py-3.5 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#2B2B2B] transition-colors text-xs font-bold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#0F7173]/15 text-[#0F7173] font-black flex items-center justify-center border border-[#0F7173]/30">
                {user.name ? user.name.charAt(0) : 'U'}
              </div>
              <div>
                <h1 className="font-extrabold text-base text-[#2B2B2B] tracking-tight flex items-center gap-2">
                  <span>Profile & Progress Dashboard</span>
                  <span className="w-2 h-2 rounded-full bg-[#0F7173] animate-pulse" />
                </h1>
                <p className="text-[11px] text-[#6B6B6B]">
                  Personal Savings Tracker • <span className="font-bold text-[#0F7173] capitalize">{userOccupation.replace('_', ' ')}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-3">
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
          </div>
        </div>
      </header>

      {/* MAIN DASHBOARD CONTENT */}
      <main className="container mx-auto px-4 py-8 sm:py-10 flex-1 max-w-4xl space-y-10">
        {/* TOP SECTION: WARM PROFILE HEADER & GAMIFIED PROGRESS RING / STREAK COUNTER */}
        <section className="card-surface p-6 sm:p-8 bg-white border border-slate-200/80 shadow-md rounded-3xl space-y-8">
          {/* Personal Greeting & Avatar */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 border-b border-slate-100 pb-6 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#0F7173] to-[#2ECC91] text-white font-extrabold text-2xl sm:text-3xl flex items-center justify-center shadow-lg shadow-[#0F7173]/20">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 p-1.5 rounded-full shadow-sm border-2 border-white" title="Active Streak Champion">
                  <Flame className="w-4 h-4 fill-slate-950 stroke-none" />
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2B2B2B] tracking-tight">
                  Namaste, {user.name}! 🙏
                </h2>
                <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 font-medium">
                  Aapki bachat aur financial yatra bahut acchi chal rahi hai!
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#0F7173]/10 text-[#0F7173] text-xs font-extrabold capitalize border border-[#0F7173]/20">
                    <Briefcase className="w-3.5 h-3.5 inline mr-1" />
                    {userOccupation.replace('_', ' ')} Profile
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    <Check className="w-3.5 h-3.5 inline mr-1" />
                    Vernacular Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Streak Counter Motif */}
            <div className="px-5 py-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 text-center space-y-1 shadow-sm shrink-0">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce" />
                <span>Learning Streak</span>
              </div>
              <div className="text-2xl font-black text-amber-900 font-mono">
                {learningStreakDays} Days 🔥
              </div>
              <div className="text-[10px] text-amber-700 font-medium">
                Keep asking AI to level up!
              </div>
            </div>
          </div>

          {/* PROMINENT GAMIFIED FINANCIAL HEALTH SCORE & CIRCULAR PROGRESS RING */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Large Centered Circular Progress Ring */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-4">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#E2E8F0"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  {/* Foreground Mint Green Progress Arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="url(#healthGrad)"
                    strokeWidth="10"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 * (1 - healthScore / 100)}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="healthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0F7173" />
                      <stop offset="100%" stopColor="#2ECC91" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Score Number inside Ring */}
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black text-[#2B2B2B] font-mono leading-none">
                    {healthScore}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                    out of 100
                  </span>
                </div>
              </div>

              <div className="mt-3 text-center">
                <div className="text-sm font-extrabold text-[#0F7173]">
                  Financial Health Score
                </div>
                <div className="text-xs text-[#6B6B6B] mt-0.5">
                  Excellent! You beat 82% of vernacular savers
                </div>
              </div>
            </div>

            {/* Achievement Badges & Summary Stats */}
            <div className="md:col-span-7 space-y-4">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#6B6B6B] flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#0F7173]" />
                <span>Earned Achievements & Stats</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Total Target Saved</div>
                  <div className="text-lg font-black text-[#0F7173] font-mono">
                    ₹15.1 Lakhs
                  </div>
                  <div className="text-[10px] text-slate-500">Across 3 active goals</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Planned SIP</div>
                  <div className="text-lg font-black text-[#D98D15] font-mono">
                    ~₹22,450/mo
                  </div>
                  <div className="text-[10px] text-slate-500">Compound growth strategy</div>
                </div>
              </div>

              {/* Achievement Pill Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                <div className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Voice Assistant Master</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-600" />
                  <span>SIP Sandbox Expert</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MIDDLE SECTION: SAVED GOALS VERTICAL LIST (COMPACT CARDS VARIANT) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-[#2B2B2B] tracking-tight">
                Your Saved Goals & Progress
              </h3>
              <p className="text-xs text-[#6B6B6B]">
                Tap any goal card to jump back into its pre-filled interactive simulator
              </p>
            </div>

            {onOpenGoalPlanning && (
              <button
                onClick={onOpenGoalPlanning}
                className="btn btn-primary py-2 px-4 text-xs font-bold shadow-sm flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add Goal</span>
              </button>
            )}
          </div>

          {/* VERTICAL LIST OF COMPACT CARDS */}
          <div className="space-y-3.5">
            {savedGoals.map((goal) => {
              const progressPct = Math.min(100, Math.round((goal.currentSavedAmount / goal.targetAmount) * 100));

              return (
                <div
                  key={goal.id}
                  onClick={() => handleSavedGoalClick(goal)}
                  className="group card-surface p-4 sm:p-5 bg-white border border-slate-200 hover:border-[#0F7173] hover:shadow-lg rounded-2xl cursor-pointer transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none"
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    {/* Goal Icon Badge */}
                    <div className="icon-badge icon-badge-teal !w-11 !h-11 !min-w-[44px] shadow-sm group-hover:scale-105 transition-transform">
                      {getGoalIcon(goal.category)}
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-base text-[#2B2B2B] truncate group-hover:text-[#0F7173] transition-colors">
                          {goal.title}
                        </h4>
                        <span className="text-xs font-extrabold text-[#0F7173] font-mono shrink-0 ml-2">
                          {progressPct}% Saved
                        </span>
                      </div>

                      {/* Mini Progress Bar in Mint Green */}
                      <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#0F7173] to-[#2ECC91] transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs text-[#6B6B6B] font-mono">
                        <span>
                          ₹{goal.currentSavedAmount.toLocaleString('en-IN')} / ₹{goal.targetAmount.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[#0F7173] font-bold">
                          ~₹{goal.suggestedMonthlySavings.toLocaleString('en-IN')}/mo
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button className="px-3 py-1.5 rounded-full bg-slate-50 group-hover:bg-[#0F7173] text-[#0F7173] group-hover:text-white font-bold text-xs transition-colors flex items-center gap-1">
                      <span>Simulate</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* BOTTOM SECTION: ACCOUNT SETTINGS & PREFERENCES (VISUALLY DE-EMPHASIZED) */}
        <section className="pt-6 border-t border-slate-200 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Account Preferences & Utility Settings
          </div>

          {/* Plain List-Row Style with Thin Dividers & Chevrons */}
          <div className="bg-white rounded-2xl border border-slate-200/70 divide-y divide-slate-100 text-xs sm:text-sm">
            {/* Language Preference */}
            <div className="p-4 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-[#0F7173]" />
                <div>
                  <div className="font-semibold text-[#2B2B2B]">Voice & UI Language</div>
                  <div className="text-[11px] text-slate-500">
                    Currently set to {currentLangObj.flag} {currentLangObj.nativeName} ({currentLangObj.name})
                  </div>
                </div>
              </div>

              <select
                value={currentLang}
                onChange={(e) => onSelectLang(e.target.value as LanguageCode)}
                className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#0F7173] focus:outline-none cursor-pointer"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone Number / Profile Info */}
            <div className="p-4 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#0F7173]" />
                <div>
                  <div className="font-semibold text-[#2B2B2B]">Mobile Number</div>
                  <div className="text-[11px] text-slate-500">{user.phone || '+91 98765 43210'} • OTP Verified</div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Verified
              </span>
            </div>

            {/* Notifications Preferences */}
            <div className="p-4 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-[#0F7173]" />
                <div>
                  <div className="font-semibold text-[#2B2B2B]">Monthly SIP Payment Reminders</div>
                  <div className="text-[11px] text-slate-500">Automated WhatsApp & SMS payment alerts</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSipRemindersEnabled(!sipRemindersEnabled)}
                className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-200 flex items-center ${
                  sipRemindersEnabled ? 'bg-[#0F7173] justify-end' : 'bg-slate-300 justify-start'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
              </button>
            </div>

            <div className="p-4 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-[#0F7173]" />
                <div>
                  <div className="font-semibold text-[#2B2B2B]">Vernacular Financial Growth Tips</div>
                  <div className="text-[11px] text-slate-500">Weekly audio micro-lessons in your language</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setWeeklyTipsEnabled(!weeklyTipsEnabled)}
                className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-200 flex items-center ${
                  weeklyTipsEnabled ? 'bg-[#0F7173] justify-end' : 'bg-slate-300 justify-start'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
              </button>
            </div>

            {/* Re-run Onboarding / Occupation Profile */}
            {onReOnboard && (
              <div
                onClick={onReOnboard}
                className="p-4 flex items-center justify-between hover:bg-slate-50/60 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-4 h-4 text-[#0F7173]" />
                  <div>
                    <div className="font-semibold text-[#2B2B2B]">Re-run Setup Wizard</div>
                    <div className="text-[11px] text-slate-500">Change occupation or financial comfort level</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            )}

            {/* Log Out Option (Muted Text) */}
            {onLogout && (
              <div
                onClick={onLogout}
                className="p-4 flex items-center justify-between hover:bg-rose-50/60 cursor-pointer transition-colors text-rose-600 font-semibold"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Log Out of FinLingo</span>
                </div>
                <ChevronRight className="w-4 h-4 text-rose-400" />
              </div>
            )}
          </div>
        </section>
      </main>

      {/* EMBEDDED SIMULATOR MODAL FOR SAVED GOAL SIMULATION */}
      <GoalSimulatorModal
        key={selectedGoalForSim?.id}
        goal={selectedGoalForSim}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostSimulationToChat={() => {
          setIsModalOpen(false);
          onBack();
        }}
        currentLang={currentLang}
      />

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-4 text-xs text-center text-[#6B6B6B]">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-4">
          <span>FinLingo Dashboard • Apni bhasha mein paison ki samajh</span>
          <button onClick={onBack} className="text-[#0F7173] hover:underline font-bold">
            Return to App
          </button>
        </div>
      </footer>
    </div>
  );
};

export default UserProfileDashboard;
