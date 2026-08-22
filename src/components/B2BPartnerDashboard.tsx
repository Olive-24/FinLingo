import React, { useState } from 'react';
import {
  Building2,
  Users,
  TrendingUp,
  Globe,
  BarChart3,
  Sliders,
  Download,
  LogOut,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Layers,
  Filter,
  RefreshCw,
  Lock,
} from 'lucide-react';
import type { LanguageCode } from '../types';

interface B2BPartnerDashboardProps {
  currentLang?: LanguageCode;
  onSelectLang?: (lang: LanguageCode) => void;
  onClose: () => void;
}

export const B2BPartnerDashboard: React.FC<B2BPartnerDashboardProps> = ({
  currentLang: _currentLang,
  onSelectLang: _onSelectLang,
  onClose,
}) => {
  // Auth Gate State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Default logged in for Hackathon Demo
  const [partnerBank, setPartnerBank] = useState<string>('State Bank of India (White-Label License)');
  const [selectedRole, setSelectedRole] = useState<string>('Enterprise Analytics Admin');
  const [accessKey, setAccessKey] = useState<string>('sbi_prod_key_9842');

  // Active Sidebar Tab State
  const [activeTab, setActiveTab] = useState<
    'overview' | 'analytics' | 'languages' | 'funnel' | 'settings'
  >('overview');

  // Region Filter
  const [selectedRegion, setSelectedRegion] = useState<string>('All India (National)');
  const [timeRange, setTimeRange] = useState<string>('Last 30 Days');

  // Mock B2B Aggregated & Anonymized Analytics Data
  const stats = [
    {
      label: 'Total Onboarded Users',
      value: '142,850',
      change: '+14.2%',
      isPositive: true,
      subtext: 'vs. previous period',
    },
    {
      label: 'Active Monthly Users (MAU)',
      value: '48,290',
      change: '+8.7%',
      isPositive: true,
      subtext: '33.8% monthly engagement rate',
    },
    {
      label: 'Goal Simulations Executed',
      value: '318,400',
      change: '+22.4%',
      isPositive: true,
      subtext: 'Avg. 2.23 goals per user',
    },
    {
      label: 'Top Performing Vernacular',
      value: 'Hindi (38.4%)',
      change: 'Marathi +18%',
      isPositive: true,
      subtext: '8 native languages active',
    },
    {
      label: 'Lead Conversion Funnel Rate',
      value: '34.8%',
      change: '+3.2%',
      isPositive: true,
      subtext: 'Goal to Banking Lead transfer',
    },
  ];

  // Language Breakdown Data
  const languageData = [
    { code: 'hi', name: 'Hindi', users: 54850, share: 38.4, growth: '+12.4%', color: '#1E2761' },
    { code: 'mr', name: 'Marathi', users: 30280, share: 21.2, growth: '+18.1%', color: '#0F7173' },
    { code: 'ta', name: 'Tamil', users: 21140, share: 14.8, growth: '+9.3%', color: '#2ECC91' },
    { code: 'te', name: 'Telugu', users: 17560, share: 12.3, growth: '+14.0%', color: '#D98D15' },
    { code: 'bn', name: 'Bengali', users: 11570, share: 8.1, growth: '+6.5%', color: '#6366F1' },
    { code: 'gu', name: 'Gujarati', users: 7450, share: 5.2, growth: '+8.8%', color: '#EC4899' },
  ];

  // Occupation Metrics
  const occupationData = [
    { occupation: 'Salaried Employees', count: 48200, topGoal: 'Children Higher Education', avgSIP: 7200, conversionRate: '41.2%' },
    { occupation: 'Farmers & Agri Workers', count: 34150, topGoal: 'Emergency Fund & KCC Subvention', avgSIP: 3500, conversionRate: '36.8%' },
    { occupation: 'Gig Workers & Delivery', count: 28900, topGoal: 'Emergency Expense Buffer', avgSIP: 4200, conversionRate: '31.5%' },
    { occupation: 'Kirana Shopkeepers', count: 19400, topGoal: 'Business Expansion & Home Down Payment', avgSIP: 9800, conversionRate: '38.4%' },
    { occupation: 'Micro Entrepreneurs', count: 12200, topGoal: 'Equipment Purchase & Retirement', avgSIP: 11500, conversionRate: '29.1%' },
  ];

  // Funnel Data Steps
  const funnelSteps = [
    { step: '1. Onboarded Users', count: 142850, pct: 100, color: '#1E2761' },
    { step: '2. Voice Query Initiated', count: 98400, pct: 68.9, color: '#2563EB' },
    { step: '3. Goal Simulator Executed', count: 49700, pct: 34.8, color: '#0F7173' },
    { step: '4. Bank Lead / Product Applied', count: 18200, pct: 12.7, color: '#2ECC91' },
  ];

  // IF NOT AUTHENTICATED: B2B LOGIN GATE MODAL / VIEW
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F4F6F8] text-[#1E2761] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-lg shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-md bg-[#1E2761] text-white mx-auto flex items-center justify-center font-bold shadow-md">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#1E2761] tracking-tight">
              B2B Partner Enterprise Console
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              White-label license login for Banks, NBFCs & Micro-Finance Institutions
            </p>
          </div>

          <div className="space-y-4 text-xs font-semibold">
            <div>
              <label className="block text-slate-700 mb-1">Partner Institution</label>
              <select
                value={partnerBank}
                onChange={(e) => setPartnerBank(e.target.value)}
                className="w-full p-2.5 rounded-md border border-slate-300 bg-slate-50 text-[#1E2761] focus:outline-none focus:border-[#1E2761]"
              >
                <option value="State Bank of India (White-Label License)">State Bank of India (SBI)</option>
                <option value="HDFC Bank Micro-Finance Division">HDFC Bank Micro-Finance</option>
                <option value="Muthoot Fincorp Rural Inclusion">Muthoot Fincorp</option>
                <option value="NABARD Agri-Inclusion Initiative">NABARD Agri-Inclusion</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 mb-1">Role / Access Level</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full p-2.5 rounded-md border border-slate-300 bg-slate-50 text-[#1E2761] focus:outline-none focus:border-[#1E2761]"
              >
                <option value="Enterprise Analytics Admin">Enterprise Analytics Admin</option>
                <option value="Risk & Portfolio Officer">Risk & Portfolio Officer</option>
                <option value="Regional Product Manager">Regional Product Manager</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 mb-1">Partner Enterprise API Key</label>
              <input
                type="password"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                className="w-full p-2.5 rounded-md border border-slate-300 bg-slate-50 text-[#1E2761] focus:outline-none focus:border-[#1E2761] font-mono"
              />
            </div>

            <button
              onClick={() => setIsAuthenticated(true)}
              className="w-full py-3 bg-[#1E2761] hover:bg-[#151B45] text-white font-bold rounded-md shadow-md transition-colors text-sm flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Authenticate Partner Access</span>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100 text-center">
            <button onClick={onClose} className="text-xs text-slate-500 hover:underline">
              ← Return to Consumer Product Demo
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MAIN ENTERPRISE B2B DASHBOARD LAYOUT
  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans text-[#1E2761] flex selection:bg-[#1E2761] selection:text-white">
      {/* FIXED LEFT SIDEBAR IN ENTERPRISE NAVY (#1E2761) */}
      <aside className="w-64 bg-[#1E2761] text-white flex flex-col justify-between shrink-0 shadow-lg z-30">
        <div>
          {/* Institution Header Branding */}
          <div className="p-5 border-b border-white/10 space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-white text-[#1E2761] font-black flex items-center justify-center shadow-sm">
                <Building2 className="w-5 h-5 text-[#1E2761]" />
              </div>
              <div>
                <div className="font-extrabold text-sm tracking-tight text-white">FinLingo B2B</div>
                <div className="text-[10px] text-slate-300 font-mono">White-Label Console</div>
              </div>
            </div>
            <div className="pt-2 text-[11px] text-emerald-400 font-semibold truncate flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="truncate">{partnerBank.split(' ')[0]} Partner License</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full p-3 rounded-md flex items-center gap-3 transition-colors ${
                activeTab === 'overview'
                  ? 'bg-white/15 text-white font-bold border-l-4 border-emerald-400'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Overview & Key Metrics</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full p-3 rounded-md flex items-center gap-3 transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-white/15 text-white font-bold border-l-4 border-emerald-400'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>User Demographics</span>
            </button>

            <button
              onClick={() => setActiveTab('languages')}
              className={`w-full p-3 rounded-md flex items-center gap-3 transition-colors ${
                activeTab === 'languages'
                  ? 'bg-white/15 text-white font-bold border-l-4 border-emerald-400'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Vernacular Language Map</span>
            </button>

            <button
              onClick={() => setActiveTab('funnel')}
              className={`w-full p-3 rounded-md flex items-center gap-3 transition-colors ${
                activeTab === 'funnel'
                  ? 'bg-white/15 text-white font-bold border-l-4 border-emerald-400'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Conversion Funnel</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full p-3 rounded-md flex items-center gap-3 transition-colors ${
                activeTab === 'settings'
                  ? 'bg-white/15 text-white font-bold border-l-4 border-emerald-400'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>White-Label Settings</span>
            </button>
          </nav>
        </div>

        {/* Footer / Role Logout */}
        <div className="p-4 border-t border-white/10 text-xs space-y-3">
          <div className="space-y-0.5">
            <div className="font-bold text-white truncate">{selectedRole}</div>
            <div className="text-[10px] text-slate-400 font-mono truncate">API Key: {accessKey}</div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={onClose}
              className="text-[11px] font-bold text-slate-300 hover:text-white flex items-center gap-1.5"
            >
              <span>Consumer View</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
              title="Lock Partner Console"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA RIGHT (#F4F6F8) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* TOP ENTERPRISE HEADER BAR */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div>
            <h1 className="text-xl font-black text-[#1E2761] tracking-tight flex items-center gap-2">
              <span>B2B Partner Analytics Console</span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-200">
                PROD v2.4
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Aggregated & anonymized user insights for enterprise scaling and product qualification
            </p>
          </div>

          {/* Region & Date Filters */}
          <div className="flex items-center gap-3 text-xs font-semibold">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="bg-transparent text-[#1E2761] font-bold focus:outline-none cursor-pointer"
              >
                <option value="All India (National)">All India (National)</option>
                <option value="Maharashtra Region">Maharashtra Region</option>
                <option value="Uttar Pradesh & Bihar">Uttar Pradesh & Bihar</option>
                <option value="Tamil Nadu & Andhra Pradesh">Tamil Nadu & Andhra Pradesh</option>
                <option value="West Bengal & East">West Bengal & East</option>
              </select>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 font-mono text-slate-700">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-transparent text-[#1E2761] font-bold focus:outline-none cursor-pointer"
              >
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last Quarter (Q2 2026)">Last Quarter (Q2 2026)</option>
                <option value="Year-to-Date (YTD)">Year-to-Date (YTD)</option>
              </select>
            </div>

            <button
              onClick={() => alert('Data synchronized with Bank Data Warehouse')}
              className="p-2 rounded-md bg-slate-100 hover:bg-slate-200 text-[#1E2761] transition-colors"
              title="Refresh Analytics"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* MAIN DASHBOARD CONTENT BODY */}
        <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* ROW 1: TOP STAT-CARD TILES (FORMAL B2B COMPACT WHITE CARDS WITH TIGHT 8PX RADII) */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-lg p-4 space-y-2 shadow-sm hover:border-[#1E2761]/30 transition-all"
              >
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">
                  {stat.label}
                </div>

                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-black text-[#1E2761] font-mono tracking-tight">
                    {stat.value}
                  </div>
                  <div
                    className={`flex items-center text-xs font-bold font-mono px-1.5 py-0.5 rounded ${
                      stat.isPositive
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {stat.isPositive ? (
                      <ArrowUpRight className="w-3 h-3 mr-0.5" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 mr-0.5" />
                    )}
                    <span>{stat.change}</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 font-medium truncate">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </section>

          {/* ROW 2: USER GROWTH & ACTIVE SIMULATIONS OVER TIME (LINE CHART) & LANGUAGE DISTRIBUTION (BAR CHART) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* User Growth Line Chart */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-extrabold text-sm text-[#1E2761] tracking-tight flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#1E2761]" />
                    <span>Monthly Active Users & Simulation Growth</span>
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Aggregated scaling metric across white-label mobile app sessions
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-[#1E2761] font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1E2761]" />
                    Onboarded Users
                  </span>
                  <span className="flex items-center gap-1.5 text-[#0F7173] font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0F7173]" />
                    Simulations Executed
                  </span>
                </div>
              </div>

              {/* Native SVG Line Graph */}
              <div className="h-64 w-full relative pt-4">
                <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2="500" y2="40" stroke="#E2E8F0" strokeDasharray="3 3" />
                  <line x1="0" y1="90" x2="500" y2="90" stroke="#E2E8F0" strokeDasharray="3 3" />
                  <line x1="0" y1="140" x2="500" y2="140" stroke="#E2E8F0" strokeDasharray="3 3" />

                  {/* Line 1: Onboarded Users (Navy) */}
                  <path
                    d="M 10 160 Q 100 130, 200 95 T 350 50 T 490 25"
                    fill="none"
                    stroke="#1E2761"
                    strokeWidth="3"
                  />
                  {/* Line 2: Goal Simulations (Teal) */}
                  <path
                    d="M 10 180 Q 100 155, 200 120 T 350 75 T 490 40"
                    fill="none"
                    stroke="#0F7173"
                    strokeWidth="3"
                  />

                  {/* Data Points */}
                  <circle cx="10" cy="160" r="4" fill="#1E2761" />
                  <circle cx="120" cy="125" r="4" fill="#1E2761" />
                  <circle cx="240" cy="85" r="4" fill="#1E2761" />
                  <circle cx="360" cy="45" r="4" fill="#1E2761" />
                  <circle cx="490" cy="25" r="4" fill="#1E2761" />

                  <circle cx="10" cy="180" r="4" fill="#0F7173" />
                  <circle cx="120" cy="150" r="4" fill="#0F7173" />
                  <circle cx="240" cy="110" r="4" fill="#0F7173" />
                  <circle cx="360" cy="70" r="4" fill="#0F7173" />
                  <circle cx="490" cy="40" r="4" fill="#0F7173" />
                </svg>

                {/* X-Axis Labels */}
                <div className="flex justify-between text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-200">
                  <span>Jan 2026</span>
                  <span>Mar 2026</span>
                  <span>May 2026</span>
                  <span>Jul 2026</span>
                  <span>Aug 2026</span>
                </div>
              </div>
            </div>

            {/* Vernacular Language Distribution Bar Chart */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-extrabold text-sm text-[#1E2761] tracking-tight flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#1E2761]" />
                    <span>Vernacular Language Breakdown</span>
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Distribution of active voice queries by regional language
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 pt-1">
                {languageData.map((lang) => (
                  <div key={lang.code} className="space-y-1 text-xs">
                    <div className="flex justify-between font-semibold text-[#1E2761]">
                      <span>{lang.name}</span>
                      <span className="font-mono text-slate-600">
                        {lang.users.toLocaleString()} ({lang.share}%)
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden flex">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${lang.share}%`, backgroundColor: lang.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ROW 3: CONVERSION FUNNEL & OCCUPATION BREAKDOWN */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Onboarding-to-Simulation Conversion Funnel */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-sm">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-sm text-[#1E2761] tracking-tight flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#1E2761]" />
                  <span>Onboarding-to-Goal Lead Funnel</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  Drop-off metrics from initial voice interaction to banking lead conversion
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {funnelSteps.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-md bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-[#1E2761]">
                      <span>{step.step}</span>
                      <span className="font-mono text-[#0F7173]">
                        {step.count.toLocaleString()} ({step.pct}%)
                      </span>
                    </div>

                    <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${step.pct}%`, backgroundColor: step.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Occupation Breakdown Table */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-extrabold text-sm text-[#1E2761] tracking-tight flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#1E2761]" />
                    <span>Occupational Analytics & Conversion Rates</span>
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Product affinity and average monthly savings simulated by occupation
                  </p>
                </div>

                <button
                  onClick={() => alert('Anonymized CSV Dataset Exported')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#1E2761] text-xs font-bold rounded-md flex items-center gap-1.5 transition-colors border border-slate-200"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-mono text-[10px]">
                    <tr>
                      <th className="p-2.5 font-bold">Occupation</th>
                      <th className="p-2.5 font-bold">Users</th>
                      <th className="p-2.5 font-bold">Top Simulated Goal</th>
                      <th className="p-2.5 font-bold">Avg. SIP</th>
                      <th className="p-2.5 font-bold">Conv. Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {occupationData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-2.5 font-bold text-[#1E2761]">{row.occupation}</td>
                        <td className="p-2.5 font-mono text-slate-600">{row.count.toLocaleString()}</td>
                        <td className="p-2.5 text-slate-700">{row.topGoal}</td>
                        <td className="p-2.5 font-mono font-bold text-[#0F7173]">₹{row.avgSIP.toLocaleString()}/mo</td>
                        <td className="p-2.5 font-mono font-bold text-emerald-700">{row.conversionRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default B2BPartnerDashboard;
