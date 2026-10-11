import React, { useState } from 'react';
import { PlayerStats, DailyDilemma, RandomEvent, Hustle, GameHistoryEntry, Currency } from '../types';
import { DAILY_DILEMMAS, RANDOM_EVENTS, EMERGENCY_HUSTLES, INITIAL_STATS } from '../data/dilemmas';
import { playSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Wallet,
  Brain,
  Zap,
  Users,
  AlertTriangle,
  Award,
  ChevronRight,
  Sparkles,
  HelpCircle,
  TrendingDown,
  TrendingUp,
  Skull,
  Trophy,
  Share2,
  Download,
  RotateCcw
} from 'lucide-react';

interface SurvivalGameProps {
  stats: PlayerStats;
  setStats: React.Dispatch<React.SetStateAction<PlayerStats>>;
  currentDay: number;
  setCurrentDay: React.Dispatch<React.SetStateAction<number>>;
  currency: Currency;
  history: GameHistoryEntry[];
  setHistory: React.Dispatch<React.SetStateAction<GameHistoryEntry[]>>;
  badges: string[];
  setBadges: React.Dispatch<React.SetStateAction<string[]>>;
  onReset: () => void;
}

export const SurvivalGame: React.FC<SurvivalGameProps> = ({
  stats,
  setStats,
  currentDay,
  setCurrentDay,
  currency,
  history,
  setHistory,
  badges,
  setBadges,
  onReset,
}) => {
  const [selectedChoiceResult, setSelectedChoiceResult] = useState<{
    text: string;
    flavor: string;
    badge?: string;
  } | null>(null);

  const [activeRandomEvent, setActiveRandomEvent] = useState<RandomEvent | null>(null);
  const [showHustles, setShowHustles] = useState(false);
  const [hustlesList, setHustlesList] = useState<Hustle[]>(EMERGENCY_HUSTLES);
  const [gameOverReason, setGameOverReason] = useState<'bankrupt' | 'sanity' | 'energy' | null>(null);
  const [gameWon, setGameWon] = useState(false);

  // Currency helper
  const formatMoney = (amount: number) => {
    const symbol = currency === 'INR' ? '₹' : currency === 'USD' ? '$' : '€';
    const rate = currency === 'INR' ? 1 : currency === 'USD' ? 84 : 91;
    const converted = Math.round(amount / rate);
    return `${symbol}${converted.toLocaleString()}`;
  };

  const dilemma: DailyDilemma = DAILY_DILEMMAS.find((d) => d.day === currentDay) || DAILY_DILEMMAS[DAILY_DILEMMAS.length - 1];

  // Stat Health Category
  const getWalletHealthLabel = () => {
    if (stats.wallet > 2000) return { label: 'Comfortable', color: 'text-emerald-400', bg: 'bg-emerald-500' };
    if (stats.wallet > 1000) return { label: 'Careful Pacing', color: 'text-amber-400', bg: 'bg-amber-500' };
    if (stats.wallet > 300) return { label: 'Danger Zone', color: 'text-orange-400', bg: 'bg-orange-500' };
    return { label: 'CRITICAL ICU', color: 'text-rose-400 animate-pulse', bg: 'bg-rose-500' };
  };

  // Handle choice execution
  const handleSelectChoice = (choiceId: string) => {
    const choice = dilemma.choices.find((c) => c.id === choiceId);
    if (!choice) return;

    playSound(choice.effect.wallet >= 0 ? 'coin' : 'click');

    const nextWallet = stats.wallet + choice.effect.wallet;
    const nextSanity = Math.min(100, Math.max(0, stats.sanity + choice.effect.sanity));
    const nextEnergy = Math.min(100, Math.max(0, stats.energy + choice.effect.energy));
    const nextSocial = Math.min(100, Math.max(0, stats.social + choice.effect.social));

    // Update stats
    setStats({
      wallet: nextWallet,
      sanity: nextSanity,
      energy: nextEnergy,
      social: nextSocial,
    });

    // Check badges
    if (choice.badge && !badges.includes(choice.badge)) {
      setBadges((prev) => [...prev, choice.badge!]);
    }

    // Save history
    setHistory((prev) => [
      {
        day: currentDay,
        choiceMade: choice.text,
        resultSummary: choice.flavorText,
        walletAfter: nextWallet,
      },
      ...prev,
    ]);

    // Show outcome
    setSelectedChoiceResult({
      text: choice.text,
      flavor: choice.flavorText,
      badge: choice.badge,
    });

    // Check game over
    if (nextWallet < 0) {
      playSound('lose');
      setGameOverReason('bankrupt');
    } else if (nextSanity <= 0) {
      playSound('lose');
      setGameOverReason('sanity');
    } else if (nextEnergy <= 0) {
      playSound('lose');
      setGameOverReason('energy');
    }
  };

  // Advance to next day
  const handleNextDay = () => {
    if (currentDay >= 30) {
      // Victory!
      playSound('win');
      setGameWon(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
      return;
    }

    playSound('levelUp');
    setSelectedChoiceResult(null);

    const nextDay = currentDay + 1;
    setCurrentDay(nextDay);

    // Trigger random event on days 7, 14, 21, 28
    if ([7, 14, 21, 28].includes(nextDay)) {
      const randomEv = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
      setActiveRandomEvent(randomEv);
    }
  };

  // Resolve random event
  const handleAcknowledgeRandomEvent = () => {
    if (!activeRandomEvent) return;
    playSound('coin');

    setStats((prev) => ({
      wallet: Math.max(0, prev.wallet + activeRandomEvent.impact.wallet),
      sanity: Math.min(100, Math.max(0, prev.sanity + activeRandomEvent.impact.sanity)),
      energy: Math.min(100, Math.max(0, prev.energy + activeRandomEvent.impact.energy)),
      social: prev.social,
    }));

    setActiveRandomEvent(null);
  };

  // Perform emergency hustle
  const handlePerformHustle = (hustle: Hustle) => {
    if (stats.energy < hustle.energyCost || stats.sanity < hustle.sanityCost) {
      alert("You are too exhausted or mentally drained to complete this hustle right now!");
      return;
    }

    playSound('coin');
    setStats((prev) => ({
      wallet: prev.wallet + hustle.reward,
      energy: Math.max(0, prev.energy - hustle.energyCost),
      sanity: Math.max(0, prev.sanity - hustle.sanityCost),
      social: prev.social,
    }));

    setHustlesList((prev) =>
      prev.map((h) =>
        h.id === hustle.id ? { ...h, used: true, lastUsedDay: currentDay } : h
      )
    );

    alert(`Emergency cash secured! +${formatMoney(hustle.reward)} added to your wallet.`);
  };

  const walletHealth = getWalletHealthLabel();

  return (
    <div className="space-y-6">
      {/* Top Banner: Day Progress Tracker */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                Phase {Math.ceil(currentDay / 10)} of 3
              </span>
              <h2 className="text-xl font-black text-white m-0">
                Day {currentDay} <span className="text-slate-400 font-normal text-sm">/ 30 Days</span>
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {currentDay < 10
                ? "First 10 days: Building habits & resisting early month temptations."
                : currentDay < 20
                ? "Mid-month slump: Managing endurance & unexpected micro-expenses."
                : "The Final Stretch: Down to the wire. Every rupee matters."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHustles(!showHustles)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                stats.wallet < 500
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Emergency Hustles ({hustlesList.filter((h) => !h.used).length})
            </button>
          </div>
        </div>

        {/* 30-Day Step Progress Bar */}
        <div className="space-y-1.5">
          <div
            className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800"
            role="progressbar"
            aria-valuenow={currentDay}
            aria-valuemin={1}
            aria-valuemax={30}
            aria-label="30-day month survival progress"
          >
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentDay / 30) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-500">
            <span>Day 1 (Payday)</span>
            <span>Day 15 (Midpoint)</span>
            <span>Day 30 (Freedom)</span>
          </div>
        </div>
      </div>

      {/* 4 Core Vital Stat Gauges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Stat 1: Wallet */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 relative group hover:border-slate-700 transition-all shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5 font-medium">
            <span className="flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-emerald-400" /> Wallet Cash
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${walletHealth.color}`}>
              {walletHealth.label}
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
            {formatMoney(stats.wallet)}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Safe Burn: <span className="font-mono text-slate-200 font-semibold">{formatMoney(Math.max(0, Math.round(stats.wallet / Math.max(1, 31 - currentDay))))}/day</span>
          </p>
        </div>

        {/* Stat 2: Sanity */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 relative group hover:border-slate-700 transition-all shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5 font-medium">
            <span className="flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-purple-400" /> Sanity / Morale
            </span>
            <span className="font-mono font-bold text-slate-300">{stats.sanity}%</span>
          </div>
          <div
            className="h-2 w-full bg-slate-950 rounded-full overflow-hidden my-2 border border-slate-800"
            role="progressbar"
            aria-valuenow={stats.sanity}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Sanity percentage"
          >
            <div
              className={`h-full transition-all duration-500 ${
                stats.sanity > 50 ? 'bg-purple-500' : stats.sanity > 25 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${stats.sanity}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">
            {stats.sanity > 60 ? 'Mental clarity high' : stats.sanity > 30 ? 'Caffeine-dependent' : 'Near breakdown!'}
          </p>
        </div>

        {/* Stat 3: Energy */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 relative group hover:border-slate-700 transition-all shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5 font-medium">
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" /> Physical Energy
            </span>
            <span className="font-mono font-bold text-slate-300">{stats.energy}%</span>
          </div>
          <div
            className="h-2 w-full bg-slate-950 rounded-full overflow-hidden my-2 border border-slate-800"
            role="progressbar"
            aria-valuenow={stats.energy}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Physical energy percentage"
          >
            <div
              className={`h-full transition-all duration-500 ${
                stats.energy > 50 ? 'bg-amber-500' : stats.energy > 25 ? 'bg-orange-500' : 'bg-rose-500'
              }`}
              style={{ width: `${stats.energy}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">
            {stats.energy > 60 ? 'Well fueled' : stats.energy > 30 ? 'Running on carbs' : 'Exhausted & starving'}
          </p>
        </div>

        {/* Stat 4: Social */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 relative group hover:border-slate-700 transition-all shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5 font-medium">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-sky-400" /> Social Ties
            </span>
            <span className="font-mono font-bold text-slate-300">{stats.social}%</span>
          </div>
          <div
            className="h-2 w-full bg-slate-950 rounded-full overflow-hidden my-2 border border-slate-800"
            role="progressbar"
            aria-valuenow={stats.social}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Social connections percentage"
          >
            <div
              className={`h-full transition-all duration-500 ${
                stats.social > 50 ? 'bg-sky-500' : stats.social > 25 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${stats.social}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">
            {stats.social > 60 ? 'Social circle intact' : stats.social > 30 ? 'Ghosting friends' : 'Hermit status'}
          </p>
        </div>
      </div>

      {/* Emergency Hustles Drawer */}
      {showHustles && (
        <div className="bg-amber-950/30 border border-amber-600/30 rounded-2xl p-5 shadow-2xl backdrop-blur-sm animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-amber-300 m-0">Desperation Side-Hustles</h3>
            </div>
            <button
              onClick={() => setShowHustles(false)}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-900 border border-slate-800"
            >
              Close
            </button>
          </div>
          <p className="text-xs text-amber-200/80 mb-4">
            Exchange your spare physical stamina or sanity for instant emergency liquidity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {hustlesList.map((hustle) => (
              <div
                key={hustle.id}
                className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                  hustle.used
                    ? 'bg-slate-950/60 border-slate-800/80 opacity-50'
                    : 'bg-slate-900/90 border-slate-700 hover:border-amber-500/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-white m-0">{hustle.title}</h4>
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      +{formatMoney(hustle.reward)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{hustle.description}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                  <div className="flex gap-2 text-[10px] text-slate-400 font-mono">
                    <span className="text-rose-400">-{hustle.energyCost}⚡ Energy</span>
                    <span className="text-purple-400">-{hustle.sanityCost}🧠 Sanity</span>
                  </div>
                  <button
                    disabled={hustle.used}
                    onClick={() => handlePerformHustle(hustle)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      hustle.used
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
                    }`}
                  >
                    {hustle.used ? 'Claimed' : 'Execute Hustle'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Random Event Modal */}
      {activeRandomEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-6 h-6 text-amber-400 animate-spin" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Random Life Event!
              </span>
            </div>
            <h3 className="text-xl font-black text-white mb-2">{activeRandomEvent.title}</h3>
            <p className="text-sm text-slate-300 mb-4">{activeRandomEvent.description}</p>

            <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 mb-5 flex justify-around text-center">
              <div>
                <span className="text-[11px] text-slate-400 block">Wallet Impact</span>
                <span className={`text-base font-black font-mono ${
                  activeRandomEvent.impact.wallet >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {activeRandomEvent.impact.wallet >= 0 ? '+' : ''}{formatMoney(activeRandomEvent.impact.wallet)}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Sanity Impact</span>
                <span className={`text-base font-black font-mono ${
                  activeRandomEvent.impact.sanity >= 0 ? 'text-purple-400' : 'text-rose-400'
                }`}>
                  {activeRandomEvent.impact.sanity >= 0 ? '+' : ''}{activeRandomEvent.impact.sanity}%
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Energy Impact</span>
                <span className={`text-base font-black font-mono ${
                  activeRandomEvent.impact.energy >= 0 ? 'text-amber-400' : 'text-rose-400'
                }`}>
                  {activeRandomEvent.impact.energy >= 0 ? '+' : ''}{activeRandomEvent.impact.energy}%
                </span>
              </div>
            </div>

            <button
              onClick={handleAcknowledgeRandomEvent}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20"
            >
              Accept Fate & Continue
            </button>
          </div>
        </div>
      )}

      {/* Main Dilemma Decision Card */}
      {!selectedChoiceResult ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {dilemma.category} Dilemma
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Decision #{currentDay}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tight">
            {dilemma.title}
          </h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
            {dilemma.narrative}
          </p>

          {/* Choices list */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Choose Your Move:
            </span>
            {dilemma.choices.map((choice, idx) => (
              <button
                key={choice.id}
                onClick={() => handleSelectChoice(choice.id)}
                className="w-full text-left p-4 rounded-2xl bg-slate-950/80 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/60 transition-all duration-200 group flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-xs text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm sm:text-base text-slate-100 group-hover:text-white">
                      {choice.text}
                    </div>
                    {choice.badge && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 mt-1 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        <Award className="w-3 h-3" /> Unlocks "{choice.badge}"
                      </span>
                    )}
                  </div>
                </div>

                {/* Effect preview pills */}
                <div className="flex items-center gap-2 text-xs font-mono shrink-0 pl-10 sm:pl-0">
                  <span className={`px-2 py-0.5 rounded ${
                    choice.effect.wallet < 0
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : choice.effect.wallet > 0
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {choice.effect.wallet > 0 ? '+' : ''}{formatMoney(choice.effect.wallet)}
                  </span>
                  {choice.effect.sanity !== 0 && (
                    <span className={`px-2 py-0.5 rounded ${
                      choice.effect.sanity > 0 ? 'bg-purple-500/10 text-purple-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {choice.effect.sanity > 0 ? '+' : ''}{choice.effect.sanity}🧠
                    </span>
                  )}
                  {choice.effect.energy !== 0 && (
                    <span className={`px-2 py-0.5 rounded ${
                      choice.effect.energy > 0 ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {choice.effect.energy > 0 ? '+' : ''}{choice.effect.energy}⚡
                    </span>
                  )}
                  {choice.effect.social !== 0 && (
                    <span className={`px-2 py-0.5 rounded ${
                      choice.effect.social > 0 ? 'bg-sky-500/10 text-sky-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {choice.effect.social > 0 ? '+' : ''}{choice.effect.social}👥
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Result Outcome Screen */
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-center animate-in zoom-in-95 duration-200">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-4">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mb-2">Decision Outcome</h3>
          <p className="text-xs font-mono text-slate-400 mb-3">You chose: "{selectedChoiceResult.text}"</p>

          <div className="bg-slate-950 rounded-2xl p-4 sm:p-5 border border-slate-800 max-w-xl mx-auto my-4 text-slate-200 text-sm sm:text-base leading-relaxed italic">
            "{selectedChoiceResult.flavor}"
          </div>

          {selectedChoiceResult.badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-5">
              <Award className="w-4 h-4" /> Badge Unlocked: {selectedChoiceResult.badge}
            </div>
          )}

          <div className="mt-4">
            <button
              onClick={handleNextDay}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-black text-sm tracking-wide transition-all shadow-lg shadow-amber-500/20"
            >
              Advance to Day {currentDay + 1 <= 30 ? currentDay + 1 : 'Victory'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Badges & History Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Unlocked Badges */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" /> Survival Badges ({badges.length})
            </h4>
          </div>
          {badges.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No badges unlocked yet. Make bold choices!</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold flex items-center gap-1"
                >
                  🏆 {b}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* History Log */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-md max-h-48 overflow-y-auto">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Recent Choices Log
          </h4>
          {history.length === 0 ? (
            <p className="text-xs text-slate-500 italic">History will populate as you survive each day.</p>
          ) : (
            <div className="space-y-2 text-xs">
              {history.slice(0, 5).map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-slate-300 border-b border-slate-800/60 pb-1">
                  <span><span className="font-mono text-amber-400 font-bold">Day {item.day}:</span> {item.choiceMade}</span>
                  <span className="font-mono text-slate-400 shrink-0 ml-2">{formatMoney(item.walletAfter)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Game Over Modal */}
      {gameOverReason && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-600/40 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto mb-4">
              <Skull className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">
              {gameOverReason === 'bankrupt'
                ? "TOTAL BANKRUPTCY!"
                : gameOverReason === 'sanity'
                ? "SEVERE MENTAL BURNOUT!"
                : "BIOLOGICAL EXHAUSTION!"}
            </h3>
            <p className="text-sm text-slate-300 mb-5 leading-relaxed">
              {gameOverReason === 'bankrupt'
                ? `You ran out of money on Day ${currentDay}. Your account went negative and UPI stopped functioning.`
                : gameOverReason === 'sanity'
                ? `Your sanity dropped to zero on Day ${currentDay}. You threw your phone across the room and gave up.`
                : `Your energy hit zero on Day ${currentDay}. You collapsed from skipped meals and sleep deprivation.`}
            </p>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => {
                  // Rewind chance
                  setGameOverReason(null);
                  setStats((prev) => ({
                    wallet: Math.max(250, prev.wallet + 300),
                    sanity: Math.max(30, prev.sanity + 25),
                    energy: Math.max(30, prev.energy + 25),
                    social: prev.social,
                  }));
                  setSelectedChoiceResult(null);
                }}
                className="py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition-all"
              >
                ✨ Second Chance: Emergency ₹300 Loan
              </button>
              <button
                onClick={() => {
                  setGameOverReason(null);
                  onReset();
                }}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-all"
              >
                Start Over from Day 1
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Victory Modal */}
      {gameWon && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl relative">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-4">
              <Trophy className="w-9 h-9" />
            </div>
            <h3 className="text-3xl font-black text-white mb-1">YOU SURVIVED!</h3>
            <p className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-4">
              Certified "Broke But Functional" Master
            </p>

            <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 text-left space-y-2 mb-6">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Final Remaining Balance:</span>
                <span className="font-mono font-bold text-emerald-400">{formatMoney(stats.wallet)}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Final Sanity Retained:</span>
                <span className="font-mono font-bold text-purple-400">{stats.sanity}%</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Final Energy Level:</span>
                <span className="font-mono font-bold text-amber-400">{stats.energy}%</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Badges Collected:</span>
                <span className="font-mono font-bold text-sky-400">{badges.length} Badges</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 mb-6 italic">
              "Through Maggi diets, delayed laundry, tapri chais, and mental fortitude, you conquered all 30 days."
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  alert("Certificate screenshot copied / printed!");
                  window.print();
                }}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <Download className="w-4 h-4" /> Download Certificate
              </button>
              <button
                onClick={() => {
                  setGameWon(false);
                  onReset();
                }}
                className="py-3 px-5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
