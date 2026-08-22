import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  Minus,
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Lock,
  X,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import type { LanguageCode, UserProfile } from '../types';
import { LANGUAGES } from '../data/languages';

interface PricingPageProps {
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  onBack: () => void;
  userProfile?: Partial<UserProfile> | null;
  onUpgradeSuccess?: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  currentLang,
  onSelectLang,
  onBack,
  userProfile: _userProfile,
  onUpgradeSuccess,
}) => {
  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];
  
  // Razorpay Demo Modal States
  const [isRazorpayOpen, setIsRazorpayOpen] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState<string>('9876543210@paytm');
  const [paymentStep, setPaymentStep] = useState<'select' | 'processing' | 'success'>('select');

  // Feature Comparison Checklist Items (Exact same length and order for line-by-line comparison)
  const features = [
    {
      title: 'Multilingual Voice AI Assistant',
      desc: 'Talk in Hindi, Tamil, Telugu, Marathi & 8 languages',
      free: true,
      premium: true,
    },
    {
      title: 'Interactive Goal & SIP Simulators',
      desc: 'Compound interest, inflation & loan EMI calculators',
      free: true,
      premium: true,
    },
    {
      title: 'Personalized Monthly Financial PDF Reports',
      desc: 'Detailed savings progress & portfolio insights sent monthly',
      free: false,
      premium: true,
    },
    {
      title: 'Vernacular Tax-Saving Guidance (Sec 80C & 80D)',
      desc: 'Save up to ₹46,800/yr with zero-jargon tax tips',
      free: false,
      premium: true,
    },
    {
      title: 'WhatsApp Payment Reminders & Audio Alerts',
      desc: 'Never miss an SIP installment or subvention deadline',
      free: false,
      premium: true,
    },
    {
      title: 'Priority AI Vernacular Support & Expert Hotline',
      desc: 'Instant answers with 0 queue wait time',
      free: false,
      premium: true,
    },
  ];

  const handlePayNow = () => {
    setPaymentStep('processing');
    setTimeout(() => {
      setPaymentStep('success');
      if (onUpgradeSuccess) {
        onUpgradeSuccess();
      }
    }, 1800);
  };

  const handleCloseRazorpay = () => {
    setIsRazorpayOpen(false);
    setPaymentStep('select');
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
                <Sparkles className="w-5 h-5 text-[#0F7173]" />
              </div>
              <div>
                <h1 className="font-extrabold text-base text-[#2B2B2B] tracking-tight flex items-center gap-2">
                  <span>FinLingo Subscription Plans</span>
                </h1>
                <p className="text-[11px] text-[#6B6B6B]">
                  Simple, Transparent Pricing • <span className="font-bold text-[#0F7173]">{currentLangObj.flag} {currentLangObj.nativeName}</span>
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

      {/* MAIN PRICING COMPARISON SECTION */}
      <main className="container mx-auto px-4 py-8 sm:py-12 flex-1 max-w-4xl space-y-8">
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F7173]/10 border border-[#0F7173]/20 text-[#0F7173] text-xs font-extrabold">
            <Sparkles className="w-4 h-4 text-[#0F7173]" />
            <span>Investment in Your Financial Freedom</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#2B2B2B] tracking-tight">
            Choose the Right Plan for Your Family
          </h2>
          <p className="text-sm text-[#6B6B6B]">
            Start free forever with basic voice AI or unlock personalized monthly reports, tax-saving tips & WhatsApp reminders for less than ₹2/day.
          </p>
        </div>

        {/* 2-COLUMN PRICING GRID (STACKS VERTICALLY ON MOBILE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch pt-4">
          {/* LEFT CARD: FREE PLAN (PLAIN WHITE CARD) */}
          <div className="card-surface p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                  Basic Access
                </span>
                <h3 className="text-2xl font-black text-[#2B2B2B]">Free Plan</h3>
                <p className="text-xs text-[#6B6B6B]">
                  Essential voice assistant & financial simulators for every Indian.
                </p>
              </div>

              {/* Price */}
              <div className="py-2 border-y border-slate-100">
                <div className="text-4xl font-black text-[#2B2B2B] font-mono">
                  ₹0
                  <span className="text-sm font-semibold text-[#6B6B6B] font-sans"> / month</span>
                </div>
                <div className="text-[11px] text-emerald-600 font-bold mt-1">
                  ✓ Free forever with zero hidden charges
                </div>
              </div>

              {/* Vertical Checklist */}
              <div className="space-y-3.5 pt-2">
                {features.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div className="mt-0.5 shrink-0">
                      {item.free ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold">
                          <Minus className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className={`font-semibold ${item.free ? 'text-[#2B2B2B]' : 'text-slate-400'}`}>
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outlined Button */}
            <button
              onClick={onBack}
              className="w-full py-3.5 rounded-full border-2 border-[#0F7173] text-[#0F7173] hover:bg-[#0F7173]/10 font-extrabold text-sm transition-all"
            >
              Continue Free
            </button>
          </div>

          {/* RIGHT CARD: PREMIUM PLAN (SUBTLE TEAL BORDER & MARIGOLD RECOMMENDED RIBBON BADGE) */}
          <div className="card-surface p-6 sm:p-8 bg-white border-2 border-[#0F7173] rounded-3xl flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden">
            {/* Small Marigold "Recommended" Ribbon-Style Badge in top right corner */}
            <div className="absolute top-4 right-4 bg-[#F5A623] text-slate-950 text-[11px] font-black px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-slate-950 stroke-none" />
              <span>RECOMMENDED</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-extrabold text-[#0F7173] uppercase tracking-wider">
                  Full Financial Growth Suite
                </span>
                <h3 className="text-2xl font-black text-[#2B2B2B] flex items-center gap-2">
                  <span>FinLingo Premium</span>
                </h3>
                <p className="text-xs text-[#6B6B6B]">
                  Complete tax-saving, monthly PDF reports & WhatsApp SIP reminders.
                </p>
              </div>

              {/* Price */}
              <div className="py-2 border-y border-slate-100">
                <div className="flex items-baseline gap-2">
                  <div className="text-4xl font-black text-[#0F7173] font-mono">
                    ₹49
                  </div>
                  <span className="text-sm font-semibold text-[#6B6B6B]"> / month</span>
                  <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                    Save ₹46,800 in Taxes
                  </span>
                </div>
                <div className="text-[11px] text-[#6B6B6B] mt-1 font-medium">
                  Billed monthly or ₹499/year (Cancel anytime in 1 tap)
                </div>
              </div>

              {/* Vertical Checklist */}
              <div className="space-y-3.5 pt-2">
                {features.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div className="mt-0.5 shrink-0">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>
                    <div>
                      <div className="font-extrabold text-[#2B2B2B]">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-[#6B6B6B]">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Solid Primary Teal Button */}
            <button
              onClick={() => setIsRazorpayOpen(true)}
              className="w-full py-4 rounded-full bg-[#0F7173] hover:bg-[#0B5456] text-white font-black text-sm shadow-lg shadow-[#0F7173]/25 transition-all flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Upgrade to Premium — ₹49/mo</span>
            </button>
          </div>
        </div>

        {/* TRUST BADGES & GUARANTEE */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-3 max-w-2xl mx-auto shadow-sm">
          <div className="flex items-center justify-center gap-2 text-xs font-extrabold text-[#0F7173]">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Risk-Free Guarantee • Powered by Razorpay Security</span>
          </div>
          <p className="text-xs text-[#6B6B6B]">
            No long-term lock-in. Cancel your monthly subscription at any time directly from your user dashboard. Instant GST invoice provided.
          </p>
        </div>
      </main>

      {/* RAZORPAY PAYMENT GATEWAY CHECKOUT MODAL (NATIVE DEMO MODE) */}
      {isRazorpayOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
          {/* Razorpay Native Checkout Container */}
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200">
            {/* Native Razorpay Header Bar (Navy #0C2340) */}
            <div className="bg-[#0C2340] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#0B72E7] font-black text-white flex items-center justify-center text-xs">
                  rzp
                </div>
                <div>
                  <div className="font-bold text-xs tracking-tight">FinLingo Technologies</div>
                  <div className="text-[10px] text-slate-300">Order #FL984210 • Test Mode</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-emerald-400">₹49.00</div>
                  <div className="text-[9px] text-slate-400">Monthly Plan</div>
                </div>
                <button
                  onClick={handleCloseRazorpay}
                  className="p-1 rounded text-slate-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            {paymentStep === 'select' && (
              <div className="p-6 space-y-5 text-xs">
                <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-amber-900 text-[11px] font-medium flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Razorpay Standard Test Checkout Mode enabled for Hackathon Demo</span>
                </div>

                <div className="space-y-2">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                    Select Payment Option
                  </label>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-3 rounded-lg border text-center space-y-1 transition-all ${
                        paymentMethod === 'upi'
                          ? 'border-[#0B72E7] bg-blue-50/60 font-bold text-[#0B72E7]'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Smartphone className="w-5 h-5 mx-auto" />
                      <div className="text-[11px]">UPI / QR</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-lg border text-center space-y-1 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#0B72E7] bg-blue-50/60 font-bold text-[#0B72E7]'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mx-auto" />
                      <div className="text-[11px]">Card</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`p-3 rounded-lg border text-center space-y-1 transition-all ${
                        paymentMethod === 'netbanking'
                          ? 'border-[#0B72E7] bg-blue-50/60 font-bold text-[#0B72E7]'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <FileText className="w-5 h-5 mx-auto" />
                      <div className="text-[11px]">Net Banking</div>
                    </button>
                  </div>
                </div>

                {/* Input Fields */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-2">
                    <label className="block text-slate-600 font-semibold">Enter VPA / UPI ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@upi"
                      className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-xs focus:outline-none focus:border-[#0B72E7]"
                    />
                    <div className="text-[10px] text-slate-400">
                      GPay, PhonePe, Paytm, BHIM or WhatsApp Pay
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-2 font-mono text-xs">
                    <input
                      type="text"
                      placeholder="4532 •••• •••• 8942"
                      defaultValue="4532 8900 1234 8942"
                      className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        defaultValue="08/28"
                        className="p-2.5 rounded-lg border border-slate-300"
                      />
                      <input
                        type="password"
                        placeholder="CVV"
                        defaultValue="894"
                        className="p-2.5 rounded-lg border border-slate-300"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-2">
                    <select className="w-full p-2.5 rounded-lg border border-slate-300 font-medium">
                      <option>State Bank of India</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                    </select>
                  </div>
                )}

                <button
                  onClick={handlePayNow}
                  className="w-full py-3 rounded-lg bg-[#0B72E7] hover:bg-[#0959B5] text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Pay ₹49.00 via Razorpay</span>
                </button>
              </div>
            )}

            {paymentStep === 'processing' && (
              <div className="p-10 text-center space-y-4">
                <div className="w-12 h-12 rounded-full border-4 border-[#0B72E7] border-t-transparent animate-spin mx-auto" />
                <div className="space-y-1">
                  <div className="font-extrabold text-sm text-slate-800">Processing Payment...</div>
                  <div className="text-xs text-slate-500">Contacting bank servers (Demo Mode)</div>
                </div>
              </div>
            )}

            {paymentStep === 'success' && (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-xl font-extrabold text-slate-900">Payment Successful!</h4>
                  <p className="text-xs text-slate-600">
                    Welcome to FinLingo Premium! Tax-saving guide & monthly report features unlocked.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 text-left space-y-1">
                  <div>Transaction ID: pay_FL98421098</div>
                  <div>Amount: ₹49.00 Billed</div>
                  <div>Plan: FinLingo Premium (Monthly)</div>
                </div>

                <button
                  onClick={() => {
                    handleCloseRazorpay();
                    onBack();
                  }}
                  className="w-full py-3 rounded-lg bg-[#0F7173] text-white font-bold text-xs shadow-md"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-4 text-xs text-center text-[#6B6B6B]">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-4">
          <span>FinLingo Subscription • Fair Vernacular Pricing for All</span>
          <button onClick={onBack} className="text-[#0F7173] hover:underline font-bold">
            Return to App
          </button>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;
