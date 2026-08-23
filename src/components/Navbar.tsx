import React, { useState } from 'react';
import { Globe, ChevronDown, Menu, X } from 'lucide-react';
import type { LanguageCode } from '../types';
import { LANGUAGES } from '../data/languages';

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
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentLanguageObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <header className="h-20 border-b border-[#1B2632]/10 bg-[#EEE9DF]/90 backdrop-blur sticky top-0 z-50 transition-all">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-full flex items-center justify-between">
        
        {/* Left: Brand logo wordmark + v1.0 Live badge */}
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 group text-decoration-none">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1B2632] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FFB162]" viewBox="0 0 24 24">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-[#1B2632]">
              FinLingo
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#FFB162]/20 text-[#A35139] text-[9px] sm:text-[10px] font-mono font-bold border border-[#FFB162]/40">
              v1.0 Live
            </span>
          </div>
        </a>

        {/* Center Links (Desktop only) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#5C6B7A]">
          {onOpenDashboard && (
            <button
              onClick={onOpenDashboard}
              className="hover:text-[#1B2632] transition-colors cursor-pointer"
            >
              Dashboard
            </button>
          )}

          {onOpenMythBusting && (
            <button
              onClick={onOpenMythBusting}
              className="hover:text-[#1B2632] transition-colors cursor-pointer"
            >
              Myth-Buster
            </button>
          )}

          {onOpenGoalPlanning && (
            <button
              onClick={onOpenGoalPlanning}
              className="hover:text-[#1B2632] transition-colors cursor-pointer"
            >
              Goal Cards
            </button>
          )}

          <a href="#how-it-works" className="hover:text-[#1B2632] transition-colors">
            How It Works
          </a>

          <button onClick={onOpenB2BModal} className="hover:text-[#1B2632] transition-colors text-[#A35139] font-bold cursor-pointer">
            B2B Console
          </button>
        </nav>

        {/* Right Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="px-3.5 py-1.5 rounded-full bg-white border border-[#C9C1B1] text-xs font-bold text-[#1B2632] flex items-center gap-1.5 hover:bg-[#F4F0E8] transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#A35139]" />
              <span>
                {currentLanguageObj.flag} {currentLanguageObj.nativeName}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#5C6B7A]" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-white border border-[#C9C1B1] shadow-xl py-2 z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLang(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs flex items-center gap-2 hover:bg-[#F4F0E8] transition-colors cursor-pointer ${
                      currentLang === lang.code ? 'font-bold text-[#A35139] bg-[#FFB162]/10' : 'text-[#1B2632]'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Primary CTA */}
          <button
            onClick={onOpenOnboarding}
            className="bg-[#1B2632] hover:bg-[#2C3B4D] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition shadow-sm cursor-pointer"
          >
            Try FinLingo →
          </button>
        </div>

        {/* Mobile Right Controls: Compact "Try FinLingo" Pill + Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenOnboarding}
            className="bg-[#1B2632] active:bg-[#2C3B4D] text-white px-3 py-1.5 rounded-full text-xs font-bold transition shadow-xs cursor-pointer min-h-[36px] flex items-center"
          >
            Try FinLingo →
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-white border border-[#C9C1B1] text-[#1B2632] cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer (Smooth Animated Sheet with full-width navigation links) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#EEE9DF] border-b border-[#C9C1B1] px-5 py-4 space-y-2 shadow-xl animate-fade-in">
          {onOpenDashboard && (
            <button
              onClick={() => {
                onOpenDashboard();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left text-sm font-bold text-[#1B2632] py-2.5 px-3 rounded-xl hover:bg-white/60 transition"
            >
              Dashboard Console
            </button>
          )}

          {onOpenMythBusting && (
            <button
              onClick={() => {
                onOpenMythBusting();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left text-sm font-bold text-[#1B2632] py-2.5 px-3 rounded-xl hover:bg-white/60 transition"
            >
              Myth-Buster Engine
            </button>
          )}

          {onOpenGoalPlanning && (
            <button
              onClick={() => {
                onOpenGoalPlanning();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left text-sm font-bold text-[#1B2632] py-2.5 px-3 rounded-xl hover:bg-white/60 transition"
            >
              Goal Cards Simulator
            </button>
          )}

          <a
            href="#how-it-works"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-left text-sm font-bold text-[#1B2632] py-2.5 px-3 rounded-xl hover:bg-white/60 transition text-decoration-none"
          >
            How It Works
          </a>

          <button
            onClick={() => {
              onOpenB2BModal();
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left text-sm font-bold text-[#A35139] py-2.5 px-3 rounded-xl hover:bg-white/60 transition"
          >
            B2B Partner Console
          </button>

          {/* Vernacular Language Selector in Drawer */}
          <div className="pt-2 border-t border-[#C9C1B1]/60">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#A35139] px-3 mb-1.5">
              Select Vernacular Language
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onSelectLang(lang.code);
                  }}
                  className={`text-left px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition ${
                    currentLang === lang.code
                      ? 'bg-[#1B2632] text-white font-bold'
                      : 'bg-white/80 text-[#1B2632] border border-[#C9C1B1]/60'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span className="truncate">{lang.nativeName}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3">
            <button
              onClick={() => {
                onOpenOnboarding();
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-[#1B2632] text-white py-3 rounded-full text-sm font-bold shadow-sm"
            >
              Try FinLingo Now →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

