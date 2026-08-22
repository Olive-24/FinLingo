import React from 'react';
import { Star, Quote, Users, Languages, ShieldCheck } from 'lucide-react';
import type { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { TESTIMONIALS } from '../data/testimonialsData';
import { Card, Badge, MicroLabel } from './ui/Primitives';

interface TestimonialsProps {
  currentLang: LanguageCode;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang].testimonials;

  return (
    <section id="trust" className="py-24 bg-[#F4E6DF] text-[#2A1A20] relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge variant="maroon" icon={<Quote className="w-3.5 h-3.5" />}>
            {t.badge}
          </Badge>
          <h2 className="font-serif-display text-3xl sm:text-5xl text-[#2A1A20]">
            Trusted by <span className="text-[#3B2530] underline decoration-[#3B2530]/20">Families Across India</span>
          </h2>
          <p className="text-[#8C7378] text-base font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* STAT TRIO STRIP WITH MICRO-LABELS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <Card padding="md" className="text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#3B2530] text-white mx-auto flex items-center justify-center shadow-sm">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-4xl font-black text-[#3B2530] font-mono">190M+</div>
            <MicroLabel>UNDERSERVED BORROWERS</MicroLabel>
          </Card>

          <Card padding="md" className="text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#3B2530] text-white mx-auto flex items-center justify-center shadow-sm">
              <Languages className="w-5 h-5" />
            </div>
            <div className="text-4xl font-black text-[#3B2530] font-mono">10+</div>
            <MicroLabel>VERNACULAR LANGUAGES</MicroLabel>
          </Card>

          <Card padding="md" className="text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#3B2530] text-white mx-auto flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-4xl font-black text-[#3B2530] font-mono">₹0</div>
            <MicroLabel>COST FINANCIAL LITERACY</MicroLabel>
          </Card>
        </div>

        {/* TESTIMONIAL CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {TESTIMONIALS.map((item) => (
            <Card
              key={item.id}
              padding="lg"
              className="space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Language Tag Badge & Rating */}
                <div className="flex items-center justify-between">
                  <Badge variant="maroon">{item.language}</Badge>

                  <div className="flex items-center gap-1 text-[#3B2530]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#3B2530] stroke-none" />
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <p className="text-sm sm:text-base text-[#2A1A20] leading-relaxed font-medium">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#E6D2C8]">
                <div className="w-10 h-10 rounded-full bg-[#3B2530] text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div className="font-extrabold text-sm text-[#2A1A20]">{item.name}</div>
                  <div className="text-xs text-[#8C7378] capitalize">{item.role} • {item.location}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
