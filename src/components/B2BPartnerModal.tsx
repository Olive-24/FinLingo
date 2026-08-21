import React, { useState } from 'react';
import { X, Building2, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import type { B2BFormData } from '../types';

interface B2BPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const B2BPartnerModal: React.FC<B2BPartnerModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<B2BFormData>({
    fullName: '',
    institutionName: '',
    workEmail: '',
    phone: '',
    institutionType: 'Bank',
    estimatedUsers: '50k-500k',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl glass-panel p-6 sm:p-8 bg-slate-900 border-slate-700 shadow-2xl rounded-3xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Partner with FinLingo</h3>
                <p className="text-xs text-slate-400">
                  Empower your vernacular customers with AI financial literacy & simulators.
                </p>
              </div>
            </div>

            {/* Lead Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Institution / Bank Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Union Sahakari Bank"
                    value={formData.institutionName}
                    onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@bank.com"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Institution Type
                  </label>
                  <select
                    value={formData.institutionType}
                    onChange={(e) =>
                      setFormData({ ...formData, institutionType: e.target.value as any })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Bank">Scheduled Commercial Bank</option>
                    <option value="NBFC">NBFC / Micro-Lender</option>
                    <option value="MFI">Microfinance Institution (MFI)</option>
                    <option value="Fintech">Fintech App</option>
                    <option value="Other">Other Institution</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Estimated User Base
                  </label>
                  <select
                    value={formData.estimatedUsers}
                    onChange={(e) => setFormData({ ...formData, estimatedUsers: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="<50k">Under 50,000 borrowers</option>
                    <option value="50k-500k">50,000 - 500,000 borrowers</option>
                    <option value="500k+">500,000+ borrowers</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  How can FinLingo assist your lending goals?
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g., We want to integrate voice simulator SDK into our regional Android app to reduce loan default rate..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn btn-indigo py-3 text-sm font-bold flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Partnership Request</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>NDAs available. Your institutional data is 100% confidential.</span>
              </div>
            </form>
          </div>
        ) : (
          /* Submission Success State */
          <div className="py-8 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">Partnership Request Received!</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Thank you, <span className="text-emerald-400 font-bold">{formData.fullName}</span>. Our B2B Institutional Partnerships team will contact you at{' '}
              <span className="text-indigo-300 font-mono">{formData.workEmail}</span> within 24 hours with custom SDK demo access.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="btn btn-secondary px-6 py-2.5 text-xs font-bold"
              >
                Close & Return to Site
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
