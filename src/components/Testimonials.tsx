import React from 'react';
import { Star, Quote, Users, Languages, ShieldCheck } from 'lucide-react';
import type { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { TESTIMONIALS } from '../data/testimonialsData';

interface TestimonialsProps {
  currentLang: LanguageCode;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang].testimonials;

  return (
    <section id="trust" className="py-20 border-t border-[#1B2632]/10 bg-[#EEE9DF] text-[#1B2632]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="bg-[#A35139]/10 text-[#A35139] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Quote className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#1B2632] leading-[1.25]">
            Trusted by <span className="text-[#A35139] underline decoration-[#A35139]/20">Families Across India</span>
          </h2>

          <p className="text-base text-[#5C6B7A] leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* STAT TRIO STRIP */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="bg-white p-6 rounded-2xl border border-[#C9C1B1]/60 text-center space-y-2 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#1B2632] text-white mx-auto flex items-center justify-center font-bold">
              <Users className="w-5 h-5 text-[#FFB162]" />
            </div>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#1B2632]">190M+</div>
            <div className="text-[11px] font-bold text-[#A35139] uppercase tracking-wider">UNDERSERVED BORROWERS</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#C9C1B1]/60 text-center space-y-2 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#1B2632] text-white mx-auto flex items-center justify-center font-bold">
              <Languages className="w-5 h-5 text-[#FFB162]" />
            </div>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#1B2632]">10+</div>
            <div className="text-[11px] font-bold text-[#A35139] uppercase tracking-wider">VERNACULAR LANGUAGES</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#C9C1B1]/60 text-center space-y-2 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#1B2632] text-white mx-auto flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-[#FFB162]" />
            </div>
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#1B2632]">₹0</div>
            <div className="text-[11px] font-bold text-[#A35139] uppercase tracking-wider">COST FINANCIAL LITERACY</div>
          </div>
        </div>

        {/* TESTIMONIAL CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl border border-[#C9C1B1]/60 space-y-4 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="bg-[#FFB162]/20 text-[#A35139] px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold">
                  {item.language}
                </span>
              </div>

              <p className="text-sm text-[#1B2632] leading-relaxed italic font-medium">
                "{item.quote}"
              </p>

              <div className="pt-3 border-t border-[#C9C1B1]/40 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#1B2632]">{item.name}</div>
                  <div className="text-[11px] text-[#5C6B7A]">{item.role} • {item.location}</div>
                </div>
                <span className="text-[#A35139] font-mono font-bold text-[11px]">{item.badge}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
