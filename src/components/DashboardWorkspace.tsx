import React, { useState } from 'react';
import {
  MessageSquare,
  TrendingUp,
  HelpCircle,
  LogOut,
  LayoutDashboard,
  Building2,
  Search,
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
  const [activeGoalPreset, setActiveGoalPreset] = useState<'home' | 'education' | 'custom'>('education');
  const [monthlySavings, setMonthlySavings] = useState<number>(3500);
  const [compareFd, setCompareFd] = useState<boolean>(true);
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  const projectedReturn = Math.round(monthlySavings * 60 * 1.34);

  return (
    <div className="min-h-screen w-full bg-[#EEE9DF] text-[#1B2632] flex flex-col items-center p-4 sm:p-6 md:p-8 selection:bg-[#1B2632] selection:text-white overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Global Navbar */}
        <header className="w-full flex items-center justify-between py-2">
          {/* Left Brand Logo */}
          <div className="flex items-center gap-3">
            {/* Circular Brand Sparkle Emblem */}
            <div className="w-8 h-8 rounded-full bg-[#1B2632] flex items-center justify-center text-white shadow-sm shrink-0">
              <svg 
                className="w-4 h-4" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Central 4-point AI Star / Petal Cluster */}
                <path 
                  d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4771 12 22C12 16.4771 16.4771 12 22 12C16.4771 12 12 7.52285 12 2Z" 
                  fill="currentColor" 
                />
                {/* Micro accent satellite dots */}
                <circle cx="19" cy="5" r="1.5" fill="currentColor" opacity="0.9" />
                <circle cx="5" cy="19" r="1.2" fill="currentColor" opacity="0.7" />
              </svg>
            </div>

            {/* Brand Name Wordmark */}
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1B2632]">
              FinLingo
            </span>

            {/* Version Tag Pill */}
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider bg-[#A35139]/10 text-[#A35139] border border-[#A35139]/20 px-2.5 py-0.5 rounded-full">
              v1.0 Live AI Engine
            </span>
          </div>

          {/* Center Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#5C6B7A]">
            <button onClick={() => setActiveTab('dashboard')} className="hover:text-[#1B2632] transition-colors text-[#1B2632] font-bold cursor-pointer">
              Architecture
            </button>
            <button onClick={onOpenGoals} className="hover:text-[#1B2632] transition-colors cursor-pointer">
              Benchmarking
            </button>
            <button onClick={onOpenB2B} className="hover:text-[#1B2632] transition-colors flex items-center gap-1.5 text-[#1B2632] font-bold cursor-pointer">
              <Building2 className="w-3.5 h-3.5 text-[#A35139]" />
              <span>B2B Console</span>
            </button>
          </nav>

          {/* Right Action */}
          <button
            onClick={onOpenChat}
            className="bg-[#1B2632] hover:bg-[#2C3B4D] text-white py-2.5 px-5 rounded-full text-xs font-semibold transition shadow-sm cursor-pointer"
          >
            Try FinLingo →
          </button>
        </header>

        {/* Console Workspace Container */}
        <div className="w-full bg-white/60 backdrop-blur-md rounded-3xl border border-[#C9C1B1]/60 p-5 sm:p-8 shadow-sm flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
          
          {/* Left Navigation Sidebar (Width: w-full lg:w-64) */}
          <aside className="w-full lg:w-64 flex-shrink-0 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* User Header Card */}
              <div className="p-3 bg-white rounded-xl border border-[#C9C1B1] flex items-center gap-3 shadow-xs">
                <div className="w-9 h-9 rounded-full bg-[#1B2632] text-white flex items-center justify-center font-bold shrink-0">
                  {userName.charAt(0)}
                </div>
                <div className="text-left truncate">
                  <p className="text-sm font-semibold text-[#1B2632] truncate">{userName}</p>
                  <p className="text-xs text-[#5C6B7A] capitalize truncate">{userOccupation} • Hindi</p>
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <nav className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-col gap-1.5 sm:gap-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-left transition-all ${
                    activeTab === 'dashboard'
                      ? 'bg-[#FFB162]/20 text-[#A35139] font-semibold border-l-4 border-[#A35139]'
                      : 'text-[#5C6B7A] hover:bg-white/60'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-[#A35139] shrink-0" />
                  <span className="truncate">Dashboard</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('chat');
                    onOpenChat();
                  }}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[#5C6B7A] hover:bg-white/60 text-xs sm:text-sm text-left transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#1B2632] shrink-0" />
                  <span className="truncate">Conversational Assistant</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('goals');
                    onOpenGoals();
                  }}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[#5C6B7A] hover:bg-white/60 text-xs sm:text-sm text-left transition-all cursor-pointer"
                >
                  <TrendingUp className="w-4 h-4 text-[#1B2632] shrink-0" />
                  <span className="truncate">Financial Goals</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('myths');
                    onOpenMyths();
                  }}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[#5C6B7A] hover:bg-white/60 text-xs sm:text-sm text-left transition-all cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-[#1B2632] shrink-0" />
                  <span className="truncate">FAQ & Myth-Buster</span>
                </button>
              </nav>
            </div>

            <div className="pt-4 border-t border-[#C9C1B1]/60">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-rose-700 hover:bg-rose-50 text-sm font-medium text-left transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Logout</span>
              </button>
            </div>
          </aside>

          {/* Main Workspace: 3 Unified Interactive Hub Cards */}
          <main className="flex-1 flex flex-col gap-6 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#C9C1B1]/60">
              <h2 className="text-xl sm:text-2xl font-serif leading-snug font-semibold text-[#1B2632]">
                Welcome back, {userName.split(' ')[0]}
              </h2>
              <span className="text-xs bg-[#FFB162]/20 text-[#A35139] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Vernacular Engine Active
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr">
              
              {/* Card 1: Start a Vernacular Financial Chat */}
              <div className="bg-white rounded-3xl border border-[#C9C1B1]/60 p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:border-[#1B2632]/30 transition">
                <div className="space-y-3">
                  <span className="text-[11px] font-bold text-[#A35139] uppercase tracking-wider">CHAT INTERFACE</span>
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#1B2632] leading-snug">Start a Vernacular Financial Chat</h3>
                  <div className="bg-[#F4F0E8] p-3.5 rounded-2xl text-xs space-y-2">
                    <p className="font-medium text-[#1B2632]">"₹2,500 monthly SIP 5 saal ke liye?"</p>
                    <div className="flex items-center gap-1.5 text-[10px] text-[#A35139] font-bold">
                      <span className="w-2 h-2 rounded-full bg-[#FFB162] animate-pulse shrink-0" />
                      <span>Audio Ready • Hindi</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onOpenChat}
                  className="bg-[#1B2632] hover:bg-[#2C3B4D] text-white py-2.5 px-5 rounded-full text-xs font-semibold w-full mt-4 transition cursor-pointer"
                >
                  Open Chat →
                </button>
              </div>

              {/* Card 2: Plan a Wealth Goal (SIP & Savings Simulator) */}
              <div className="bg-white rounded-3xl border border-[#C9C1B1]/60 p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:border-[#1B2632]/30 transition">
                <div className="space-y-3">
                  <span className="text-[11px] font-bold text-[#A35139] uppercase tracking-wider">GOAL PLANNING CARDS</span>
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#1B2632] leading-snug">Plan a Wealth Goal</h3>
                  
                  {/* Interactive Body */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setActiveGoalPreset('home')}
                        className={`p-2 rounded-xl text-[11px] font-bold border text-center transition-all cursor-pointer ${
                          activeGoalPreset === 'home'
                            ? 'bg-[#1B2632] text-white border-[#1B2632]'
                            : 'bg-[#F4F0E8] text-[#5C6B7A] border-[#C9C1B1]/40 hover:border-[#1B2632]'
                        }`}
                      >
                        Home
                      </button>
                      <button
                        onClick={() => setActiveGoalPreset('education')}
                        className={`p-2 rounded-xl text-[11px] font-bold border text-center transition-all cursor-pointer ${
                          activeGoalPreset === 'education'
                            ? 'bg-[#1B2632] text-white border-[#1B2632]'
                            : 'bg-[#F4F0E8] text-[#5C6B7A] border-[#C9C1B1]/40 hover:border-[#1B2632]'
                        }`}
                      >
                        College
                      </button>
                      <button
                        onClick={() => setActiveGoalPreset('custom')}
                        className={`p-2 rounded-xl text-[11px] font-bold border text-center transition-all cursor-pointer ${
                          activeGoalPreset === 'custom'
                            ? 'bg-[#1B2632] text-white border-[#1B2632]'
                            : 'bg-[#F4F0E8] text-[#5C6B7A] border-[#C9C1B1]/40 hover:border-[#1B2632]'
                        }`}
                      >
                        Custom
                      </button>
                    </div>

                    <div className="bg-[#F4F0E8] p-3.5 rounded-2xl text-xs space-y-2">
                      <div className="flex justify-between text-[#1B2632] font-semibold gap-1">
                        <span>Monthly: ₹{monthlySavings.toLocaleString('en-IN')}</span>
                        <span className="text-emerald-700 font-bold break-words">₹{projectedReturn.toLocaleString('en-IN')}</span>
                      </div>
                      <input
                        type="range"
                        min={500}
                        max={50000}
                        step={500}
                        value={monthlySavings}
                        onChange={(e) => setMonthlySavings(Number(e.target.value))}
                        className="h-2 w-full bg-[#1B2632]/10 rounded-lg appearance-none cursor-pointer accent-[#1B2632]"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-white border border-[#C9C1B1]/60">
                      <span className="text-[#5C6B7A] font-semibold">Compare with FD</span>
                      <button
                        onClick={() => setCompareFd(!compareFd)}
                        className={`w-9 h-5 rounded-full transition-colors relative ${compareFd ? 'bg-[#1B2632]' : 'bg-slate-300'}`}
                      >
                        <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.75 transition-transform ${compareFd ? 'left-4.5' : 'left-0.75'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onOpenGoals}
                  className="bg-[#1B2632] hover:bg-[#2C3B4D] text-white py-2.5 px-5 rounded-full text-xs font-semibold w-full mt-4 transition cursor-pointer"
                >
                  Explore Goals →
                </button>
              </div>

              {/* Card 3: Explore Financial Myths (FAQ Engine) */}
              <div className="bg-white rounded-2xl border border-[#C9C1B1]/60 p-6 flex flex-col justify-between shadow-sm hover:border-[#1B2632]/30 transition">
                <div className="space-y-3">
                  <span className="text-[11px] font-bold text-[#A35139] uppercase tracking-wider">MYTH-BUSTER & FAQ</span>
                  <h3 className="font-serif text-xl font-semibold text-[#1B2632] leading-snug">Explore Financial Myths</h3>
                  
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {mythQuestions.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveQuestion(idx)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all border ${
                            activeQuestion === idx
                              ? 'bg-[#1B2632] text-white border-[#1B2632]'
                              : 'bg-[#F4F0E8] border-[#C9C1B1]/60 text-[#5C6B7A] hover:text-[#1B2632]'
                          }`}
                        >
                          {item.q}
                        </button>
                      ))}
                    </div>

                    <div className="bg-[#F4F0E8] p-3 rounded-xl text-xs space-y-1">
                      <p className="font-semibold text-[#1B2632]">{mythQuestions[activeQuestion].q}</p>
                      <p className="text-[#5C6B7A] text-[11px] line-clamp-2">{mythQuestions[activeQuestion].a}</p>
                    </div>

                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-[#5C6B7A] absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Search financial doubts in your language..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-full bg-white border border-[#C9C1B1]/60 text-xs text-[#1B2632] focus:outline-none focus:border-[#1B2632]"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={onOpenMyths}
                  className="bg-[#1B2632] hover:bg-[#2C3B4D] text-white py-2.5 px-5 rounded-full text-xs font-semibold w-full mt-4 transition cursor-pointer"
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
