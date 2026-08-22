import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown, Sparkles, Menu, X, ArrowRight, Building2 } from 'lucide-react';
import type { LanguageCode } from '../types';
import { LANGUAGES } from '../data/languages';
import { TRANSLATIONS } from '../data/translations';
import { Button } from './ui/Primitives';

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F4E6DF]/95 backdrop-blur-md border-b border-[#E6D2C8] py-3.5 shadow-sm'
          : 'bg-[#F4E6DF] py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo with Rounded-Square Maroon Badge */}
        <a href="#" className="flex items-center gap-3 group text-decoration-none">
          <div className="w-9 h-9 rounded-xl bg-[#3B2530] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 fill-white/20 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-[#2A1A20] flex items-center gap-1.5 font-sans">
              FinLingo <span className="w-2 h-2 rounded-full bg-[#3B2530] animate-pulse"></span>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-[#8C7378] uppercase">
              Vernacular AI Platform
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs sm:text-sm font-bold text-[#8C7378]">
          {onOpenPricing && (
            <button
              onClick={onOpenPricing}
              className="hover:text-[#3B2530] transition-colors"
            >
              Pricing
            </button>
          )}

          {onOpenDashboard && (
            <button
              onClick={onOpenDashboard}
              className="hover:text-[#3B2530] transition-colors flex items-center gap-1.5"
            >
              <span>Dashboard</span>
            </button>
          )}

          {onOpenMythBusting && (
            <button
              onClick={onOpenMythBusting}
              className="hover:text-[#3B2530] transition-colors flex items-center gap-1.5"
            >
              <span>Myth-Buster</span>
            </button>
          )}

          {onOpenGoalPlanning && (
            <button
              onClick={onOpenGoalPlanning}
              className="hover:text-[#3B2530] transition-colors flex items-center gap-1.5"
            >
              <span>Goal Cards</span>
            </button>
          )}

          <a href="#how-it-works" className="hover:text-[#3B2530] transition-colors">
            {t.features}
          </a>
        </nav>

        {/* Right Action Bar */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Vernacular Language Selector Pill */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="px-3.5 py-1.5 rounded-full bg-[#FBF2EC] border border-[#E6D2C8] text-xs font-bold text-[#3B2530] flex items-center gap-2 transition-all hover:border-[#3B2530]"
            >
              <Globe className="w-3.5 h-3.5 text-[#3B2530]" />
              <span>{currentLanguageObj.flag} {currentLanguageObj.nativeName}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#8C7378] transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-52 py-2 bg-[#FBF2EC] border border-[#E6D2C8] rounded-2xl shadow-xl z-50">
                <div className="px-3.5 py-1.5 text-[10px] font-bold text-[#8C7378] uppercase tracking-widest border-b border-[#E6D2C8]">
                  Select Language
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLang(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between hover:bg-[#3B2530]/10 transition-colors ${
                      currentLang === lang.code ? 'text-[#3B2530] font-bold bg-[#3B2530]/10' : 'text-[#2A1A20]'
                    }`}
                  >
                    <span>{lang.flag} {lang.nativeName}</span>
                    <span className="text-[10px] text-[#8C7378] font-mono">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* B2B Console Button (Secondary Primitive) */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              if (onOpenB2BDashboard) {
                onOpenB2BDashboard();
              } else {
                onOpenB2BModal();
              }
            }}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>B2B Console</span>
          </Button>

          {/* Start Free CTA Button (Primary Primitive) */}
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenOnboarding}
          >
            <span>{t.startFreeBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenOnboarding}
          >
            <span>Start</span>
          </Button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full bg-[#FBF2EC] border border-[#E6D2C8] text-[#3B2530]"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 bg-[#FBF2EC] border border-[#E6D2C8] rounded-3xl p-5 shadow-2xl z-50 space-y-4">
          <div className="space-y-2 text-sm font-bold text-[#2A1A20]">
            {onOpenPricing && (
              <button
                onClick={() => {
                  onOpenPricing();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left p-2.5 rounded-xl hover:bg-[#3B2530]/10"
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
                className="w-full text-left p-2.5 rounded-xl hover:bg-[#3B2530]/10 text-[#3B2530]"
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
                className="w-full text-left p-2.5 rounded-xl hover:bg-[#3B2530]/10"
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
                className="w-full text-left p-2.5 rounded-xl hover:bg-[#3B2530]/10"
              >
                Goal Planning Cards
              </button>
            )}
          </div>

          <div className="pt-3 border-t border-[#E6D2C8] flex flex-col gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                if (onOpenB2BDashboard) onOpenB2BDashboard();
                else onOpenB2BModal();
                setIsMobileMenuOpen(false);
              }}
            >
              B2B Partner Console
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
