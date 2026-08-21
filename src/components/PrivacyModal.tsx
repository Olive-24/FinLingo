import React from 'react';
import { X, ShieldCheck, Lock, FileText } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl glass-panel p-6 sm:p-8 bg-slate-900 border-slate-700 shadow-2xl rounded-3xl max-h-[85vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">FinLingo Privacy & Data Trust Policy</h3>
            <p className="text-xs text-slate-400">Last updated: August 2026 • Compliant with RBI Financial Data Guidelines</p>
          </div>
        </div>

        {/* Body content */}
        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          <section className="space-y-1.5">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" /> 1. Voice Data Encryption & Anonymization
            </h4>
            <p>
              When you use voice input on FinLingo, your speech is processed real-time using end-to-end encrypted AI pipelines. We do not store raw voice recordings containing personally identifiable financial information (PII). Voice input is transcribed anonymously to deliver immediate vernacular explanations.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" /> 2. Educational & Simulation Sandbox Scope
            </h4>
            <p>
              FinLingo acts as an educational simulator and financial literacy assistant. All loan, EMI, and interest calculations performed in the sandbox mode are non-binding estimates meant to empower your understanding before engaging with licensed lenders.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400" /> 3. Institutional Partner Lead Privacy
            </h4>
            <p>
              Data shared via the "Partner with Us" B2B form is strictly confidential and governed by Non-Disclosure Agreements (NDAs). We never sell institutional contact details or borrower search analytics to unauthorized third-party brokers.
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="btn btn-primary px-6 py-2.5 text-xs font-bold"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
