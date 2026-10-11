import React, { useState } from 'react';
import { PANTRY_RECIPES } from '../data/recipes';
import { SURVIVAL_HACKS } from '../data/hacks';
import { Currency, PantryRecipe, SurvivalHack } from '../types';
import { playSound } from '../utils/audio';
import {
  UtensilsCrossed,
  Lightbulb,
  Clock,
  DollarSign,
  ChefHat,
  Filter,
  Check,
  ChevronDown,
  Sparkles
} from 'lucide-react';

interface DesperationPantryProps {
  currency: Currency;
}

export const DesperationPantry: React.FC<DesperationPantryProps> = ({ currency }) => {
  const [activeSubTab, setActiveSubTab] = useState<'recipes' | 'hacks'>('recipes');
  const [recipeFilter, setRecipeFilter] = useState<'all' | 'under20' | 'under35' | 'protein'>('all');
  const [hackCategory, setHackCategory] = useState<string>('All');
  const [expandedRecipeId, setExpandedRecipeId] = useState<string | null>("r1");

  const formatCost = (inr: number, usd: number) => {
    if (currency === 'INR') return `₹${inr}`;
    if (currency === 'USD') return `$${usd.toFixed(2)}`;
    return `€${(usd * 0.92).toFixed(2)}`;
  };

  const filteredRecipes = PANTRY_RECIPES.filter((r) => {
    if (recipeFilter === 'under20') return r.costInr <= 20;
    if (recipeFilter === 'under35') return r.costInr <= 35;
    if (recipeFilter === 'protein') return r.nutrition.toLowerCase().includes('protein');
    return true;
  });

  const categories = ['All', 'Food', 'Tech', 'Utilities', 'Social'];
  const filteredHacks = hackCategory === 'All'
    ? SURVIVAL_HACKS
    : SURVIVAL_HACKS.filter((h) => h.category === hackCategory);

  return (
    <div className="space-y-6">
      {/* Header and Toggle */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white m-0">
                Desperation Pantry & Frugal Hacks
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Nutritious sustenance under ₹35 and battle-tested survival tricks to stop financial leakage.
              </p>
            </div>
          </div>

          {/* Sub-tab Pill Switch */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => {
                playSound('click');
                setActiveSubTab('recipes');
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'recipes'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ChefHat className="w-4 h-4" />
              Emergency Recipes ({PANTRY_RECIPES.length})
            </button>
            <button
              onClick={() => {
                playSound('click');
                setActiveSubTab('hacks');
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'hacks'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              Survival Hacks ({SURVIVAL_HACKS.length})
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        {activeSubTab === 'recipes' ? (
          <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter by:
            </span>
            {[
              { id: 'all', label: 'All Recipes' },
              { id: 'under20', label: 'Under ₹20 (Extreme Frugal)' },
              { id: 'under35', label: 'Under ₹35 (Comfort Meal)' },
              { id: 'protein', label: 'High Protein / Energy' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  playSound('click');
                  setRecipeFilter(f.id as typeof recipeFilter);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  recipeFilter === f.id
                    ? 'bg-slate-800 text-amber-400 border-amber-500/40 shadow-sm'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playSound('click');
                  setHackCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  hackCategory === cat
                    ? 'bg-slate-800 text-amber-400 border-amber-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content Grid */}
      {activeSubTab === 'recipes' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRecipes.map((recipe) => {
            const isExpanded = expandedRecipeId === recipe.id;
            return (
              <div
                key={recipe.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-white m-0">
                      {recipe.name}
                    </h3>
                    <span className="font-mono font-black text-emerald-400 text-base bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20 shrink-0">
                      {formatCost(recipe.costInr, recipe.costUsd)}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      <Clock className="w-3 h-3 text-amber-400" /> {recipe.prepTime}
                    </span>
                    <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      ⚡ {recipe.difficulty}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 mb-3">
                    <span className="font-bold text-slate-400 block text-[11px] mb-1">Nutrition:</span>
                    {recipe.nutrition}
                  </div>

                  {/* Ingredients */}
                  <div className="mb-3">
                    <span className="text-xs font-bold text-slate-400 block mb-1.5">Ingredients:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {recipe.ingredients.map((ing, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/60"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-slate-800 text-xs space-y-2 animate-in fade-in duration-200">
                      <div>
                        <span className="font-bold text-slate-300 block mb-1">Instructions:</span>
                        <p className="text-slate-400 leading-relaxed">{recipe.instructions}</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-start gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span><strong>Pro-Tip:</strong> {recipe.proTip}</span>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    playSound('click');
                    setExpandedRecipeId(isExpanded ? null : recipe.id);
                  }}
                  className="mt-4 w-full py-2 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold border border-slate-800 transition-colors flex items-center justify-center gap-1"
                >
                  {isExpanded ? "Hide Cooking Steps" : "View Cooking Steps"}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHacks.map((hack) => (
            <div
              key={hack.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-white m-0">
                    {hack.title}
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                    {hack.category}
                  </span>
                </div>

                <div className="text-xs font-mono font-bold text-emerald-400 mb-3 flex items-center gap-1">
                  💰 Saves: {hack.estimatedSaving}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {hack.description}
                </p>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-400 block">Execution Steps:</span>
                  {hack.steps.map((st, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                      <div className="w-4 h-4 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
