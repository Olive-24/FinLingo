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

export function App() {
  const [currentView, setCurrentView] = useState<
    'landing' | 'auth' | 'onboarding' | 'main-app' | 'simulator'
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

  // VIEW 1: STANDALONE SAVINGS & SIP SIMULATOR PAGE
  if (currentView === 'simulator') {
    return (
      <SimulatorPage
        currentLang={currentLang}
        onSelectLang={(lang) => setCurrentLang(lang)}
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

  // VIEW 2: MAIN VOICE CHAT INTERFACE POST-ONBOARDING
  if (currentView === 'main-app' && userProfile && userProfile.isOnboardingCompleted) {
    return (
      <VoiceChatInterface
        user={userProfile as UserProfile}
        onLogout={handleLogout}
        onReOnboard={() => setCurrentView('onboarding')}
        onSelectLang={(lang) => {
          setCurrentLang(lang);
          setUserProfile({ ...userProfile, preferredLanguage: lang });
        }}
      />
    );
  }

  // VIEW 3: ONBOARDING WIZARD (3 SCREENS)
  if (currentView === 'onboarding') {
    return (
      <OnboardingWizard
        initialUser={userProfile || { preferredLanguage: currentLang }}
        onComplete={handleOnboardingComplete}
      />
    );
  }

  // VIEW 4: AUTH SCREEN (PHONE + OTP & GOOGLE OAUTH)
  if (currentView === 'auth') {
    return (
      <AuthScreen
        currentLang={currentLang}
        onSuccess={handleAuthSuccess}
        onClose={() => setCurrentView('landing')}
      />
    );
  }

  // VIEW 5: PUBLIC LANDING PAGE
  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#2B2B2B] selection:bg-[#0F7173] selection:text-white">
      {/* Sticky Top Header */}
      <Navbar
        currentLang={currentLang}
        onSelectLang={(lang) => setCurrentLang(lang)}
        onOpenB2BModal={() => setIsB2BModalOpen(true)}
        onOpenOnboarding={() => setCurrentView('auth')}
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

        {/* Standalone Simulator Callout Banner */}
        <section className="py-10 bg-white border-y border-slate-200 text-center">
          <div className="container mx-auto px-4 space-y-4">
            <h3 className="text-2xl font-extrabold text-[#2B2B2B]">
              Want to calculate savings manually without talking to AI?
            </h3>
            <p className="text-xs text-[#6B6B6B]">
              Open our standalone Growth & Fixed Deposit Simulator with live interactive charts.
            </p>
            <button
              onClick={() => setCurrentView('simulator')}
              className="btn btn-secondary px-8 py-3 text-sm font-bold"
            >
              Open Standalone Simulator Page
            </button>
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
      />

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}

export default App;
