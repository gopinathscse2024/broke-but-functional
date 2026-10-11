# System Architecture & Technical Specifications

## 📐 Architecture Overview

`Broke But Functional` follows a decoupled, modular Frontend Architecture conforming to enterprise React standards:

```
src/
├── components/          # Pure Presentation & Container Components
│   ├── Header.tsx       # Navigation, Theme, and Sound Controls
│   ├── SurvivalGame.tsx # 30-Day Simulation & Decision Engine
│   ├── BurnRateCalculator.tsx # Financial Runway & Allocation Tool
│   ├── DesperationPantry.tsx  # Meal Matrix & Frugal Hacks
│   ├── ExpenseTracker.tsx     # Micro-Transaction Logging
│   └── AiSurvivalCoach.tsx    # Intelligent Heuristic/AI Advisor
├── context/             # State Management Layer (GameContext)
├── hooks/               # Custom Business Logic Hooks (useSurvivalGame)
├── services/            # Autonomous Service Layer (AI Advisor, API client)
├── data/                # Strongly-typed Datasets (Dilemmas, Hacks, Recipes)
├── utils/               # Audio Synthesizer, Formatters, Unit Tests
└── types.ts             # Global TypeScript Interfaces & Domain Models
```

## 🧠 Design Principles

1. **Deterministic State Machine:** All daily dilemma consequences and random events follow mathematical invariants preventing negative infinity loops or impossible state transitions.
2. **Zero-Latency Web Audio API:** Pure programmatic sound synthesis avoiding MP3/WAV asset downloads over the network.
3. **Local-First Persistence:** State hydration and synchronization with `localStorage` guarantees uninterrupted user experience across network drops.
4. **WCAG 2.1 AA Compliance:** Full semantic markup, high-contrast text ratios, and keyboard accessible focus rings.
