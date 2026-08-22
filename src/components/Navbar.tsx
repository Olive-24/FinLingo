import React, { useState } from 'react';
import { Globe, ChevronDown, Sparkles, Menu, X } from 'lucide-react';
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
    <header className="h-20 border-b border-[#1B2632]/10 bg-[#EEE9DF]/80 backdrop-blur sticky top-0 z-50 transition-all">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Left: Brand logo wordmark + v1.0 Live badge */}
        <a href="#" className="flex items-center gap-3 group text-decoration-none">
          <div className="w-9 h-9 rounded-xl bg-[#1B2632] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 fill-white/20" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-2xl tracking-tight text-[#1B2632]">
              FinLingo
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFB162]/20 text-[#A35139] text-[10px] font-mono font-bold border border-[#FFB162]/40">
              v1.0 Live
            </span>
          </div>
        </a>

        {/* Center Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#5C6B7A]">
          {onOpenDashboard && (
            <button
              onClick={onOpenDashboard}
              className="hover:text-[#1B2632] transition-colors"
            >
              Dashboard
            </button>
          )}

          {onOpenMythBusting && (
            <button
              onClick={onOpenMythBusting}
              className="hover:text-[#1B2632] transition-colors"
            >
              Myth-Buster
            </button>
          )}

          {onOpenGoalPlanning && (
            <button
              onClick={onOpenGoalPlanning}
              className="hover:text-[#1B2632] transition-colors"
            >
              Goal Cards
            </button>
          )}

          <a href="#how-it-works" className="hover:text-[#1B2632] transition-colors">
            How It Works
          </a>

          <button onClick={onOpenB2BModal} className="hover:text-[#1B2632] transition-colors text-[#A35139] font-bold">
            B2B Console
          </button>
        </nav>

        {/* Right Actions: Language Selector + Primary Pill Button */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="px-3 py-1.5 rounded-full bg-white border border-[#C9C1B1] text-xs font-bold text-[#1B2632] flex items-center gap-1.5 hover:bg-[#F4F0E8] transition-colors"
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
                    className={`w-full text-left px-4 py-2 text-xs flex items-center gap-2 hover:bg-[#F4F0E8] transition-colors ${
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

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-white border border-[#C9C1B1] text-[#1B2632]"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#EEE9DF] border-b border-[#C9C1B1] px-6 py-4 space-y-3">
          {onOpenDashboard && (
            <button
              onClick={() => {
                onOpenDashboard();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left text-sm font-bold text-[#1B2632] py-2"
            >
              Dashboard
            </button>
          )}

          {onOpenMythBusting && (
            <button
              onClick={() => {
                onOpenMythBusting();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left text-sm font-bold text-[#1B2632] py-2"
            >
              Myth-Buster
            </button>
          )}

          {onOpenGoalPlanning && (
            <button
              onClick={() => {
                onOpenGoalPlanning();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left text-sm font-bold text-[#1B2632] py-2"
            >
              Goal Cards
            </button>
          )}

          <div className="pt-2">
            <button
              onClick={() => {
                onOpenOnboarding();
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-[#1B2632] text-white py-3 rounded-full text-sm font-semibold"
            >
              Try FinLingo →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
