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
  onOpenB2BDashboard?: () => void;
  onOpenPricing?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onSelectLang,
  onOpenB2BModal,
  onOpenOnboarding,
  onOpenGoalPlanning,
  onOpenMythBusting,
  onOpenDashboard,
  onOpenB2BDashboard,
  onOpenPricing,
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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300">
      {/* FLOATING PILL-SHAPED GLASS CONTAINER */}
      <div
        className={`max-w-6xl mx-auto rounded-full px-5 sm:px-7 py-3 transition-all duration-300 flex items-center justify-between ${
          isScrolled
            ? 'glass-nav shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(20,184,166,0.15)] border border-white/15'
            : 'bg-[#0A0A0F]/60 backdrop-blur-md border border-white/10'
        }`}
      >
        {/* Brand Logo with Glowing Gradient Motif */}
        <a href="#" className="flex items-center gap-3 group text-decoration-none">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#14B8A6] to-[#8B5CF6] text-white flex items-center justify-center shadow-lg shadow-[#14B8A6]/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 fill-white/20 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tight text-white flex items-center gap-1.5 font-sans">
              FinLingo <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse"></span>
            </span>
            <span className="text-[9px] font-extrabold tracking-widest text-[#14B8A6] uppercase">
              Vernacular AI Platform
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-bold text-slate-200">
          {onOpenPricing && (
            <button
              onClick={onOpenPricing}
              className="hover:text-[#14B8A6] transition-colors"
            >
              Pricing
            </button>
          )}

          {onOpenDashboard && (
            <button
              onClick={onOpenDashboard}
              className="hover:text-emerald-400 font-bold text-emerald-300 bg-emerald-500/10 px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5 border border-emerald-500/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Dashboard</span>
            </button>
          )}

          {onOpenMythBusting && (
            <button
              onClick={onOpenMythBusting}
              className="hover:text-amber-400 font-bold text-amber-300 bg-amber-500/10 px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5 border border-amber-500/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Myth-Buster</span>
            </button>
          )}

          {onOpenGoalPlanning && (
            <button
              onClick={onOpenGoalPlanning}
              className="hover:text-[#14B8A6] font-bold text-[#14B8A6] bg-[#14B8A6]/10 px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5 border border-[#14B8A6]/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Goal Cards</span>
            </button>
          )}

          <a href="#how-it-works" className="hover:text-[#14B8A6] transition-colors">
            {t.features}
          </a>
        </nav>

        {/* Right Action Bar */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Vernacular Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-200 flex items-center gap-2 transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>{currentLanguageObj.flag} {currentLanguageObj.nativeName}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-52 py-2 bg-[#0A0A0F]/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl z-50">
                <div className="px-3.5 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-white/10">
                  Select Language
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLang(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between hover:bg-[#14B8A6]/15 hover:text-[#14B8A6] transition-colors ${
                      currentLang === lang.code ? 'text-[#14B8A6] font-bold bg-[#14B8A6]/15' : 'text-slate-300'
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
            onClick={() => {
              if (onOpenB2BDashboard) {
                onOpenB2BDashboard();
              } else {
                onOpenB2BModal();
              }
            }}
            className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:bg-white/15 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>B2B Console</span>
          </button>

          {/* Signature CTA: Start Free */}
          <button
            onClick={onOpenOnboarding}
            className="px-5 py-2 rounded-full btn-gradient text-xs font-black flex items-center gap-2 group"
          >
            <span>{t.startFreeBtn}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={onOpenOnboarding}
            className="px-3.5 py-1.5 rounded-full btn-gradient text-xs font-black flex items-center gap-1"
          >
            <span>Start</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full bg-white/10 text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 bg-[#0A0A0F]/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 shadow-2xl z-50 space-y-4">
          <div className="space-y-2 text-sm font-bold text-slate-200">
            {onOpenPricing && (
              <button
                onClick={() => {
                  onOpenPricing();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left p-2.5 rounded-xl hover:bg-white/5"
              >
                Pricing Plans
              </button>
            )}
            {onOpenDashboard && (
              <button
                onClick={() => {
                  onOpenDashboard();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 text-emerald-400"
              >
                User Dashboard
              </button>
            )}
            {onOpenMythBusting && (
              <button
                onClick={() => {
                  onOpenMythBusting();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 text-amber-400"
              >
                Myth-Busting & Doubts
              </button>
            )}
            {onOpenGoalPlanning && (
              <button
                onClick={() => {
                  onOpenGoalPlanning();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 text-[#14B8A6]"
              >
                Goal Planning Cards
              </button>
            )}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                if (onOpenB2BDashboard) onOpenB2BDashboard();
                else onOpenB2BModal();
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-2.5 rounded-xl bg-white/5 text-center font-bold text-xs text-amber-300 border border-white/10"
            >
              B2B Partner Console
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
