import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import type { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { TESTIMONIALS } from '../data/testimonialsData';

interface TestimonialsProps {
  currentLang: LanguageCode;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang].testimonials;

  return (
    <section id="impact" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-4">
            <Quote className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            {t.subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="glass-panel p-8 relative flex flex-col justify-between border-slate-800 bg-slate-900/60 hover:border-emerald-500/30 transition-all"
            >
              <div>
                {/* Rating & Language Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300">
                    {item.language}
                  </span>
                </div>

                {/* Quote text */}
                <p className="text-slate-200 text-sm sm:text-base italic leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/30"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{item.name}</h4>
                    {item.badge && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <CheckCircle className="w-3 h-3" />
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{item.role} • {item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
