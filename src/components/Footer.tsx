import React from 'react';
import { Sparkles, Globe, Mail, ArrowUp } from 'lucide-react';
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
    <footer className="bg-[#FBF7F2] border-t border-black/5 text-[#2B2B2B] pt-14 pb-10 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-black/5">
          {/* Brand & Utilitarian Language Selector */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="icon-badge icon-badge-teal !w-9 !h-9 !min-w-[36px]">
                <Sparkles className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-[#2B2B2B]">FinLingo</span>
            </div>

            <p className="text-xs text-[#6B6B6B] leading-relaxed max-w-sm">
              {t.tagline} Empowering rural entrepreneurs, first-time borrowers, and financial institutions with voice-first AI simplicity.
            </p>

            {/* Script & Flag Based Language Selector */}
            <div className="pt-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B6B6B] mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#0F7173]" />
                <span>Select Vernacular Interface</span>
              </label>

              <select
                value={currentLang}
                onChange={(e) => onSelectLang(e.target.value as LanguageCode)}
                className="w-full max-w-xs px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#0F7173] focus:outline-none focus:border-[#0F7173] cursor-pointer shadow-sm"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold text-[#2B2B2B] uppercase tracking-wider mb-4">
              {t.product}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#6B6B6B] font-medium">
              <li>
                <a href="#how-it-works" className="hover:text-[#0F7173] transition-colors">
                  Bolo, Samjho, Simulate
                </a>
              </li>
              <li>
                <a href="#demo" className="hover:text-[#0F7173] transition-colors">
                  Live Demo Preview
                </a>
              </li>
              <li>
                <button onClick={onOpenOnboarding} className="hover:text-[#0F7173] transition-colors text-left">
                  Start Free Flow
                </button>
              </li>
              <li>
                <a href="#trust" className="hover:text-[#0F7173] transition-colors">
                  Verified Borrower Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Institution Links */}
          <div>
            <h4 className="text-xs font-bold text-[#2B2B2B] uppercase tracking-wider mb-4">
              {t.forInstitutions}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#6B6B6B] font-medium">
              <li>
                <button onClick={onOpenB2BModal} className="hover:text-[#1E2761] transition-colors text-left font-bold text-[#1E2761]">
                  Partner With Us
                </button>
              </li>
              <li>
                <a href="#b2b-partners" className="hover:text-[#1E2761] transition-colors">
                  NPA Reduction Metrics
                </a>
              </li>
              <li>
                <button onClick={onOpenB2BModal} className="hover:text-[#1E2761] transition-colors text-left">
                  Vernacular AI SDK Integration
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-xs font-bold text-[#2B2B2B] uppercase tracking-wider mb-4">
              {t.contact}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#6B6B6B] font-medium">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#0F7173] shrink-0" />
                <a href="mailto:support@finlingo.ai" className="hover:text-[#0F7173] transition-colors font-mono">
                  support@finlingo.ai
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenPrivacy}
                  className="text-xs text-[#0F7173] hover:underline font-bold"
                >
                  {t.privacy} & Data Security
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Rights Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B6B6B]">
          <span>© {new Date().getFullYear()} FinLingo Inc. {t.rights}</span>

          <div className="flex items-center gap-6">
            <button onClick={onOpenPrivacy} className="hover:text-[#2B2B2B] transition-colors">
              {t.privacy}
            </button>
            <button onClick={onOpenPrivacy} className="hover:text-[#2B2B2B] transition-colors">
              {t.terms}
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white border border-slate-200 text-[#2B2B2B] hover:text-[#0F7173] hover:border-[#0F7173] transition-colors shadow-sm"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
