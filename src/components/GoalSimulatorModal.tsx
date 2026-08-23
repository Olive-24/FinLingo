import React, { useState } from 'react';
import { X, Sliders, ShieldCheck, Send, Flame } from 'lucide-react';
import type { DetectedGoal, LanguageCode } from '../types';
import { saveUserGoal } from '../services/api';

interface GoalSimulatorModalProps {
  goal: DetectedGoal | null;
  isOpen: boolean;
  onClose: () => void;
  onPostSimulationToChat: (summaryText: string) => void;
  currentLang: LanguageCode;
}

export const GoalSimulatorModal: React.FC<GoalSimulatorModalProps> = ({
  goal,
  isOpen,
  onClose,
  onPostSimulationToChat,
}) => {
  const [targetAmount, setTargetAmount] = useState<number>(goal?.targetAmount || 500000);
  const [timeframeYears, setTimeframeYears] = useState<number>(goal?.timeframeYears || 5);
  const [returnRate, setReturnRate] = useState<number>(12); // Default 12% SIP return rate
  const inflationRate = 5.5;

  if (!isOpen || !goal) return null;

  // SIP Compound Returns Calculation Formula
  // M = P × ({[1 + i]^n - 1} / i) × (1 + i)
  const calculateSIP = (target: number, years: number, annualRate: number) => {
    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;
    // Monthly SIP required for target
    const factor =
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const monthlySIP = Math.round(target / factor);
    const totalInvested = monthlySIP * months;
    const estimatedWealthGain = Math.max(0, target - totalInvested);
    return { monthlySIP, totalInvested, estimatedWealthGain };
  };

  const { monthlySIP, totalInvested, estimatedWealthGain } = calculateSIP(
    targetAmount,
    timeframeYears,
    returnRate
  );

  // Future target adjusted for inflation
  const inflationAdjustedTarget = Math.round(
    targetAmount * Math.pow(1 + inflationRate / 100, timeframeYears)
  );

  const handleApplyToChat = async () => {
    // Persist goal to MongoDB via backend API
    await saveUserGoal({
      title: goal.title,
      targetAmount,
      monthlySavings: monthlySIP,
      tenureYears: timeframeYears,
      expectedReturnRate: returnRate,
      projectedMaturity: targetAmount,
    });

    const summary = `I simulated my goal "${goal.title}":
• Target Goal Amount: ₹${targetAmount.toLocaleString('en-IN')} (Inflation Adjusted: ₹${inflationAdjustedTarget.toLocaleString('en-IN')})
• Target Time Horizon: ${timeframeYears} Years
• Selected SIP Return Rate: ${returnRate}% p.a.
• Calculated Required Monthly Investment: ₹${monthlySIP.toLocaleString('en-IN')}/month
• Total Principal Invested: ₹${totalInvested.toLocaleString('en-IN')} | Estimated Wealth Gain: ₹${estimatedWealthGain.toLocaleString('en-IN')}

How do I start this SIP safely?`;

    onPostSimulationToChat(summary);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl glass-panel p-6 sm:p-8 bg-slate-900 border-slate-700 shadow-2xl rounded-3xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6 border-b border-slate-800 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shrink-0 shadow-lg shadow-emerald-500/20">
            <Sliders className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white">{goal.title}</h3>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Interactive Goal Simulator
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{goal.description}</p>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-5 bg-slate-800/50 p-5 rounded-2xl border border-slate-700/60">
            {/* Target Amount */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-slate-300">Target Goal Amount</span>
                <span className="text-emerald-400 font-mono text-sm">
                  ₹{targetAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="2500000"
                step="25000"
                value={targetAmount}
                onChange={(e) => setTargetAmount(Number(e.target.value))}
                className="h-2 w-full bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Timeframe */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-slate-300">Time Horizon</span>
                <span className="text-emerald-400 font-mono text-sm">{timeframeYears} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={timeframeYears}
                onChange={(e) => setTimeframeYears(Number(e.target.value))}
                className="h-2 w-full bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Expected Annual Return */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-slate-300">Expected Annual Return</span>
                <span className="text-emerald-400 font-mono text-sm">{returnRate}% p.a.</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1">
                {[
                  { label: 'Bank FD (6.5%)', rate: 6.5 },
                  { label: 'SIP (12%)', rate: 12 },
                  { label: 'Equity (15%)', rate: 15 },
                ].map((item) => (
                  <button
                    key={item.rate}
                    type="button"
                    onClick={() => setReturnRate(item.rate)}
                    className={`py-1.5 px-2 rounded-xl text-[10px] font-bold transition-all ${
                      returnRate === item.rate
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-900 border border-emerald-500/40 text-center space-y-1 shadow-lg">
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Required Monthly Investment
              </div>
              <div className="text-3xl font-extrabold text-white font-mono">
                ₹{monthlySIP.toLocaleString('en-IN')}<span className="text-xs text-slate-400">/mo</span>
              </div>
              <p className="text-[11px] text-slate-400">
                To reach ₹{targetAmount.toLocaleString('en-IN')} in {timeframeYears} years
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
                <div className="text-[10px] text-slate-400 font-medium">Total You Pay</div>
                <div className="text-xs font-bold text-slate-200 font-mono">
                  ₹{totalInvested.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
                <div className="text-[10px] text-emerald-400 font-medium">Estimated Wealth Gain</div>
                <div className="text-xs font-bold text-emerald-400 font-mono">
                  +₹{estimatedWealthGain.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Inflation Warning Callout */}
            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-[11px] text-amber-300 flex items-start gap-2">
              <Flame className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Due to ~{inflationRate}% annual inflation, you will actually need{' '}
                <span className="font-bold text-white font-mono">
                  ₹{inflationAdjustedTarget.toLocaleString('en-IN')}
                </span>{' '}
                in {timeframeYears} years to match today's buying power.
              </span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero obligation simulation</span>
          </div>

          <button
            onClick={handleApplyToChat}
            className="btn btn-primary py-3 px-6 text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Post Simulation to FinLingo AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};
