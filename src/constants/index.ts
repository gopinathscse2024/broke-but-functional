export const APP_CONFIG = {
  NAME: 'Broke But Functional — Survive the Month',
  VERSION: '1.2.0',
  TOTAL_DAYS: 30,
  STARTING_WALLET: 3200,
  STARTING_SANITY: 80,
  STARTING_ENERGY: 85,
  STARTING_SOCIAL: 70,
  CRITICAL_WALLET_THRESHOLD: 300,
  DANGER_WALLET_THRESHOLD: 1000,
} as const;

export const CURRENCY_RATES = {
  INR: 1,
  USD: 84,
  EUR: 91,
} as const;

export const CATEGORIES = {
  FOOD: 'Food',
  SOCIAL: 'Social',
  UTILITY: 'Utility',
  HEALTH: 'Health',
  EMERGENCY: 'Emergency',
  HUSTLE: 'Hustle',
} as const;
