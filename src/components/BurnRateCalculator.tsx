import React, { useState } from 'react';
import { Currency } from '../types';
import { playSound } from '../utils/audio';
import {
  Calculator,
  ShieldCheck,
  AlertOctagon,
  Sparkles,
  Calendar,
  PiggyBank,
  CheckCircle2,
  TrendingUp,
  Info
} from 'lucide-react';

interface BurnRateCalculatorProps {
  currency: Currency;
}

export const BurnRateCalculator: React.FC<BurnRateCalculatorProps> = ({ currency }) => {
  const [balance, setBalance] = useState<number>(2400);
  const [daysRemaining, setDaysRemaining] = useState<number>(18);
  const [fixedExpenses, setFixedExpenses] = useState<number>(400);
  const [zeroSpendDaysPlanned, setZeroSpendDaysPlanned] = useState<number>(2);

  const formatMoney = (val: number) => {
    const symbol = currency === 'INR' ? '₹' : currency === 'USD' ? '$' : '€';
    const rate = currency === 'INR' ? 1 : currency === 'USD' ? 84 : 91;
    const converted = Math.round(val / rate);
    return `${symbol}${converted.toLocaleString()}`;
  };

  const netAvailable = Math.max(0, balance - fixedExpenses);
  const effectiveSpendingDays = Math.max(1, daysRemaining - zeroSpendDaysPlanned);
  const dailySafeBurnRate = Math.floor(netAvailable / effectiveSpendingDays);
  const rawDailyBurnRate = Math.floor(netAvailable / Math.max(1, daysRemaining));

  // Determine survival status tier
  const getTier = () => {
    if (dailySafeBurnRate >= 450) {
      return {
        name: "Lavish Broke",
        desc: "You can afford decent canteen thalis, filter coffees, and an occasional treat.",
        color: "text-emerald-400",
        badgeBg: "bg-emerald-500/10 border-emerald-500/30",
        barColor: "bg-emerald-500",
      };
    } else if (dailySafeBurnRate >= 200) {
      return {
        name: "Sustainable Frugal",
        desc: "Comfortable with home-cooked meals, grocery buying, and zero frivolous spending.",
        color: "text-amber-400",
        badgeBg: "bg-amber-500/10 border-amber-500/30",
        barColor: "bg-amber-500",
      };
    } else if (dailySafeBurnRate >= 80) {
      return {
        name: "Maggi & Khichdi Diet",
        desc: "Austerity required. Rely on bulk eggs, rice, potatoes, and lentils. Avoid all food delivery.",
        color: "text-orange-400",
        badgeBg: "bg-orange-500/10 border-orange-500/30",
        barColor: "bg-orange-500",
      };
    } else {
      return {
        name: "DEFCON 1: Extreme Crisis Protocol",
        desc: "Emergency mode. You must unlock side-hustles or rely on friend/family rations.",
        color: "text-rose-400",
        badgeBg: "bg-rose-500/10 border-rose-500/30",
        barColor: "bg-rose-500",
      };
    }
  };

  const tier = getTier();

  // Daily Meal Split Allocation
  const breakfastBudget = Math.floor(dailySafeBurnRate * 0.2);
  const lunchBudget = Math.floor(dailySafeBurnRate * 0.4);
  const dinnerBudget = Math.floor(dailySafeBurnRate * 0.3);
  const dailyEmergencyBuffer = Math.max(0, dailySafeBurnRate - (breakfastBudget + lunchBudget + dinnerBudget));

  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white m-0">
              The Broke Burn-Rate Calculator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Calculate your exact daily safe spend limit and structure your survival plan until payday.
            </p>
          </div>
        </div>

        {/* Input Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* Current Bank Balance */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <label className="text-xs font-bold text-slate-400 block mb-1">
              Current Bank Balance (₹)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-mono text-lg">₹</span>
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold text-lg focus:outline-none focus:border-amber-500"
              />
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">What is in your bank + cash right now</span>
          </div>

          {/* Days until Payday */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <label className="text-xs font-bold text-slate-400 block mb-1">
              Days Remaining Until Funds Arrive
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="text-slate-500 w-5 h-5 shrink-0" />
              <input
                type="number"
                value={daysRemaining}
                min={1}
                max={60}
                onChange={(e) => setDaysRemaining(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold text-lg focus:outline-none focus:border-amber-500"
              />
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Days to next salary / allowance</span>
          </div>

          {/* Unavoidable Fixed Bills */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <label className="text-xs font-bold text-slate-400 block mb-1">
              Unavoidable Non-Negotiable Bills (₹)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-mono text-lg">₹</span>
              <input
                type="number"
                value={fixedExpenses}
                onChange={(e) => setFixedExpenses(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold text-lg focus:outline-none focus:border-amber-500"
              />
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Metro pass, medicines, phone recharge</span>
          </div>
        </div>

        {/* Zero Spend Days Slider */}
        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 mt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div>
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Planned "Zero-Spend Days" (No-Buy Days)
              </span>
              <span className="text-[11px] text-slate-400 block">
                Days where you spend ₹0 by eating existing pantry rice/oats and staying in.
              </span>
            </div>
            <span className="font-mono font-black text-amber-400 text-base bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
              {zeroSpendDaysPlanned} Days
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={Math.min(15, daysRemaining - 1)}
            value={zeroSpendDaysPlanned}
            onChange={(e) => {
              playSound('click');
              setZeroSpendDaysPlanned(Number(e.target.value));
            }}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>0 Days (Constant Spend)</span>
            <span>Boosts other days by +{formatMoney(Math.max(0, dailySafeBurnRate - rawDailyBurnRate))}/day!</span>
          </div>
        </div>
      </div>

      {/* Burn-Rate Results Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main Burn Rate Pill */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Your Daily Safe Burn Rate
            </span>
            <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight mb-2">
              {formatMoney(dailySafeBurnRate)}
              <span className="text-base text-slate-400 font-normal"> / day</span>
            </div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold mb-4 ${tier.badgeBg} ${tier.color}`}>
              {tier.name}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {tier.desc}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-1.5 font-mono">
            <div className="flex justify-between">
              <span>Net Spendable Liquid:</span>
              <span className="text-slate-200 font-bold">{formatMoney(netAvailable)}</span>
            </div>
            <div className="flex justify-between">
              <span>Without Zero-Spend Days:</span>
              <span className="text-slate-400">{formatMoney(rawDailyBurnRate)}/day</span>
            </div>
          </div>
        </div>

        {/* Suggested Meal Allocation Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl lg:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-amber-400" />
              Suggested Daily Micro-Budget Allocation
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              How to spread your {formatMoney(dailySafeBurnRate)} daily allowance across meals to prevent 9 PM starvation.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-medium">🌅 Breakfast / Tea</span>
                <span className="text-lg font-black font-mono text-amber-300">{formatMoney(breakfastBudget)}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Chai + Parle-G / Toast</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-medium">☀️ Lunch (Main Meal)</span>
                <span className="text-lg font-black font-mono text-emerald-400">{formatMoney(lunchBudget)}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Rice + Dal / Thali</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-medium">🌙 Dinner</span>
                <span className="text-lg font-black font-mono text-indigo-400">{formatMoney(dinnerBudget)}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Khichdi / Egg Bhurji</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-medium">🛡️ Daily Buffer</span>
                <span className="text-lg font-black font-mono text-purple-400">{formatMoney(dailyEmergencyBuffer)}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Rolled over if unspent</span>
              </div>
            </div>
          </div>

          {/* Actionable Rules */}
          <div className="mt-5 p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800/80">
            <span className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 3 Golden Survival Commandments:
            </span>
            <ul className="text-xs text-slate-400 space-y-1 pl-4 list-disc">
              <li>Delete food delivery apps (Zomato/Swiggy) until day {daysRemaining} passes.</li>
              <li>Always carry a filled 1-liter reusable water bottle to avoid ₹20 packaged water traps.</li>
              <li>Any unspent money today automatically rolls over to increase tomorrow's budget.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
