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
import { MicroLabel } from './ui/Primitives';

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
  onOpenPricing?: () => void;
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
  onOpenGoalPlanning: _onOpenGoalPlanning,
  onOpenMythBusting,
  onOpenDashboard,
  onOpenPricing,
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
      title: 'Agri Equipment / Tractor',
      category: 'agriculture',
      targetAmount: 350000,
      timeframeYears: 3,
      suggestedMonthlySavings: 8200,
      description: 'Equipment loan SIP simulation.',
    },
    {
      id: 'g_shop',
      title: 'Kirana Business Expansion',
      category: 'business',
      targetAmount: 400000,
      timeframeYears: 4,
      suggestedMonthlySavings: 7500,
      description: 'Working capital & store inventory fund.',
    },
  ];

  const getGoalIcon = (category: DetectedGoal['category']) => {
    switch (category) {
      case 'wedding':
        return <Heart className="w-3.5 h-3.5 text-rose-300" />;
      case 'education':
        return <GraduationCap className="w-3.5 h-3.5 text-amber-300" />;
      case 'agriculture':
        return <Tractor className="w-3.5 h-3.5 text-emerald-300" />;
      case 'business':
        return <Store className="w-3.5 h-3.5 text-teal-300" />;
      default:
        return <ShieldAlert className="w-3.5 h-3.5 text-indigo-300" />;
    }
  };

  const sidebarContent = (
    <div className="w-72 bg-[#3B2530] text-white p-5 border-r border-[#3B2530]/40 flex flex-col justify-between h-full shadow-2xl">
      <div className="space-y-6 overflow-y-auto pr-1 scrollbar-thin">
        {/* Header Branding & Mobile Close */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white text-[#3B2530] flex items-center justify-center font-bold shadow-sm">
              <Sparkles className="w-4 h-4 fill-[#3B2530]" />
            </div>
            <span className="font-extrabold text-lg text-white tracking-tight">FinLingo Console</span>
          </div>

          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Primary New Conversation Button */}
        <button
          onClick={() => {
            onNewThread();
            onCloseMobile();
          }}
          className="w-full py-3 px-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Conversation</span>
        </button>

        {/* PERSISTENT LANGUAGE SWITCHER */}
        <div className="space-y-2">
          <MicroLabel className="text-slate-300 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-slate-300" />
            <span>Voice & UI Language</span>
          </MicroLabel>

          <select
            value={user.preferredLanguage}
            onChange={(e) => onSelectLang(e.target.value as LanguageCode)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white font-bold focus:outline-none cursor-pointer"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code} className="bg-[#3B2530] text-white">
                {lang.flag} {lang.nativeName} ({lang.name})
              </option>
            ))}
          </select>
        </div>

        {/* CONVERSATION HISTORY */}
        <div className="space-y-2">
          <MicroLabel className="text-slate-300 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-slate-300" />
            <span>Past Conversations</span>
          </MicroLabel>

          <div className="space-y-1.5">
            {threads.map((thread) => {
              const isActive = thread.id === activeThreadId;
              const firstMsgText = thread.messages.length > 0 ? thread.messages[0].text : thread.title;

              return (
                <button
                  key={thread.id}
                  onClick={() => {
                    onSelectThread(thread.id);
                    onCloseMobile();
                  }}
                  className={`w-full text-left p-3 rounded-2xl transition-all border ${
                    isActive
                      ? 'bg-white text-[#3B2530] font-bold border-white shadow-md'
                      : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                  }`}
                >
                  <div className="text-xs font-bold truncate">{thread.title}</div>
                  <div className="text-[10px] text-slate-300 truncate mt-0.5 opacity-80">{firstMsgText}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* PINNED SHORTCUTS */}
        <div className="space-y-2 pt-3 border-t border-white/10">
          {onOpenPricing && (
            <button
              onClick={() => {
                onOpenPricing();
                onCloseMobile();
              }}
              className="w-full mb-1 p-2.5 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 text-white font-black text-xs flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Upgrade to Premium ✨</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {onOpenDashboard && (
            <button
              onClick={() => {
                onOpenDashboard();
                onCloseMobile();
              }}
              className="w-full mb-1 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs flex items-center justify-between transition-all"
            >
              <span>Profile & Progress Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {onOpenMythBusting && (
            <button
              onClick={() => {
                onOpenMythBusting();
                onCloseMobile();
              }}
              className="w-full mb-1 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs flex items-center justify-between transition-all"
            >
              <span>Myth-Busting & Doubts</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          <MicroLabel className="text-slate-300 flex items-center justify-between pt-2">
            <span>Quick Goal Shortcuts</span>
            <span className="text-amber-300 font-mono text-[9px]">Simulate</span>
          </MicroLabel>

          <div className="space-y-2">
            {quickGoals.map((goal) => (
              <div
                key={goal.id}
                onClick={() => {
                  onSelectGoalShortcut(goal);
                  onCloseMobile();
                }}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 cursor-pointer transition-all space-y-1 group"
              >
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <div className="flex items-center gap-2 truncate">
                    {getGoalIcon(goal.category)}
                    <span className="truncate">{goal.title}</span>
                  </div>
                  <span className="text-amber-300 font-mono text-[11px] shrink-0 font-extrabold">
                    ₹{(goal.targetAmount / 100000).toFixed(1)}L
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-300 font-mono">
                  <span>{goal.timeframeYears} Yrs Horizon</span>
                  <span className="text-emerald-300 font-bold">~₹{goal.suggestedMonthlySavings}/mo</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Profile Card Fixed at Bottom of Sidebar */}
      <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-xs">
        <div
          onClick={() => {
            if (onOpenDashboard) onOpenDashboard();
            onCloseMobile();
          }}
          className="flex items-center gap-2.5 truncate cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="w-9 h-9 rounded-full bg-white text-[#3B2530] font-black flex items-center justify-center shrink-0 text-sm shadow-md">
            {user.name.charAt(0)}
          </div>
          <div className="truncate">
            <div className="font-extrabold text-white truncate">{user.name}</div>
            <div className="text-[10px] text-slate-300 capitalize font-medium">{user.occupation.replace('_', ' ')}</div>
          </div>
        </div>

        <button
          onClick={onReOnboard}
          className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white shrink-0"
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

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 h-full">{sidebarContent}</div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
