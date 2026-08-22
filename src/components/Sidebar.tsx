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
  onOpenGoalPlanning?: () => void;
  onOpenMythBusting?: () => void;
  onOpenDashboard?: () => void;
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
  onOpenGoalPlanning,
  onOpenMythBusting,
  onOpenDashboard,
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
      description: 'Build an inflation-protected wedding fund over 5 years.',
    },
    {
      id: 'g_education',
      title: "Children's Higher Education",
      category: 'education',
      targetAmount: 800000,
      timeframeYears: 7,
      suggestedMonthlySavings: 7200,
      description: 'Secure college tuition with compounding SIP returns.',
    },
    {
      id: 'g_agri',
      title: 'Agri Equipment & Tractor Loan',
      category: 'agriculture',
      targetAmount: 350000,
      timeframeYears: 3,
      suggestedMonthlySavings: 9200,
      description: 'Simulate Kisan Credit Card & low-interest tractor EMI.',
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
      title: 'Family Emergency Fund',
      category: 'emergency',
      targetAmount: 100000,
      timeframeYears: 1,
      suggestedMonthlySavings: 8000,
      description: 'High-liquidity savings buffer for unexpected medical bills.',
    },
  ];

  const getGoalIcon = (category: string) => {
    switch (category) {
      case 'wedding':
        return <Heart className="w-4 h-4 text-pink-500" />;
      case 'education':
        return <GraduationCap className="w-4 h-4 text-[#0F7173]" />;
      case 'agriculture':
        return <Tractor className="w-4 h-4 text-emerald-600" />;
      case 'business':
        return <Store className="w-4 h-4 text-[#F5A623]" />;
      case 'emergency':
        return <ShieldAlert className="w-4 h-4 text-red-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#0F7173]" />;
    }
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-white border-r border-slate-200 text-[#2B2B2B] p-5 w-72 sm:w-80 shadow-md">
      <div className="space-y-6 overflow-y-auto pr-1 scrollbar-thin">
        {/* Header Branding & Mobile Close */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="icon-badge icon-badge-teal !w-9 !h-9 !min-w-[36px] shadow-sm">
              <Sparkles className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="font-extrabold text-lg text-[#2B2B2B] tracking-tight">FinLingo</span>
          </div>

          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-[#2B2B2B]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* New Conversation Button */}
        <button
          onClick={() => {
            onNewThread();
            onCloseMobile();
          }}
          className="w-full btn btn-primary py-3 px-4 text-xs font-bold shadow-md shadow-[#0F7173]/15 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Conversation</span>
        </button>

        {/* PERSISTENT LANGUAGE SWITCHER NEAR TOP */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#6B6B6B] flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#0F7173]" />
            <span>Voice & UI Language</span>
          </label>

          <select
            value={user.preferredLanguage}
            onChange={(e) => onSelectLang(e.target.value as LanguageCode)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0F7173] font-bold focus:outline-none focus:border-[#0F7173] cursor-pointer shadow-sm"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.nativeName} ({lang.name})
              </option>
            ))}
          </select>
        </div>

        {/* CONVERSATION HISTORY (Truncated first line labels) */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B6B6B] flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-[#0F7173]" />
            <span>Past Conversations</span>
          </div>

          <div className="space-y-1.5">
            {threads.map((thread) => {
              const isActive = thread.id === activeThreadId;
              const firstMsgText = thread.messages.length > 0 ? thread.messages[0].text : thread.title;
              const truncatedLabel = firstMsgText.length > 30 ? `${firstMsgText.substring(0, 30)}...` : firstMsgText;

              return (
                <button
                  key={thread.id}
                  onClick={() => {
                    onSelectThread(thread.id);
                    onCloseMobile();
                  }}
                  className={`w-full p-2.5 rounded-2xl text-left text-xs transition-all flex items-center justify-between group border ${
                    isActive
                      ? 'bg-[#0F7173]/10 border-[#0F7173] text-[#0F7173] font-bold shadow-sm'
                      : 'hover:bg-slate-50 text-[#2B2B2B] border-transparent'
                  }`}
                >
                  <div className="truncate flex items-center gap-2 pr-2">
                    <MessageSquare className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    <span className="truncate">{truncatedLabel}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </button>
              );
            })}
          </div>
        </div>

        {/* PINNED QUICK-ACCESS GOAL & MYTH SHORTCUTS */}
        <div className="space-y-2 pt-3 border-t border-slate-100">
          {onOpenDashboard && (
            <button
              onClick={() => {
                onOpenDashboard();
                onCloseMobile();
              }}
              className="w-full mb-1 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 hover:bg-emerald-100/60 text-emerald-800 font-bold text-xs flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Profile & Dashboard</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {onOpenMythBusting && (
            <button
              onClick={() => {
                onOpenMythBusting();
                onCloseMobile();
              }}
              className="w-full mb-1 p-2.5 rounded-xl bg-amber-500/10 border border-[#F5A623]/30 hover:bg-amber-500/20 text-[#D98D15] font-bold text-xs flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D98D15]" />
                <span>Myth-Busting & Doubts</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {onOpenGoalPlanning && (
            <button
              onClick={() => {
                onOpenGoalPlanning();
                onCloseMobile();
              }}
              className="w-full mb-2 p-2.5 rounded-xl bg-[#0F7173]/10 border border-[#0F7173]/20 hover:bg-[#0F7173]/20 text-[#0F7173] font-bold text-xs flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0F7173]" />
                <span>Browse Goal Cards Grid</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B6B6B] flex items-center justify-between">
            <span>Quick Goal Shortcuts</span>
            <span className="text-[#0F7173] font-mono text-[9px]">Simulate</span>
          </div>

          <div className="space-y-2">
            {quickGoals.map((goal) => (
              <div
                key={goal.id}
                onClick={() => {
                  onSelectGoalShortcut(goal);
                  onCloseMobile();
                }}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#0F7173]/40 hover:bg-white cursor-pointer transition-all space-y-1 group shadow-sm"
              >
                <div className="flex items-center justify-between text-xs font-bold text-[#2B2B2B]">
                  <div className="flex items-center gap-2 truncate">
                    {getGoalIcon(goal.category)}
                    <span className="truncate group-hover:text-[#0F7173]">{goal.title}</span>
                  </div>
                  <span className="text-[#0F7173] font-mono text-[11px] shrink-0 font-extrabold">
                    ₹{(goal.targetAmount / 100000).toFixed(1)}L
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#6B6B6B] font-mono">
                  <span>{goal.timeframeYears} Yrs Horizon</span>
                  <span className="text-[#0F7173] font-bold">~₹{goal.suggestedMonthlySavings}/mo</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div
          onClick={() => {
            if (onOpenDashboard) onOpenDashboard();
            onCloseMobile();
          }}
          className="flex items-center gap-2.5 truncate cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-[#0F7173]/15 border border-[#0F7173]/30 flex items-center justify-center text-[#0F7173] font-extrabold shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="truncate">
            <div className="font-bold text-[#2B2B2B] truncate group-hover:text-[#0F7173]">{user.name}</div>
            <div className="text-[10px] text-[#6B6B6B] capitalize font-medium">{user.occupation.replace('_', ' ')}</div>
          </div>
        </div>

        <button
          onClick={onReOnboard}
          className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-[#0F7173] shrink-0"
          title="Re-run Setup"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block h-screen sticky top-0 shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Triggered by Hamburger Icon) */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-[#090D16]/60 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 h-full">{sidebarContent}</div>
        </div>
      )}
    </>
  );
};
