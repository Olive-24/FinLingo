import type { LanguageCode } from '../types';

export interface MythItem {
  id: string;
  chipLabel: string;
  chipLabelVernacular: Partial<Record<LanguageCode, string>>;
  question: string;
  category: 'safety' | 'returns' | 'legal' | 'budgeting' | 'credit';
  answer: string;
  answerVernacular: Partial<Record<LanguageCode, string>>;
  audioDuration: string;
  trustTag: string;
}

export const MYTHS_DATA: MythItem[] = [
  {
    id: 'm_lose_money',
    chipLabel: 'Can I lose money in mutual funds?',
    chipLabelVernacular: {
      hi: 'क्या म्यूचुअल फंड में पैसा डूब सकता है?',
      ta: 'மியூச்சுவல் ஃபண்டில் பணம் இழக்கப்படுமா?',
      te: 'మ్యూచువల్ ఫండ్స్‌లో డబ్బు పోతుందా?',
      mr: 'म्युच्युअल फंडात पैसे डुबू शकतात का?',
      bn: 'মিউচুয়াল ফান্ডে কি টাকা ডুবে যেতে পারে?',
      gu: 'શું મ્યુચ્યુઅલ ફંડમાં પૈસા ડૂબી શકે?',
      kn: 'ಮ್ಯೂಚುವಲ್ ಫಂಡ್‌ನಲ್ಲಿ ಹಣ ನಷ್ಟವಾಗುತ್ತದೆಯೇ?',
    },
    question: 'Can I lose money in mutual funds or SIPs?',
    category: 'safety',
    answer: `Honest Answer: Mutual funds carry market risk, but your money does NOT "drown" or vanish overnight like a scam.

Here is the truth:
1. Mutual funds invest in top SEBI-regulated Indian companies (TATA, Reliance, HDFC, Infosys).
2. Short term (6-12 months): Returns fluctuate up and down with stock market movements.
3. Long term (3-5+ years): Diversified equity SIPs have historically beaten inflation with ~12-14% average annual compounding returns.
4. Flexible: You can start with just ₹100/month and stop anytime with zero fine.`,
    answerVernacular: {
      hi: `ईमानदार जवाब: म्यूचुअल फंड में बाजार का जोखिम होता है, लेकिन पैसा किसी घोटाले की तरह रातों-रात गायब या "डूबता" नहीं है।

सच्चाई समझें:
1. आपका पैसा SEBI द्वारा विनियमित भारत की बड़ी कंपनियों (टाटा, रिलायंस, एचडीएफसी) में लगता है।
2. कम समय (6-12 महीने): बाजार के साथ थोड़ा उतार-चढ़ाव आ सकता है।
3. लंबा समय (3-5+ साल): ऐतिहासिक रूप से इक्विटी SIP ने ~12-14% की दर से रिटर्न देकर महंगाई को पछाड़ा है।
4. लचीलापन: आप ₹100/महीने से भी शुरुआत कर सकते हैं और कभी भी बिना किसी पेनल्टी के रोक सकते हैं।`,
      ta: `நேர்மையான பதில்: மியூச்சுவல் ஃபண்டுகளில் சந்தை ஆபத்து உள்ளது, ஆனால் பணம் இரவோடு இரவாக மறைந்துவிடாது. 3-5 ஆண்டுகளில் பணவீக்கத்தை விட சிறந்த வருமானம் கொடுத்துள்ளது.`,
      te: `నిజాయితీ సమాధానం: మ్యూచువల్ ఫండ్స్‌లో మార్కెట్ రిస్క్ ఉంటుంది, కానీ మీ డబ్బు రాత్రికి రాత్రే మునిగిపోదు. 3-5 సంవత్సరాలలో ద్రవ్యోల్బణాన్ని మించి లాభాలు ఇచ్చాయి.`,
      mr: `प्रामाणिक उत्तर: म्युच्युअल फंडात बाजाराची जोखीम असते, पण पैसे घोटाळ्यासारखे रातोरात बुडत नाहीत. ३-५ वर्षांत महागाईला मागे टाकून उत्तम परतावा मिळतो.`,
    },
    audioDuration: '0:34',
    trustTag: 'SEBI Regulated Transparency',
  },
  {
    id: 'm_sip_vs_rd',
    chipLabel: 'SIP vs RD: What is the difference?',
    chipLabelVernacular: {
      hi: 'SIP और RD में क्या फर्क है?',
      ta: 'SIP மற்றும் RD இடையே என்ன வித்தியாசம்?',
      te: 'SIP మరియు RD మధ్య తేడా ఏమిటి?',
      mr: 'SIP आणि RD मध्ये काय फरक आहे?',
      bn: 'SIP এবং RD-এর মধ্যে তফাৎ কী?',
      gu: 'SIP અને RD વચ્ચે શું તફાવત છે?',
      kn: 'SIP ಮತ್ತು RD ನಡುವಿನ ವ್ಯತ್ಯಾಸವೇನು?',
    },
    question: "What's the difference between SIP and Bank RD?",
    category: 'returns',
    answer: `Here is a side-by-side comparison in plain language:

• Bank RD (Recurring Deposit):
- Fixed Interest: ~6.5% p.a. guaranteed by RBI DICGC up to ₹5 Lakhs.
- Inflation impact: After ~6% inflation and income tax, real profit is close to 0%.

• Mutual Fund SIP (Systematic Investment Plan):
- Variable Returns: Market-linked (~12% expected long-term average).
- Compounding growth: Money multiplies faster over 3 to 10 years.
- Liquidity: Withdraw money online without fixed tenure penalty (except ELSS tax saver).`,
    answerVernacular: {
      hi: `बैंक आरडी (RD) और एसआईपी (SIP) में आसान अंतर:

• बैंक RD (रिकरिंग डिपॉजिट):
- फिक्स्ड ब्याज: ~6.5% प्रति वर्ष (आरबीआई द्वारा ₹5 लाख तक सुरक्षित)।
- महंगाई का असर: 6% महंगाई और टैक्स के बाद असली मुनाफा लगभग 0% रहता है।

• म्यूचुअल फंड SIP:
- अनुमानित रिटर्न: बाजार से जुड़ा (~12% लंबा औसत)।
- कंपाउंडिंग का जादू: 3 से 10 साल में पैसा तेजी से बढ़ता है।
- निकासी: बिना पेनल्टी जब चाहे पैसा निकालें।`,
    },
    audioDuration: '0:28',
    trustTag: 'Compounding Vs Fixed Guarantee',
  },
  {
    id: 'm_is_legal',
    chipLabel: 'Is FinLingo legal and safe?',
    chipLabelVernacular: {
      hi: 'क्या FinLingo लीगल और सुरक्षित है?',
      ta: 'FinLingo சட்டபூர்வமானது மற்றும் பாதுகாப்பானதா?',
      te: 'FinLingo చట్టబద్ధమైనది మరియు సురక్షితమైనదా?',
      mr: 'FinLingo कायदेशीर आणि सुरक्षित आहे का?',
      bn: 'FinLingo কি আইনি এবং নিরাপদ?',
    },
    question: 'Is FinLingo legal and safe to use?',
    category: 'legal',
    answer: `100% Safe & Zero Financial Risk!

FinLingo is an educational guidance & interactive simulation tool designed to empower vernacular borrowers and savers.

• We NEVER ask for bank passwords, OTPs, UPI PINs, or Aadhaar numbers.
• All calculations (EMIs, SIP growth, loan interest) are simulated on-device for educational understanding.
• You can test real-world scenarios freely before stepping into any bank or NBFC branch.`,
    answerVernacular: {
      hi: `100% सुरक्षित और शून्य वित्तीय जोखिम!

FinLingo एक शैक्षणिक मार्गदर्शन और इंटरैक्टिव सिमुलेटर है जो आपको वित्तीय समझ देने के लिए बनाया गया है।

• हम कभी भी आपसे बैंक पासवर्ड, ओटीपी, यूपीआई पिन या आधार नंबर नहीं मांगते।
• सभी कैलकुलेशन (ईएमआई, एसआईपी ग्रोथ) केवल आपकी समझ के लिए सिमुलेट की जाती हैं।
• किसी भी बैंक शाखा जाने से पहले आप यहां बिना डर के अभ्यास कर सकते हैं।`,
    },
    audioDuration: '0:22',
    trustTag: '100% Risk-Free Practice Sandbox',
  },
  {
    id: 'm_small_income',
    chipLabel: 'How to save with small income?',
    chipLabelVernacular: {
      hi: 'कम कमाई में बचत कैसे शुरू करें?',
      ta: 'குறைந்த வருமானத்தில் சேமிப்பது எப்படி?',
      te: 'తక్కువ ఆదాయంతో ఎలా పొదుపు చేయాలి?',
      mr: 'कमी उत्पन्नात बचत कशी करावी?',
    },
    question: 'How can I save money with a modest monthly income?',
    category: 'budgeting',
    answer: `Follow the Golden 50-30-20 Rule adapted for everyday earners:

1. 50% for Essential Needs: Ration, rent, school fees, electricity.
2. 30% for Family Wants: Festival clothes, dining out, outings.
3. 20% Set Aside FIRST: On income day, save 20% (even ₹500 or ₹1,000) BEFORE spending the rest.

Pro Tip: Automate a ₹500 monthly SIP on the 5th of every month. In 5 years, ₹500/month at 12% grows to ~₹41,200!`,
    answerVernacular: {
      hi: `अपनी कमाई के लिए 50-30-20 का आसान नियम अपनाएं:

1. 50% जरूरी खर्चों के लिए: राशन, मकान किराया, बच्चों की फीस, बिजली बिल।
2. 30% इच्छाओं के लिए: त्योहार के कपड़े, घूमना-फिरना।
3. 20% सबसे पहले अलग रखें: सैलरी या कमाई के दिन ₹500 या ₹1,000 सबसे पहले बचाएं, बाद में बाकी खर्च करें।

उपयोगी सलाह: हर महीने की 5 तारीख को ₹500 का ऑटो-डेबिट SIP लगाएं। 5 साल में ₹500/महीना 12% दर से ~₹41,200 बन जाता है!`,
    },
    audioDuration: '0:31',
    trustTag: 'Disciplined Savings Blueprint',
  },
  {
    id: 'm_fd_inflation',
    chipLabel: 'Why do FDs lag behind inflation?',
    chipLabelVernacular: {
      hi: 'बैंक FD महंगाई से पीछे क्यों रह जाता है?',
      ta: 'வங்கி எஃப்டி பணவீக்கத்தை விட பின்தங்குவது ஏன்?',
      te: 'బ్యాంక్ ఎఫ్‌డీ ద్రవ్యోల్బణం కంటే ఎందుకు వెనుకబడి ఉంటుంది?',
    },
    question: 'Why do Fixed Deposits struggle to beat inflation?',
    category: 'returns',
    answer: `The Silent Purchasing Power Leak:

• Bank FD Return: ~6.5% per year.
• Average Inflation (Mehangai): ~5.5% to 6.0% per year.
• Income Tax Deduction: Interest on FD is fully taxable as per your income slab.

Real Gain = 6.5% FD - 5.8% Inflation - Tax = ~0% to negative real buying power!
That is why holding all savings in bank FDs makes your money lose purchasing power over 10-15 years. Combining FDs for emergency with SIPs for long-term goals creates the best balance.`,
    answerVernacular: {
      hi: `पैसे की वास्तविक खरीदारी क्षमता का नुकसान:

• बैंक एफडी रिटर्न: ~6.5% प्रति वर्ष।
• औसत महंगाई दर: ~5.5% से 6.0% प्रति वर्ष।
• इनकम टैक्स: एफडी का ब्याज आपकी आय के अनुसार टैक्स योग्य है।

वास्तविक लाभ = 6.5% FD - 5.8% महंगाई - टैक्स = ~0% वास्तविक मुनाफा!
इसलिए सारा पैसा एफडी में रखने से 10-15 साल में आपकी खरीदने की क्षमता घट जाती है। आपातकाल के लिए एफडी और बड़े लक्ष्यों के लिए एसआईपी का संतुलन सबसे बेहतर है।`,
    },
    audioDuration: '0:30',
    trustTag: 'Real Purchasing Power Breakdown',
  },
  {
    id: 'm_cibil_check',
    chipLabel: 'Does checking rate drop CIBIL score?',
    chipLabelVernacular: {
      hi: 'क्या रेट चेक करने से CIBIL स्कोर गिरता है?',
      ta: 'வட்டி விகிதத்தை சரிபார்ப்பது CIBIL ஸ்கோரைக் குறைக்குமா?',
      te: 'రేట్లను తనిఖీ చేయడం వల్ల CIBIL స్కోర్ తగ్గుతుందా?',
    },
    question: 'Does checking loan rates or quotes lower my CIBIL credit score?',
    category: 'credit',
    answer: `No! Browsing rates or simulating loan EMIs does NOT reduce your CIBIL score.

Here is the key distinction:
• Soft Inquiry: Checking interest rates on FinLingo or monitoring your own credit score online. Impact: ZERO change to score.
• Hard Inquiry: When a bank officially submits a formal credit application for sanctioning a loan. Impact: Drops score by ~3-5 points temporarily.

Feel free to simulate as many loan options as you want on FinLingo with 100% peace of mind!`,
    answerVernacular: {
      hi: `बिल्कुल नहीं! ब्याज दरें चेक करने या लोन EMI सिमुलेट करने से CIBIL स्कोर नहीं घटता।

अंतर समझें:
• सॉफ्ट इंक्वायरी: FinLingo पर रेट देखना या अपना क्रेडिट स्कोर खुद चेक करना। असर: 0 पॉइंट नुकसान।
• हार्ड इंक्वायरी: जब बैंक लोन पास करने के लिए सिबिल रिपोर्ट मंगाता है। असर: 3-5 पॉइंट का अस्थायी बदलाव।

FinLingo पर आप बिना किसी चिंता के जितने चाहे लोन विकल्प सिमुलेट कर सकते हैं!`,
    },
    audioDuration: '0:25',
    trustTag: 'Soft vs Hard Inquiry Clarity',
  },
  {
    id: 'm_kcc_subsidy',
    chipLabel: 'How does KCC 4% interest work?',
    chipLabelVernacular: {
      hi: 'किसान क्रेडिट कार्ड (KCC) 4% ब्याज कैसे काम करता है?',
      mr: 'किसान क्रेडिट कार्ड (KCC) ४% व्याज कसे काम करते?',
    },
    question: 'How does Kisan Credit Card (KCC) 4% interest subvention work?',
    category: 'credit',
    answer: `Government Agriculture Loan Subvention Breakdown:

1. Base KCC Rate: 9.0% p.a.
2. Government Interest Subvention: Govt pays 2.0% subsidy → Rate becomes 7.0%.
3. Prompt Repayment Incentive (PRI): If you repay timely before due date, Govt gives extra 3.0% discount!
4. Net Effective Interest Rate = 4.0% p.a. only for loans up to ₹3 Lakhs!`,
    answerVernacular: {
      hi: `सरकारी कृषि ऋण ब्याज छूट गणित:

1. KCC की मूल दर: 9.0% प्रति वर्ष।
2. सरकारी ब्याज छूट: सरकार 2.0% की छूट देती है → दर 7.0% हो जाती है।
3. समय पर भुगतान का इनाम: समय सीमा से पहले चुकता करने पर 3.0% का अतिरिक्त डिस्काउंट!
4. कुल प्रभावी ब्याज दर = ₹3 लाख तक के लोन पर केवल 4.0% प्रति वर्ष!`,
    },
    audioDuration: '0:27',
    trustTag: 'Government Subvention Benefit',
  },
  {
    id: 'm_pause_sip',
    chipLabel: 'Can I pause SIP during cash crunch?',
    chipLabelVernacular: {
      hi: 'क्या तंगी के समय SIP रोकी जा सकती है?',
      ta: 'பண தட்டுப்பாட்டின் போது SIP-ஐ நிறுத்த முடியுமா?',
    },
    question: 'Can I pause or stop my SIP during financial tight spots?',
    category: 'safety',
    answer: `Yes! Unlike Bank Loan EMIs, missing or pausing a Mutual Fund SIP carries ZERO penalty or legal issue.

• Zero Penalties: SEBI guidelines forbid AMC charges for skipped monthly SIP instalments.
• One-Click Pause: You can pause your SIP for 1 to 6 months directly from your phone app.
• Your Money Stays Intact: Money already invested stays invested and continues growing!`,
    answerVernacular: {
      hi: `हां! बैंक लोन ईएमआई के विपरीत, म्यूचुअल फंड SIP रोकने पर कोई जुर्माना या कानूनी झंझट नहीं होता।

• शून्य पेनल्टी: सेबी के नियमों के अनुसार एसआईपी किस्त छूटने पर कोई फाइन नहीं लगता।
• 1-क्लिक पॉज: आप ऐप से 1 से 6 महीने के लिए एसआईपी रोक सकते हैं।
• आपका जमा पैसा सुरक्षित: पहले से निवेश किया हुआ पैसा बढ़ता रहता है और सुरक्षित रहता है।`,
    },
    audioDuration: '0:23',
    trustTag: 'Zero-Penalty Flexibility',
  },
];
