import { useState } from 'react';
import type { LanguageCode, UserProfile } from './types';
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
import { FinLingoLanding } from './components/FinLingoLanding';

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
    <>
      <FinLingoLanding
        onOpenAuth={() => setCurrentView('auth')}
        onOpenDashboard={() => setCurrentView('dashboard')}
        onOpenGoals={() => setCurrentView('goals')}
        onOpenMyths={() => setCurrentView('myths')}
        onOpenB2B={() => setIsB2BModalOpen(true)}
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
    </>
  );
}

export default App;
