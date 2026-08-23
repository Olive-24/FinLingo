import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Info,
  TrendingUp,
  Send,
  BookmarkPlus,
  CheckCircle2,
} from 'lucide-react';
import type { LanguageCode } from '../types';
import { LANGUAGES } from '../data/languages';
import { fetchLiveMarketData, saveUserGoal, type LiveMarketData } from '../services/api';

interface SimulatorPageProps {
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  onBackToChat: () => void;
  onAskAIWithSummary?: (summaryText: string) => void;
  onOpenGoalPlanning?: () => void;
  onOpenMythBusting?: () => void;
  onOpenDashboard?: () => void;
}

export const SimulatorPage: React.FC<SimulatorPageProps> = ({
  currentLang,
  onSelectLang,
  onBackToChat,
  onAskAIWithSummary,
  onOpenGoalPlanning,
  onOpenMythBusting,
  onOpenDashboard,
}) => {
  // Input Controls State
  const [monthlyAmount, setMonthlyAmount] = useState<number>(1500);
  const [durationYears, setDurationYears] = useState<number>(3);
  const [compareFD, setCompareFD] = useState<boolean>(true);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Live AMFI Market Data State
  const [marketData, setMarketData] = useState<LiveMarketData>({
    fundHouse: 'PPFAS Mutual Fund',
    schemeName: 'Parag Parikh Flexi Cap Fund - Direct Plan - Growth',
    currentNav: 84.52,
    navDate: new Date().toLocaleDateString('en-IN'),
    benchmarkFdRate: 6.5,
    historicalCAGR: 14.2,
  });

  useEffect(() => {
    fetchLiveMarketData().then((data) => {
      if (data && data.currentNav) {
        setMarketData(data);
      }
    });
  }, []);

  const sipRate = marketData.historicalCAGR || 12.0; // Live fund return CAGR
  const fdRate = marketData.benchmarkFdRate || 6.5; // Live bank benchmark FD return

  // Calculate SIP returns
  const calculateSIPReturns = (amount: number, years: number, rate: number) => {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    const factor =
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const finalValue = Math.round(amount * factor);
    const totalInvested = amount * months;
    const wealthGain = Math.max(0, finalValue - totalInvested);
    return { finalValue, totalInvested, wealthGain };
  };

  // Calculate FD returns (Recurring Deposit / Compound quarterly)
  const calculateFDReturns = (amount: number, years: number, rate: number) => {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    // Simple RD formula approximation
    let finalVal = 0;
    for (let i = 1; i <= months; i++) {
      finalVal += amount * Math.pow(1 + monthlyRate, months - i + 1);
    }
    const finalValue = Math.round(finalVal);
    const totalInvested = amount * months;
    const wealthGain = Math.max(0, finalValue - totalInvested);
    return { finalValue, totalInvested, wealthGain };
  };

  const sipResult = calculateSIPReturns(monthlyAmount, durationYears, sipRate);
  const fdResult = calculateFDReturns(monthlyAmount, durationYears, fdRate);
  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  // Generate Year-by-Year Data Points for SVG Chart
  const chartPoints = [];
  const totalMonths = durationYears * 12;
  const numSteps = Math.min(10, totalMonths);
  const stepMonths = totalMonths / numSteps;

  for (let i = 0; i <= numSteps; i++) {
    const monthIndex = Math.round(i * stepMonths);
    const currentYears = monthIndex / 12;
    const sipVal = monthIndex === 0 ? 0 : calculateSIPReturns(monthlyAmount, currentYears, sipRate).finalValue;
    const fdVal = monthIndex === 0 ? 0 : calculateFDReturns(monthlyAmount, currentYears, fdRate).finalValue;
    chartPoints.push({ monthIndex, yearLabel: Math.round(currentYears * 10) / 10, sipVal, fdVal });
  }

  // SVG Chart Dimensions & Scale
  const maxVal = Math.max(sipResult.finalValue, fdResult.finalValue, 1000);
  const chartWidth = 500;
  const chartHeight = 220;
  const padding = 30;

  const getSvgX = (index: number) => {
    return padding + (index / (chartPoints.length - 1)) * (chartWidth - 2 * padding);
  };

  const getSvgY = (val: number) => {
    return chartHeight - padding - (val / maxVal) * (chartHeight - 2 * padding);
  };

  // Generate SVG Path String for SIP Area & Line
  const sipLinePath = chartPoints
    .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${getSvgX(idx)} ${getSvgY(pt.sipVal)}`)
    .join(' ');

  const sipAreaPath = `${sipLinePath} L ${getSvgX(chartPoints.length - 1)} ${chartHeight - padding} L ${getSvgX(0)} ${chartHeight - padding} Z`;

  // Generate SVG Path String for FD Line
  const fdLinePath = chartPoints
    .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${getSvgX(idx)} ${getSvgY(pt.fdVal)}`)
    .join(' ');

  // Dynamic Vernacular Summary Sentence Generation
  const getDynamicSummary = () => {
    const amtStr = `₹${monthlyAmount.toLocaleString('en-IN')}`;
    const yrsStr = `${durationYears} ${durationYears === 1 ? 'year' : 'years'}`;
    const totalInvStr = `₹${sipResult.totalInvested.toLocaleString('en-IN')}`;
    const growthStr = `₹${sipResult.wealthGain.toLocaleString('en-IN')}`;
    const finalValStr = `₹${sipResult.finalValue.toLocaleString('en-IN')}`;

    switch (currentLang) {
      case 'hi':
        return `यदि आप ${durationYears} वर्षों के लिए हर महीने ${amtStr} का निवेश करते हैं, तो आपका कुल निवेश ${totalInvStr} होगा और अनुमानित लाभ ${growthStr} होगा (कुल ${finalValStr})।`;
      case 'ta':
        return `நீங்கள் ${durationYears} ஆண்டுகளுக்கு மாதம் ${amtStr} முதலீடு செய்தால், உங்கள் மொத்த முதலீடு ${totalInvStr} மற்றும் கணிக்கப்பட்ட லாபம் ${growthStr} ஆகும் (மொத்தம் ${finalValStr}).`;
      case 'te':
        return `మీరు ${durationYears} సంవత్సరాలకు నెలకు ${amtStr} పెట్టుబడి పెడితే, మీ మొత్తం పెట్టుబడి ${totalInvStr} మరియు అంచనా లాభం ${growthStr} అవుతుంది (మొత్తం ${finalValStr}).`;
      case 'mr':
        return `तुम्ही ${durationYears} वर्षांसाठी दरमहा ${amtStr} गुंतवल्यास, तुमची एकूण गुंतवणूक ${totalInvStr} आणि अंदाज नफा ${growthStr} होईल (एकूण ${finalValStr}).`;
      case 'bn':
        return `আপনি যদি ${durationYears} বছরের জন্য প্রতি মাসে ${amtStr} বিনিয়োগ করেন, তবে আপনার মোট বিনিয়োগ হবে ${totalInvStr} এবং আনুমানিক লাভ ${growthStr} (মোট ${finalValStr})।`;
      case 'gu':
        return `જો તમે ${durationYears} વર્ષ માટે દર મહિને ${amtStr} રોકાણ કરો છો, તો તમારું કુલ રોકાણ ${totalInvStr} થશે અને અંદાજિત નફો ${growthStr} થશે (કુલ ${finalValStr}).`;
      case 'kn':
        return `ನೀವು ${durationYears} ವರ್ಷಗಳಿಗೆ ತಿಂಗಳಿಗೆ ${amtStr} ಹೂಡಿಕೆ ಮಾಡಿದರೆ, ನಿಮ್ಮ ಒಟ್ಟು ಹೂಡಿಕೆ ${totalInvStr} ಮತ್ತು ಅಂದಾಜು ಲಾಭ ${growthStr} ಆಗುತ್ತದೆ (ಒಟ್ಟು ${finalValStr}).`;
      default:
        return `If you invest ${amtStr} monthly for ${yrsStr}, your total investment will be ${totalInvStr} with an estimated growth of ${growthStr} for a total value of ${finalValStr}.`;
    }
  };

  const handleAskAI = () => {
    const summaryText = `I analyzed a scenario on the Simulator:
• Monthly Contribution: ₹${monthlyAmount.toLocaleString('en-IN')}/month
• Duration: ${durationYears} Years (${durationYears * 12} Months)
• SIP Projected Growth: ₹${sipResult.wealthGain.toLocaleString('en-IN')} (Total Value: ₹${sipResult.finalValue.toLocaleString('en-IN')})
• FD Return: ₹${fdResult.wealthGain.toLocaleString('en-IN')} (Total Value: ₹${fdResult.finalValue.toLocaleString('en-IN')})

Can you explain the risk difference between SIP and FD for my profile?`;

    if (onAskAIWithSummary) {
      onAskAIWithSummary(summaryText);
    } else {
      onBackToChat();
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#EEE9DF] text-[#1B2632] flex flex-col items-center selection:bg-[#FFB162]/30 overflow-x-hidden">
      {/* HEADER */}
      <header className="w-full border-b border-[#1B2632]/10 bg-[#EEE9DF]/90 backdrop-blur sticky top-0 z-50 py-4 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToChat}
              className="px-4 py-2 rounded-full bg-white border border-[#C9C1B1] text-xs font-bold text-[#1B2632] flex items-center gap-1.5 hover:bg-[#F4F0E8] transition cursor-pointer shrink-0"
              title="Return to Workspace"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Console</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#1B2632] flex items-center justify-center text-white shadow-sm shrink-0">
                <svg 
                  className="w-4 h-4" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4771 12 22C12 16.4771 16.4771 12 22 12C16.4771 12 12 7.52285 12 2Z" 
                    fill="currentColor" 
                  />
                  <circle cx="19" cy="5" r="1.5" fill="currentColor" opacity="0.9" />
                  <circle cx="5" cy="19" r="1.2" fill="currentColor" opacity="0.7" />
                </svg>
              </div>
              <div className="truncate">
                <h1 className="font-serif font-bold text-base sm:text-lg text-[#1B2632] truncate">
                  Savings & SIP Simulator
                </h1>
                <p className="text-[11px] text-[#5C6B7A] truncate">
                  Interactive Growth Calculator • <span className="text-[#A35139] font-bold">{currentLangObj.flag} {currentLangObj.nativeName}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Language Selector & Action Cards */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-all border border-emerald-300/60 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
            )}

            {onOpenMythBusting && (
              <button
                onClick={onOpenMythBusting}
                className="px-3.5 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-[#D98D15] text-xs font-bold flex items-center gap-1.5 transition-all border border-[#F5A623]/30 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Myth-Buster</span>
              </button>
            )}

            {onOpenGoalPlanning && (
              <button
                onClick={onOpenGoalPlanning}
                className="px-3.5 py-1.5 rounded-full bg-[#0F7173]/10 hover:bg-[#0F7173]/20 text-[#0F7173] text-xs font-bold flex items-center gap-1.5 transition-all border border-[#0F7173]/20 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#0F7173]" />
                <span className="hidden sm:inline">Goal Cards</span>
              </button>
            )}

            <div className="relative">
              <select
                value={currentLang}
                onChange={(e) => onSelectLang(e.target.value as LanguageCode)}
                className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-[#0F7173] focus:outline-none focus:border-[#0F7173] cursor-pointer shadow-sm"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 flex flex-col gap-8 sm:gap-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: LARGE HORIZONTAL SLIDERS & CONTROLS */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-5 sm:p-8 bg-white border border-slate-200 rounded-3xl shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-extrabold text-[#2B2B2B]">Simulate Scenarios</h2>
                  <p className="text-xs text-[#6B6B6B]">Drag sliders to see live compounding growth</p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-[#0F7173]/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-[#0F7173]" />
                </div>
              </div>

              {/* SLIDER 1: MONTHLY AMOUNT */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
                    Monthly Investment
                  </label>
                  <span className="text-lg sm:text-2xl font-black text-[#0F7173] font-mono break-words">
                    ₹{monthlyAmount.toLocaleString('en-IN')}
                    <span className="text-xs text-[#6B6B6B] font-normal">/mo</span>
                  </span>
                </div>

                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={monthlyAmount}
                  onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                  className="h-2 w-full bg-[#1B2632]/10 rounded-lg appearance-none cursor-pointer accent-[#0F7173]"
                />

                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>₹500</span>
                  <span>₹25,000</span>
                  <span>₹50,000</span>
                </div>
              </div>

              {/* SLIDER 2: DURATION */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
                    Duration (Horizon)
                  </label>
                  <span className="text-lg sm:text-2xl font-black text-[#0F7173] font-mono break-words">
                    {durationYears} {durationYears === 1 ? 'Year' : 'Years'}
                    <span className="text-xs text-[#6B6B6B] font-normal"> ({durationYears * 12} Mos)</span>
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  value={durationYears}
                  onChange={(e) => setDurationYears(Number(e.target.value))}
                  className="h-2 w-full bg-[#1B2632]/10 rounded-lg appearance-none cursor-pointer accent-[#0F7173]"
                />

                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>1 Year</span>
                  <span>7 Years</span>
                  <span>15 Years</span>
                </div>
              </div>

              {/* TOGGLE: COMPARE WITH FIXED DEPOSIT (FD) */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-[#2B2B2B]">Compare with Fixed Deposit</div>
                  <div className="text-[11px] text-[#6B6B6B]">Compare SIP (12%) vs FD (6.5%)</div>
                </div>

                <button
                  type="button"
                  onClick={() => setCompareFD(!compareFD)}
                  className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 flex items-center shrink-0 cursor-pointer ${
                    compareFD ? 'bg-[#0F7173] justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-white shadow-md" />
                </button>
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div className="p-5 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
                Quick Scenario Shortcuts
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: '₹1,000 / 3 Yrs', amt: 1000, yrs: 3 },
                  { label: '₹2,500 / 5 Yrs', amt: 2500, yrs: 5 },
                  { label: '₹5,000 / 10 Yrs', amt: 5000, yrs: 10 },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setMonthlyAmount(item.amt);
                      setDurationYears(item.yrs);
                    }}
                    className="py-2.5 px-2 rounded-xl bg-slate-50 hover:bg-[#0F7173]/10 border border-slate-200 text-xs font-bold text-[#0F7173] text-center transition-all cursor-pointer truncate"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: LIVE ANIMATED SVG AREA CHART & DYNAMIC SUMMARY */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-5 sm:p-8 bg-white border border-slate-200 rounded-3xl shadow-md space-y-6">
              {/* Chart Legend Callouts */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-4 text-xs font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#0F7173] shrink-0" />
                    <span>SIP Growth (12% Expected)</span>
                  </div>

                  {compareFD && (
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <span className="w-3 h-3 rounded-full bg-[#64748B] shrink-0" />
                      <span>Bank FD (6.5% Guaranteed)</span>
                    </div>
                  )}
                </div>

                <div className="text-xs font-mono text-[#0F7173] font-extrabold">
                  Compounding Live
                </div>
              </div>

              {/* LIVE ANIMATED SVG AREA & LINE CHART */}
              <div className="relative w-full overflow-hidden pt-2">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="w-full h-auto overflow-visible transition-all duration-300 ease-out"
                >
                  <defs>
                    <linearGradient id="sipGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0F7173" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#2ECC91" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  <line x1={padding} y1={padding} x2={chartWidth - padding} y2={padding} stroke="#F1F5F9" strokeWidth="1" />
                  <line x1={padding} y1={chartHeight / 2} x2={chartWidth - padding} y2={chartHeight / 2} stroke="#F1F5F9" strokeWidth="1" />
                  <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#E2E8F0" strokeWidth="1.5" />

                  {/* SIP Area Fill */}
                  <path d={sipAreaPath} fill="url(#sipGrad)" />

                  {/* FD Line Overlay (if enabled) */}
                  {compareFD && (
                    <path
                      d={fdLinePath}
                      fill="none"
                      stroke="#64748B"
                      strokeWidth="2.5"
                      strokeDasharray="4 4"
                      className="transition-all duration-300"
                    />
                  )}

                  {/* SIP Main Growth Line */}
                  <path
                    d={sipLinePath}
                    fill="none"
                    stroke="#0F7173"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />

                  {/* End Data Point Dots */}
                  <circle
                    cx={getSvgX(chartPoints.length - 1)}
                    cy={getSvgY(sipResult.finalValue)}
                    r="6"
                    fill="#0F7173"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="shadow-md"
                  />

                  {compareFD && (
                    <circle
                      cx={getSvgX(chartPoints.length - 1)}
                      cy={getSvgY(fdResult.finalValue)}
                      r="5"
                      fill="#64748B"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                  )}

                  {/* Minimal Axis Labels */}
                  <text x={padding} y={chartHeight - 10} fontSize="11" fill="#94A3B8" fontFamily="monospace">
                    Year 0
                  </text>
                  <text x={chartWidth - padding - 40} y={chartHeight - 10} fontSize="11" fill="#0F7173" fontWeight="bold" fontFamily="monospace">
                    Year {durationYears}
                  </text>
                </svg>
              </div>

              {/* DYNAMIC PLAIN-LANGUAGE VERNACULAR SUMMARY SENTENCE (18-20px) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0F7173]/10 border border-[#0F7173]/20 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#0F7173] flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#0F7173] shrink-0" />
                  <span>Dynamic Summary</span>
                </div>
                <p className="text-base sm:text-xl font-extrabold text-[#2B2B2B] leading-relaxed break-words">
                  {getDynamicSummary()}
                </p>
              </div>

              {/* FD VS SIP COMPARATIVE NUMBERS CARD */}
              {compareFD && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#0F7173]/10 border border-[#0F7173]/20 text-center space-y-1">
                    <div className="text-[11px] font-bold text-[#0F7173] uppercase">SIP Projected Return</div>
                    <div className="text-xl sm:text-2xl font-black text-[#0F7173] font-mono break-words">
                      +₹{sipResult.wealthGain.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[11px] text-[#6B6B6B] break-words">Total: ₹{sipResult.finalValue.toLocaleString('en-IN')}</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-center space-y-1">
                    <div className="text-[11px] font-bold text-[#64748B] uppercase">Bank FD Return</div>
                    <div className="text-xl sm:text-2xl font-black text-[#64748B] font-mono break-words">
                      +₹{fdResult.wealthGain.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[11px] text-[#6B6B6B] break-words">Total: ₹{fdResult.finalValue.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              )}

              {/* Save Goal Action Button */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={async () => {
                    await saveUserGoal({
                      title: `Custom Goal (₹${monthlyAmount.toLocaleString('en-IN')}/mo)`,
                      targetAmount: sipResult.finalValue,
                      monthlySavings: monthlyAmount,
                      tenureYears: durationYears,
                      expectedReturnRate: sipRate,
                      projectedMaturity: sipResult.finalValue,
                    });
                    setIsSaved(true);
                    setTimeout(() => setIsSaved(false), 3000);
                  }}
                  className={`py-3.5 px-6 rounded-full font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                    isSaved
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#1B2632] hover:bg-[#2C3B4D] text-white'
                  }`}
                >
                  {isSaved ? <CheckCircle2 className="w-4 h-4 text-white" /> : <BookmarkPlus className="w-4 h-4 text-amber-300" />}
                  <span>{isSaved ? 'Goal Saved to Profile!' : 'Save Goal to Profile'}</span>
                </button>
              </div>

              {/* PERSISTENT NEUTRAL LEGAL & TRUST DISCLAIMER BANNER */}
              <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-[#64748B] flex items-center gap-2.5">
                <Info className="w-4 h-4 text-[#0F7173] shrink-0" />
                <span className="font-semibold">
                  Live AMFI Data ({marketData.fundHouse}): NAV ₹{marketData.currentNav} ({marketData.navDate}) • Benchmark FD: {marketData.benchmarkFdRate}% • Historical CAGR: {marketData.historicalCAGR}%. This is a simulation for educational purposes.
                </span>
              </div>

              {/* ACTION BUTTON */}
              <div className="pt-2">
                <button
                  onClick={handleAskAI}
                  className="w-full bg-[#0F7173] hover:bg-[#0B5456] text-white py-4 rounded-full text-sm sm:text-base font-bold shadow-md shadow-[#0F7173]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                  <span>Ask FinLingo AI About This Calculation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-4 text-xs text-center text-[#6B6B6B]">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-4">
          <span>FinLingo Simulator • Apni bhasha mein paison ki samajh</span>
          <button onClick={onBackToChat} className="text-[#0F7173] hover:underline font-bold">
            Return to Voice Assistant
          </button>
        </div>
      </footer>
    </div>
  );
};
