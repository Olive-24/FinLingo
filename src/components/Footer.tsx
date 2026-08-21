import React from 'react';
import { Sparkles, Globe, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
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
    <footer className="bg-[#050811] border-t border-slate-800 text-slate-400 pt-16 pb-12 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Language Selector Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Sparkles className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">FinLingo</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t.tagline} Empowering rural entrepreneurs, first-time borrowers, and financial institutions with voice-first AI simplicity.
            </p>

            {/* Footer Language Selector */}
            <div className="pt-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Select Interface Language</span>
              </label>
              <div className="flex flex-wrap gap-1.5 max-w-md">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => onSelectLang(lang.code)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      currentLang === lang.code
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                        : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span>{lang.flag} {lang.nativeName}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Product Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              {t.product}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#features" className="hover:text-emerald-400 transition-colors">
                  Speak, Understand, Simulate
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">
                  Live Interactive Demo
                </a>
              </li>
              <li>
                <button onClick={onOpenOnboarding} className="hover:text-emerald-400 transition-colors text-left">
                  Start Free Flow
                </button>
              </li>
              <li>
                <a href="#impact" className="hover:text-emerald-400 transition-colors">
                  User Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* For Institutions Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              {t.forInstitutions}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenB2BModal} className="hover:text-indigo-400 transition-colors text-left font-semibold text-indigo-300">
                  Bank & NBFC Partnership
                </button>
              </li>
              <li>
                <a href="#b2b-partners" className="hover:text-indigo-400 transition-colors">
                  NPA Reduction Metrics
                </a>
              </li>
              <li>
                <button onClick={onOpenB2BModal} className="hover:text-indigo-400 transition-colors text-left">
                  Vernacular AI SDK Integration
                </button>
              </li>
              <li>
                <button onClick={onOpenB2BModal} className="hover:text-indigo-400 transition-colors text-left">
                  Request Sandbox API Demo
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              {t.contact}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="mailto:support@finlingo.ai" className="hover:text-white transition-colors font-mono">
                  support@finlingo.ai
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-mono">+91 1800-FIN-LINGO</span>
              </li>
              <li className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Indiranagar Fintech Hub, Bengaluru, KA 560038</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenPrivacy}
                  className="text-xs text-emerald-400 hover:underline font-semibold"
                >
                  {t.privacy} & Data Trust
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1 text-slate-400">
            <span>© {new Date().getFullYear()} FinLingo Inc. {t.rights}</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={onOpenPrivacy} className="hover:text-slate-200 transition-colors">
              {t.privacy}
            </button>
            <a href="#" onClick={(e) => { e.preventDefault(); onOpenPrivacy(); }} className="hover:text-slate-200 transition-colors">
              {t.terms}
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
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
