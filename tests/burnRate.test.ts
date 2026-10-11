/**
 * Unit Test Suite for Broke But Functional Core Logic
 * Evaluated under automated FQE test runner
 */

export function runBurnRateCalculations(balance: number, days: number, fixed: number) {
  const netAvailable = Math.max(0, balance - fixed);
  const dailyRate = Math.floor(netAvailable / Math.max(1, days));
  return { netAvailable, dailyRate };
}

export function validatePlayerState(wallet: number, sanity: number, energy: number) {
  return {
    isBankrupt: wallet < 0,
    isBurnout: sanity <= 0,
    isStarved: energy <= 0,
    isAlive: wallet >= 0 && sanity > 0 && energy > 0,
  };
}

// Verification runner
console.assert(runBurnRateCalculations(2400, 10, 400).dailyRate === 200, "Daily rate must be 200");
console.assert(validatePlayerState(100, 50, 50).isAlive === true, "Player must be alive");
console.assert(validatePlayerState(-1, 50, 50).isBankrupt === true, "Player must be bankrupt");
