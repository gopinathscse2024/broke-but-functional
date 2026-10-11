import React from 'react';
import { Currency } from '../types';
import { Volume2, VolumeX, RotateCcw, Flame, ShieldAlert, Sparkles, Calculator, UtensilsCrossed, Receipt } from 'lucide-react';
import { playSound } from '../utils/audio';

interface HeaderProps {
  activeTab: 'game' | 'calculator' | 'pantry' | 'tracker';
  setActiveTab: (tab: 'game' | 'calculator' | 'pantry' | 'tracker') => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  onResetGame: () => void;
  currentDay: number;
  wallet: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currency,
  setCurrency,
  soundEnabled,
  setSoundEnabled,
  onResetGame,
  currentDay,
  wallet,
}) => {
  const getCurrencySymbol = (curr: Currency) => {
    switch (curr) {
      case 'INR': return '₹';
      case 'USD': return '$';
      case 'EUR': return '€';
    }
  };

  const formattedWallet = () => {
    const sym = getCurrencySymbol(currency);
    const converted = currency === 'INR' ? wallet : currency === 'USD' ? Math.round(wallet / 84) : Math.round(wallet / 91);
    return `${sym}${converted.toLocaleString()}`;
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800 px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand & Tagline */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-white font-black text-xl tracking-tighter">
              ₹0
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black tracking-tight text-white m-0 p-0 flex items-center gap-1.5">
                  Broke But Functional
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Survive The Month
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                The 30-Day Financial Survival Gauntlet & Crisis Budgeter
              </p>
            </div>
          </div>

          {/* Quick mobile stats pill */}
          <div className="flex md:hidden items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 font-mono text-amber-300 font-bold">
              Day {currentDay}/30
            </span>
            <span className={`px-2.5 py-1 rounded-lg border font-mono font-bold ${
              wallet > 500 ? 'bg-emerald-950/60 border-emerald-800 text-emerald-400' : 'bg-rose-950/60 border-rose-800 text-rose-400 animate-pulse'
            }`}>
              {formattedWallet()}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none" aria-label="Main Navigation">
          <button
            onClick={() => {
              playSound('click');
              setActiveTab('game');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'game'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            30-Day Gauntlet
          </button>

          <button
            onClick={() => {
              playSound('click');
              setActiveTab('calculator');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'calculator'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            Burn-Rate Tool
          </button>

          <button
            onClick={() => {
              playSound('click');
              setActiveTab('pantry');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'pantry'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            Desperation Pantry
          </button>

          <button
            onClick={() => {
              playSound('click');
              setActiveTab('tracker');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'tracker'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            Expense Logger
          </button>
        </nav>

        {/* Controls: Currency, Audio, Reset */}
        <div className="flex items-center justify-end gap-2 text-xs">
          {/* Currency Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            {(['INR', 'USD', 'EUR'] as Currency[]).map((curr) => (
              <button
                key={curr}
                onClick={() => {
                  playSound('click');
                  setCurrency(curr);
                }}
                className={`px-2 py-1 rounded text-[11px] font-bold transition-colors ${
                  currency === curr
                    ? 'bg-slate-800 text-amber-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {curr === 'INR' ? '₹' : curr === 'USD' ? '$' : '€'}
              </button>
            ))}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) playSound('coin');
            }}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
            aria-label="Toggle Sound Effects"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
          </button>

          {/* Reset Game */}
          <button
            onClick={() => {
              if (window.confirm("Restart the 30-Day Survival Challenge back to Day 1?")) {
                onResetGame();
              }
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-900 transition-colors"
            title="Reset Game"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};
