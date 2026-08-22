import React from 'react';
import { Star, Quote, Users, Languages, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import type { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { TESTIMONIALS } from '../data/testimonialsData';

interface TestimonialsProps {
  currentLang: LanguageCode;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang].testimonials;

  return (
    <section id="trust" className="py-24 bg-[#0A0A0F] text-white relative overflow-hidden">
      {/* AMBIENT GLOW ORB */}
      <div className="orb-teal bottom-10 left-1/3 opacity-20" />

      <div className="container mx-auto px-4 relative z-20 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#14B8A6] text-xs font-extrabold backdrop-blur-md">
            <Quote className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Trusted by <span className="gradient-text">Families Across India</span>
          </h2>
          <p className="text-slate-400 text-base">
            {t.subtitle}
          </p>
        </div>

        {/* STAT TRIO STRIP (AMBER ACCENT HIGHLIGHT NUMBERS) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6 text-center space-y-2 bg-white/5 border border-white/10 rounded-2xl"
          >
            <div className="w-10 h-10 rounded-full bg-[#14B8A6]/15 border border-[#14B8A6]/30 text-[#14B8A6] mx-auto flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-4xl font-black text-amber-400 font-mono">190M+</div>
            <div className="text-xs font-bold text-slate-300">Underserved Indian Borrowers</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6 text-center space-y-2 bg-white/5 border border-white/10 rounded-2xl"
          >
            <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#8B5CF6] mx-auto flex items-center justify-center">
              <Languages className="w-5 h-5" />
            </div>
            <div className="text-4xl font-black text-[#14B8A6] font-mono">10+</div>
            <div className="text-xs font-bold text-slate-300">Vernacular Languages & Dialects</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6 text-center space-y-2 bg-white/5 border border-white/10 rounded-2xl"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-4xl font-black text-emerald-400 font-mono">₹0</div>
            <div className="text-xs font-semibold text-slate-300">Cost Financial Literacy</div>
          </motion.div>
        </div>

        {/* BENTO-GRID TESTIMONIAL QUOTE CARDS (1 HERO LARGER TILE + 3 SUPPORTING TILES) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-5xl mx-auto">
          {TESTIMONIALS.map((item, idx) => {
            const isHeroCard = idx === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`glass-card p-7 bg-[#0A0A0F]/80 border border-white/15 rounded-3xl space-y-4 hover:border-[#14B8A6]/50 transition-all flex flex-col justify-between ${
                  isHeroCard ? 'md:col-span-12 lg:col-span-7 bg-gradient-to-br from-white/10 to-white/5 border-[#14B8A6]/40' : 'md:col-span-6 lg:col-span-5'
                }`}
              >
                <div className="space-y-4">
                  {/* Language Tag Badge & Rating */}
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#14B8A6]/20 to-[#8B5CF6]/20 border border-[#14B8A6]/30 text-[#14B8A6] text-xs font-bold">
                      <Sparkles className="w-3 h-3" />
                      <span>{item.language}</span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
                      ))}
                    </div>
                  </div>

                  {/* Quote Text */}
                  <p className={`text-slate-200 leading-relaxed font-medium ${isHeroCard ? 'text-base sm:text-lg font-semibold text-white' : 'text-xs sm:text-sm'}`}>
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#14B8A6] to-[#8B5CF6] text-white font-extrabold flex items-center justify-center text-sm shadow-md">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-white">{item.name}</div>
                    <div className="text-xs text-slate-400 capitalize">{item.role} • {item.location}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
