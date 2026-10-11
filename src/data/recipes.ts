import { PantryRecipe } from '../types';

export const PANTRY_RECIPES: PantryRecipe[] = [
  {
    id: "r1",
    name: "The 'Executive' 2-Minute Maggi",
    costInr: 22,
    costUsd: 0.27,
    prepTime: "6 mins",
    difficulty: "Zero Effort",
    nutrition: "High Sodium, Moderate Carbs, 100% Comfort",
    ingredients: ["1 Maggi noodle pack (₹14)", "1/2 chopped onion (₹4)", "Pinch of chilli powder", "Drop of butter/oil (₹4)"],
    instructions: "Sauté the chopped onions in a drop of butter until golden brown. Add water, tastemaker, and noodles. Cook until soupy. Consume directly from the pan to avoid washing a bowl.",
    proTip: "Add a slice of cheap cheese on top if feeling like high society."
  },
  {
    id: "r2",
    name: "Golden Dal Khichdi (One-Pot Lifesaver)",
    costInr: 35,
    costUsd: 0.42,
    prepTime: "15 mins",
    difficulty: "Easy",
    nutrition: "Complete Protein, High Fiber, Gut Healer",
    ingredients: ["1/2 cup Rice (₹12)", "1/3 cup Moong/Toor Dal (₹15)", "Turmeric, cumin seeds, salt (₹5)", "1 tsp ghee or oil (₹3)"],
    instructions: "Wash rice and dal together. In pressure cooker or deep pot, fry cumin seeds and turmeric in ghee. Dump in rice, dal, and 3x water. Pressure cook 3 whistles or boil until porridge consistency.",
    proTip: "One cook session easily yields 2 satisfying meals. Pair with raw onion slices and a pinch of pickle."
  },
  {
    id: "r3",
    name: "Classic Egg Bhurji (Scramble) on Toast",
    costInr: 30,
    costUsd: 0.36,
    prepTime: "8 mins",
    difficulty: "Easy",
    nutrition: "14g High-Quality Protein, Healthy Fats",
    ingredients: ["2 Eggs (₹16)", "1/2 Onion + 1 Green Chilli (₹6)", "Salt & Turmeric", "2 Slices bread (₹8)"],
    instructions: "Whisk eggs with a pinch of salt. Sauté onion and chilli for 2 mins. Pour eggs and stir continuously on low heat until softly scrambled. Serve over toasted bread.",
    proTip: "The cheapest, cleanest bodybuilding macro meal you will ever get under ₹35."
  },
  {
    id: "r4",
    name: "Crispy Aloo Jeera with Roti / Rice",
    costInr: 24,
    costUsd: 0.29,
    prepTime: "12 mins",
    difficulty: "Easy",
    nutrition: "High Energy Carbs, Micronutrients",
    ingredients: ["2 medium Potatoes (₹12)", "Cumin seeds (jeera) + Turmeric + Chilli powder (₹4)", "1 tbsp oil (₹5)", "Salt to taste"],
    instructions: "Dice potatoes into small bite cubes. Heat oil, sizzle jeera, dump potatoes and spices. Cover on low flame for 10 minutes, stirring occasionally until crispy outside and tender inside.",
    proTip: "Cook extra and stuff leftovers inside bread slices next morning for an instant aloo sandwich."
  },
  {
    id: "r5",
    name: "Spiced Masala Peanut Chaat",
    costInr: 18,
    costUsd: 0.22,
    prepTime: "3 mins",
    difficulty: "Zero Effort",
    nutrition: "Plant Protein, Heart-Healthy Fats, Zero Cook",
    ingredients: ["Handful roasted peanuts (₹12)", "Finely chopped onion, tomato, and lemon juice (₹6)", "Chaat masala & salt"],
    instructions: "Toss roasted peanuts with finely diced onion, green chilli, squeeze half a lemon, and sprinkle chaat masala. Shake inside a covered tiffin box.",
    proTip: "Perfect 4 PM study snack that stops you from ordering ₹250 fast food."
  },
  {
    id: "r6",
    name: "The Ghee-Podi / Ghee-Salt Rice Feast",
    costInr: 16,
    costUsd: 0.19,
    prepTime: "10 mins",
    difficulty: "Zero Effort",
    nutrition: "Pure Nostalgia, Satiating Fats",
    ingredients: ["1 cup Steamed White Rice (₹10)", "1 tsp Warm Desi Ghee (₹5)", "Salt or Idli Podi powder (₹1)"],
    instructions: "Pile piping hot freshly cooked rice into a plate. Make a small crater in center. Pour hot melted ghee and sprinkle salt or gunpowder podi. Mix with bare fingers.",
    proTip: "Universally acknowledged comfort food across Indian households when broke or exhausted."
  }
];
