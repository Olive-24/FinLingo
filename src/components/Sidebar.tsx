import React from 'react';
import {
  Plus,
  MessageSquare,
  Globe,
  Sparkles,
  ChevronRight,
  Heart,
  GraduationCap,
  Tractor,
  Store,
  ShieldAlert,
  X,
  RotateCcw,
} from 'lucide-react';
import type { UserProfile, ChatThread, LanguageCode, DetectedGoal } from '../types';
import { LANGUAGES } from '../data/languages';

interface SidebarProps {
  user: UserProfile;
  threads: ChatThread[];
  activeThreadId: string;
  onSelectThread: (threadId: string) => void;
  onNewThread: () => void;
  onSelectGoalShortcut: (goal: DetectedGoal) => void;
  onSelectLang: (lang: LanguageCode) => void;
  onReOnboard: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  threads,
  activeThreadId,
  onSelectThread,
  onNewThread,
  onSelectGoalShortcut,
  onSelectLang,
  onReOnboard,
  isOpenMobile,
  onCloseMobile,
}) => {

  // Quick Access Goal Templates
  const quickGoals: DetectedGoal[] = [
    {
      id: 'g_wedding',
      title: "Daughter's / Son's Wedding",
      category: 'wedding',
      targetAmount: 500000,
      timeframeYears: 5,
      suggestedMonthlySavings: 6500,
      description: 'Build a inflation-protected fund for marriage expenses over 5 years.',
    },
    {
      id: 'g_education',
      title: "Children's Higher Education",
      category: 'education',
      targetAmount: 800000,
      timeframeYears: 7,
      suggestedMonthlySavings: 7200,
      description: 'Secure college tuition & coaching fees with compounding SIP returns.',
    },
    {
      id: 'g_agri',
      title: 'Agri Equipment & Tractor Loan',
      category: 'agriculture',
      targetAmount: 350000,
      timeframeYears: 3,
      suggestedMonthlySavings: 9200,
      description: 'Simulate Kisan Credit Card & low-interest agricultural equipment EMI.',
    },
    {
      id: 'g_shop',
      title: 'Kirana / Shop Expansion',
      category: 'business',
      targetAmount: 200000,
      timeframeYears: 2,
      suggestedMonthlySavings: 7500,
      description: 'Working capital loan & stock purchase breakdown.',
    },
    {
      id: 'g_emergency',
      title: 'Family Medical Emergency Fund',
      category: 'emergency',
      targetAmount: 100000,
      timeframeYears: 1,
      suggestedMonthlySavings: 8000,
      description: 'High-liquidity savings buffer for unexpected hospital bills.',
    },
  ];

  const getGoalIcon = (category: string) => {
    switch (category) {
      case 'wedding':
        return <Heart className="w-4 h-4 text-pink-400" />;
      case 'education':
        return <GraduationCap className="w-4 h-4 text-indigo-400" />;
      case 'agriculture':
        return <Tractor className="w-4 h-4 text-emerald-400" />;
      case 'business':
        return <Store className="w-4 h-4 text-amber-400" />;
      case 'emergency':
        return <ShieldAlert className="w-4 h-4 text-red-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-teal-400" />;
    }
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-[#0F172A] border-r border-slate-800 text-slate-300 p-4 w-72 sm:w-80">
      <div className="space-y-6 overflow-y-auto pr-1 scrollbar-thin">
        {/* Header Branding & Mobile Close */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-500/20">
              <Sparkles className="w-4.5 h-4.5 text-slate-950 stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-lg text-white tracking-tight">FinLingo</span>
          </div>

          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* New Chat Button */}
        <button
          onClick={() => {
            onNewThread();
            onCloseMobile();
          }}
          className="w-full btn btn-primary py-2.5 px-4 text-xs font-bold shadow-md shadow-emerald-500/15 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Conversation</span>
        </button>

        {/* Language Switcher Section */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>Voice & UI Language</span>
          </label>

          <select
            value={user.preferredLanguage}
            onChange={(e) => onSelectLang(e.target.value as LanguageCode)}
            className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-emerald-300 font-bold focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.nativeName} ({lang.name})
              </option>
            ))}
          </select>
        </div>

        {/* Conversation History */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
            <span>Recent Conversations</span>
          </div>

          <div className="space-y-1">
            {threads.map((thread) => {
              const isActive = thread.id === activeThreadId;
              return (
                <button
                  key={thread.id}
                  onClick={() => {
                    onSelectThread(thread.id);
                    onCloseMobile();
                  }}
                  className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between group ${
                    isActive
                      ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-bold'
                      : 'hover:bg-slate-800 text-slate-300 border border-transparent'
                  }`}
                >
                  <div className="truncate flex items-center gap-2 pr-2">
                    <MessageSquare className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    <span className="truncate">{thread.title}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick-Access Goal Cards */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Quick Goal Calculators</span>
            <span className="text-emerald-400 font-mono text-[9px]">Tap to Simulate</span>
          </div>

          <div className="space-y-2">
            {quickGoals.map((goal) => (
              <div
                key={goal.id}
                onClick={() => {
                  onSelectGoalShortcut(goal);
                  onCloseMobile();
                }}
                className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-emerald-500/40 hover:bg-slate-800 cursor-pointer transition-all space-y-1.5 group"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-100">
                  <div className="flex items-center gap-2 truncate">
                    {getGoalIcon(goal.category)}
                    <span className="truncate group-hover:text-emerald-300">{goal.title}</span>
                  </div>
                  <span className="text-emerald-400 font-mono text-[11px] shrink-0">
                    ₹{(goal.targetAmount / 100000).toFixed(1)}L
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>{goal.timeframeYears} Yrs Horizon</span>
                  <span className="text-indigo-300">~₹{goal.suggestedMonthlySavings}/mo</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5 truncate">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="truncate">
            <div className="font-bold text-slate-100 truncate">{user.name}</div>
            <div className="text-[10px] text-slate-400 capitalize">{user.occupation.replace('_', ' ')}</div>
          </div>
        </div>

        <button
          onClick={onReOnboard}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-emerald-400 border border-slate-700 shrink-0"
          title="Re-run Onboarding Setup"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Always Visible on lg Screen) */}
      <aside className="hidden lg:block h-screen sticky top-0 shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Modal overlay on sm/md screen) */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 h-full">{sidebarContent}</div>
        </div>
      )}
    </>
  );
};
