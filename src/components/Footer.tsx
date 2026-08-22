import React from 'react';
import { Sparkles, Globe, ArrowUp } from 'lucide-react';
import type { LanguageCode } from '../types';
import { LANGUAGES } from '../data/languages';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  currentLang: LanguageCode;
  onSelectLang: (code: LanguageCode) => void;
  onOpenPrivacy: () => void;
  onOpenB2BModal: () => void;
  onOpenOnboarding: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onSelectLang,
  onOpenPrivacy,
  onOpenB2BModal,
  onOpenOnboarding,
}) => {
  const t = TRANSLATIONS[currentLang].footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0F] border-t border-white/10 text-white pt-16 pb-12 relative overflow-hidden">
      {/* FAINT GRADIENT ORB GLOW LOW IN BACKGROUND */}
      <div className="orb-teal bottom-0 right-0 opacity-15" />

      <div className="container mx-auto px-4 relative z-20 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Utilitarian Language Selector */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#14B8A6] to-[#8B5CF6] text-white flex items-center justify-center font-bold shadow-lg shadow-[#14B8A6]/20">
                <Sparkles className="w-5 h-5 fill-white/20 stroke-[2.2]" />
              </div>
              <span className="font-black text-xl tracking-tight text-white font-sans">FinLingo</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-normal">
              {t.tagline} Empowering rural entrepreneurs, first-time borrowers, and financial institutions with voice-first AI simplicity.
            </p>

            {/* Script & Flag Based Language Selector */}
            <div className="pt-2">
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>Select Vernacular Interface</span>
              </label>

              <select
                value={currentLang}
                onChange={(e) => onSelectLang(e.target.value as LanguageCode)}
                className="w-full max-w-xs px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs font-bold text-[#14B8A6] focus:outline-none focus:border-[#14B8A6] cursor-pointer"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-[#0A0A0F] text-white">
                    {lang.flag} {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">Platform</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li>
                <button onClick={onOpenOnboarding} className="hover:text-[#14B8A6] transition-colors">
                  Voice Assistant Sandbox
                </button>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#14B8A6] transition-colors">
                  Zero Jargon Translation
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#14B8A6] transition-colors">
                  3-Step User Guide
                </a>
              </li>
            </ul>
          </div>

          {/* B2B & Enterprise Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">B2B Partners</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li>
                <button onClick={onOpenB2BModal} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>White-Label Voice SDK</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenB2BModal} className="hover:text-amber-400 transition-colors">
                  Bank Compliance Audit
                </button>
              </li>
              <li>
                <button onClick={onOpenB2BModal} className="hover:text-amber-400 transition-colors">
                  NPA Reduction Metrics
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Legal Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">Trust & Safety</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li>
                <button onClick={onOpenPrivacy} className="hover:text-[#14B8A6] transition-colors">
                  {t.privacyLink}
                </button>
              </li>
              <li>
                <span className="text-slate-500">SEBI Transparency Compliant</span>
              </li>
              <li>
                <span className="text-slate-500">100% Educational Sandbox</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{t.copyright}</p>

          <button
            onClick={scrollToTop}
            className="px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
