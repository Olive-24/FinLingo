const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export interface LiveMarketData {
  fundHouse: string;
  schemeName: string;
  currentNav: number;
  navDate: string;
  benchmarkFdRate: number;
  historicalCAGR: number;
  lastUpdated?: string;
}

export interface FinancialNewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
  summary: string;
  source?: string;
}

export interface SavedGoalData {
  _id?: string;
  userId?: string;
  title: string;
  targetAmount: number;
  monthlySavings: number;
  tenureYears: number;
  expectedReturnRate?: number;
  projectedMaturity?: number;
}

// 1. LIVE VERNACULAR GENERATIVE AI ASSISTANT (Multi-Model REST API Cascade)
export const askVernacularAI = async (
  prompt: string,
  language: string = 'English'
): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!prompt || !prompt.trim()) {
    return "Please enter a valid financial question.";
  }

  if (!apiKey) {
    console.error("Missing VITE_GEMINI_API_KEY in .env");
    return "API key missing. Please add VITE_GEMINI_API_KEY in your .env file.";
  }

  // Model cascade: tries standard models in sequence until a valid candidate returns
  const candidateModels = [
    { version: 'v1beta', name: 'gemini-1.5-flash-latest' },
    { version: 'v1', name: 'gemini-1.5-flash' },
    { version: 'v1beta', name: 'gemini-2.0-flash' },
    { version: 'v1beta', name: 'gemini-pro' }
  ];

  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are FinLingo, an AI financial literacy assistant for Indian users. 
Explain this query clearly, concisely, and without complex financial jargon in plain ${language}:
"${prompt}"`
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 600
    }
  };

  for (const target of candidateModels) {
    const endpoint = `https://generativelanguage.googleapis.com/${target.version}/models/${target.name}:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn(`Failed endpoint [${target.name}]:`, errorData);
        continue;
      }

      const data = await response.json();
      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (generatedText) {
        return generatedText.trim();
      }
    } catch (networkError) {
      console.warn(`Network error with model [${target.name}]:`, networkError);
    }
  }

  return "Could not retrieve an answer from the AI engine. Please verify your API key access in Google AI Studio.";
};

// 2. LIVE AMFI MUTUAL FUND NAV & MARKET RATES
export const fetchLiveMarketData = async (): Promise<LiveMarketData> => {
  try {
    const res = await fetch(`${API_BASE}/market/funds`);
    if (!res.ok) throw new Error('Failed to fetch market data');
    return await res.json();
  } catch (error) {
    console.warn('Using baseline market rates (AMFI fallback):', error);
    return {
      fundHouse: 'PPFAS Mutual Fund',
      schemeName: 'Parag Parikh Flexi Cap Fund - Direct Plan - Growth',
      currentNav: 84.52,
      navDate: new Date().toLocaleDateString('en-IN'),
      benchmarkFdRate: 6.5,
      historicalCAGR: 14.2,
    };
  }
};

// 3. USER ONBOARDING & FINANCIAL GOAL PERSISTENCE
export const loginOrRegisterUser = async (userData: {
  phone: string;
  name?: string;
  language?: string;
  occupation?: string;
}) => {
  try {
    const res = await fetch(`${API_BASE}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error('Login failed');
    return await res.json();
  } catch (error) {
    console.warn('User login fallback:', error);
    return {
      _id: `user_${Date.now()}`,
      phone: userData.phone,
      name: userData.name || 'Ramesh G.',
      language: userData.language || 'Hindi',
      occupation: userData.occupation || 'Salaried',
    };
  }
};

export const saveUserGoal = async (goalData: SavedGoalData) => {
  try {
    const res = await fetch(`${API_BASE}/goals/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(goalData),
    });
    if (!res.ok) throw new Error('Failed to save goal');
    return await res.json();
  } catch (error) {
    console.warn('Goal saving client fallback:', error);
    return {
      success: true,
      goal: { ...goalData, _id: `goal_${Date.now()}` },
    };
  }
};

export const fetchUserGoals = async (userId: string): Promise<SavedGoalData[]> => {
  try {
    const res = await fetch(`${API_BASE}/goals/${userId}`);
    if (!res.ok) throw new Error('Failed to fetch goals');
    return await res.json();
  } catch (error) {
    console.warn('Fetch user goals fallback:', error);
    return [];
  }
};

// 4. REGULATORY ALERTS & FINANCIAL UPDATES
export const fetchFinancialNews = async (): Promise<FinancialNewsItem[]> => {
  try {
    const res = await fetch(`${API_BASE}/news/updates`);
    if (!res.ok) throw new Error('Failed to fetch news');
    return await res.json();
  } catch (error) {
    console.warn('Financial news fallback:', error);
    return [
      {
        id: 1,
        title: 'RBI enhances UPI Lite offline transaction limits to ₹1,000',
        category: 'Digital Payments',
        date: 'Latest Circular',
        summary: 'Users can make PIN-free micro-payments up to ₹1,000 via on-device wallets without network congestion.',
        source: 'RBI Official Notification',
      },
      {
        id: 2,
        title: 'Kisan Credit Card (KCC) 4% Prompt Repayment Incentive Active',
        category: 'Govt Subsidies',
        date: 'Active Scheme',
        summary: '3% prompt repayment incentive brings effective interest down from 7% to 4% per annum for prompt borrowers.',
        source: 'NABARD / Ministry of Agriculture',
      },
    ];
  }
};
