import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Send,
  Sparkles,
  Sliders,
  LogOut,
  RotateCcw,
  Menu,
  Play,
  Pause,
  ArrowRight,
  Sparkle,
} from 'lucide-react';
import type {
  UserProfile,
  VoiceChatMessage,
  LanguageCode,
  ChatThread,
  DetectedGoal,
} from '../types';
import { LANGUAGES } from '../data/languages';
import { Sidebar } from './Sidebar';
import { GoalSimulatorModal } from './GoalSimulatorModal';
import { MYTHS_DATA } from '../data/mythsData';
import { Button } from './ui/Primitives';
import { askVernacularAI } from '../services/api';

interface VoiceChatInterfaceProps {
  user: UserProfile;
  onLogout: () => void;
  onReOnboard: () => void;
  onSelectLang: (lang: LanguageCode) => void;
  onOpenGoalPlanning?: () => void;
  onOpenMythBusting?: () => void;
  onOpenDashboard?: () => void;
}

export const VoiceChatInterface: React.FC<VoiceChatInterfaceProps> = ({
  user,
  onLogout,
  onReOnboard,
  onSelectLang,
  onOpenGoalPlanning,
  onOpenMythBusting,
  onOpenDashboard,
}) => {
  const [tappedChipId, setTappedChipId] = useState<string | null>(null);
  const currentLangObj = LANGUAGES.find((l) => l.code === user.preferredLanguage) || LANGUAGES[0];

  // Mobile sidebar drawer state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Chat Threads state
  const [threads, setThreads] = useState<ChatThread[]>([
    {
      id: 'thread_1',
      title: 'Personal Loan & EMI Breakdown',
      lastUpdated: 'Just now',
      messagesCount: 2,
      language: user.preferredLanguage,
      messages: [
        {
          id: 'msg_init',
          sender: 'ai',
          text: `नमस्ते ${user.name}! I am FinLingo, your financial assistant. Ask me any question about personal loans, EMIs, or savings in ${currentLangObj.nativeName}!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    },
  ]);

  const [activeThreadId, setActiveThreadId] = useState<string>('thread_1');

  // Currently active thread
  const currentThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  // Voice recording & live transcription states
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [liveTranscription, setLiveTranscription] = useState<string>('');
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);

  // Text input box query
  const [inputQuery, setInputQuery] = useState<string>('');

  // TTS Audio Player States
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);

  // Active Goal Simulator Modal State
  const [simGoal, setSimGoal] = useState<DetectedGoal | null>(null);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState<boolean>(false);

  // Live recording timer
  useEffect(() => {
    if (!isRecording) {
      setRecordingSeconds(0);
      return;
    }
    const interval = setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRecording]);

  // Handle New Thread Creation
  const handleNewThread = () => {
    const newThreadId = `thread_${Date.now()}`;
    const newThread: ChatThread = {
      id: newThreadId,
      title: 'New Conversation',
      lastUpdated: 'Just now',
      messagesCount: 1,
      language: user.preferredLanguage,
      messages: [
        {
          id: `msg_${Date.now()}`,
          sender: 'ai',
          text: `Hello ${user.name}! Speak or type your financial question in ${currentLangObj.nativeName}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    };

    setThreads((prev) => [newThread, ...prev]);
    setActiveThreadId(newThreadId);
  };

  // Inline Goal Detection Logic
  const detectGoalInPrompt = (prompt: string): DetectedGoal | undefined => {
    const lower = prompt.toLowerCase();
    if (lower.includes('wedding') || lower.includes('marriage') || lower.includes('शादी') || lower.includes('कन्यादान')) {
      return {
        id: `g_wedding_${Date.now()}`,
        title: "Daughter's / Son's Wedding Fund",
        category: 'wedding',
        targetAmount: 500000,
        timeframeYears: 5,
        suggestedMonthlySavings: 6500,
        description: 'Build an inflation-protected savings fund for marriage expenses over 5 years.',
      };
    }
    if (lower.includes('education') || lower.includes('college') || lower.includes('school') || lower.includes('पढ़ाई')) {
      return {
        id: `g_edu_${Date.now()}`,
        title: "Children's Higher Education",
        category: 'education',
        targetAmount: 800000,
        timeframeYears: 7,
        suggestedMonthlySavings: 7200,
        description: 'Compounding mutual fund SIP strategy for college tuition.',
      };
    }
    if (lower.includes('tractor') || lower.includes('kisan') || lower.includes('agri') || lower.includes('खेती')) {
      return {
        id: `g_agri_${Date.now()}`,
        title: 'Agri Equipment & Tractor Purchase',
        category: 'agriculture',
        targetAmount: 350000,
        timeframeYears: 3,
        suggestedMonthlySavings: 9200,
        description: 'Simulate Kisan Credit Card subvention & monthly tractor EMI.',
      };
    }
    if (lower.includes('shop') || lower.includes('kirana') || lower.includes('business') || lower.includes('दुकान')) {
      return {
        id: `g_shop_${Date.now()}`,
        title: 'Kirana Shop Expansion',
        category: 'business',
        targetAmount: 200000,
        timeframeYears: 2,
        suggestedMonthlySavings: 7500,
        description: 'Working capital & stock expansion loan simulation.',
      };
    }
    return undefined;
  };

  // Start Voice Recording (Elevated Marigold Button Tap-to-Speak)
  const startRecording = () => {
    setIsRecording(true);
    setLiveTranscription('Transcribing speech...');

    // Simulate word-by-word live transcription
    const samplePhrases = [
      '“मुझे अपनी बेटी की शादी के लिए ₹5 लाख जोड़ने हैं, 5 साल में कितना बचाना होगा?”',
      '“ I need to save for my daughter’s wedding in 5 years”',
      '“दूकान बढ़ाने के लिए ₹2 लाख का लोन EMI कितना बनेगा?”',
      '“ What is the monthly SIP required to reach ₹8 Lakhs for college?”',
    ];
    const targetPhrase = samplePhrases[Math.floor(Math.random() * samplePhrases.length)];

    let charIdx = 0;
    const interval = setInterval(() => {
      charIdx += 2;
      setLiveTranscription(targetPhrase.substring(0, charIdx));
      if (charIdx >= targetPhrase.length) {
        clearInterval(interval);
      }
    }, 60);
  };

  // Stop Recording & Send Message
  const stopRecordingAndSend = () => {
    setIsRecording(false);
    const finalTranscript = liveTranscription.replace(/^“|”$/g, '').trim();
    if (finalTranscript && finalTranscript !== 'Transcribing speech...') {
      handleUserSend(finalTranscript);
    }
    setLiveTranscription('');
  };

  // Send User Message
  const handleUserSend = async (textInput?: string) => {
    const textToSend = textInput || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg: VoiceChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...currentThread.messages, userMsg];
    const detectedGoal = detectGoalInPrompt(textToSend);

    setInputQuery('');

    // Fetch Live Generative Vernacular AI Response from Backend Service
    let aiText = '';
    let loanCalc = undefined;

    const lowerSend = textToSend.toLowerCase();
    const matchedMyth = MYTHS_DATA.find((m) => {
      const qEng = m.question.toLowerCase();
      const tag = m.tag.toLowerCase();
      return lowerSend.includes(qEng) || lowerSend.includes(tag);
    });

    if (matchedMyth) {
      aiText = matchedMyth.answer;
    } else if (detectedGoal) {
      aiText = `I noticed you are planning for **${detectedGoal.title}**!
To reach ₹${detectedGoal.targetAmount.toLocaleString('en-IN')} in ${detectedGoal.timeframeYears} years, saving a disciplined ~₹${detectedGoal.suggestedMonthlySavings}/month in a balanced SIP can help beat inflation.

Tap **"Simulate this goal"** below to adjust timeframe & return parameters live!`;
    } else if (textToSend.includes('₹50,000') || textToSend.includes('EMI')) {
      aiText = `For a Personal Loan of ₹50,000 at 14% p.a. over 24 months:
• Monthly EMI: ₹2,401/month.
• Total Interest Paid: ₹7,624.
• Zero prepayment penalty if paid early via UPI.`;
      loanCalc = {
        principal: 50000,
        interestRate: 14,
        tenureMonths: 24,
        monthlyEMI: 2401,
        totalInterest: 7624,
      };
    } else {
      // Call Live Gemini AI Endpoint via service layer
      const aiResponse = await askVernacularAI(textToSend, currentLangObj.nativeName);
      aiText = typeof aiResponse === 'string' ? aiResponse : (aiResponse?.answer || String(aiResponse));
    }

    const aiMsg: VoiceChatMessage = {
      id: `ai_${Date.now()}`,
      sender: 'ai',
      text: aiText,
      detectedGoal: detectedGoal,
      loanCalculation: loanCalc,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const finalMessages = [...updatedMessages, aiMsg];
    const updatedThreads = threads.map((t) =>
      t.id === activeThreadId
        ? {
            ...t,
            title: textToSend.length > 25 ? `${textToSend.substring(0, 25)}...` : textToSend,
            lastUpdated: 'Just now',
            messagesCount: finalMessages.length,
            messages: finalMessages,
          }
        : t
    );

    setThreads(updatedThreads);
    setPlayingAudioId(aiMsg.id);
  };

  const handleOpenGoalSimulator = (goal: DetectedGoal) => {
    setSimGoal(goal);
    setIsGoalModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#2B2B2B] flex flex-col lg:flex-row">
      {/* SIDEBAR COMPONENT */}
      <Sidebar
        user={user}
        threads={threads}
        activeThreadId={activeThreadId}
        onSelectThread={(id) => setActiveThreadId(id)}
        onNewThread={handleNewThread}
        onSelectGoalShortcut={(goal) => handleOpenGoalSimulator(goal)}
        onSelectLang={onSelectLang}
        onReOnboard={onReOnboard}
        onOpenGoalPlanning={onOpenGoalPlanning}
        onOpenMythBusting={onOpenMythBusting}
        onOpenDashboard={onOpenDashboard}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* MAIN WORKSPACE CANVAS */}
      <div className="flex-1 flex flex-col justify-between h-screen overflow-hidden relative bg-[#F4E6DF] text-[#2A1A20]">
        {/* HEADER BAR WITH SEGMENTED CONTROL TABS */}
        <header className="bg-[#F4E6DF]/95 backdrop-blur-md border-b border-[#E6D2C8] px-4 sm:px-6 py-3.5 sticky top-0 z-20 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-[#FBF2EC] border border-[#E6D2C8] text-[#3B2530]"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Title & Active Language */}
            <div>
              <h2 className="font-extrabold text-base text-[#2A1A20] tracking-tight flex items-center gap-2 font-sans">
                <span>{currentThread.title}</span>
                <span className="w-2 h-2 rounded-full bg-[#3B2530] animate-pulse" />
              </h2>
              <p className="text-[11px] text-[#8C7378]">
                FinLingo AI Console • <span className="text-[#3B2530] font-bold">{currentLangObj.flag} {currentLangObj.nativeName}</span>
              </p>
            </div>
          </div>

          {/* Segmented Control Mode Tabs */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 bg-[#FBF2EC] border border-[#E6D2C8] p-1 rounded-full shadow-inner">
              <button
                className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#3B2530] text-white shadow-sm"
              >
                Voice Chat
              </button>

              {onOpenGoalPlanning && (
                <button
                  onClick={onOpenGoalPlanning}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#8C7378] hover:text-[#3B2530] transition-colors"
                >
                  Goal Cards
                </button>
              )}

              {onOpenMythBusting && (
                <button
                  onClick={onOpenMythBusting}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#8C7378] hover:text-[#3B2530] transition-colors"
                >
                  Myth-Buster
                </button>
              )}
            </div>

            {onOpenDashboard && (
              <Button variant="secondary" size="sm" onClick={onOpenDashboard}>
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Profile</span>
              </Button>
            )}

            <button
              onClick={onReOnboard}
              className="p-2 rounded-full bg-[#FBF2EC] border border-[#E6D2C8] text-[#3B2530] text-xs font-bold hover:bg-[#3B2530]/10"
              title="Change Language or Profile"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px]">Re-Setup</span>
            </button>

            <button
              onClick={onLogout}
              className="p-2 rounded-full bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-500 text-xs"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* CHAT MESSAGES STREAM CONTAINER */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin max-w-4xl mx-auto w-full">
          {/* HORIZONTALLY SCROLLABLE ROW OF ROUNDED CHIP BUTTONS (Myth-Busting Chips) */}
          <div className="bg-white p-3.5 sm:p-4 rounded-3xl border border-slate-200 shadow-sm space-y-2.5 mb-2">
            <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-[#6B6B6B]">
              <span className="flex items-center gap-1 text-[#0F7173]">
                <Sparkles className="w-3.5 h-3.5 text-[#0F7173]" />
                <span>Myth-Busting & Common Doubts</span>
              </span>
              <span className="text-[#0F7173] text-[10px] font-mono font-bold">Tap chip to ask →</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-none snap-x">
              {MYTHS_DATA.map((myth) => {
                const chipText = myth.question;
                const isTapped = tappedChipId === myth.id;

                return (
                  <button
                    key={myth.id}
                    onClick={() => {
                      setTappedChipId(myth.id);
                      setTimeout(() => {
                        setTappedChipId(null);
                        handleUserSend(chipText);
                      }, 150);
                    }}
                    className={`snap-start shrink-0 px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer whitespace-nowrap border-2 shadow-sm ${
                      isTapped
                        ? 'bg-[#0F7173] text-white border-[#0F7173] scale-95 shadow-md'
                        : 'bg-white text-[#0F7173] border-[#0F7173]/30 hover:border-[#0F7173] hover:bg-[#0F7173]/5 active:scale-95'
                    }`}
                  >
                    {chipText}
                  </button>
                );
              })}
            </div>
          </div>
          {currentThread.messages.map((msg) => {
            const isAI = msg.sender === 'ai';
            const isPlaying = playingAudioId === msg.id;

            return (
              <div key={msg.id} className="space-y-3">
                <div
                  className={`flex gap-3 sm:gap-4 ${isAI ? 'justify-start' : 'justify-end'} animate-fade-in`}
                >
                  {/* AI Brand Avatar Badge (Top-Left of AI Bubble) */}
                  {isAI && (
                    <div className="icon-badge icon-badge-teal !w-9 !h-9 !min-w-[36px] shadow-sm mt-1">
                      <Sparkles className="w-5 h-5 stroke-[2.2]" />
                    </div>
                  )}

                  {/* CHAT BUBBLE WITH ASYMMETRIC SPEECH TAIL */}
                  <div
                    onClick={() => isAI && setPlayingAudioId(isPlaying ? null : msg.id)}
                    className={`max-w-xl p-4 sm:p-5 shadow-sm transition-all ${
                      isAI
                        ? 'bg-[#0F7173]/10 border border-[#0F7173]/20 text-[#2B2B2B] rounded-3xl rounded-tl-sm cursor-pointer hover:bg-[#0F7173]/15'
                        : 'bg-[#0F7173] text-white font-medium rounded-3xl rounded-tr-sm shadow-md shadow-[#0F7173]/20'
                    }`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
                      {msg.text}
                    </p>

                    {/* EMI Calculation Summary inside AI message */}
                    {msg.loanCalculation && (
                      <div className="mt-3 p-3.5 rounded-2xl bg-white border border-[#0F7173]/30 text-xs space-y-1.5 shadow-sm">
                        <div className="flex items-center justify-between text-[#0F7173] font-bold">
                          <span>EMI Summary</span>
                          <span>₹{msg.loanCalculation.monthlyEMI}/mo</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] text-[#6B6B6B]">
                          <div>Principal: ₹{msg.loanCalculation.principal.toLocaleString('en-IN')}</div>
                          <div>Total Interest: ₹{msg.loanCalculation.totalInterest.toLocaleString('en-IN')}</div>
                        </div>
                      </div>
                    )}

                    {/* DUAL-MODE AUDIO PLAYER CONTROL (TTS) */}
                    {isAI && (
                      <div className="pt-2 mt-2 border-t border-[#0F7173]/15 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPlayingAudioId(isPlaying ? null : msg.id);
                            }}
                            className={`p-1.5 px-2.5 rounded-full flex items-center gap-1.5 font-bold transition-all ${
                              isPlaying
                                ? 'bg-[#F5A623] text-slate-950 shadow-sm animate-pulse'
                                : 'bg-white text-[#0F7173] border border-[#0F7173]/30'
                            }`}
                          >
                            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                            <span className="text-[11px]">
                              {isPlaying ? 'Playing Audio...' : 'Listen'}
                            </span>
                          </button>

                          {/* Speed Controller */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setAudioSpeed((prev) => (prev === 1.0 ? 1.25 : prev === 1.25 ? 1.5 : 1.0));
                            }}
                            className="px-2 py-0.5 rounded-full bg-white text-[10px] font-mono text-[#6B6B6B] border border-slate-200"
                          >
                            {audioSpeed}x
                          </button>
                        </div>

                        <span className="text-[10px] text-[#6B6B6B] font-mono">{msg.timestamp}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* ACTIONABLE INLINE GOAL DETECTION CARD (Full-Width White Card Surface + Pill Marigold Button) */}
                {msg.detectedGoal && (
                  <div className="w-full card-surface bg-white border border-slate-200 p-5 space-y-3.5 shadow-md rounded-2xl animate-fade-in my-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="icon-badge icon-badge-teal !w-10 !h-10 !min-w-[40px]">
                          <Sparkle className="w-5 h-5 text-[#0F7173]" />
                        </div>
                        <div>
                          <div className="font-extrabold text-[#2B2B2B] text-base">
                            {msg.detectedGoal.title}
                          </div>
                          <div className="text-xs text-[#6B6B6B]">
                            {msg.detectedGoal.description}
                          </div>
                        </div>
                      </div>

                      <span className="text-[#0F7173] font-mono font-extrabold text-sm shrink-0">
                        Target: ₹{msg.detectedGoal.targetAmount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Prominent Pill-Shaped Marigold Button: "Simulate this goal" */}
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => handleOpenGoalSimulator(msg.detectedGoal!)}
                        className="btn btn-marigold py-3 px-6 text-sm font-bold shadow-md flex items-center gap-2 group"
                      >
                        <Sliders className="w-4 h-4" />
                        <span>Simulate this goal</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* BOTTOM INPUT BAR WITH ELEVATED MARIGOLD MIC BUTTON */}
        <div className="bg-white border-t border-slate-200 p-4 sticky bottom-0 z-20 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center gap-3 relative">
            {/* Elevated Marigold Mic Button (#F5A623) */}
            <button
              onClick={() => {
                if (isRecording) stopRecordingAndSend();
                else startRecording();
              }}
              className={`-mt-6 w-14 h-14 rounded-full bg-[#F5A623] hover:bg-[#D98D15] text-[#1F1900] shadow-lg shadow-[#F5A623]/35 flex items-center justify-center shrink-0 transition-all ${
                isRecording ? 'mic-pulse-active scale-110' : 'hover:scale-105'
              }`}
              title="Tap to speak in native language (WhatsApp style)"
            >
              {isRecording ? <MicOff className="w-7 h-7 stroke-[2.5]" /> : <Mic className="w-7 h-7 stroke-[2.5]" />}
            </button>

            {/* Input Box with Italicized Live Transcription while Recording */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={
                  isRecording
                    ? liveTranscription || `Transcribing ${currentLangObj.nativeName} speech (${recordingSeconds}s)...`
                    : `Type or speak in ${currentLangObj.name}...`
                }
                value={isRecording ? liveTranscription : inputQuery}
                onChange={(e) => !isRecording && setInputQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isRecording && handleUserSend()}
                className={`w-full pl-4 pr-12 py-3.5 rounded-2xl border-2 border-slate-200 text-base font-medium shadow-sm ${
                  isRecording ? 'italic text-[#0F7173] bg-[#0F7173]/10 border-[#0F7173]' : 'bg-white text-[#2B2B2B]'
                }`}
              />

              <button
                onClick={() => isRecording ? stopRecordingAndSend() : handleUserSend()}
                className="absolute right-2 top-2 p-2 rounded-xl bg-[#0F7173] hover:bg-[#0A5354] text-white transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* GOAL SIMULATOR OVERLAY MODAL */}
      <GoalSimulatorModal
        key={simGoal?.id}
        goal={simGoal}
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        onPostSimulationToChat={(summary) => handleUserSend(summary)}
        currentLang={user.preferredLanguage}
      />
    </div>
  );
};
