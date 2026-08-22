import React, { useState } from 'react';
import {
  Sparkles,
  MessageSquare,
  TrendingUp,
  HelpCircle,
  LogOut,
  LayoutDashboard,
  Building2,
} from 'lucide-react';
import type { LanguageCode, UserProfile } from '../types';

interface DashboardWorkspaceProps {
  userProfile?: Partial<UserProfile> | null;
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  onOpenChat: () => void;
  onOpenGoals: () => void;
  onOpenMyths: () => void;
  onOpenB2B: () => void;
  onLogout: () => void;
}

export const DashboardWorkspace: React.FC<DashboardWorkspaceProps> = ({
  userProfile,
  onOpenChat,
  onOpenGoals,
  onOpenMyths,
  onOpenB2B,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chat' | 'goals' | 'myths'>('dashboard');
  const [monthlySavings, setMonthlySavings] = useState<number>(3500);
  const [activeQuestion] = useState<number>(0);

  const userName = userProfile?.name || 'Ramesh G.';
  const userOccupation = userProfile?.occupation ? userProfile.occupation.replace('_', ' ') : 'Salaried';

  const mythQuestions = [
    {
      q: 'Can I lose money in mutual funds?',
      a: 'Mutual funds carry market risk but are regulated by SEBI and diversified for safety.',
    },
    {
      q: 'SIP vs RD — which is better?',
      a: 'Recurring Deposits give fixed ~6.5% interest, while equity SIPs historically return 12-14% over 5+ years.',
    },
  ];

  // 5-year calculation for SIP Preview
  const projectedReturn = Math.round(monthlySavings * 60 * 1.34);

  return (
    <div className="min-h-screen w-full bg-[#F6ECE6] text-[#2D1E25] flex flex-col items-center justify-start p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Top Navbar */}
        <header className="w-full flex items-center justify-between py-2">
          {/* Left Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#3B232E] text-white flex items-center justify-center font-bold shadow-md">
              <Sparkles className="w-5 h-5 fill-white/20" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-semibold text-[#2D1E25] tracking-tight">
                FinLingo
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#EAD7CF] text-[#3B232E] text-[10px] font-mono font-bold border border-[#3B232E]/10">
                v1.0 Live AI Engine
              </span>
            </div>
          </div>

          {/* Center Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#7A6870]">
            <button onClick={() => setActiveTab('dashboard')} className="hover:text-[#3B232E] transition-colors text-[#3B232E] font-bold">
              Architecture
            </button>
            <button onClick={onOpenGoals} className="hover:text-[#3B232E] transition-colors">
              Benchmarking
            </button>
            <button onClick={onOpenB2B} className="hover:text-[#3B232E] transition-colors flex items-center gap-1.5 text-[#3B232E] font-bold">
              <Building2 className="w-3.5 h-3.5" />
              <span>B2B Console</span>
            </button>
          </nav>

          {/* Right Action */}
          <button
            onClick={onOpenChat}
            className="bg-[#3B232E] hover:bg-[#523241] text-white rounded-full px-5 py-2.5 text-xs font-bold transition shadow-sm"
          >
            Try FinLingo →
          </button>
        </header>

        {/* Main Console Workspace Container */}
        <div className="w-full bg-white/60 backdrop-blur-md rounded-3xl border border-[#3B232E]/10 p-6 md:p-8 shadow-sm flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* Left Sidebar (Fixed proportional width lg:w-64) */}
          <aside className="w-full lg:w-64 flex-shrink-0 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* User Info Header Card */}
              <div className="p-3 bg-white rounded-xl border border-[#3B232E]/10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#3B232E] text-white flex items-center justify-center font-bold">
                  {userName.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-[#2D1E25] truncate">{userName}</p>
                  <p className="text-xs text-[#7A6870] capitalize">{userOccupation} • Hindi</p>
                </div>
              </div>
              
              {/* Navigation Tabs */}
              <nav className="flex flex-col space-y-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm text-left transition-all ${
                    activeTab === 'dashboard'
                      ? 'bg-[#EAD7CF] text-[#2D1E25] font-semibold'
                      : 'text-[#7A6870] hover:bg-white/80'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-[#3B232E]" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('chat');
                    onOpenChat();
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#7A6870] hover:bg-white/80 text-sm text-left"
                >
                  <MessageSquare className="w-4 h-4 text-[#3B232E]" />
                  <span>Conversational Assistant</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('goals');
                    onOpenGoals();
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#7A6870] hover:bg-white/80 text-sm text-left"
                >
                  <TrendingUp className="w-4 h-4 text-[#3B232E]" />
                  <span>Financial Goals</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('myths');
                    onOpenMyths();
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#7A6870] hover:bg-white/80 text-sm text-left"
                >
                  <HelpCircle className="w-4 h-4 text-[#3B232E]" />
                  <span>FAQ & Myth-Buster</span>
                </button>
              </nav>
            </div>

            <div className="pt-4 border-t border-[#3B232E]/10">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-rose-700 hover:bg-rose-50 text-sm font-medium text-left transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </aside>

          {/* Main Dashboard 3-Card Grid */}
          <main className="flex-1 flex flex-col gap-6">
            <div className="flex justify-between items-center pb-2 border-b border-[#3B232E]/10">
              <h2 className="text-2xl font-serif font-semibold text-[#2D1E25] leading-[1.3]">
                Welcome back, {userName.split(' ')[0]}
              </h2>
              <span className="text-xs bg-[#EAD7CF] text-[#3B232E] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Vernacular Engine Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
              {/* Card 1: Chat */}
              <div className="bg-white rounded-2xl border border-[#3B232E]/10 p-5 flex flex-col justify-between shadow-sm hover:border-[#3B232E]/30 transition">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-[#7A6870] uppercase tracking-wider">Chat Interface</span>
                  <h3 className="text-lg font-serif font-semibold text-[#2D1E25] leading-[1.3]">Start a Vernacular Financial Chat</h3>
                  <div className="bg-[#FAF3F0] p-3 rounded-xl text-xs space-y-2">
                    <p className="font-medium text-[#3B232E]">"₹2,500 monthly SIP 5 saal ke liye?"</p>
                    <p className="text-[#7A6870]">Audio Ready • Hindi/English</p>
                  </div>
                </div>
                <button
                  onClick={onOpenChat}
                  className="mt-4 w-full bg-[#3B232E] text-white py-2.5 rounded-full text-xs font-medium hover:bg-[#523241] transition cursor-pointer"
                >
                  Open Chat →
                </button>
              </div>

              {/* Card 2: Simulator */}
              <div className="bg-white rounded-2xl border border-[#3B232E]/10 p-5 flex flex-col justify-between shadow-sm hover:border-[#3B232E]/30 transition">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-[#7A6870] uppercase tracking-wider">SIP Calculator</span>
                  <h3 className="text-lg font-serif font-semibold text-[#2D1E25] leading-[1.3]">Plan a Wealth Goal</h3>
                  <div className="bg-[#FAF3F0] p-3 rounded-xl text-xs space-y-2">
                    <div className="flex justify-between text-[#2D1E25] font-semibold">
                      <span>Monthly: ₹{monthlySavings.toLocaleString('en-IN')}</span>
                      <span className="text-emerald-700">₹{projectedReturn.toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={50000}
                      step={500}
                      value={monthlySavings}
                      onChange={(e) => setMonthlySavings(Number(e.target.value))}
                      className="w-full accent-[#3B232E] cursor-pointer"
                    />
                  </div>
                </div>
                <button
                  onClick={onOpenGoals}
                  className="mt-4 w-full bg-[#3B232E] text-white py-2.5 rounded-full text-xs font-medium hover:bg-[#523241] transition cursor-pointer"
                >
                  Explore Goals →
                </button>
              </div>

              {/* Card 3: Myths */}
              <div className="bg-white rounded-2xl border border-[#3B232E]/10 p-5 flex flex-col justify-between shadow-sm hover:border-[#3B232E]/30 transition">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-[#7A6870] uppercase tracking-wider">Myth-Buster & FAQ</span>
                  <h3 className="text-lg font-serif font-semibold text-[#2D1E25] leading-[1.3]">Explore Financial Myths</h3>
                  <div className="bg-[#FAF3F0] p-3 rounded-xl text-xs space-y-1">
                    <p className="font-semibold text-[#2D1E25]">{mythQuestions[activeQuestion].q}</p>
                    <p className="text-[#7A6870] text-[11px] line-clamp-2">{mythQuestions[activeQuestion].a}</p>
                  </div>
                </div>
                <button
                  onClick={onOpenMyths}
                  className="mt-4 w-full bg-[#3B232E] text-white py-2.5 rounded-full text-xs font-medium hover:bg-[#523241] transition cursor-pointer"
                >
                  Explore FAQ →
                </button>
              </div>
            </div>
          </main>
        </div>

      </div>
    </div>
  );
};

export default DashboardWorkspace;
