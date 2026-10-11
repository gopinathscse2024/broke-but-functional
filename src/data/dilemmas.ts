import { DailyDilemma, RandomEvent, Hustle } from '../types';

export const INITIAL_STATS = {
  wallet: 3200, // INR (roughly $38)
  sanity: 80,
  energy: 85,
  social: 70,
};

export const DAILY_DILEMMAS: DailyDilemma[] = [
  {
    day: 1,
    title: "The Rent Hangover",
    category: "Food",
    narrative: "Day 1 of the month. Rent and Wi-Fi bills just wiped out 80% of your account. You have ₹3,200 left for the next 30 days. How are you kicking off your culinary survival?",
    choices: [
      {
        id: "d1-c1",
        text: "Stock up on a 12-pack of Maggi and 5kg rice",
        effect: { wallet: -320, sanity: -5, energy: +10, social: 0 },
        flavorText: "Your kitchen shelf now looks like an emergency doomsday bunker, but you won't starve.",
        badge: "Doomsday Prepper"
      },
      {
        id: "d1-c2",
        text: "Order delivery one last time in 'denial' (Swiggy treat)",
        effect: { wallet: -380, sanity: +20, energy: +15, social: 0 },
        flavorText: "The butter chicken was heavenly, but your bank SMS makes your eye twitch.",
        badge: "Denial Master"
      },
      {
        id: "d1-c3",
        text: "Eat boiled potatoes with salt and drink warm water",
        effect: { wallet: -25, sanity: -15, energy: -5, social: 0 },
        flavorText: "Peak austerity unlocked on Day 1. Your soul aches, but your wallet thanks you.",
        badge: "Ascetic Monk"
      }
    ]
  },
  {
    day: 2,
    title: "The Birthday Invitation",
    category: "Social",
    narrative: "Your close friend Rohan is having a rooftop birthday dinner and invited you. The bill will be split equally. Everyone ordered cocktails and appetizers.",
    choices: [
      {
        id: "d2-c1",
        text: "Show up, sip tap water, eat one fry, and pay full split share",
        effect: { wallet: -450, sanity: -10, energy: -5, social: +25 },
        flavorText: "You just paid ₹450 for tap water and passive peer pressure.",
        badge: "Polite Martyr"
      },
      {
        id: "d2-c2",
        text: "Invent a dramatic fake cold and send a warm voice note",
        effect: { wallet: 0, sanity: +5, energy: +10, social: -10 },
        flavorText: "Coughing convincingly into WhatsApp saved your entire week's budget.",
        badge: "Oscar Nominee"
      },
      {
        id: "d2-c3",
        text: "Show up only at 11 PM for cake and say 'I already ate'",
        effect: { wallet: -50, sanity: +15, energy: +5, social: +15 },
        flavorText: "Free chocolate truffle cake secured. Tactical genius move.",
        badge: "Tactical Leech"
      }
    ]
  },
  {
    day: 3,
    title: "Commute Catastrophe",
    category: "Utility",
    narrative: "It's pouring rain. The metro station is 2.5 km away. An auto wants ₹180 surge fare. Walking means your shoes get soaked before your 9 AM meeting.",
    choices: [
      {
        id: "d3-c1",
        text: "Take the auto surge fare. Dignity has a price.",
        effect: { wallet: -180, sanity: +10, energy: +5, social: 0 },
        flavorText: "Dry socks, empty pockets. Auto driver smirked at the surge price.",
      },
      {
        id: "d3-c2",
        text: "Put polythene grocery bags over shoes and power-walk through rain",
        effect: { wallet: 0, sanity: -12, energy: -20, social: -5 },
        flavorText: "People stared at your plastic-boot contraption, but you saved ₹180.",
        badge: "Waterproof MacGyver"
      },
      {
        id: "d3-c3",
        text: "Wait 40 minutes at bus stop for the crowded local bus",
        effect: { wallet: -15, sanity: -5, energy: -15, social: +5 },
        flavorText: "Pressed like a sardine against three strangers, but ₹15 is ₹15.",
      }
    ]
  },
  {
    day: 4,
    title: "Caffeine Emergency",
    category: "Health",
    narrative: "Severe afternoon brain fog. The office fancy coffee machine is broken. Colleagues are ordering Starbucks / Blue Tokai iced lattes.",
    choices: [
      {
        id: "d4-c1",
        text: "Join the group order for an iced caramel macchiato",
        effect: { wallet: -280, sanity: +20, energy: +25, social: +15 },
        flavorText: "Liquid gold. But ₹280 could have bought you 4 days of eggs.",
      },
      {
        id: "d4-c2",
        text: "Run to the corner tapri for a ₹10 cutting chai and Parle-G",
        effect: { wallet: -15, sanity: +10, energy: +15, social: +5 },
        flavorText: "The cutting chai hits harder than any $5 latte ever could. Elite vibes.",
        badge: "Tapri Loyalist"
      },
      {
        id: "d4-c3",
        text: "Drink lukewarm tap water and do 20 frantic jumping jacks",
        effect: { wallet: 0, sanity: -10, energy: +5, social: -10 },
        flavorText: "Your coworkers looked at you with genuine concern.",
      }
    ]
  },
  {
    day: 5,
    title: "The Sneaky Subscription Charge",
    category: "Emergency",
    narrative: "DING! That forgotten streaming trial renewed itself for ₹499. You only have a 2-hour window to contest it or downgrade.",
    choices: [
      {
        id: "d5-c1",
        text: "Spend 45 mins chatting with stubborn customer support for refund",
        effect: { wallet: +499, sanity: -20, energy: -15, social: 0 },
        flavorText: "You argued with a bot named Priya until they surrendered your ₹499 back.",
        badge: "Refund Gladiator"
      },
      {
        id: "d5-c2",
        text: "Sigh and binge-watch 3 movies overnight to 'get your money's worth'",
        effect: { wallet: -499, sanity: +15, energy: -30, social: -5 },
        flavorText: "Sun is rising. You watched all of Lord of the Rings Extended. You are a husk.",
      },
      {
        id: "d5-c3",
        text: "Sub-lease your login password to 2 roommates for ₹150 each",
        effect: { wallet: -199, sanity: +5, energy: 0, social: +10 },
        flavorText: "Accidental micro-streaming syndicator.",
        badge: "Shadow Landlord"
      }
    ]
  },
  {
    day: 6,
    title: "The Weekend Grocery Run",
    category: "Food",
    narrative: "Fridge contains: 1 shriveled lemon, baking soda, and 2 bottles of tap water. You must replenish essentials to reach Day 15.",
    choices: [
      {
        id: "d6-c1",
        text: "Wholesale local mandi: Bulk potatoes, onions, eggs, and bread",
        effect: { wallet: -220, sanity: -5, energy: +25, social: 0 },
        flavorText: "You hauled 7kg of root vegetables on foot. Back hurts, but you're fortified.",
        badge: "Mandi Warrior"
      },
      {
        id: "d6-c2",
        text: "Quick-commerce 10-minute app with surge & delivery fees",
        effect: { wallet: -420, sanity: +15, energy: +10, social: 0 },
        flavorText: "Delivered in 8 minutes flat, along with ₹65 delivery charge guilt.",
      },
      {
        id: "d6-c3",
        text: "Intermittent fasting & 'free fruit' in the office pantry tomorrow",
        effect: { wallet: 0, sanity: -20, energy: -20, social: 0 },
        flavorText: "Your stomach is making whale sounds.",
      }
    ]
  },
  {
    day: 7,
    title: "Sunday Boredom Crisis",
    category: "Social",
    narrative: "Sunday evening depression is kicking in. Staying home alone is driving you crazy, but going to a mall means spending money.",
    choices: [
      {
        id: "d7-c1",
        text: "Go to mall just for free AC and aggressive window shopping",
        effect: { wallet: -40, sanity: +10, energy: -5, social: +5 },
        flavorText: "Bought one soft-serve cone, walked 12,000 steps inside Zara looking rich.",
        badge: "Window Millionaire"
      },
      {
        id: "d7-c2",
        text: "Host a Bring-Your-Own-Snacks movie night with cheap popcorn",
        effect: { wallet: -60, sanity: +30, energy: +5, social: +25 },
        flavorText: "Roommates brought snacks, you provided the screen. Elite social value.",
        badge: "Community Anchor"
      },
      {
        id: "d7-c3",
        text: "Doomscroll Instagram reels for 7 continuous hours in bed",
        effect: { wallet: 0, sanity: -30, energy: -15, social: -15 },
        flavorText: "You watched other people vacation in Japan while eating raw glucose biscuits.",
      }
    ]
  },
  {
    day: 8,
    title: "Toothache From Hell",
    category: "Health",
    narrative: "A dull, throbbing pain starts in your lower left molar. Real dentist visit = ₹800 consultation fee.",
    choices: [
      {
        id: "d8-c1",
        text: "Go to proper dental clinic before it turns into root canal nightmare",
        effect: { wallet: -650, sanity: +15, energy: +10, social: 0 },
        flavorText: "Wallet bled, but tooth saved. No regrets for biological health.",
      },
      {
        id: "d8-c2",
        text: "Home remedy: Jam a whole clove into tooth and drink clove tea",
        effect: { wallet: -30, sanity: -5, energy: 0, social: -5 },
        flavorText: "Your mouth tastes like potpourri, but the pain miraculously numbed.",
        badge: "Herbal Alchemist"
      },
      {
        id: "d8-c3",
        text: "Ignore it and chew everything on the right side only",
        effect: { wallet: 0, sanity: -15, energy: -10, social: 0 },
        flavorText: "Your right jaw is now chiseled like a Greek god. Left side is agony.",
      }
    ]
  },
  {
    day: 9,
    title: "Roommate Conflict: Wi-Fi Split",
    category: "Utility",
    narrative: "Your roommate says they were away for 4 days so they should pay ₹150 less on the broadband bill. They want you to absorb it.",
    choices: [
      {
        id: "d9-c1",
        text: "Stand your ground with lease agreement math and demand full split",
        effect: { wallet: 0, sanity: -10, energy: -5, social: -15 },
        flavorText: "Awkward silence in the kitchen, but you held the financial line.",
        badge: "Spreadsheet Enforcer"
      },
      {
        id: "d9-c2",
        text: "Cave in and pay the ₹150 difference to keep peace in the flat",
        effect: { wallet: -150, sanity: -5, energy: 0, social: +10 },
        flavorText: "Peace preserved, but you feel slightly exploited.",
      },
      {
        id: "d9-c3",
        text: "Change the router password to 'PayUpFirst123' and leave the room",
        effect: { wallet: 0, sanity: +15, energy: 0, social: -25 },
        flavorText: "Chaotic nuclear option. They paid within 6 minutes.",
        badge: "Bandwidth Dictator"
      }
    ]
  },
  {
    day: 10,
    title: "The Mid-Month Reckoning",
    category: "Food",
    narrative: "You survived 10 days! But your body is complaining about salt & carb overload. You need fresh greens or fruit.",
    choices: [
      {
        id: "d10-c1",
        text: "Buy 1 dozen bananas and half-kilo spinach at evening discount",
        effect: { wallet: -75, sanity: +15, energy: +20, social: 0 },
        flavorText: "Potassium levels restored! Your body remembers what vitamins feel like.",
        badge: "Vitamin Resurrector"
      },
      {
        id: "d10-c2",
        text: "Eat multivitamin gummies you found expired in your backpack",
        effect: { wallet: 0, sanity: -5, energy: +5, social: 0 },
        flavorText: "Tasted like rubbery cherry, stomach grumbled, but hey... free zinc?",
      },
      {
        id: "d10-c3",
        text: "Treat yourself to a lavish salad bowl from health café",
        effect: { wallet: -320, sanity: +15, energy: +15, social: 0 },
        flavorText: "₹320 for leaves and three chickpeas. You feel classy and broke.",
      }
    ]
  },
  {
    day: 11,
    title: "Phone Charging Cable Snaps",
    category: "Utility",
    narrative: "The original phone cable frayed into bare copper wires. It only charges if held at an exact 47-degree angle with a paperclip.",
    choices: [
      {
        id: "d11-c1",
        text: "Reinforce with electrical tape and rubber bands",
        effect: { wallet: -15, sanity: -5, energy: 0, social: 0 },
        flavorText: "It looks like an improvised explosive device, but it charges at 80% speed.",
        badge: "Electro-Cobbler"
      },
      {
        id: "d11-c2",
        text: "Buy authentic certified replacement cable online",
        effect: { wallet: -350, sanity: +20, energy: +10, social: 0 },
        flavorText: "Fast charging peace of mind. No more balancing your phone on shoe boxes.",
      },
      {
        id: "d11-c3",
        text: "Borrow roommate's charger only while they are asleep",
        effect: { wallet: 0, sanity: -10, energy: -10, social: -10 },
        flavorText: "Midnight stealth charging ops. High stress, 0 rupee spent.",
      }
    ]
  },
  {
    day: 12,
    title: "Side Hustle Opportunity",
    category: "Hustle",
    narrative: "A college senior needs someone to format 60 pages of Word doc thesis with APA citation references by tomorrow morning. Pays ₹600 cash.",
    choices: [
      {
        id: "d12-c1",
        text: "Grind through the night and finish it (Sleep sacrifice)",
        effect: { wallet: +600, sanity: -15, energy: -35, social: 0 },
        flavorText: "₹600 secured! Eyeballs bloodshot, but cash runway extended by 5 days.",
        badge: "Night Owl Mercenary"
      },
      {
        id: "d12-c2",
        text: "Politely decline to protect your sleep schedule and sanity",
        effect: { wallet: 0, sanity: +15, energy: +20, social: 0 },
        flavorText: "Glorious 8 hours of sleep. Wallet remains skinny.",
      },
      {
        id: "d12-c3",
        text: "Subcontract it to an enthusiastic fresher for ₹300, keep ₹300 margin",
        effect: { wallet: +300, sanity: +5, energy: -5, social: +5 },
        flavorText: "You just discovered the gig economy arbitrage model.",
        badge: "Middleman Maestro"
      }
    ]
  },
  {
    day: 13,
    title: "The Torn Formal Jeans",
    category: "Social",
    narrative: "Your only decent pair of clean jeans tore near the back pocket right before a college presentation / team client visit.",
    choices: [
      {
        id: "d13-c1",
        text: "Safety pins and wear an untucked oversized hoodie",
        effect: { wallet: 0, sanity: -10, energy: 0, social: -5 },
        flavorText: "You prayed nobody asked you to remove your jacket all day. Success.",
      },
      {
        id: "d13-c2",
        text: "Rush to local tailor for a ₹40 rough patch stitch",
        effect: { wallet: -40, sanity: +5, energy: -5, social: +5 },
        flavorText: "Master Ji stitched it in 5 mins. It has a quirky blue patch now.",
        badge: "Thrift Survivor"
      },
      {
        id: "d13-c3",
        text: "Panic buy cheap fast fashion jeans at clearance sale",
        effect: { wallet: -499, sanity: +15, energy: 0, social: +10 },
        flavorText: "You look great, but you will be drinking tap water for the next 4 days.",
      }
    ]
  },
  {
    day: 14,
    title: "Leftover Russian Roulette",
    category: "Food",
    narrative: "Found a container of dal in fridge. It's 5 days old. It smells slightly tangy... or maybe that's just the tomato sourness?",
    choices: [
      {
        id: "d14-c1",
        text: "Boil vigorously for 10 minutes to kill all bacteria and eat it",
        effect: { wallet: 0, sanity: -5, energy: -15, social: 0 },
        flavorText: "Stomach did some weird acrobatics, but no hospital visit needed.",
        badge: "Cast Iron Stomach"
      },
      {
        id: "d14-c2",
        text: "Dump it immediately. Health comes before ego. Cook plain rice.",
        effect: { wallet: -20, sanity: +5, energy: +5, social: 0 },
        flavorText: "Wise caution. Food poisoning would cost 10x in pharmacy bills.",
      },
      {
        id: "d14-c3",
        text: "Feed half to the stray dog outside to see its reaction first",
        effect: { wallet: 0, sanity: -15, energy: 0, social: -10 },
        flavorText: "The stray dog sniffed it and walked away in disgust. You threw it out.",
      }
    ]
  },
  {
    day: 15,
    title: "HALF-WAY POINT: The Mental Wall",
    category: "Social",
    narrative: "Day 15. Exactly halfway through! Everyone around you is eating restaurant meals, going to cafes, and living large. You feel exhausted.",
    choices: [
      {
        id: "d15-c1",
        text: "Zero-rupee joy: 1-hour sunset walk in the park with a podcast",
        effect: { wallet: 0, sanity: +25, energy: +15, social: 0 },
        flavorText: "Fresh air, golden hour, zero rupees spent. Your brain reset completely.",
        badge: "Zen Frugalist"
      },
      {
        id: "d15-c2",
        text: "Split a ₹100 pastry with your best buddy while venting",
        effect: { wallet: -50, sanity: +20, energy: +5, social: +20 },
        flavorText: "Mutual venting session halved your stress and doubled your endurance.",
      },
      {
        id: "d15-c3",
        text: "Retail therapy: Buy cheap trinket you don't need on sale",
        effect: { wallet: -180, sanity: +10, energy: 0, social: 0 },
        flavorText: "A small dopamine spike followed by immediate buyer remorse.",
      }
    ]
  },
  {
    day: 16,
    title: "Laundry Impasse",
    category: "Utility",
    narrative: "No clean clothes left. Laundry service / dry cleaner is ₹200. Bucket washing jeans by hand takes 1.5 hours of elbow grease.",
    choices: [
      {
        id: "d16-c1",
        text: "Hand wash in bathroom bucket like our ancestors",
        effect: { wallet: -15, sanity: -10, energy: -25, social: 0 },
        flavorText: "Arms aching from wringing heavy wet denim, but saved ₹185.",
        badge: "Washerman Prodigy"
      },
      {
        id: "d16-c2",
        text: "Send to express laundry service and relax",
        effect: { wallet: -200, sanity: +15, energy: +15, social: 0 },
        flavorText: "Crisp smelling, ironed clothes! Financial damage taken.",
      },
      {
        id: "d16-c3",
        text: "The Axe deodorant spray & sun-airing trick for 1 more day",
        effect: { wallet: 0, sanity: -15, energy: 0, social: -15 },
        flavorText: "You smell like a synthetic citrus explosion. Don't hug anyone.",
      }
    ]
  },
  {
    day: 17,
    title: "The Gas Cylinder Warning",
    category: "Emergency",
    narrative: "The kitchen cooking gas burner is sputtering with weak orange flame. Refill costs ₹950. Or rely on electric kettle?",
    choices: [
      {
        id: "d17-c1",
        text: "Convert to 100% Electric Kettle Cooking Mode",
        effect: { wallet: 0, sanity: -5, energy: 0, social: 0 },
        flavorText: "Kettle boiled eggs, kettle oatmeal, kettle pasta. You are an engineer.",
        badge: "Kettle Gourmet"
      },
      {
        id: "d17-c2",
        text: "Split cylinder refill with flatmates (your share ₹320)",
        effect: { wallet: -320, sanity: +15, energy: +10, social: +10 },
        flavorText: "Blue flames return. Hot food security restored for weeks.",
      },
      {
        id: "d17-c3",
        text: "Eat bread and peanut butter for every single meal until day 30",
        effect: { wallet: -110, sanity: -15, energy: -5, social: 0 },
        flavorText: "Your mouth roof is permanently coated with peanut butter.",
      }
    ]
  },
  {
    day: 18,
    title: "Campus Fest / Office Party Ticket",
    category: "Social",
    narrative: "Annual celebration ticket is ₹350 with live music, food stalls, and networking. Everyone you know is attending.",
    choices: [
      {
        id: "d18-c1",
        text: "Volunteer for the organizing crew to get free pass + food",
        effect: { wallet: 0, sanity: +15, energy: -20, social: +30 },
        flavorText: "Carried heavy banners for 2 hours, scored free VIP badge and unlimited biryani!",
        badge: "Volunteer VIP"
      },
      {
        id: "d18-c2",
        text: "Buy ticket and budget cut next 3 days of meals",
        effect: { wallet: -350, sanity: +25, energy: -5, social: +20 },
        flavorText: "Incredible party memories, but tomorrow is strict water & rice day.",
      },
      {
        id: "d18-c3",
        text: "Stay home and tell everyone you had a prior family webinar",
        effect: { wallet: 0, sanity: -20, energy: +10, social: -20 },
        flavorText: "Watching party Instagram stories alone at midnight was painful.",
      }
    ]
  },
  {
    day: 19,
    title: "The Temptation of Delivery Coupons",
    category: "Food",
    narrative: "Notification: '50% OFF FLAT up to ₹100 on your favorite Biryani'. The smell of dum biryani dances in your imagination.",
    choices: [
      {
        id: "d19-c1",
        text: "Give in to the craving. Place order with coupon applied.",
        effect: { wallet: -190, sanity: +25, energy: +15, social: 0 },
        flavorText: "Pure aromatic bliss. Worth every single rupee of dopamine.",
      },
      {
        id: "d19-c2",
        text: "Delete app notification, cook spiced egg-rice in 10 minutes",
        effect: { wallet: -30, sanity: +10, energy: +10, social: 0 },
        flavorText: "Tasted 80% as good, cost 15% as much. Self-control victory!",
        badge: "Discipline Champion"
      },
      {
        id: "d19-c3",
        text: "Add food to cart, stare at checkout total for 15 minutes, then close app",
        effect: { wallet: 0, sanity: -10, energy: -5, social: 0 },
        flavorText: "Emotional damage, but 0 money left your wallet.",
        badge: "Cart Ghost"
      }
    ]
  },
  {
    day: 20,
    title: "The Winter Chill / Rainy Sickness",
    category: "Health",
    narrative: "Runny nose, sore throat, mild fever. You need medication and warmth before it knocks you out cold.",
    choices: [
      {
        id: "d20-c1",
        text: "Ginger-turmeric-black pepper kadha + 1 paracetamol tablet",
        effect: { wallet: -20, sanity: +5, energy: +15, social: 0 },
        flavorText: "Grandmother's ancient concoction works wonders once again.",
        badge: "Desi Immunity"
      },
      {
        id: "d20-c2",
        text: "Buy expensive branded cough syrup, throat lozenges, and vitamin C",
        effect: { wallet: -240, sanity: +10, energy: +20, social: 0 },
        flavorText: "Medicine cabinet full, cold cured, wallet stinging.",
      },
      {
        id: "d20-c3",
        text: "Sleep for 14 hours wrapped in two heavy blankets",
        effect: { wallet: 0, sanity: +10, energy: +10, social: -10 },
        flavorText: "Sweated out the demons. Woke up slightly disoriented in another dimension.",
      }
    ]
  },
  {
    day: 21,
    title: "10 DAYS TO GO: Unexpected Windfall",
    category: "Hustle",
    narrative: "While cleaning out your winter jacket or dusty study table, you find a forgotten crumpled banknote and 2 scratch coupons!",
    choices: [
      {
        id: "d21-c1",
        text: "Bank it straight into the survival emergency pool",
        effect: { wallet: +200, sanity: +20, energy: +5, social: 0 },
        flavorText: "Free ₹200! The universe recognized your humble persistence.",
        badge: "Lucky Scavenger"
      },
      {
        id: "d21-c2",
        text: "Immediately spend it on quality filter coffee & sweet buns",
        effect: { wallet: 0, sanity: +25, energy: +15, social: +5 },
        flavorText: "Treated yourself without hurting your base reserve. Pure morale booster.",
      },
      {
        id: "d21-c3",
        text: "Use it to play lottery / crypto futures to '10x it'",
        effect: { wallet: -100, sanity: -20, energy: -10, social: 0 },
        flavorText: "Lost it in 4 minutes. A sobering reminder to avoid get-rich schemes.",
      }
    ]
  },
  {
    day: 22,
    title: "Data Pack Depleted",
    category: "Utility",
    narrative: "SMS: '100% of daily high speed data consumed. Speed reduced to 64 Kbps.' You have assignments / work to submit.",
    choices: [
      {
        id: "d22-c1",
        text: "Recharge instant 2GB booster pack",
        effect: { wallet: -29, sanity: +10, energy: 0, social: +5 },
        flavorText: "Fast 5G restored for ₹29. Minimal surgical strike on balance.",
      },
      {
        id: "d22-c2",
        text: "Sit outside local cafe or railway station for municipal public Wi-Fi",
        effect: { wallet: 0, sanity: -10, energy: -15, social: 0 },
        flavorText: "Mosquitoes bit your ankles, but 500MB was downloaded for free.",
        badge: "Public Wi-Fi Nomad"
      },
      {
        id: "d22-c3",
        text: "Befriend neighbor across balcony and request password politely",
        effect: { wallet: 0, sanity: +5, energy: -5, social: +15 },
        flavorText: "Kind neighbor helped! Faith in humanity temporarily restored.",
      }
    ]
  },
  {
    day: 23,
    title: "The Wedding Invitation Card",
    category: "Social",
    narrative: "Second cousin's wedding reception across town. Traditional gift envelope (shagun) is customary.",
    choices: [
      {
        id: "d23-c1",
        text: "Attend, gift modest ₹101 envelope, and eat ₹1,500 worth of buffet dishes",
        effect: { wallet: -101, sanity: +30, energy: +30, social: +20 },
        flavorText: "Paneer tikka, mutton curry, gulab jamun, ice cream. Massive return on investment!",
        badge: "Buffet Arbitrageur"
      },
      {
        id: "d23-c2",
        text: "Skip with polite congratulatory WhatsApp message",
        effect: { wallet: 0, sanity: 0, energy: +5, social: -10 },
        flavorText: "Saved time, saved money, slightly irritated relatives.",
      },
      {
        id: "d23-c3",
        text: "Buy fancy gift set on EMI to keep family prestige high",
        effect: { wallet: -500, sanity: -15, energy: 0, social: +15 },
        flavorText: "Relatives praised you, but you can no longer afford cooking oil.",
      }
    ]
  },
  {
    day: 24,
    title: "The Broken Footwear",
    category: "Utility",
    narrative: "The sole of your daily slippers/sneakers completely peeled off like an open crocodile mouth while crossing the road.",
    choices: [
      {
        id: "d24-c1",
        text: "Street cobbler repair with heavy industrial stitch & glue (₹30)",
        effect: { wallet: -30, sanity: +15, energy: +5, social: 0 },
        flavorText: "Cobbler uncle worked pure magic. Stronger than original shoe!",
        badge: "Cobbler Ally"
      },
      {
        id: "d24-c2",
        text: "Buy a ₹5 FeviKwik tube and try DIY gluing yourself",
        effect: { wallet: -5, sanity: -10, energy: -5, social: 0 },
        flavorText: "Glued your fingers together for 20 minutes, shoe broke again in 2 hours.",
      },
      {
        id: "d24-c3",
        text: "Buy brand new footwear from branded showroom",
        effect: { wallet: -650, sanity: +10, energy: +10, social: +5 },
        flavorText: "Stylish kicks, but your wallet is now in ICU on ventilator support.",
      }
    ]
  },
  {
    day: 25,
    title: "5 DAYS LEFT: The Final Stretch",
    category: "Food",
    narrative: "5 days remain until next month's funds credit. You are staring down the home stretch. How will you pace your final reserves?",
    choices: [
      {
        id: "d25-c1",
        text: "The Khichdi Protocol: 5 days of one-pot nutritious dal khichdi",
        effect: { wallet: -120, sanity: +10, energy: +15, social: 0 },
        flavorText: "Hot, comforting, easy cleanup, balanced proteins. The golden survival food.",
        badge: "Khichdi General"
      },
      {
        id: "d25-c2",
        text: "Raid pantry for obscure canned goods and expired sauces",
        effect: { wallet: 0, sanity: -15, energy: -5, social: 0 },
        flavorText: "Cooked pasta with ketchup and sweet chilli sauce. Culinary crimes committed.",
      },
      {
        id: "d25-c3",
        text: "Borrow ₹500 from a friend thinking 'I made it this far'",
        effect: { wallet: +500, sanity: +10, energy: +10, social: -15 },
        flavorText: "Financial relief, but you incurred future debt obligation.",
      }
    ]
  },
  {
    day: 26,
    title: "The Project Printing / Stationery Toll",
    category: "Emergency",
    narrative: "Professor / Manager demands physical spiral-bound color copies of a report tomorrow morning.",
    choices: [
      {
        id: "d26-c1",
        text: "Black & white duplex print at back-alley campus Xerox shop",
        effect: { wallet: -45, sanity: +5, energy: -5, social: 0 },
        flavorText: "Found the shop with ₹1/page rate. Frugal academic triumph.",
      },
      {
        id: "d26-c2",
        text: "Full glossy color prints at commercial retail shop",
        effect: { wallet: -220, sanity: -10, energy: 0, social: +10 },
        flavorText: "Looks like a corporate prospectus, costs half your remaining wealth.",
      },
      {
        id: "d26-c3",
        text: "Sneak print using the office/library printer during lunch break",
        effect: { wallet: 0, sanity: +15, energy: -5, social: 0 },
        flavorText: "Heart racing while waiting for 40 pages to print. Free and exhilarating.",
        badge: "Office Printer Ninja"
      }
    ]
  },
  {
    day: 27,
    title: "The Nostalgia Movie / Game Release",
    category: "Social",
    narrative: "A movie sequel you've waited 3 years for just released in IMAX. Friends are booking tickets right now.",
    choices: [
      {
        id: "d27-c1",
        text: "Wait 3 weeks for digital streaming release. Patience is free.",
        effect: { wallet: 0, sanity: -10, energy: 0, social: -10 },
        flavorText: "Muted Twitter spoilers. You can endure anything for 3 more days.",
      },
      {
        id: "d27-c2",
        text: "Go to morning 9 AM weekday show at local single screen cinema (₹90)",
        effect: { wallet: -90, sanity: +25, energy: +10, social: +15 },
        flavorText: "Single screen charm, whistle sound effects, budget protected!",
        badge: "Matinee Maestro"
      },
      {
        id: "d27-c3",
        text: "IMAX weekend night prime show with popcorn combo",
        effect: { wallet: -550, sanity: +30, energy: 0, social: +20 },
        flavorText: "Epic spectacle, catastrophic bank account crater.",
      }
    ]
  },
  {
    day: 28,
    title: "The Street Food Seduction",
    category: "Food",
    narrative: "Passing by the chaat stall. The aroma of sizzling aloo tikki and spicy pani puri fills the night air.",
    choices: [
      {
        id: "d28-c1",
        text: "One modest plate of Pani Puri (₹30) as mental celebration",
        effect: { wallet: -30, sanity: +20, energy: +10, social: +5 },
        flavorText: "Spicy mint water refreshed your soul. Best ₹30 investment of the week.",
      },
      {
        id: "d28-c2",
        text: "Keep walking, chew a piece of mint gum, cook rice at home",
        effect: { wallet: 0, sanity: -5, energy: +5, social: 0 },
        flavorText: "Iron discipline maintained. Almost at the finish line.",
      },
      {
        id: "d28-c3",
        text: "Feast on everything: Pav bhaji, tikki, kulfi, extra butter",
        effect: { wallet: -240, sanity: +25, energy: +15, social: +10 },
        flavorText: "Food coma achieved. Bank balance whimpers in agony.",
      }
    ]
  },
  {
    day: 29,
    title: "PENULTIMATE DAY: The Surprise Inspection",
    category: "Utility",
    narrative: "Day 29! Landlord announces sudden flat inspection tomorrow morning. Flat needs basic cleaning supplies (bleach, trash bags, freshener).",
    choices: [
      {
        id: "d29-c1",
        text: "Borrow cleaning supplies from downstairs flatmate",
        effect: { wallet: 0, sanity: +5, energy: -15, social: +10 },
        flavorText: "Mopped the floors spotless. Landlord smiled and approved deposit security.",
      },
      {
        id: "d29-c2",
        text: "Buy full cleaning combo pack from supermarket",
        effect: { wallet: -180, sanity: +5, energy: -10, social: 0 },
        flavorText: "House smells like lemon pine. Wallet took its second-to-last blow.",
      },
      {
        id: "d29-c3",
        text: "Speed sweep with old broom, light incense stick, dim lights",
        effect: { wallet: -10, sanity: +10, energy: -5, social: 0 },
        flavorText: "Aesthetic gloom hid the dust. Landlord didn't notice a thing.",
        badge: "Atmospheric Illusionist"
      }
    ]
  },
  {
    day: 30,
    title: "DAY 30: SALARY EVE & VICTORY",
    category: "Social",
    narrative: "YOU MADE IT TO DAY 30! At midnight tonight, salary/pocket money credits. How do you honor surviving the month?",
    choices: [
      {
        id: "d30-c1",
        text: "Cook a victory feast with remaining pantry ingredients & chai",
        effect: { wallet: -40, sanity: +40, energy: +30, social: +20 },
        flavorText: "You stared down financial ruin and won. You are unbreakable.",
        badge: "Champion of the Broke"
      },
      {
        id: "d30-c2",
        text: "Sit on balcony, sip hot water, and watch the clock tick to 12:00 AM",
        effect: { wallet: 0, sanity: +30, energy: +20, social: +10 },
        flavorText: "Pure meditative bliss. ₹0 spent on the final day. A masterclass in survival.",
        badge: "Zen Ascetic"
      },
      {
        id: "d30-c3",
        text: "Spend every single last remaining rupee right now in triumph",
        effect: { wallet: -200, sanity: +50, energy: +25, social: +25 },
        flavorText: "Balance hit exactly ₹0 as salary credited. High risk, legendary style.",
        badge: "Zero Balance Daredevil"
      }
    ]
  }
];

export const RANDOM_EVENTS: RandomEvent[] = [
  {
    id: "re-1",
    title: "Crumpled Note in Winter Jacket!",
    description: "You checked your coat pocket and found a crisp ₹100 note from 6 months ago!",
    impact: { wallet: +100, sanity: +15, energy: 0 },
    type: "positive"
  },
  {
    id: "re-2",
    title: "Bank Minimum Balance Penalty",
    description: "Your bank slapped you with ₹177 penalty for falling below minimum average balance. Peak irony.",
    impact: { wallet: -177, sanity: -20, energy: 0 },
    type: "negative"
  },
  {
    id: "re-3",
    title: "Free Office / College Leftover Pizza!",
    description: "Client meeting ordered too many gourmet pizzas. Four intact slices secured!",
    impact: { wallet: 0, sanity: +20, energy: +25 },
    type: "positive"
  },
  {
    id: "re-4",
    title: "Accidental UPI Payment to Wrong Scanner",
    description: "Paid ₹60 for tea to someone else's scanner. Chaiwala refuses to let you go without paying him too.",
    impact: { wallet: -60, sanity: -15, energy: 0 },
    type: "negative"
  },
  {
    id: "re-5",
    title: "Mom Sent Surprise Care Package!",
    description: "A tin of homemade laddoos, roasted nuts, and savory snacks arrived by courier.",
    impact: { wallet: 0, sanity: +35, energy: +30 },
    type: "positive"
  }
];

export const EMERGENCY_HUSTLES: Hustle[] = [
  {
    id: "h-1",
    title: "Sell Old Textbooks / Tech Cables",
    description: "Scour your room and sell 3 old college reference books to a second-hand stall.",
    reward: 350,
    energyCost: 15,
    sanityCost: 5,
    cooldownDays: 30,
    lastUsedDay: -99,
    oneTime: true
  },
  {
    id: "h-2",
    title: "Fast Consumer Opinion Surveys",
    description: "Complete 3 boring brand preference surveys online to redeem a quick shopping voucher/UPI.",
    reward: 120,
    energyCost: 20,
    sanityCost: 15,
    cooldownDays: 4,
    lastUsedDay: -99
  },
  {
    id: "h-3",
    title: "Emergency Emotional Call Home",
    description: "Call mom or elder sibling, casually mention you've been eating only rice. They send emergency care funds.",
    reward: 500,
    energyCost: 10,
    sanityCost: 10,
    cooldownDays: 14,
    lastUsedDay: -99
  },
  {
    id: "h-4",
    title: "Speed Debug Friend's Code / Presentation",
    description: "Fix a classmate's broken CSS or format their slide deck in exchange for direct UPI transfer.",
    reward: 250,
    energyCost: 25,
    sanityCost: 10,
    cooldownDays: 6,
    lastUsedDay: -99
  }
];
