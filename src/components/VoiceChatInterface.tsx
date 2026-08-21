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

interface VoiceChatInterfaceProps {
  user: UserProfile;
  onLogout: () => void;
  onReOnboard: () => void;
  onSelectLang: (lang: LanguageCode) => void;
}

export const VoiceChatInterface: React.FC<VoiceChatInterfaceProps> = ({
  user,
  onLogout,
  onReOnboard,
  onSelectLang,
}) => {
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
          text: `नमस्ते ${user.name}! I am FinLingo, your financial assistant. I see you are a ${user.occupation.replace(
            '_',
            ' '
          )} and prefer ${currentLangObj.name}. Ask me any question about personal loans, EMIs, or savings in your mother tongue!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    },
  ]);

  const [activeThreadId, setActiveThreadId] = useState<string>('thread_1');

  // Currently active thread
  const currentThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  // Voice recording & live transcription states (Google Assistant style)
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [liveTranscription, setLiveTranscription] = useState<string>('');
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);

  // Text input box query
  const [inputQuery, setInputQuery] = useState<string>('');

  // TTS Audio Player States
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [audioProgress, setAudioProgress] = useState<number>(0);

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

  // Audio progress animation simulation
  useEffect(() => {
    if (!playingAudioId) {
      setAudioProgress(0);
      return;
    }
    const interval = setInterval(() => {
      setAudioProgress((prev) => {
        if (prev >= 100) {
          setPlayingAudioId(null);
          return 0;
        }
        return prev + 5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [playingAudioId]);

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
          text: `Hello ${user.name}! Ask me any financial question in ${currentLangObj.name} using voice or text.`,
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
        description: 'Build a disciplined savings fund for wedding expenses over 5 years.',
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
        description: 'Simulate Kisan Credit Card subvention & monthly equipment EMI.',
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

  // Start Voice Recording (Google Assistant style tap-to-speak)
  const startRecording = () => {
    setIsRecording(true);
    setLiveTranscription('Transcribing speech...');

    // Simulate real-time live typing transcription
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
    }, 70);
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
  const handleUserSend = (textInput?: string) => {
    const textToSend = textInput || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg: VoiceChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Update active thread
    const updatedMessages = [...currentThread.messages, userMsg];
    const detectedGoal = detectGoalInPrompt(textToSend);

    setInputQuery('');

    // Generate Tailored AI Response
    setTimeout(() => {
      let aiText = '';
      let loanCalc = undefined;

      if (detectedGoal) {
        aiText = `I noticed you are planning for **${detectedGoal.title}**!
To achieve your goal of ₹${detectedGoal.targetAmount.toLocaleString('en-IN')} in ${detectedGoal.timeframeYears} years, saving disciplined monthly SIPs of ~₹${detectedGoal.suggestedMonthlySavings}/month in a balanced fund can help you beat inflation.

Click **"Simulate this goal"** below to adjust monthly savings, view inflation impact, and see exact return scenarios!`;
      } else if (textToSend.includes('₹50,000') || textToSend.includes('EMI')) {
        aiText = `For a Personal Loan of ₹50,000 at 14% p.a. over 24 months:
• Monthly EMI: ₹2,401/month.
• Total Interest Paid: ₹7,624.
• Zero processing penalty if prepaid via UPI.`;
        loanCalc = {
          principal: 50000,
          interestRate: 14,
          tenureMonths: 24,
          monthlyEMI: 2401,
          totalInterest: 7624,
        };
      } else {
        aiText = `I have processed your query in ${currentLangObj.name}. FinLingo provides zero-jargon financial explanations tailored to your profile as a ${user.occupation}. You can ask about loan EMIs, goal savings, or SIP math anytime!`;
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

      // Auto-trigger TTS voice audio playback for AI response
      setPlayingAudioId(aiMsg.id);
    }, 900);
  };

  // Open Goal Simulator for a given goal
  const handleOpenGoalSimulator = (goal: DetectedGoal) => {
    setSimGoal(goal);
    setIsGoalModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col lg:flex-row">
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
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* MAIN WORKSPACE AREA */}
      <div className="flex-1 flex flex-col justify-between h-screen overflow-hidden relative">
        {/* HEADER BAR */}
        <header className="bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 sticky top-0 z-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Title & Active Language */}
            <div>
              <h2 className="font-extrabold text-base text-white tracking-tight flex items-center gap-2">
                <span>{currentThread.title}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </h2>
              <p className="text-[11px] text-slate-400">
                AI Voice Assistant • <span className="text-emerald-400 font-bold">{currentLangObj.flag} {currentLangObj.nativeName}</span>
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={onReOnboard}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1"
              title="Change Language or Profile"
            >
              <RotateCcw className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline text-[11px]">Re-Setup</span>
            </button>

            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-slate-800 hover:bg-red-950/40 text-slate-400 hover:text-red-400 border border-slate-700 text-xs"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* CHAT MESSAGES STREAM CONTAINER */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin max-w-4xl mx-auto w-full">
          {currentThread.messages.map((msg) => {
            const isAI = msg.sender === 'ai';
            const isPlaying = playingAudioId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 sm:gap-4 ${isAI ? 'justify-start' : 'justify-end'} animate-fade-in`}
              >
                {isAI && (
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-slate-950 font-bold shrink-0 shadow-lg shadow-emerald-500/20 mt-1">
                    <Sparkles className="w-5 h-5 stroke-[2.5]" />
                  </div>
                )}

                <div
                  className={`max-w-xl p-4 sm:p-5 rounded-3xl space-y-3 shadow-xl ${
                    isAI
                      ? 'bg-slate-900/90 border border-slate-800 text-slate-100'
                      : 'bg-gradient-to-br from-emerald-500 to-teal-500 text-slate-950 font-medium'
                  }`}
                >
                  <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {msg.text}
                  </p>

                  {/* INLINE GOAL DETECTION CARD ("Simulate this goal") */}
                  {msg.detectedGoal && (
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/40 text-xs space-y-3 shadow-lg animate-fade-in">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <Sparkle className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm">{msg.detectedGoal.title}</div>
                            <div className="text-[10px] text-slate-400">Detected Financial Goal</div>
                          </div>
                        </div>
                        <span className="text-emerald-400 font-mono font-bold text-xs">
                          Target: ₹{msg.detectedGoal.targetAmount.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-300 bg-slate-900 p-2.5 rounded-xl">
                        <span>Horizon: {msg.detectedGoal.timeframeYears} Years</span>
                        <span className="text-indigo-300 font-semibold">
                          ~₹{msg.detectedGoal.suggestedMonthlySavings.toLocaleString('en-IN')}/mo SIP
                        </span>
                      </div>

                      {/* Prominent "Simulate this goal" CTA */}
                      <button
                        onClick={() => handleOpenGoalSimulator(msg.detectedGoal!)}
                        className="w-full btn btn-primary py-2.5 text-xs font-bold shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 group"
                      >
                        <Sliders className="w-4 h-4" />
                        <span>Simulate this Goal</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  )}

                  {/* EMI Loan Calculation Breakdown Card */}
                  {msg.loanCalculation && (
                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-emerald-500/30 text-xs space-y-2">
                      <div className="flex items-center justify-between text-emerald-400 font-bold">
                        <span>EMI Summary</span>
                        <span>₹{msg.loanCalculation.monthlyEMI}/mo</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                        <div>Principal: ₹{msg.loanCalculation.principal.toLocaleString('en-IN')}</div>
                        <div>Total Interest: ₹{msg.loanCalculation.totalInterest.toLocaleString('en-IN')}</div>
                      </div>
                    </div>
                  )}

                  {/* DUAL-MODE AUDIO PLAYER (Text-to-Speech TTS) */}
                  {isAI && (
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (isPlaying) setPlayingAudioId(null);
                            else setPlayingAudioId(msg.id);
                          }}
                          className={`p-2 rounded-xl flex items-center gap-1.5 font-bold transition-all ${
                            isPlaying
                              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 animate-pulse'
                              : 'bg-white/5 hover:bg-white/10 text-slate-300'
                          }`}
                        >
                          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          <span className="text-[11px]">
                            {isPlaying ? 'Playing Audio' : 'Listen in Native Voice'}
                          </span>
                        </button>

                        {/* Speed Toggle */}
                        <button
                          onClick={() => setAudioSpeed((prev) => (prev === 1.0 ? 1.25 : prev === 1.25 ? 1.5 : 1.0))}
                          className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-mono text-slate-400"
                        >
                          {audioSpeed}x
                        </button>
                      </div>

                      <span className="text-[10px] text-slate-500 font-mono">{msg.timestamp}</span>
                    </div>
                  )}

                  {/* Audio Progress Scrubber */}
                  {isAI && isPlaying && (
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-400 h-full transition-all duration-150"
                        style={{ width: `${audioProgress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* REAL-TIME SPEECH TRANSCRIPTION OVERLAY (Google Assistant Style) */}
        {isRecording && (
          <div className="mx-4 mb-2 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/90 to-slate-900 border border-emerald-500/50 shadow-2xl animate-fade-in max-w-4xl mx-auto w-full">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Listening in {currentLangObj.nativeName} ({recordingSeconds}s)
                </span>
              </div>
              <button
                onClick={stopRecordingAndSend}
                className="btn btn-primary py-1 px-3 text-[11px] font-bold shadow-sm"
              >
                Done & Send
              </button>
            </div>

            <p className="text-base sm:text-lg font-medium text-slate-100 italic min-h-[40px]">
              "{liveTranscription || 'Speak your financial question...'}"
            </p>
          </div>
        )}

        {/* BOTTOM INPUT BAR */}
        <div className="bg-[#0F172A]/90 backdrop-blur-md border-t border-slate-800 p-4 sticky bottom-0 z-20">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            {/* WhatsApp-style Tap-to-Speak Mic Button */}
            <button
              onClick={() => {
                if (isRecording) stopRecordingAndSend();
                else startRecording();
              }}
              className={`p-3.5 rounded-2xl transition-all flex items-center justify-center shrink-0 ${
                isRecording
                  ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/40 scale-110'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 hover:scale-105'
              }`}
              title="Tap to speak in native language (WhatsApp style)"
            >
              {isRecording ? <MicOff className="w-5 h-5 stroke-[2.5]" /> : <Mic className="w-5 h-5 stroke-[2.5]" />}
            </button>

            {/* Text Input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={`Type or tap mic for ${currentLangObj.name} voice input...`}
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUserSend()}
                className="w-full pl-4 pr-12 py-3.5 rounded-2xl bg-slate-800/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-medium"
              />
              <button
                onClick={() => handleUserSend()}
                className="absolute right-2 top-2 p-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* GOAL SIMULATOR OVERLAY MODAL */}
      <GoalSimulatorModal
        goal={simGoal}
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        onPostSimulationToChat={(summary) => handleUserSend(summary)}
        currentLang={user.preferredLanguage}
      />
    </div>
  );
};
