# FinLingo — Financial Understanding in Your Own Language ⚡

FinLingo is an AI-powered vernacular financial literacy and simulation platform built for tier-2/3 Indian borrowers, rural entrepreneurs, first-time investors, and financial institutions (Banks & NBFCs).

🔗 **GitHub Repository**: [https://github.com/Olive-24/FinLingo](https://github.com/Olive-24/FinLingo)

---

## ✨ Features Built

### 1. Public Landing Page
- **Hero Section**: Value proposition headline *"Financial understanding in your own language"* with glowing emerald UI tokens and trust metrics (50,000+ borrowers across 12+ regional languages).
- **Animated & Interactive Demo Strip**: Autoplay mini preview loop illustrating Voice Input → Jargon-Free AI Explanation → Interactive Sandbox Simulator.
- **3-Step Visual Guide**: Visual cards showcasing *"Speak, Understand, Simulate"*.
- **"For Banks & NBFCs" B2B Portal**: Highlights B2B partnership value (3.4x lead conversion lift, 42% NPA drop) with a dedicated **B2B Lead-Capture Form Modal**.
- **Social Proof & Testimonials**: User stories from micro-entrepreneurs, small retailers, and bank officers with language tags.
- **Dynamic Multilingual Switcher**: Dropdown supporting 8 regional languages (English, Hindi, Tamil, Telugu, Marathi, Bengali, Gujarati, Kannada) updating UI copy in real time.

### 2. Auth & Onboarding Flow
- **Phone + OTP Authentication**: Tier-2/3 friendly mobile login with country code selector, 6-digit OTP verification, timer, and resend option.
- **Google OAuth Backup**: One-click Google login option for tech-savvy users.
- **Instant Quick Demo Login**: One-tap test access for fast evaluation.
- **3-Screen Onboarding Wizard**:
  - **Screen 1**: Language preference with audio sample previews.
  - **Screen 2**: Profile setup (Name, Age Bracket, Occupation Type).
  - **Screen 3**: Financial Comfort Assessment ("Have you heard of SIPs/mutual funds before?") calibrating AI explanation depth (**Zero Jargon Mode**, **Guided Learning Mode**, **Standard Simulator Mode**, or **Pro Mode**).

### 3. Main Conversational Interface (Core Product)
- **WhatsApp-Style Tap-to-Speak Mic**: Animated mic button with live recording timer and wave visualizer.
- **Real-Time Live Transcription (Google Assistant Style)**: Animated speech overlay card rendering real-time transcribed text in local language script.
- **Dual-Mode AI Output**: Rich text response bubbles paired with a **Text-to-Speech (TTS) Audio Player** (Play/Pause, Speed 1x/1.25x/1.5x, audio progress scrubber).
- **Inline Goal Detection**: Scans prompt keywords (e.g. *"daughter's wedding"*, *"children's education"*, *"tractor loan"*, *"shop expansion"*) and embeds inline goal cards with a **"Simulate this goal"** CTA button.
- **Dedicated Goal Simulator Modal**: Interactive sliders for Target Amount, Time Horizon, and Return Rates (FD 6.5%, SIP 12%, Equity 15%) with inflation impact calculation.
- **Sidebar & History Drawer**: Conversation history threads, quick-access goal template cards, language switcher, profile footer, and mobile drawer menu.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Vanilla CSS Design System (`src/index.css`) with glassmorphism, gradient accents, and responsive layout utilities
- **Icons**: Lucide React
- **Build Tooling**: Vite v8 + TypeScript `tsc`

---

## 🚀 Local Setup & Development

```bash
# Clone the repository
git clone https://github.com/Olive-24/FinLingo.git

# Navigate into the project folder
cd FinLingo

# Install dependencies
npm install

# Run the local development server
npm run dev

# Build for production
npm run build
```

---

## 📄 License

Created for **FinLingo**. All rights reserved.
