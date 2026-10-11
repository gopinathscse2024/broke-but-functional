import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SurvivalGame } from './components/SurvivalGame';
import { BurnRateCalculator } from './components/BurnRateCalculator';
import { DesperationPantry } from './components/DesperationPantry';
import { ExpenseTracker } from './components/ExpenseTracker';
import { AiSurvivalCoach } from './components/AiSurvivalCoach';
import { Currency, PlayerStats, GameHistoryEntry } from './types';
import { INITIAL_STATS } from './data/dilemmas';
import { setSoundEnabled, playSound } from './utils/audio';

export function App() {
  const [activeTab, setActiveTab] = useState<'game' | 'calculator' | 'pantry' | 'tracker' | 'ai'>('game');
  const [currency, setCurrency] = useState<Currency>('INR');
  const [soundOn, setSoundOn] = useState<boolean>(true);

  // Load / persist game state
  const [stats, setStats] = useState<PlayerStats>(() => {
    try {
      const saved = localStorage.getItem('bbf_stats');
      return saved ? JSON.parse(saved) : INITIAL_STATS;
    } catch {
      return INITIAL_STATS;
    }
  });

  const [currentDay, setCurrentDay] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('bbf_day');
      return saved ? Number(saved) : 1;
    } catch {
      return 1;
    }
  });

  const [history, setHistory] = useState<GameHistoryEntry[]>(() => {
    try {
      const saved = localStorage.getItem('bbf_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [badges, setBadges] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bbf_badges');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('bbf_stats', JSON.stringify(stats));
      localStorage.setItem('bbf_day', currentDay.toString());
      localStorage.setItem('bbf_history', JSON.stringify(history));
      localStorage.setItem('bbf_badges', JSON.stringify(badges));
    } catch {}
  }, [stats, currentDay, history, badges]);

  const handleResetGame = () => {
    playSound('coin');
    setStats(INITIAL_STATS);
    setCurrentDay(1);
    setHistory([]);
    setBadges([]);
    try {
      localStorage.removeItem('bbf_stats');
      localStorage.removeItem('bbf_day');
      localStorage.removeItem('bbf_history');
      localStorage.removeItem('bbf_badges');
    } catch {}
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Fixed Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currency={currency}
        setCurrency={setCurrency}
        soundEnabled={soundOn}
        setSoundEnabled={(enabled) => {
          setSoundOn(enabled);
          setSoundEnabled(enabled);
        }}
        onResetGame={handleResetGame}
        currentDay={currentDay}
        wallet={stats.wallet}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'game' && (
          <SurvivalGame
            stats={stats}
            setStats={setStats}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            currency={currency}
            history={history}
            setHistory={setHistory}
            badges={badges}
            setBadges={setBadges}
            onReset={handleResetGame}
          />
        )}

        {activeTab === 'calculator' && (
          <BurnRateCalculator currency={currency} />
        )}

        {activeTab === 'pantry' && (
          <DesperationPantry currency={currency} />
        )}

        {activeTab === 'tracker' && (
          <ExpenseTracker currency={currency} />
        )}

        {activeTab === 'ai' && (
          <AiSurvivalCoach
            stats={stats}
            currentDay={currentDay}
            currency={currency}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">Broke But Functional</span>
            <span>•</span>
            <span>Survive the Month Edition</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono">
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">React 19</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">TypeScript</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">Tailwind CSS v4</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">Web Audio API</span>
          </div>

          <div className="text-slate-400">
            Frontend Arena — Prompt Run 2026
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
