import React, { useState } from 'react';
import {
  Sparkles,
  MessageSquare,
  TrendingUp,
  HelpCircle,
  ChevronDown,
  Home,
  GraduationCap,
  Sliders,
  Search,
  LogOut,
  LayoutDashboard,
  Settings,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import type { LanguageCode, UserProfile } from '../types';
import { Card, Button, Badge, MicroLabel } from './ui/Primitives';

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
  // Navigation tab state inside console
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'chat' | 'goals' | 'myths' | 'settings'
  >('dashboard');

  // Card 2 (Goal Simulator) interactive states
  const [activeGoalPreset, setActiveGoalPreset] = useState<'home' | 'education' | 'custom'>('education');
  const [monthlySavings, setMonthlySavings] = useState<number>(3500);
  const [compareFd, setCompareFd] = useState<boolean>(true);

  // Card 3 (Myth-Buster) interactive states
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const userName = userProfile?.name || 'Ramesh G.';
  const userOccupation = userProfile?.occupation ? userProfile.occupation.replace('_', ' ') : 'Salaried';

  const mythQuestions = [
    {
      q: 'Can I lose money in mutual funds?',
      a: 'Mutual funds fluctuate with market movements, but holding long-term SIPs historically beats inflation. Risk is managed by diversification.',
    },
    {
      q: 'SIP vs RD — which is better?',
      a: 'Recurring Deposits give fixed ~6.5% interest, while equity SIPs historically return 12-14% over 5+ years for long-term goals.',
    },
    {
      q: 'Is Kisan Credit Card interest 4%?',
      a: 'Yes! KCC baseline rate is 7%, but paying on time earns a 3% prompt repayment subvention, dropping effective interest to 4%.',
    },
  ];

  // Calculate 5-year projected growth for Card 2
  const projectedReturn = Math.round(monthlySavings * 60 * 1.34);
  const fdReturn = Math.round(monthlySavings * 60 * 1.15);

  return (
    <div className="min-h-screen bg-[#F6ECE6] text-[#2D1E25] p-4 sm:p-6 lg:p-8 flex flex-col justify-between selection:bg-[#3B232E] selection:text-white">
      {/* TOP NAVIGATION & GLOBAL HEADER */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between py-4 mb-6 px-2">
        {/* Left: Brand Wordmark with Badge */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#3B232E] text-white flex items-center justify-center font-bold shadow-md">
            <Sparkles className="w-5 h-5 fill-white/20" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-serif-display text-2xl font-semibold text-[#2D1E25] tracking-tight">
              FinLingo
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#EAD7CF] text-[#3B232E] text-[10px] font-mono font-bold border border-[rgba(59,35,46,0.1)]">
              v1.0 Live AI Engine
            </span>
          </div>
        </div>

        {/* Center Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#7A6870]">
          <button onClick={() => setActiveTab('dashboard')} className={`hover:text-[#3B232E] transition-colors ${activeTab === 'dashboard' ? 'text-[#3B232E] font-bold' : ''}`}>
            Architecture
          </button>
          <button onClick={onOpenGoals} className="hover:text-[#3B232E] transition-colors">
            Benchmarking
          </button>
          <button onClick={onOpenB2B} className="hover:text-[#3B232E] transition-colors flex items-center gap-1.5 text-[#3B2530] font-bold">
            <Building2 className="w-3.5 h-3.5" />
            <span>B2B Console</span>
          </button>
        </nav>

        {/* Right Action Button */}
        <Button variant="primary" size="sm" onClick={onOpenChat}>
          <span>Try FinLingo →</span>
        </Button>
      </header>

      {/* MAIN APPLICATION LAYOUT (SPLIT WORKSPACE CONTAINER) */}
      <div className="max-w-7xl mx-auto w-full rounded-3xl border border-[rgba(59,35,46,0.1)] bg-white/40 p-4 sm:p-6 backdrop-blur-sm shadow-xl space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SIDEBAR PANEL (Width: ~280px) */}
          <aside className="lg:col-span-3 space-y-4">
            {/* User Profile Header Card */}
            <div className="p-4 rounded-2xl bg-white border border-[rgba(59,35,46,0.08)] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#3B232E] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    {userName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#2D1E25] truncate">{userName}</div>
                    <div className="text-[11px] text-[#7A6870] capitalize font-medium">{userOccupation} • Hindi</div>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-[#7A6870]" />
              </div>
            </div>

            {/* Console Navigation Links */}
            <div className="p-2 rounded-2xl bg-white border border-[rgba(59,35,46,0.08)] shadow-sm space-y-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                  activeTab === 'dashboard'
                    ? 'bg-[#EAD7CF] text-[#3B232E] shadow-sm'
                    : 'text-[#7A6870] hover:bg-[#F6ECE6]/60 hover:text-[#2D1E25]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4 text-[#3B232E]" />
                  <span>Dashboard</span>
                </div>
                {activeTab === 'dashboard' && <div className="w-1.5 h-1.5 rounded-full bg-[#3B232E]" />}
              </button>

              <button
                onClick={() => {
                  setActiveTab('chat');
                  onOpenChat();
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                  activeTab === 'chat'
                    ? 'bg-[#EAD7CF] text-[#3B232E] shadow-sm'
                    : 'text-[#7A6870] hover:bg-[#F6ECE6]/60 hover:text-[#2D1E25]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-[#3B232E]" />
                  <span>Conversational Assistant</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveTab('goals');
                  onOpenGoals();
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                  activeTab === 'goals'
                    ? 'bg-[#EAD7CF] text-[#3B232E] shadow-sm'
                    : 'text-[#7A6870] hover:bg-[#F6ECE6]/60 hover:text-[#2D1E25]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="w-4 h-4 text-[#3B232E]" />
                  <span>Financial Goals</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveTab('myths');
                  onOpenMyths();
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                  activeTab === 'myths'
                    ? 'bg-[#EAD7CF] text-[#3B232E] shadow-sm'
                    : 'text-[#7A6870] hover:bg-[#F6ECE6]/60 hover:text-[#2D1E25]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-[#3B232E]" />
                  <span>FAQ & Myth-Buster</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                  activeTab === 'settings'
                    ? 'bg-[#EAD7CF] text-[#3B232E] shadow-sm'
                    : 'text-[#7A6870] hover:bg-[#F6ECE6]/60 hover:text-[#2D1E25]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Settings className="w-4 h-4 text-[#3B232E]" />
                  <span>Settings & Security</span>
                </div>
              </button>

              <div className="pt-2 mt-2 border-t border-[rgba(59,35,46,0.08)]">
                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-3 rounded-xl text-xs font-bold text-rose-700 hover:bg-rose-50 transition-all flex items-center gap-2.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA (3-CARD DASHBOARD HUB) */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Dashboard Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(59,35,46,0.08)] pb-4">
              <div>
                <MicroLabel>FINLINGO AI CONSOLE</MicroLabel>
                <h1 className="font-serif-display text-2xl sm:text-3xl text-[#2D1E25] font-semibold tracking-tight">
                  Welcome back, {userName.split(' ')[0]}
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="plum" icon={<Sparkles className="w-3.5 h-3.5" />}>
                  Vernacular Engine Active
                </Badge>
                <Badge variant="default">Hindi / English</Badge>
              </div>
            </div>

            {/* SECTION 5: MAIN DASHBOARD CONTENT GRID (3-CARD HUB) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* CARD 1: VERNACULAR FINANCIAL ASSISTANT */}
              <Card padding="md" className="flex flex-col justify-between space-y-5 h-full hover:border-[#3B232E]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <MicroLabel>CHAT INTERFACE</MicroLabel>
                    <div className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse" />
                  </div>

                  <h3 className="font-serif-display text-xl text-[#2D1E25] font-semibold leading-tight">
                    Start a Vernacular Financial Chat
                  </h3>

                  {/* Interactive UI Preview: Sample Conversation Thread */}
                  <div className="space-y-3 p-3 rounded-2xl bg-[#F6ECE6]/60 border border-[rgba(59,35,46,0.08)] text-xs">
                    {/* User Prompt (Right/Light Cream) */}
                    <div className="p-3 rounded-2xl bg-white border border-[rgba(59,35,46,0.08)] ml-4 text-right space-y-1">
                      <div className="text-[10px] font-bold text-[#7A6870]">User (Hindi)</div>
                      <p className="font-indic text-xs text-[#2D1E25] italic font-semibold">
                        "Agar main ₹2,500 har mahine bachaaoon 5 saal ke liye, toh kitna milega?"
                      </p>
                    </div>

                    {/* AI Response (Left/Plum Tint) */}
                    <div className="p-3 rounded-2xl bg-[#3B232E]/10 border border-[#3B232E]/20 mr-4 space-y-1.5">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-extrabold text-[#3B232E]">FinLingo AI</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#3B232E] text-white text-[9px] font-mono">
                          Audio Ready 1.0x
                        </span>
                      </div>
                      <p className="text-xs text-[#2D1E25] leading-relaxed">
                        ₹2,500/mo SIP par 12% returns se 5 saal mein total amount banega <strong className="text-[#3B232E] font-mono">₹2,06,216</strong>!
                      </p>
                    </div>
                  </div>
                </div>

                <Button variant="primary" size="md" className="w-full mt-2" onClick={onOpenChat}>
                  <span>Open Chat →</span>
                </Button>
              </Card>

              {/* CARD 2: GOAL PLANNING & SIP SIMULATOR */}
              <Card padding="md" className="flex flex-col justify-between space-y-5 h-full hover:border-[#3B232E]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <MicroLabel>GOAL PLANNING CARDS</MicroLabel>
                    <Badge variant="plum">SIP Calculator</Badge>
                  </div>

                  <h3 className="font-serif-display text-xl text-[#2D1E25] font-semibold leading-tight">
                    Plan a Wealth Goal
                  </h3>

                  {/* Interactive UI Preview: Goal Preset Selector */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setActiveGoalPreset('home')}
                        className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                          activeGoalPreset === 'home'
                            ? 'bg-[#3B232E] text-white border-[#3B232E] shadow-sm'
                            : 'bg-white border-[rgba(59,35,46,0.1)] text-[#7A6870] hover:border-[#3B232E]'
                        }`}
                      >
                        <Home className="w-4 h-4" />
                        <span>Home</span>
                      </button>

                      <button
                        onClick={() => setActiveGoalPreset('education')}
                        className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                          activeGoalPreset === 'education'
                            ? 'bg-[#3B232E] text-white border-[#3B232E] shadow-sm'
                            : 'bg-white border-[rgba(59,35,46,0.1)] text-[#7A6870] hover:border-[#3B232E]'
                        }`}
                      >
                        <GraduationCap className="w-4 h-4" />
                        <span>College</span>
                      </button>

                      <button
                        onClick={() => setActiveGoalPreset('custom')}
                        className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                          activeGoalPreset === 'custom'
                            ? 'bg-[#3B232E] text-white border-[#3B232E] shadow-sm'
                            : 'bg-white border-[rgba(59,35,46,0.1)] text-[#7A6870] hover:border-[#3B232E]'
                        }`}
                      >
                        <Sliders className="w-4 h-4" />
                        <span>Custom</span>
                      </button>
                    </div>

                    {/* Range Slider */}
                    <div className="space-y-1.5 p-3 rounded-2xl bg-[#F6ECE6]/60 border border-[rgba(59,35,46,0.08)]">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-[#7A6870]">Monthly Savings</span>
                        <span className="font-mono text-[#3B232E]">₹{monthlySavings.toLocaleString('en-IN')}/mo</span>
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

                      {/* Minimal Spline Curve SVG Preview */}
                      <div className="pt-2 flex items-center justify-between border-t border-[rgba(59,35,46,0.08)] text-[11px]">
                        <span className="text-[#7A6870]">5-Yr Growth</span>
                        <span className="font-mono font-bold text-[#2D6A4F]">
                          ₹{projectedReturn.toLocaleString('en-IN')} (+34%)
                        </span>
                      </div>
                    </div>

                    {/* Inline Switch labeled Compare with Bank FD */}
                    <div className="space-y-1.5 p-2 rounded-xl bg-white border border-[rgba(59,35,46,0.08)]">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#7A6870] font-semibold">Compare with Bank FD</span>
                        <button
                          onClick={() => setCompareFd(!compareFd)}
                          className={`w-9 h-5 rounded-full transition-colors relative ${compareFd ? 'bg-[#3B232E]' : 'bg-slate-300'}`}
                        >
                          <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.75 transition-transform ${compareFd ? 'left-4.5' : 'left-0.75'}`} />
                        </button>
                      </div>
                      {compareFd && (
                        <div className="pt-1 border-t border-[rgba(59,35,46,0.05)] flex items-center justify-between text-[11px]">
                          <span className="text-[#7A6870]">Bank FD (6.5% p.a.):</span>
                          <span className="font-mono font-bold text-[#7A6870]">₹{fdReturn.toLocaleString('en-IN')} (+15%)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Button variant="primary" size="md" className="w-full mt-2" onClick={onOpenGoals}>
                  <span>Explore Goals →</span>
                </Button>
              </Card>

              {/* CARD 3: FINANCIAL MYTH-BUSTER & FAQ */}
              <Card padding="md" className="flex flex-col justify-between space-y-5 h-full hover:border-[#3B232E]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <MicroLabel>MYTH-BUSTER & FAQ</MicroLabel>
                    <Badge variant="plum">Verified</Badge>
                  </div>

                  <h3 className="font-serif-display text-xl text-[#2D1E25] font-semibold leading-tight">
                    Explore Financial Myths
                  </h3>

                  {/* Question Chips */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {mythQuestions.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveQuestion(idx)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                            activeQuestion === idx
                              ? 'bg-[#3B232E] text-white border-[#3B232E] shadow-sm'
                              : 'bg-[#F6ECE6] border-[rgba(59,35,46,0.1)] text-[#7A6870] hover:text-[#3B232E]'
                          }`}
                        >
                          {item.q}
                        </button>
                      ))}
                    </div>

                    {/* Answer Preview Box */}
                    <div className="p-3.5 rounded-2xl bg-[#F6ECE6]/60 border border-[rgba(59,35,46,0.08)] space-y-2 text-xs">
                      <p className="text-[#2D1E25] leading-relaxed font-medium">
                        "{mythQuestions[activeQuestion].a}"
                      </p>
                      <div className="flex items-center gap-1.5 text-[10px] text-[#2D6A4F] font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>SEBI & RBI Regulatory Compliance Verified</span>
                      </div>
                    </div>

                    {/* Bottom Muted Search Input */}
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-[#7A6870] absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Search financial doubts in your language..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-full bg-white border border-[rgba(59,35,46,0.1)] text-xs text-[#2D1E25] focus:outline-none focus:border-[#3B232E]"
                      />
                    </div>
                  </div>
                </div>

                <Button variant="primary" size="md" className="w-full mt-2" onClick={onOpenMyths}>
                  <span>Explore FAQ →</span>
                </Button>
              </Card>

            </div>

          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardWorkspace;
