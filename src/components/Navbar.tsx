import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown, Sparkles, Menu, X, ArrowRight, Building2 } from 'lucide-react';
import type { LanguageCode } from '../types';
import { LANGUAGES } from '../data/languages';
import { TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  currentLang: LanguageCode;
  onSelectLang: (code: LanguageCode) => void;
  onOpenB2BModal: () => void;
  onOpenOnboarding: () => void;
  onOpenGoalPlanning?: () => void;
  onOpenMythBusting?: () => void;
  onOpenDashboard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onSelectLang,
  onOpenB2BModal,
  onOpenOnboarding,
  onOpenGoalPlanning,
  onOpenMythBusting,
  onOpenDashboard,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = TRANSLATIONS[currentLang].nav;
  const currentLanguageObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FBF7F2]/90 backdrop-blur-md border-b border-black/5 py-3 shadow-sm'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Brand Logo with 48px Circular Badge Motif */}
        <a href="#" className="flex items-center gap-3 group text-decoration-none">
          <div className="icon-badge icon-badge-teal shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-[#2B2B2B] flex items-center gap-1.5">
              FinLingo <span className="w-2 h-2 rounded-full bg-[#0F7173] animate-pulse"></span>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-[#0F7173] uppercase">
              Vernacular AI Assistant
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#2B2B2B]">
          {onOpenDashboard && (
            <button
              onClick={onOpenDashboard}
              className="hover:text-emerald-700 font-bold text-emerald-800 bg-emerald-100/70 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 border border-emerald-300/60"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Dashboard</span>
            </button>
          )}
          {onOpenMythBusting && (
            <button
              onClick={onOpenMythBusting}
              className="hover:text-[#D98D15] font-bold text-[#D98D15] bg-[#F5A623]/15 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 border border-[#F5A623]/30"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Myth-Buster</span>
            </button>
          )}
          {onOpenGoalPlanning && (
            <button
              onClick={onOpenGoalPlanning}
              className="hover:text-[#0F7173] font-bold text-[#0F7173] bg-[#0F7173]/10 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Goal Cards</span>
            </button>
          )}
          <a href="#how-it-works" className="hover:text-[#0F7173] transition-colors">
            {t.features}
          </a>
          <a href="#demo" className="hover:text-[#0F7173] transition-colors">
            {t.howItWorks}
          </a>
          <a href="#b2b-partners" className="hover:text-[#1E2761] transition-colors flex items-center gap-1.5">
            <span className="px-2 py-0.5 text-[10px] font-bold bg-[#1E2761]/10 text-[#1E2761] rounded-md">B2B</span>
            {t.forBanks}
          </a>
          <a href="#trust" className="hover:text-[#0F7173] transition-colors">
            {t.testimonials}
          </a>
        </nav>

        {/* Action Controls & Language Selector */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-slate-200 text-xs font-semibold text-[#2B2B2B] hover:border-[#0F7173] shadow-sm transition-all"
            >
              <Globe className="w-4 h-4 text-[#0F7173]" />
              <span>{currentLanguageObj.flag} {currentLanguageObj.nativeName}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-52 py-2 bg-white border border-slate-200 rounded-2xl shadow-xl z-50">
                <div className="px-3.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Select Language
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLang(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between hover:bg-[#0F7173]/10 hover:text-[#0F7173] transition-colors ${
                      currentLang === lang.code ? 'text-[#0F7173] font-bold bg-[#0F7173]/10' : 'text-[#2B2B2B]'
                    }`}
                  >
                    <span>{lang.flag} {lang.nativeName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* B2B Partner Button */}
          <button
            onClick={onOpenB2BModal}
            className="px-4 py-2.5 rounded-full bg-[#1E2761]/10 border border-[#1E2761]/20 text-[#1E2761] hover:bg-[#1E2761]/20 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Building2 className="w-3.5 h-3.5" />
            {t.partnerBtn}
          </button>

          {/* Single Unmistakable Primary CTA: Start Free */}
          <button
            onClick={onOpenOnboarding}
            className="btn btn-primary text-sm shadow-md"
          >
            <span>{t.startFreeBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="p-2 rounded-full bg-white text-[#0F7173] border border-slate-200"
          >
            <Globe className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-white text-[#2B2B2B] border border-slate-200"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl animate-fade-in">
          <nav className="flex flex-col gap-3 font-semibold text-[#2B2B2B]">
            <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-[#0F7173]">
              {t.features}
            </a>
            <a href="#demo" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-[#0F7173]">
              {t.howItWorks}
            </a>
            <a href="#b2b-partners" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-[#1E2761]">
              {t.forBanks}
            </a>
            <a href="#trust" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-[#0F7173]">
              {t.testimonials}
            </a>
          </nav>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenB2BModal();
              }}
              className="w-full py-3 rounded-full bg-[#1E2761]/10 text-[#1E2761] font-bold text-sm flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              {t.partnerBtn}
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenOnboarding();
              }}
              className="w-full btn btn-primary py-3 text-sm"
            >
              {t.startFreeBtn}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
