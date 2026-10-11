import React, { useState } from 'react';
import { Bot, Sparkles, AlertTriangle, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';
import { getSurvivalCoachAdvice, AIAdviceResponse } from '../services/aiAdvisorService';
import { PlayerStats, Currency } from '../types';
import { playSound } from '../utils/audio';

interface AiSurvivalCoachProps {
  stats: PlayerStats;
  currentDay: number;
  currency: Currency;
}

export const AiSurvivalCoach: React.FC<AiSurvivalCoachProps> = ({ stats, currentDay, currency }) => {
  const [advice, setAdvice] = useState<AIAdviceResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [userQuery, setUserQuery] = useState('');

  const daysLeft = Math.max(1, 31 - currentDay);

  const handleGenerateAdvice = async () => {
    playSound('click');
    setLoading(true);
    const result = await getSurvivalCoachAdvice({
      wallet: stats.wallet,
      daysRemaining: daysLeft,
      sanity: stats.sanity,
      energy: stats.energy,
      userQuery: userQuery.trim() || undefined,
    });
    setAdvice(result);
    setLoading(false);
    playSound(result.verdict === 'RED' ? 'danger' : 'coin');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white m-0 flex items-center gap-2">
              AI Broke Survival Coach
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Gemini Heuristic Engine
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Real-time algorithmic risk assessment and crisis contingency planning.
            </p>
          </div>
        </div>

        <button
          disabled={loading}
          onClick={handleGenerateAdvice}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto disabled:opacity-50"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {loading ? 'Analyzing Finances...' : 'Generate AI Survival Audit'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
        <div>
          <span className="text-slate-500 block">Current Balance</span>
          <span className="text-white font-bold font-sans">₹{stats.wallet.toLocaleString()}</span>
        </div>
        <div>
          <span className="text-slate-500 block">Days Remaining</span>
          <span className="text-amber-400 font-bold">{daysLeft} Days</span>
        </div>
        <div>
          <span className="text-slate-500 block">Burn Rate</span>
          <span className="text-emerald-400 font-bold">₹{Math.round(stats.wallet / daysLeft)}/day</span>
        </div>
      </div>

      {advice && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className={`p-4 rounded-2xl border ${
            advice.verdict === 'GREEN'
              ? 'bg-emerald-950/30 border-emerald-500/40'
              : advice.verdict === 'YELLOW'
              ? 'bg-amber-950/30 border-amber-500/40'
              : 'bg-rose-950/30 border-rose-500/40'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm mb-1 text-white">
              {advice.verdict === 'GREEN' ? <ShieldCheck className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-rose-400" />}
              AI Executive Diagnosis
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{advice.assessment}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-300 block mb-2">🎯 Algorithmic Action Items:</span>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
                {advice.actionablePlan.map((plan, idx) => (
                  <li key={idx}>{plan}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-300 block mb-1">🍲 Optimal Sustenance Allocation:</span>
                <p className="text-xs font-semibold text-amber-300 mb-2">{advice.suggestedMeal}</p>
              </div>
              <div className="text-[11px] text-slate-400 italic border-t border-slate-800/80 pt-2">
                "{advice.encouragement}"
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
