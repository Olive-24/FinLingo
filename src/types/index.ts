export type LanguageCode = 'en' | 'hi' | 'ta' | 'te' | 'mr' | 'bn' | 'gu' | 'kn';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export type AgeBracket = '18-24' | '25-34' | '35-44' | '45-59' | '60+';

export type OccupationType =
  | 'student'
  | 'shopkeeper'
  | 'gig_worker'
  | 'salaried'
  | 'farmer'
  | 'micro_entrepreneur'
  | 'homemaker'
  | 'other';

export type FinancialComfortLevel =
  | 'beginner'
  | 'basic'
  | 'moderate'
  | 'advanced';

export interface UserProfile {
  id: string;
  phone: string;
  email?: string;
  authProvider: 'phone' | 'google' | 'demo';
  name: string;
  preferredLanguage: LanguageCode;
  ageBracket: AgeBracket;
  occupation: OccupationType;
  financialComfort: FinancialComfortLevel;
  isOnboardingCompleted: boolean;
  createdAt: string;
}

export type GoalCategory =
  | 'wedding'
  | 'education'
  | 'business'
  | 'agriculture'
  | 'home'
  | 'emergency'
  | 'retirement';

export interface DetectedGoal {
  id: string;
  title: string;
  category: GoalCategory;
  targetAmount: number;
  timeframeYears: number;
  suggestedMonthlySavings: number;
  description: string;
}

export interface SavedGoalProgress {
  id: string;
  title: string;
  category: GoalCategory;
  targetAmount: number;
  currentSavedAmount: number;
  timeframeYears: number;
  suggestedMonthlySavings: number;
  description: string;
  lastUpdated: string;
}

export interface VoiceChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  translatedText?: string;
  audioUrl?: string;
  timestamp: string;
  detectedGoal?: DetectedGoal;
  loanCalculation?: {
    principal: number;
    interestRate: number;
    tenureMonths: number;
    monthlyEMI: number;
    totalInterest: number;
  };
}

export interface ChatThread {
  id: string;
  title: string;
  lastUpdated: string;
  messagesCount: number;
  language: LanguageCode;
  messages: VoiceChatMessage[];
}

export interface TranslationContent {
  nav: {
    features: string;
    howItWorks: string;
    forBanks: string;
    testimonials: string;
    partnerBtn: string;
    startFreeBtn: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    subTitle: string;
    startFree: string;
    partnerUs: string;
    statsText: string;
    languagesSupported: string;
    noJargon: string;
    riskFree: string;
  };
  demo: {
    badge: string;
    title: string;
    subtitle: string;
    step1Tag: string;
    step1Title: string;
    step1Desc: string;
    step2Tag: string;
    step2Title: string;
    step2Desc: string;
    step3Tag: string;
    step3Title: string;
    step3Desc: string;
    voiceSample: string;
    aiExplanation: string;
    simulatorHeading: string;
  };
  steps: {
    badge: string;
    title: string;
    subtitle: string;
    speakTitle: string;
    speakDesc: string;
    understandTitle: string;
    understandDesc: string;
    simulateTitle: string;
    simulateDesc: string;
  };
  b2b: {
    badge: string;
    title: string;
    subtitle: string;
    metric1: string;
    metric1Label: string;
    metric2: string;
    metric2Label: string;
    metric3: string;
    metric3Label: string;
    cta: string;
  };
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
  };
  footer: {
    tagline: string;
    product: string;
    forInstitutions: string;
    legal: string;
    privacy: string;
    terms: string;
    contact: string;
    rights: string;
  };
}

export interface B2BFormData {
  fullName: string;
  institutionName: string;
  workEmail: string;
  phone: string;
  institutionType: 'Bank' | 'NBFC' | 'MFI' | 'Fintech' | 'Other';
  estimatedUsers: string;
  message: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  quote: string;
  rating: number;
  language: string;
  badge?: string;
}
