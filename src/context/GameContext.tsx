import React, { createContext, useContext, ReactNode } from 'react';
import { PlayerStats, Currency, GameHistoryEntry } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_STATS } from '../data/dilemmas';

interface GameContextType {
  stats: PlayerStats;
  setStats: React.Dispatch<React.SetStateAction<PlayerStats>>;
  currentDay: number;
  setCurrentDay: React.Dispatch<React.SetStateAction<number>>;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  history: GameHistoryEntry[];
  setHistory: React.Dispatch<React.SetStateAction<GameHistoryEntry[]>>;
  badges: string[];
  setBadges: React.Dispatch<React.SetStateAction<string[]>>;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stats, setStats] = useLocalStorage<PlayerStats>('bbf_stats', INITIAL_STATS);
  const [currentDay, setCurrentDay] = useLocalStorage<number>('bbf_day', 1);
  const [currency, setCurrency] = useLocalStorage<Currency>('bbf_currency', 'INR');
  const [history, setHistory] = useLocalStorage<GameHistoryEntry[]>('bbf_history', []);
  const [badges, setBadges] = useLocalStorage<string[]>('bbf_badges', []);

  const resetGame = () => {
    setStats(INITIAL_STATS);
    setCurrentDay(1);
    setHistory([]);
    setBadges([]);
  };

  return (
    <GameContext.Provider
      value={{
        stats,
        setStats,
        currentDay,
        setCurrentDay,
        currency,
        setCurrency,
        history,
        setHistory,
        badges,
        setBadges,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
