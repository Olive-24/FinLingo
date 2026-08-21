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
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onSelectLang,
  onOpenB2BModal,
  onOpenOnboarding,
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
          ? 'bg-[#090D16]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group text-decoration-none">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
              FinLingo <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </span>
            <span className="text-[10px] font-medium tracking-widest text-emerald-400 uppercase">
              Vernacular Fintech AI
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-emerald-400 transition-colors">
            {t.features}
          </a>
          <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">
            {t.howItWorks}
          </a>
          <a href="#b2b-partners" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 rounded-md border border-indigo-500/30">B2B</span>
            {t.forBanks}
          </a>
          <a href="#impact" className="hover:text-emerald-400 transition-colors">
            {t.testimonials}
          </a>
        </nav>

        {/* Action Controls & Language Selector */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 hover:bg-white/10 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currentLanguageObj.flag} {currentLanguageObj.nativeName}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-[#0F172A] border border-slate-700 rounded-xl shadow-2xl z-50 backdrop-blur-xl">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  Select Language
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLang(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors ${
                      currentLang === lang.code ? 'text-emerald-400 font-bold bg-emerald-500/10' : 'text-slate-300'
                    }`}
                  >
                    <span>{lang.flag} {lang.nativeName}</span>
                    <span className="text-[10px] text-slate-500">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* B2B Partner CTA */}
          <button
            onClick={onOpenB2BModal}
            className="px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
            {t.partnerBtn}
          </button>

          {/* Start Free CTA */}
          <button
            onClick={onOpenOnboarding}
            className="btn btn-primary text-xs py-2 px-5 shadow-emerald-500/20 hover:scale-105"
          >
            <span>{t.startFreeBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="p-2 rounded-lg bg-white/5 text-slate-300 border border-white/10"
          >
            <Globe className="w-4 h-4 text-emerald-400" />
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 text-slate-300 border border-white/10"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0F172A] border-b border-slate-800 px-6 py-6 space-y-4 shadow-2xl">
          <nav className="flex flex-col gap-3 font-medium text-slate-300">
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-emerald-400">
              {t.features}
            </a>
            <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-emerald-400">
              {t.howItWorks}
            </a>
            <a href="#b2b-partners" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-indigo-400">
              {t.forBanks}
            </a>
            <a href="#impact" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-emerald-400">
              {t.testimonials}
            </a>
          </nav>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenB2BModal();
              }}
              className="w-full py-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-bold text-sm flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4 text-indigo-400" />
              {t.partnerBtn}
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenOnboarding();
              }}
              className="w-full btn btn-primary py-2.5 text-sm"
            >
              {t.startFreeBtn}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
