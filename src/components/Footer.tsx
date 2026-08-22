import React from 'react';
import { Sparkles, Globe, ArrowUp } from 'lucide-react';
import type { LanguageCode } from '../types';
import { LANGUAGES } from '../data/languages';
import { TRANSLATIONS } from '../data/translations';
import { MicroLabel } from './ui/Primitives';

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
    <footer className="bg-[#F4E6DF] border-t border-[#E6D2C8] text-[#2A1A20] pt-16 pb-12 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E6D2C8]">
          {/* Brand & Language Selector */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#3B2530] text-white flex items-center justify-center font-bold shadow-sm">
                <Sparkles className="w-5 h-5 fill-white/20 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-[#2A1A20] font-sans">FinLingo</span>
            </div>

            <p className="text-xs text-[#8C7378] leading-relaxed max-w-sm font-normal">
              {t.tagline} Empowering rural entrepreneurs, first-time borrowers, and financial institutions with voice-first AI simplicity.
            </p>

            {/* Language Selector */}
            <div className="pt-2 space-y-2">
              <MicroLabel className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#3B2530]" />
                <span>SELECT VERNACULAR INTERFACE</span>
              </MicroLabel>

              <select
                value={currentLang}
                onChange={(e) => onSelectLang(e.target.value as LanguageCode)}
                className="w-full max-w-xs px-3.5 py-2.5 rounded-xl bg-[#FBF2EC] border border-[#E6D2C8] text-xs font-bold text-[#3B2530] focus:outline-none focus:border-[#3B2530] cursor-pointer"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <MicroLabel>PLATFORM</MicroLabel>
            <ul className="space-y-2.5 text-xs font-bold text-[#8C7378]">
              <li>
                <button onClick={onOpenOnboarding} className="hover:text-[#3B2530] transition-colors">
                  Voice Assistant Sandbox
                </button>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#3B2530] transition-colors">
                  Zero Jargon Translation
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#3B2530] transition-colors">
                  3-Step User Guide
                </a>
              </li>
            </ul>
          </div>

          {/* B2B & Enterprise Column */}
          <div className="space-y-3">
            <MicroLabel>B2B PARTNERS</MicroLabel>
            <ul className="space-y-2.5 text-xs font-bold text-[#8C7378]">
              <li>
                <button onClick={onOpenB2BModal} className="hover:text-[#3B2530] transition-colors">
                  White-Label Voice SDK
                </button>
              </li>
              <li>
                <button onClick={onOpenB2BModal} className="hover:text-[#3B2530] transition-colors">
                  Bank Compliance Audit
                </button>
              </li>
              <li>
                <button onClick={onOpenB2BModal} className="hover:text-[#3B2530] transition-colors">
                  NPA Reduction Metrics
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Legal Column */}
          <div className="space-y-3">
            <MicroLabel>TRUST & SAFETY</MicroLabel>
            <ul className="space-y-2.5 text-xs font-bold text-[#8C7378]">
              <li>
                <button onClick={onOpenPrivacy} className="hover:text-[#3B2530] transition-colors">
                  {t.privacy}
                </button>
              </li>
              <li>
                <span className="text-[#8C7378]/70">SEBI Transparency Compliant</span>
              </li>
              <li>
                <span className="text-[#8C7378]/70">100% Educational Sandbox</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7378] font-bold">
          <p>{t.rights}</p>

          <button
            onClick={scrollToTop}
            className="px-3.5 py-2 rounded-full bg-[#FBF2EC] hover:bg-[#3B2530]/10 text-[#3B2530] border border-[#E6D2C8] transition-colors flex items-center gap-1.5"
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
