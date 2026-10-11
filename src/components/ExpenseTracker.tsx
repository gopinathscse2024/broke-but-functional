import React, { useState } from 'react';
import { ExpenseItem, Currency } from '../types';
import { playSound } from '../utils/audio';
import {
  Receipt,
  Plus,
  Trash2,
  TrendingDown,
  PieChart,
  Tag,
  AlertCircle
} from 'lucide-react';

interface ExpenseTrackerProps {
  currency: Currency;
}

const DEFAULT_EXPENSES: ExpenseItem[] = [
  { id: '1', title: 'Cutting Chai + Rusk at Corner Tapri', amount: 15, category: 'Chai & Sanity', date: 'Today, 10:15 AM' },
  { id: '2', title: 'Half Dozen Eggs + Bread', amount: 75, category: 'Food', date: 'Today, 01:30 PM' },
  { id: '3', title: 'Shared Auto Fare from Metro', amount: 20, category: 'Transit', date: 'Yesterday' },
  { id: '4', title: 'Forgotten Cold Coffee impulse buy', amount: 140, category: 'Regret', date: '2 days ago' },
];

export const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({ currency }) => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => {
    try {
      const saved = localStorage.getItem('bbf_user_expenses');
      return saved ? JSON.parse(saved) : DEFAULT_EXPENSES;
    } catch {
      return DEFAULT_EXPENSES;
    }
  });

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseItem['category']>('Food');

  const formatMoney = (val: number) => {
    const symbol = currency === 'INR' ? '₹' : currency === 'USD' ? '$' : '€';
    const rate = currency === 'INR' ? 1 : currency === 'USD' ? 84 : 91;
    const converted = Math.round(val / rate);
    return `${symbol}${converted.toLocaleString()}`;
  };

  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(amount);
    if (!title.trim() || isNaN(num) || num <= 0) return;

    playSound(category === 'Regret' ? 'danger' : 'coin');

    const newItem: ExpenseItem = {
      id: Date.now().toString(),
      title: title.trim(),
      amount: num,
      category,
      date: 'Just now',
    };

    const updated = [newItem, ...expenses];
    setExpenses(updated);
    try {
      localStorage.setItem('bbf_user_expenses', JSON.stringify(updated));
    } catch {}

    setTitle('');
    setAmount('');
  };

  const handleDelete = (id: string) => {
    playSound('click');
    const updated = expenses.filter((e) => e.id !== id);
    setExpenses(updated);
    try {
      localStorage.setItem('bbf_user_expenses', JSON.stringify(updated));
    } catch {}
  };

  // Group by category
  const categoryTotals = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white m-0">
                Broke Expense Logger
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Log every single micro-transaction so small leaks don't sink the survival boat.
              </p>
            </div>
          </div>

          <div className="bg-slate-950 px-4 py-2.5 rounded-2xl border border-slate-800 flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">Logged Total:</span>
            <span className="text-xl font-black font-mono text-rose-400">
              {formatMoney(totalSpent)}
            </span>
          </div>
        </div>

        {/* Category Breakdown Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-4 border-t border-slate-800">
          {(['Food', 'Transit', 'Chai & Sanity', 'Utility', 'Regret'] as const).map((cat) => {
            const sum = categoryTotals[cat] || 0;
            return (
              <div key={cat} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-bold truncate">{cat}</span>
                <span className={`text-sm font-black font-mono ${cat === 'Regret' ? 'text-rose-400' : 'text-slate-200'}`}>
                  {formatMoney(sum)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column: Add Expense Form & List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Form Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl h-fit">
          <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
            <Plus className="w-4 h-4 text-amber-400" /> Log Micro-Spend
          </h3>

          <form onSubmit={handleAddExpense} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">
                What did you buy?
              </label>
              <input
                type="text"
                placeholder="e.g. 2 Bananas + Tea"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">
                Amount (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 25"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">
                Honest Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ExpenseItem['category'])}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Food">🍞 Essential Food</option>
                <option value="Chai & Sanity">☕ Chai & Emotional Sanity</option>
                <option value="Transit">🚌 Transit / Metro / Bus</option>
                <option value="Utility">💡 Utility / Phone Data</option>
                <option value="Regret">🤦 Regrettable Impulse / Delivery</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20"
            >
              Record Spend
            </button>
          </form>
        </div>

        {/* Expenses Table / List */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">Recent Transactions ({expenses.length})</h3>
            <span className="text-xs text-slate-500 font-mono">Sorted by newest</span>
          </div>

          {expenses.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs italic bg-slate-950 rounded-2xl border border-slate-800">
              No expenses recorded yet. Your wallet remains sealed!
            </div>
          ) : (
            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
              {expenses.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-slate-950 hover:bg-slate-950/80 rounded-2xl border border-slate-800/80 flex items-center justify-between gap-3 group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xs">
                      {item.category === 'Food' ? '🍞' : item.category === 'Chai & Sanity' ? '☕' : item.category === 'Transit' ? '🚌' : item.category === 'Utility' ? '💡' : '🤦'}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200 m-0">{item.title}</h4>
                      <span className="text-[10px] text-slate-500 font-mono">{item.date} • {item.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono font-black text-sm text-rose-400">
                      -{formatMoney(item.amount)}
                    </span>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-900 transition-colors"
                      title="Delete record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
