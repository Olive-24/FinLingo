import { Globe, ArrowUp } from 'lucide-react';
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
    <footer className="bg-[#EEE9DF] border-t border-[#1B2632]/10 text-[#1B2632] pt-12 sm:pt-16 pb-12 overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-[#C9C1B1]/60">
          
          {/* Brand & Language Selector */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1B2632] flex items-center justify-center shadow-sm shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FFB162]" viewBox="0 0 24 24">
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
              </div>
              <span className="font-serif font-bold text-xl tracking-tight text-[#1B2632]">FinLingo</span>
            </div>

            <p className="text-xs text-[#5C6B7A] leading-relaxed max-w-sm">
              {t.tagline} Empowering rural entrepreneurs, first-time borrowers, and financial institutions with voice-first AI simplicity.
            </p>

            {/* Language Selector */}
            <div className="pt-2 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#A35139] flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>SELECT VERNACULAR INTERFACE</span>
              </div>

              <select
                value={currentLang}
                onChange={(e) => onSelectLang(e.target.value as LanguageCode)}
                className="w-full max-w-xs px-3.5 py-2.5 rounded-xl bg-white border border-[#C9C1B1] text-xs font-bold text-[#1B2632] focus:outline-none cursor-pointer"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Core Modules Column */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#A35139]">
              CORE PLATFORM
            </div>
            <ul className="space-y-2 text-xs font-medium text-[#5C6B7A]">
              <li>
                <button onClick={onOpenOnboarding} className="hover:text-[#1B2632] transition">
                  Voice Assistant Sandbox
                </button>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#1B2632] transition">
                  3-Step User Guide
                </a>
              </li>
              <li>
                <button onClick={onOpenB2BModal} className="hover:text-[#1B2632] transition">
                  B2B Partner Integration
                </button>
              </li>
            </ul>
          </div>

          {/* Vernacular Tools */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#A35139]">
              VERNACULAR TOOLS
            </div>
            <ul className="space-y-2 text-xs font-medium text-[#5C6B7A]">
              <li>
                <span className="text-[#1B2632] font-semibold">Goal Planning Simulator</span>
              </li>
              <li>
                <span className="text-[#1B2632] font-semibold">Financial Myth-Buster Engine</span>
              </li>
              <li>
                <span className="text-[#1B2632] font-semibold">Personal Loan EMI Breakdown</span>
              </li>
            </ul>
          </div>

          {/* Regulatory & Compliance */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#A35139]">
              REGULATORY & LEGAL
            </div>
            <ul className="space-y-2 text-xs font-medium text-[#5C6B7A]">
              <li>
                <button onClick={onOpenPrivacy} className="hover:text-[#1B2632] transition text-left">
                  SEBI & RBI Compliance Notes
                </button>
              </li>
              <li>
                <button onClick={onOpenPrivacy} className="hover:text-[#1B2632] transition text-left">
                  Data Privacy & Encryption Policy
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5C6B7A] gap-4">
          <div>
            © {new Date().getFullYear()} FinLingo Inc. Vernacular Financial Inclusion Engine.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-[#1B2632] transition underline underline-offset-4"
            >
              Privacy Policy
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white border border-[#C9C1B1] text-[#1B2632] hover:bg-[#F4F0E8] transition"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
