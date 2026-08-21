import React from 'react';
import { Star, Quote, CheckCircle, Users, Languages, ShieldCheck } from 'lucide-react';
import type { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { TESTIMONIALS } from '../data/testimonialsData';

interface TestimonialsProps {
  currentLang: LanguageCode;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang].testimonials;

  return (
    <section id="trust" className="py-20 bg-[#FBF7F2] relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F7173]/10 border border-[#0F7173]/20 text-[#0F7173] text-xs font-bold mb-3">
            <Quote className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2B2B2B] tracking-tight mb-3">
            {t.title}
          </h2>
          <p className="text-[#6B6B6B] text-base">
            {t.subtitle}
          </p>
        </div>

        {/* Stat Callouts Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-14">
          <div className="card-surface p-6 text-center space-y-2 bg-white">
            <div className="icon-badge icon-badge-teal mx-auto mb-2">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-[#2B2B2B] font-mono">190M+</div>
            <div className="text-xs font-semibold text-[#6B6B6B]">Underserved Indian Borrowers</div>
          </div>

          <div className="card-surface p-6 text-center space-y-2 bg-white">
            <div className="icon-badge icon-badge-marigold mx-auto mb-2">
              <Languages className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-[#2B2B2B] font-mono">10+</div>
            <div className="text-xs font-semibold text-[#6B6B6B]">Vernacular Languages & Dialects</div>
          </div>

          <div className="card-surface p-6 text-center space-y-2 bg-white">
            <div className="icon-badge icon-badge-mint mx-auto mb-2">
              <ShieldCheck className="w-6 h-6 text-emerald-700" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-[#2B2B2B] font-mono">₹0</div>
            <div className="text-xs font-semibold text-[#6B6B6B]">Cost Financial Literacy</div>
          </div>
        </div>

        {/* Testimonial Quote Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="card-surface p-8 relative flex flex-col justify-between bg-white border border-slate-100"
            >
              <div className="space-y-4">
                {/* Rating & Language Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#0F7173]/10 border border-[#0F7173]/20 text-[11px] font-bold text-[#0F7173]">
                    {item.language}
                  </span>
                </div>

                {/* Native Language Quote & Subtext */}
                <p className="text-[#2B2B2B] text-base italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100 mt-6">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#0F7173]/30"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#2B2B2B]">{item.name}</h4>
                    {item.badge && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3" />
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#6B6B6B]">{item.role} • {item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
