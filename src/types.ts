export type Currency = 'INR' | 'USD' | 'EUR';

export interface PlayerStats {
  wallet: number;
  sanity: number;
  energy: number;
  social: number;
}

export interface Choice {
  id: string;
  text: string;
  effect: {
    wallet: number;
    sanity: number;
    energy: number;
    social: number;
  };
  flavorText: string;
  badge?: string;
}

export interface DailyDilemma {
  day: number;
  title: string;
  category: 'Food' | 'Social' | 'Utility' | 'Health' | 'Emergency' | 'Hustle';
  narrative: string;
  choices: Choice[];
}

export interface Hustle {
  id: string;
  title: string;
  description: string;
  reward: number;
  energyCost: number;
  sanityCost: number;
  cooldownDays: number;
  lastUsedDay: number;
  oneTime?: boolean;
  used?: boolean;
}

export interface RandomEvent {
  id: string;
  title: string;
  description: string;
  impact: {
    wallet: number;
    sanity: number;
    energy: number;
  };
  type: 'positive' | 'negative' | 'neutral';
}

export interface PantryRecipe {
  id: string;
  name: string;
  costInr: number;
  costUsd: number;
  prepTime: string;
  difficulty: 'Zero Effort' | 'Easy' | 'Moderate';
  nutrition: string;
  ingredients: string[];
  instructions: string;
  proTip: string;
}

export interface SurvivalHack {
  id: string;
  category: 'Food' | 'Utilities' | 'Social' | 'Tech';
  title: string;
  estimatedSaving: string;
  description: string;
  steps: string[];
}

export interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  category: 'Food' | 'Transit' | 'Chai & Sanity' | 'Utility' | 'Regret';
  date: string;
}

export interface GameHistoryEntry {
  day: number;
  choiceMade: string;
  resultSummary: string;
  walletAfter: number;
}
