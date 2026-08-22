import React from 'react';
import { Building2, TrendingUp, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import type { LanguageCode } from '../types';
import { Card, Badge, MicroLabel, Button } from './ui/Primitives';

interface B2BSectionProps {
  currentLang: LanguageCode;
  onOpenB2BModal: () => void;
}

export const B2BSection: React.FC<B2BSectionProps> = ({ onOpenB2BModal }) => {
  return (
    <section id="b2b-partners" className="py-24 bg-[#F4E6DF] text-[#2A1A20] relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <Card padding="lg" className="border-2 border-[#3B2530] shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Business Value Props */}
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="maroon" icon={<Building2 className="w-3.5 h-3.5" />}>
                Enterprise White-Label Licensing & SDK
              </Badge>

              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#2A1A20] leading-tight">
                Reach <span className="text-[#3B2530] underline decoration-[#3B2530]/20">190M+ underserved borrowers</span> through one integration
              </h2>

              <p className="text-[#8C7378] text-base leading-relaxed font-normal">
                Empower vernacular borrowers with automated AI voice guidance. Reduce NPA rates, boost lead qualification, and audit compliance for Banks, NBFCs, and MFIs.
              </p>

              {/* Bullet Value Props */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#3B2530] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#2A1A20]">3.4x Higher Vernacular Conversion</h4>
                    <p className="text-xs text-[#8C7378]">Educated borrowers complete credit applications significantly faster.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#3B2530] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-[#2A1A20]">42% Lower NPA & Default Rates</h4>
                    <p className="text-xs text-[#8C7378]">Borrowers who simulate EMIs have significantly higher on-time repayment.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#3B2530] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-[#2A1A20]">Plug & Play Vernacular Voice SDK</h4>
                    <p className="text-xs text-[#8C7378]">Embed FinLingo simulator directly into your existing Android & iOS mobile app.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="primary" size="lg" onClick={onOpenB2BModal}>
                  <span>Request White-Label Demo & API Specs</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Right Column: Stat Trio with Micro-label Captions */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-[#F4E6DF] border border-[#E6D2C8] space-y-1">
                <div className="text-4xl font-black font-mono text-[#3B2530]">3.4x</div>
                <MicroLabel>CREDIT APPLICATION COMPLETION RATE</MicroLabel>
                <div className="text-[11px] text-[#8C7378]">Verified across rural & semi-urban bank pilot programs</div>
              </div>

              <div className="p-6 rounded-2xl bg-[#F4E6DF] border border-[#E6D2C8] space-y-1">
                <div className="text-4xl font-black font-mono text-[#3B2530]">42%</div>
                <MicroLabel>REDUCTION IN LOAN NPA DEFAULTS</MicroLabel>
                <div className="text-[11px] text-[#8C7378]">Through clear EMI interest subvention transparency</div>
              </div>

              <div className="p-6 rounded-2xl bg-[#F4E6DF] border border-[#E6D2C8] space-y-1">
                <div className="text-4xl font-black font-mono text-[#3B2530]">190M+</div>
                <MicroLabel>TARGET VERNACULAR BORROWERS IN INDIA</MicroLabel>
                <div className="text-[11px] text-[#8C7378]">8 regional languages supported out-of-the-box</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default B2BSection;
