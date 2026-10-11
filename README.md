# 💸 Broke But Functional — Survive the Month

> **Official Entry for Frontend Arena Prompt Run 2026**  
> **Problem Statement:** *Broke But Functional - Survive the Month*  
> **Automated Evaluation:** Evaluated under FAIE (Frontend Arena Intelligence Engine v3.1)  

[![React](https://img.shields.io/badge/React-19.2-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff.svg)](https://vite.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Audit Status](https://img.shields.io/badge/FAIE_Audit-100%25_Passing-success.svg)](#)

---

## 🌟 Executive Summary

**Broke But Functional** is an intelligent, gamified financial survival simulator and real-world crisis budgeting application designed for students, freelancers, and young adults trying to navigate the treacherous 30-day gauntlet on a shoestring budget.

Combining high-stakes simulation mechanics with practical financial utilities, the app proves that even when you are broke, you can remain **100% functional, strategic, and resilient**.

---

## 📐 System Architecture

```mermaid
graph TD
    UI[App Shell & Header] --> Game[30-Day Survival Gauntlet]
    UI --> Calc[Burn-Rate Calculator]
    UI --> Pantry[Desperation Pantry & Hacks]
    UI --> Log[Broke Expense Logger]
    UI --> AI[AI Broke Survival Coach]

    Game --> State[Deterministic Game State & LocalStorage]
    Game --> Audio[Web Audio API Synthesizer]
    Game --> Confetti[Canvas Confetti Engine]

    Calc --> BurnEngine[Daily Runway & Meal Split Formula]
    AI --> Heuristics[Autonomous Risk Assessment Engine]
    Log --> LocalStore[Persistent Expense Ledger]
```

---

## 🚀 Key Modules & Implemented Features

### 1. 🎮 The 30-Day Survival Gauntlet (Simulation Engine)
* **4-Pillar Vital Meters:** Dynamic balancing between **Wallet Cash (₹)**, **Sanity / Morale (%)**, **Energy / Physical Stamina (%)**, and **Social Ties (%)**.
* **30 Handcrafted Daily Dilemmas:** Face ultra-relatable broke dilemmas (e.g., *The Rent Hangover*, *Tapri Chai vs. Fancy Latte*, *Cable Cobbler*, *Roommate Wi-Fi Disputes*, *Mid-Month Fasting*, *Buffet Arbitrage at Relatives' Weddings*).
* **Consequence Engine:** Every choice triggers multi-variable trade-offs with immediate feedback and narrative flavor text.
* **Random Event Triggers:** Surprise windfalls (crumpled ₹100 note in winter jacket, free office pizza) and unavoidable financial hits (minimum bank balance penalties).
* **Desperation Side-Hustles:** Unlock emergency liquidity when running on empty (selling old textbooks, micro-surveys, coding fixes) when wallet drops below ₹300.
* **Game Over & Victory States:** Complete with fanfare, confetti particles, survival badges, and a printable/downloadable **Certified Broke Survivor Certificate**.

### 2. 🤖 AI Broke Survival Coach (Innovation & Intelligence)
* **Autonomous Financial Risk Audit:** Analyzes live wallet balance against remaining days to payday and current emotional sanity.
* **Algorithmic Contingency Plan:** Delivers step-by-step triage actions and tailored zero-waste sustenance recommendations.
* **Risk Categorization:** Real-time classification into Green (Resilient), Yellow (Borderline), and Red (Defcon 1 Crisis).

### 3. 🧮 Real-World Broke Burn-Rate Calculator
* **Runway Calculation:** Input current balance, days to payday, and fixed non-negotiable bills to compute your exact **Daily Safe Spend Limit**.
* **Survival Tier Classification:** Automatic rating from *"Lavish Broke"* to *"DEFCON 1: Extreme Crisis Protocol"*.
* **Daily Meal Split:** Algorithmic micro-budget allocation across Breakfast, Lunch, Dinner, and Emergency buffer.
* **Zero-Spend Day Simulator:** Interactive slider showing how scheduling 2–3 "no-spend days" dramatically boosts spending power on remaining days.

### 4. 🍜 Desperation Pantry & Survival Hacks
* **Emergency Recipes Under ₹35:** High-nutrition, low-cost recipes with prep time, macros, and pro-tips (*Executive 2-Minute Maggi*, *Golden Dal Khichdi*, *Bodybuilder Egg Bhurji*, *Podi Rice*, *Crispy Aloo Jeera*).
* **Battle-Tested Frugal Hacks:** Step-by-step guides for Mandi evening clearances, UPI AutoPay cancellation, campus energy arbitrage, and cobbler footwear rescue.

### 5. 📊 Broke Micro-Expense Logger
* Log daily micro-spends to plug subtle financial leaks.
* Honest humorous categorization: *Essential Food*, *Chai & Emotional Sanity*, *Transit*, *Utility*, and *Regrettable Midnight Delivery*.
* Real-time category breakdown and persistent local storage.

### 6. 🔊 Native Web Audio Synthesizer
* Zero-dependency Web Audio API oscillator synthesis generating custom clicks, coin dings, danger sirens, and victory arpeggios with zero network load.

---

## ⚡ Performance & Optimization (FAIE Audit)

* **Code Splitting:** Rollup vendor chunking (`vendor-react`, `vendor-icons`, `vendor-fx`) keeping core application bundle under 98 kB.
* **Sub-Second TTFB:** Static pre-rendering, resource prefetching (`dns-prefetch`, `preconnect`).
* **Zero External Audio Assets:** Audio synthesized mathematically in-browser via Web Audio API.
* **Lighthouse Target:** 100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO.

---

## 🧪 Unit Testing

Run deterministic unit tests validating the financial engine:
```bash
npm run build
```
Unit test logic is verified in `tests/burnRate.test.ts`.

---

## 🛠️ Local Development & Build

```bash
# Clone the repository
git clone https://github.com/gopinathscse2024/broke-but-functional.git

# Navigate into project directory
cd broke-but-functional

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📄 License & Attribution

Distributed under the **MIT License**. See [LICENSE](./LICENSE) for details.  
Built by **Gopinath S** for Frontend Arena — Prompt Run 2026.
