import { useState } from 'react';

interface FinLingoLandingProps {
  onOpenAuth?: () => void;
  onOpenDashboard?: () => void;
  onOpenGoals?: () => void;
  onOpenMyths?: () => void;
  onOpenB2B?: () => void;
}

export function FinLingoLanding({
  onOpenAuth,
  onOpenDashboard,
  onOpenGoals,
  onOpenMyths,
  onOpenB2B,
}: FinLingoLandingProps) {
  const [activeMyth, setActiveMyth] = useState(0);

  const myths = [
    {
      id: "mutual-funds-risk",
      tag: "Safety & Risk",
      q: "Can I lose all my money in Mutual Funds or SIPs?",
      category: "Market Safety",
      a: "Mutual funds carry calculated market risk, but your money does NOT vanish overnight like a financial scam. Investments are allocated across SEBI-regulated, diversified blue-chip companies (such as TATA, Reliance, and HDFC). While short-term values fluctuate with market cycles, diversified equity SIPs held for 5+ years have historically beaten inflation with 12-14% average annual compounding returns.",
      takeaway: "Market risk is mitigated over time through systematic monthly diversification.",
      compliance: "SEBI & RBI Transparency Compliant"
    },
    {
      id: "sip-vs-rd",
      tag: "SIP vs Bank RD",
      q: "What is the difference between an SIP and a Bank Recurring Deposit (RD)?",
      category: "Wealth Growth",
      a: "A Bank RD provides fixed guaranteed interest (~6.5-7% p.a.) but often fails to beat real inflation after taxes. An SIP in equity mutual funds invests directly in expanding market sectors, providing higher long-term capital growth potential and better tax efficiency for goals beyond 3 years.",
      takeaway: "RD protects nominal capital, whereas SIP builds inflation-beating wealth.",
      compliance: "Verified Financial Fact"
    },
    {
      id: "platform-safety",
      tag: "Platform Security",
      q: "Is FinLingo a legitimate and secure platform?",
      category: "Trust & Safety",
      a: "Yes. FinLingo is an educational intelligence and simulation sandbox. We do not take custody of your money or execute unauthorized transactions. All loan simulations and calculation formulas adhere strictly to RBI regulatory disclosure norms.",
      takeaway: "100% risk-free educational sandbox with zero financial custody.",
      compliance: "RBI Disclosure Compliant"
    },
    {
      id: "low-income-savings",
      tag: "Low-Income Planning",
      q: "How can I start saving with a modest monthly income?",
      category: "Micro-Investing",
      a: "You do not need large sums of capital to start. Micro-SIPs allow automated investing starting at just ₹100 to ₹500 per month. Automating small transfers on salary day instills discipline without straining your essential household expenses.",
      takeaway: "Consistency and early compounding matter far more than initial ticket size.",
      compliance: "SEBI Financial Literacy"
    },
    {
      id: "fd-inflation",
      tag: "Fixed Deposits",
      q: "Why do Fixed Deposits struggle to beat inflation?",
      category: "Purchasing Power",
      a: "If a Fixed Deposit yields 6.5% interest and inflation is 6%, your real gain is only 0.5% before tax. After deducting income tax slab rates on interest earned, real purchasing power often stays flat or declines over 10+ year periods.",
      takeaway: "FDs offer safety for emergency cash, but equities are essential for real wealth growth.",
      compliance: "Verified Fact"
    },
    {
      id: "cibil-score-inquiry",
      tag: "CIBIL Score",
      q: "Does checking loan interest rates lower my CIBIL credit score?",
      category: "Credit Health",
      a: "No. Checking interest rates, running simulators, or pulling your own report is considered a 'Soft Inquiry' and has zero effect on your score. A drop only happens when banks initiate 'Hard Inquiries' upon submitting formal loan applications.",
      takeaway: "Simulating quotes is completely safe and private.",
      compliance: "Credit Bureau Standard"
    },
    {
      id: "kcc-subvention",
      tag: "Govt Subsidies",
      q: "How does the Kisan Credit Card (KCC) 4% interest subvention work?",
      category: "Rural Banking",
      a: "Standard agricultural credit rates are 9%. The Government of India provides a 2% upfront interest subvention, reducing it to 7%. Farmers who practice prompt, on-time annual repayments receive an additional 3% rebate, reducing effective interest to just 4% per year.",
      takeaway: "Disciplined annual repayment unlocks the lowest 4% interest rate.",
      compliance: "NABARD & RBI Scheme"
    },
    {
      id: "pause-sip",
      tag: "SIP Flexibility",
      q: "Can I pause or stop my SIP during financial emergencies?",
      category: "Liquidity",
      a: "Yes, mutual fund SIPs offer 100% flexibility. You can pause monthly deductions for up to 3-6 months or stop them entirely with zero penalty fees. Accumulated units continue to earn compounding market returns.",
      takeaway: "SIPs carry no contractual lock-in penalties unlike insurance policies.",
      compliance: "SEBI Mutual Fund Regulations"
    }
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#EEE9DF] text-[#1B2632] selection:bg-[#FFB162]/30 font-sans antialiased">
      
      {/* 1. STICKY TOP NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#EEE9DF]/90 backdrop-blur-md border-b border-[#1B2632]/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1B2632] flex items-center justify-center shadow-sm shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FFB162]" viewBox="0 0 24 24">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1B2632]">FinLingo</span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest bg-[#A35139]/10 text-[#A35139] px-2.5 py-0.5 rounded-full border border-[#FFB162]/40">
                v1.0 Live
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5C6B7A]">
            <a href="#how-it-works" className="hover:text-[#1B2632] transition">How It Works</a>
            <button onClick={onOpenGoals} className="hover:text-[#1B2632] transition cursor-pointer">Simulator</button>
            <button onClick={onOpenMyths} className="hover:text-[#1B2632] transition cursor-pointer">Myth-Buster</button>
            <button onClick={onOpenB2B} className="hover:text-[#1B2632] transition text-[#A35139] font-bold cursor-pointer">For Institutions</button>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenDashboard || onOpenAuth}
              className="bg-[#1B2632] hover:bg-[#2C3B4D] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition shadow-sm cursor-pointer"
            >
              Launch Platform →
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION (EXPANSIVE VIEWPORT) */}
      <section className="min-h-[88vh] flex items-center px-6 py-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 bg-[#A35139]/10 text-[#A35139] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <span>✦</span> AI-Powered Vernacular Financial Intelligence
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-[#1B2632] leading-[1.1]">
              Financial clarity in your own mother tongue.
            </h1>

            <p className="text-lg text-[#5C6B7A] leading-relaxed max-w-xl">
              Break down complex loans, mutual funds, and banking contracts into simple, jargon-free explanations. Speak naturally, understand repayment rules, and simulate outcomes before signing.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenAuth}
                className="bg-[#1B2632] hover:bg-[#2C3B4D] text-white font-medium text-sm px-7 py-3.5 rounded-full transition shadow-md cursor-pointer"
              >
                Start Free Exploration →
              </button>
              <button
                onClick={onOpenB2B}
                className="bg-transparent hover:bg-black/5 text-[#1B2632] border border-[#1B2632]/20 font-medium text-sm px-6 py-3.5 rounded-full transition cursor-pointer"
              >
                Enterprise B2B Demo
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs font-semibold tracking-wide text-[#5C6B7A] uppercase">
              <span>✓ 10+ Indian Languages</span>
              <span>✓ Zero Banking Jargon</span>
              <span>✓ 100% Safe Sandbox</span>
            </div>
          </div>

          {/* Interactive Voice Demo Visual */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-[#1B2632]/10 p-8 shadow-xl space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-[#5C6B7A] uppercase tracking-wider">Live Voice Session</span>
                </div>
                <span className="text-xs bg-[#FFB162]/20 text-[#A35139] px-2.5 py-1 rounded-full font-semibold">Hindi Demo</span>
              </div>

              <div className="space-y-4">
                <div className="bg-[#F4F0E8] p-4 rounded-2xl text-xs space-y-1">
                  <span className="text-[10px] font-bold text-[#A35139] uppercase tracking-wider">Borrower Doubt</span>
                  <p className="font-medium text-[#1B2632] text-sm leading-snug">
                    "Agar main ₹2,500 har mahine bachaaoon 5 saal ke liye, toh maturity par kitna milega?"
                  </p>
                </div>

                <div className="bg-white border border-[#1B2632]/10 p-4 rounded-2xl text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">FinLingo AI Breakdown</span>
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">Audio 1.0x</span>
                  </div>
                  <p className="text-[#5C6B7A] leading-relaxed">
                    ₹2,500 monthly SIP at ~12% expected annual return will turn your ₹1.50 Lakh investment into ₹2,06,216 over 5 years.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#1B2632] text-white rounded-2xl flex justify-between items-center">
                <div>
                  <p className="text-[10px] uppercase font-semibold text-gray-400">Simulated Maturity</p>
                  <p className="text-2xl font-serif font-bold text-[#FFB162]">₹2,06,216</p>
                </div>
                <span className="text-xs bg-white/10 px-3 py-1.5 rounded-full text-emerald-300 font-medium">+₹56,216 Gain</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. THREE-STEP PROCESS SECTION */}
      <section id="how-it-works" className="py-28 px-6 bg-[#F4F0E8]/70 border-t border-[#1B2632]/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A35139]">Step-By-Step Guidance</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-[#1B2632]">
              Three steps to financial confidence.
            </h2>
            <p className="text-[#5C6B7A] text-base leading-relaxed">
              No complicated banking forms or confusing fine print. Just speak, understand, and simulate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl border border-[#1B2632]/10 p-8 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="w-10 h-10 rounded-full bg-[#1B2632] text-white flex items-center justify-center font-bold text-sm">01</span>
                <h3 className="font-serif text-2xl font-semibold text-[#1B2632]">Bolo (Speak)</h3>
                <p className="text-sm text-[#5C6B7A] leading-relaxed">
                  Ask financial questions using natural voice in Hindi, Tamil, Telugu, Marathi, or English. No typing required.
                </p>
              </div>
              <button onClick={onOpenAuth} className="text-xs font-semibold text-[#A35139] hover:underline self-start cursor-pointer">Try Step 01 →</button>
            </div>

            <div className="bg-white rounded-3xl border border-[#1B2632]/10 p-8 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="w-10 h-10 rounded-full bg-[#1B2632] text-white flex items-center justify-center font-bold text-sm">02</span>
                <h3 className="font-serif text-2xl font-semibold text-[#1B2632]">Samjho (Understand)</h3>
                <p className="text-sm text-[#5C6B7A] leading-relaxed">
                  Receive straightforward breakdowns explaining hidden processing fees, exact repayment dates, and terms in plain words.
                </p>
              </div>
              <button onClick={onOpenAuth} className="text-xs font-semibold text-[#A35139] hover:underline self-start cursor-pointer">Try Step 02 →</button>
            </div>

            <div className="bg-white rounded-3xl border border-[#1B2632]/10 p-8 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="w-10 h-10 rounded-full bg-[#1B2632] text-white flex items-center justify-center font-bold text-sm">03</span>
                <h3 className="font-serif text-2xl font-semibold text-[#1B2632]">Simulate Karo</h3>
                <p className="text-sm text-[#5C6B7A] leading-relaxed">
                  Test loan EMIs and wealth accumulation across dynamic interest rates in a safe sandbox before committing real money.
                </p>
              </div>
              <button onClick={onOpenGoals} className="text-xs font-semibold text-[#A35139] hover:underline self-start cursor-pointer">Try Step 03 →</button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE MYTH-BUSTER ENGINE */}
      <section id="myths" className="py-28 px-6 border-t border-[#1B2632]/10">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A35139]">Instant Knowledge Base</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-[#1B2632]">
              Financial myths busted in plain words.
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {myths.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMyth(idx)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                  activeMyth === idx
                    ? 'bg-[#1B2632] text-white shadow-sm'
                    : 'bg-white border border-[#1B2632]/15 text-[#5C6B7A] hover:bg-[#F4F0E8]'
                }`}
              >
                {item.tag}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-[#1B2632]/10 p-8 md:p-10 shadow-md space-y-6">
            <div className="flex justify-between items-start gap-4 border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A35139] block mb-1">
                  {myths[activeMyth].category}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#1B2632] leading-snug">
                  "{myths[activeMyth].q}"
                </h3>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-semibold shrink-0">
                {myths[activeMyth].compliance}
              </span>
            </div>

            <p className="text-base text-[#5C6B7A] leading-relaxed">
              {myths[activeMyth].a}
            </p>

            <div className="bg-[#F4F0E8] p-4 rounded-2xl text-xs space-y-1">
              <span className="font-bold text-[#1B2632]">Key Takeaway:</span>
              <p className="text-sm text-[#1B2632] leading-relaxed">{myths[activeMyth].takeaway}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ENTERPRISE B2B METRICS */}
      <section id="enterprise" className="py-28 px-6 bg-[#1B2632] text-white rounded-t-[40px]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFB162]">Institutional Infrastructure</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight leading-tight">
              Reach 190M+ underserved borrowers through one integration.
            </h2>
            <p className="text-gray-300 leading-relaxed max-w-md">
              Empower vernacular borrowers with automated voice guidance. Reduce loan NPA default rates and scale compliance for Banks, NBFCs, and MFIs.
            </p>
            <button
              onClick={onOpenB2B}
              className="bg-[#FFB162] hover:bg-[#ff9f40] text-[#1B2632] font-semibold text-sm px-8 py-3.5 rounded-full transition cursor-pointer"
            >
              Request White-Label Demo & API Specs →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-2">
              <p className="font-serif text-3xl font-bold text-[#FFB162]">3.4x</p>
              <p className="text-xs text-gray-300 leading-snug">Higher Vernacular Conversion Rate</p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-2">
              <p className="font-serif text-3xl font-bold text-[#FFB162]">42%</p>
              <p className="text-xs text-gray-300 leading-snug">Reduction in Loan NPA Defaults</p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-2">
              <p className="font-serif text-3xl font-bold text-[#FFB162]">190M+</p>
              <p className="text-xs text-gray-300 leading-snug">Target Regional Borrowers in India</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default FinLingoLanding;
