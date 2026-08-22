import { useState } from 'react';
import type { LanguageCode, UserProfile } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AnimatedDemoStrip } from './components/AnimatedDemoStrip';
import { ThreeStepVisual } from './components/ThreeStepVisual';
import { B2BSection } from './components/B2BSection';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { B2BPartnerModal } from './components/B2BPartnerModal';
import { PrivacyModal } from './components/PrivacyModal';
import { AuthScreen } from './components/AuthScreen';
import { OnboardingWizard } from './components/OnboardingWizard';
import { VoiceChatInterface } from './components/VoiceChatInterface';
import { SimulatorPage } from './components/SimulatorPage';
import { GoalPlanningCardsPage } from './components/GoalPlanningCardsPage';
import { MythBustingSection } from './components/MythBustingSection';
import { B2BPartnerDashboard } from './components/B2BPartnerDashboard';
import { PricingPage } from './components/PricingPage';
import { DashboardWorkspace } from './components/DashboardWorkspace';

export function App() {
  const [currentView, setCurrentView] = useState<
    'landing' | 'auth' | 'onboarding' | 'main-app' | 'simulator' | 'goals' | 'myths' | 'dashboard' | 'b2b-dashboard' | 'pricing'
  >('landing');
  
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');

  // Modals on Landing Page
  const [isB2BModalOpen, setIsB2BModalOpen] = useState<boolean>(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);

  // Authenticated User Profile Session
  const [userProfile, setUserProfile] = useState<Partial<UserProfile> | null>(null);

  // Auth Success -> Onboarding
  const handleAuthSuccess = (authUser: Partial<UserProfile>) => {
    const updated = { ...userProfile, ...authUser };
    setUserProfile(updated);
    setCurrentView('onboarding');
  };

  // Onboarding Complete -> Main Voice/Chat Workspace
  const handleOnboardingComplete = (completedProfile: UserProfile) => {
    setUserProfile(completedProfile);
    setCurrentLang(completedProfile.preferredLanguage);
    setCurrentView('main-app');
  };

  // Log out -> Landing Page
  const handleLogout = () => {
    setUserProfile(null);
    setCurrentView('landing');
  };

  // VIEW 1: PREMIUM SUBSCRIPTION & PRICING PAGE
  if (currentView === 'pricing') {
    return (
      <PricingPage
        currentLang={currentLang}
        onSelectLang={(lang) => setCurrentLang(lang)}
        onBack={() => {
          if (userProfile && userProfile.isOnboardingCompleted) {
            setCurrentView('main-app');
          } else {
            setCurrentView('landing');
          }
        }}
        userProfile={userProfile}
      />
    );
  }

  // VIEW 2: SEPARATE B2B PARTNER ENTERPRISE DASHBOARD
  if (currentView === 'b2b-dashboard') {
    return (
      <B2BPartnerDashboard
        currentLang={currentLang}
        onSelectLang={(lang) => setCurrentLang(lang)}
        onClose={() => setCurrentView('landing')}
      />
    );
  }

  // VIEW 2: USER CONSOLE DASHBOARD WORKSPACE (REFRACTION DESIGN SYSTEM)
  if (currentView === 'dashboard') {
    return (
      <DashboardWorkspace
        userProfile={userProfile}
        currentLang={currentLang}
        onSelectLang={(lang) => {
          setCurrentLang(lang);
          if (userProfile) {
            setUserProfile({ ...userProfile, preferredLanguage: lang });
          }
        }}
        onOpenChat={() => {
          if (userProfile && userProfile.isOnboardingCompleted) {
            setCurrentView('main-app');
          } else {
            setCurrentView('auth');
          }
        }}
        onOpenGoals={() => setCurrentView('goals')}
        onOpenMyths={() => setCurrentView('myths')}
        onOpenB2B={() => setCurrentView('b2b-dashboard')}
        onLogout={handleLogout}
      />
    );
  }

  // VIEW 2: STANDALONE MYTH-BUSTING & FINANCIAL FAQ SECTION
  if (currentView === 'myths') {
    return (
      <MythBustingSection
        standalonePage={true}
        currentLang={currentLang}
        onSelectLang={(lang) => setCurrentLang(lang)}
        onBack={() => {
          if (userProfile && userProfile.isOnboardingCompleted) {
            setCurrentView('main-app');
          } else {
            setCurrentView('landing');
          }
        }}
        onOpenSimulator={() => setCurrentView('simulator')}
        onAskAIWithQuestion={() => {
          if (!userProfile || !userProfile.isOnboardingCompleted) {
            setCurrentView('auth');
          } else {
            setCurrentView('main-app');
          }
        }}
      />
    );
  }

  // VIEW 2: STANDALONE GOAL PLANNING CARDS PAGE
  if (currentView === 'goals') {
    return (
      <GoalPlanningCardsPage
        userProfile={userProfile}
        currentLang={currentLang}
        onSelectLang={(lang) => setCurrentLang(lang)}
        onBack={() => {
          if (userProfile && userProfile.isOnboardingCompleted) {
            setCurrentView('main-app');
          } else {
            setCurrentView('landing');
          }
        }}
        onOpenSimulatorWithGoal={() => {
          if (userProfile && userProfile.isOnboardingCompleted) {
            setCurrentView('main-app');
          } else {
            setCurrentView('simulator');
          }
        }}
      />
    );
  }

  // VIEW 3: STANDALONE SAVINGS & SIP SIMULATOR PAGE
  if (currentView === 'simulator') {
    return (
      <SimulatorPage
        currentLang={currentLang}
        onSelectLang={(lang) => setCurrentLang(lang)}
        onOpenGoalPlanning={() => setCurrentView('goals')}
        onOpenMythBusting={() => setCurrentView('myths')}
        onOpenDashboard={() => setCurrentView('dashboard')}
        onBackToChat={() => {
          if (userProfile && userProfile.isOnboardingCompleted) {
            setCurrentView('main-app');
          } else {
            setCurrentView('landing');
          }
        }}
        onAskAIWithSummary={(summary) => {
          if (!userProfile || !userProfile.isOnboardingCompleted) {
            setCurrentView('auth');
          } else {
            if (summary) {
              // Post calculation summary
              setCurrentView('main-app');
            }
          }
        }}
      />
    );
  }

  // VIEW 4: MAIN VOICE CHAT INTERFACE POST-ONBOARDING
  if (currentView === 'main-app' && userProfile && userProfile.isOnboardingCompleted) {
    return (
      <VoiceChatInterface
        user={userProfile as UserProfile}
        onLogout={handleLogout}
        onReOnboard={() => setCurrentView('onboarding')}
        onOpenGoalPlanning={() => setCurrentView('goals')}
        onOpenMythBusting={() => setCurrentView('myths')}
        onOpenDashboard={() => setCurrentView('dashboard')}
        onSelectLang={(lang) => {
          setCurrentLang(lang);
          setUserProfile({ ...userProfile, preferredLanguage: lang });
        }}
      />
    );
  }

  // VIEW 5: ONBOARDING WIZARD (3 SCREENS)
  if (currentView === 'onboarding') {
    return (
      <OnboardingWizard
        initialUser={userProfile || { preferredLanguage: currentLang }}
        onComplete={handleOnboardingComplete}
      />
    );
  }

  // VIEW 6: AUTH SCREEN (PHONE + OTP & GOOGLE OAUTH)
  if (currentView === 'auth') {
    return (
      <AuthScreen
        currentLang={currentLang}
        onSuccess={handleAuthSuccess}
        onClose={() => setCurrentView('landing')}
      />
    );
  }

  // VIEW 7: PUBLIC LANDING PAGE
  return (
    <div className="min-h-screen bg-[#EEE9DF] text-[#1B2632] selection:bg-[#1B2632] selection:text-white relative overflow-x-hidden">
      {/* Sticky Top Header */}
      <Navbar
        currentLang={currentLang}
        onSelectLang={(lang) => setCurrentLang(lang)}
        onOpenB2BModal={() => setIsB2BModalOpen(true)}
        onOpenOnboarding={() => setCurrentView('auth')}
        onOpenGoalPlanning={() => setCurrentView('goals')}
        onOpenMythBusting={() => setCurrentView('myths')}
        onOpenDashboard={() => setCurrentView('dashboard')}
      />

      {/* Main Landing Page Content */}
      <main>
        {/* Hero Section */}
        <Hero
          currentLang={currentLang}
          onOpenOnboarding={() => setCurrentView('auth')}
          onOpenB2BModal={() => setIsB2BModalOpen(true)}
        />

        {/* Animated Demo Strip (Voice -> AI -> Interactive Sandbox) */}
        <AnimatedDemoStrip currentLang={currentLang} />

        {/* 3-Step Visual Guide (Bolo, Samjho, Simulate Karo) */}
        <ThreeStepVisual
          currentLang={currentLang}
          onOpenOnboarding={() => setCurrentView('auth')}
        />

        {/* MYTH-BUSTING & FINANCIAL FAQ SECTION ON LANDING PAGE */}
        <MythBustingSection
          currentLang={currentLang}
          onSelectLang={(lang) => setCurrentLang(lang)}
          onOpenSimulator={() => setCurrentView('simulator')}
          onAskAIWithQuestion={() => setCurrentView('auth')}
        />

        {/* Standalone Simulator & Goal Cards Callout Banner */}
        <section className="py-16 bg-[#F4F0E8] border-t border-[#1B2632]/10 text-center">
          <div className="max-w-4xl mx-auto px-6 space-y-6">
            <div className="space-y-2">
              <span className="bg-[#A35139]/10 text-[#A35139] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
                PRE-BUILT SIMULATORS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1B2632]">
                Explore Pre-Built Financial Goal Templates
              </h3>
              <p className="text-sm text-[#5C6B7A] max-w-2xl mx-auto leading-relaxed">
                Child's Education, Wedding, Emergency Fund, Home Down Payment, Retirement & Custom Goals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setCurrentView('goals')}
                className="bg-[#1B2632] hover:bg-[#2C3B4D] text-white px-7 py-3 rounded-full text-sm font-semibold shadow-sm w-full sm:w-auto cursor-pointer"
              >
                Browse Goal Planning Cards Grid
              </button>

              <button
                onClick={() => setCurrentView('simulator')}
                className="bg-white hover:bg-[#EEE9DF] text-[#1B2632] border border-[#C9C1B1] px-7 py-3 rounded-full text-sm font-semibold w-full sm:w-auto cursor-pointer"
              >
                Open Standalone Simulator Page
              </button>
            </div>
          </div>
        </section>

        {/* For Banks & NBFCs B2B Revenue & Trust Section */}
        <B2BSection
          currentLang={currentLang}
          onOpenB2BModal={() => setIsB2BModalOpen(true)}
        />

        {/* Social Proof & Testimonials */}
        <Testimonials currentLang={currentLang} />
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onSelectLang={(lang) => setCurrentLang(lang)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenB2BModal={() => setIsB2BModalOpen(true)}
        onOpenOnboarding={() => setCurrentView('auth')}
      />

      {/* Modals */}
      <B2BPartnerModal
        isOpen={isB2BModalOpen}
        onClose={() => setIsB2BModalOpen(false)}
        onOpenDashboardDemo={() => setCurrentView('b2b-dashboard')}
      />

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}

export default App;
