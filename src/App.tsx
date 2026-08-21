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

export function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'onboarding' | 'main-app'>(
    'landing'
  );
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

  // VIEW 1: MAIN VOICE CHAT INTERFACE POST-ONBOARDING
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

  // VIEW 2: ONBOARDING WIZARD (3 SCREENS)
  if (currentView === 'onboarding') {
    return (
      <OnboardingWizard
        initialUser={userProfile || { preferredLanguage: currentLang }}
        onComplete={handleOnboardingComplete}
      />
    );
  }

  // VIEW 3: AUTH SCREEN (PHONE + OTP & GOOGLE OAUTH)
  if (currentView === 'auth') {
    return (
      <AuthScreen
        currentLang={currentLang}
        onSuccess={handleAuthSuccess}
        onClose={() => setCurrentView('landing')}
      />
    );
  }

  // VIEW 4: PUBLIC LANDING PAGE
  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
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

        {/* 3-Step Visual Guide (Speak, Understand, Simulate) */}
        <ThreeStepVisual
          currentLang={currentLang}
          onOpenOnboarding={() => setCurrentView('auth')}
        />

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
