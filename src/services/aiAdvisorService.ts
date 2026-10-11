export interface AIAdviceRequest {
  wallet: number;
  daysRemaining: number;
  sanity: number;
  energy: number;
  category?: string;
  userQuery?: string;
}

export interface AIAdviceResponse {
  assessment: string;
  verdict: 'GREEN' | 'YELLOW' | 'RED';
  actionablePlan: string[];
  suggestedMeal: string;
  encouragement: string;
}

export const getSurvivalCoachAdvice = async (req: AIAdviceRequest): Promise<AIAdviceResponse> => {
  // Simulate intelligent heuristic AI analysis with fast 400ms latency
  await new Promise((resolve) => setTimeout(resolve, 400));

  const dailyBudget = Math.round(req.wallet / Math.max(1, req.daysRemaining));

  if (dailyBudget > 300 && req.sanity > 50) {
    return {
      assessment: `Runway is resilient at ₹${dailyBudget}/day. You have enough breathing room for wholesome nourishment without luxury splurges.`,
      verdict: 'GREEN',
      actionablePlan: [
        'Batch-prep 3 days of rice and dal to keep lunch costs under ₹30.',
        'Reserve ₹50/day for emotional support tea or fruit to protect sanity.',
        'Lock the remainder away from instant UPI payments to maintain buffer.'
      ],
      suggestedMeal: 'Egg Bhurji with Toasted Bread (₹30, 14g Protein)',
      encouragement: 'You are pacing well! Don’t let early discipline slip into late-month complacency.'
    };
  } else if (dailyBudget >= 100) {
    return {
      assessment: `Borderline territory at ₹${dailyBudget}/day. A single impulse order will trigger acute deficit.`,
      verdict: 'YELLOW',
      actionablePlan: [
        'Enforce immediate 48-hour freeze on restaurant food or cafe visits.',
        'Visit your local evening vegetable mandi for clearance root veggies.',
        'Use campus or office electricity to recharge power banks and laptops.'
      ],
      suggestedMeal: 'Dal Khichdi One-Pot Hero (₹35, feeds 2 full meals)',
      encouragement: 'Tighten the belt for just 5 days, and you will regain positive cash flow!'
    };
  } else {
    return {
      assessment: `CRISIS ALERT: Survival burn rate is ₹${dailyBudget}/day. Extreme austerity protocols activated.`,
      verdict: 'RED',
      actionablePlan: [
        'Immediately execute an emergency side hustle (sell textbooks or micro-gig).',
        'Convert to 100% pantry oats, rice, and boiled potato rations.',
        'Ask flatmates for bulk staple borrowing rather than taking high-interest loans.'
      ],
      suggestedMeal: 'Steamed Rice with Warm Ghee & Salt (₹16, zero food waste)',
      encouragement: 'Pain is temporary, survival is legendary. You can and will make it through!'
    };
  }
};
