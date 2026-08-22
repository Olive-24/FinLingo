export interface MythItem {
  id: string;
  tag: string;
  question: string;
  category: string;
  audioDuration: string;
  answer: string;
  takeaway: string;
  compliance: string;
}

export const MYTHS_DATA: MythItem[] = [
  {
    id: "mutual-funds-risk",
    tag: "Safety & Risk",
    question: "Can I lose all my money in Mutual Funds or SIPs?",
    category: "Market Safety",
    audioDuration: "0:45",
    answer: "Mutual funds carry calculated market risk, but your money does NOT vanish overnight like a financial scam. Investments are allocated across SEBI-regulated, diversified blue-chip companies (such as TATA, Reliance, and HDFC). While short-term values fluctuate with market cycles, diversified equity SIPs held for 5+ years have historically beaten inflation with 12-14% average annual compounding returns.",
    takeaway: "Market risk is mitigated over time through systematic monthly diversification.",
    compliance: "SEBI & RBI Transparency Compliant"
  },
  {
    id: "sip-vs-rd",
    tag: "SIP vs Bank RD",
    question: "What is the difference between an SIP and a Bank Recurring Deposit (RD)?",
    category: "Wealth Growth",
    audioDuration: "0:38",
    answer: "A Bank RD provides fixed guaranteed interest (~6.5-7% p.a.) but often fails to beat real inflation after taxes. An SIP in equity mutual funds invests directly in expanding market sectors, providing higher long-term capital growth potential and better tax efficiency for goals beyond 3 years.",
    takeaway: "RD protects nominal capital, whereas SIP builds inflation-beating wealth.",
    compliance: "Verified Financial Fact"
  },
  {
    id: "platform-safety",
    tag: "Platform Security",
    question: "Is FinLingo a legitimate and secure platform?",
    category: "Trust & Safety",
    audioDuration: "0:30",
    answer: "Yes. FinLingo is an educational intelligence and simulation sandbox. We do not take custody of your money or execute unauthorized transactions. All loan simulations and calculation formulas adhere strictly to RBI regulatory disclosure norms.",
    takeaway: "100% risk-free educational sandbox with zero financial custody.",
    compliance: "RBI Disclosure Compliant"
  },
  {
    id: "low-income-savings",
    tag: "Low-Income Planning",
    question: "How can I start saving with a modest monthly income?",
    category: "Micro-Investing",
    audioDuration: "0:42",
    answer: "You do not need large sums of capital to start. Micro-SIPs allow automated investing starting at just ₹100 to ₹500 per month. Automating small transfers on salary day instills discipline without straining your essential household expenses.",
    takeaway: "Consistency and early compounding matter far more than initial ticket size.",
    compliance: "SEBI Financial Literacy"
  },
  {
    id: "fd-inflation",
    tag: "Fixed Deposits",
    question: "Why do Fixed Deposits struggle to beat inflation?",
    category: "Purchasing Power",
    audioDuration: "0:35",
    answer: "If a Fixed Deposit yields 6.5% interest and inflation is 6%, your real gain is only 0.5% before tax. After deducting income tax slab rates on interest earned, real purchasing power often stays flat or declines over 10+ year periods.",
    takeaway: "FDs offer safety for emergency cash, but equities are essential for real wealth growth.",
    compliance: "Verified Fact"
  },
  {
    id: "cibil-score-inquiry",
    tag: "CIBIL Score",
    question: "Does checking loan interest rates lower my CIBIL credit score?",
    category: "Credit Health",
    audioDuration: "0:28",
    answer: "No. Checking interest rates, running simulators, or pulling your own report is considered a 'Soft Inquiry' and has zero effect on your score. A drop only happens when banks initiate 'Hard Inquiries' upon submitting formal loan applications.",
    takeaway: "Simulating quotes is completely safe and private.",
    compliance: "Credit Bureau Standard"
  },
  {
    id: "kcc-subvention",
    tag: "Govt Subsidies",
    question: "How does the Kisan Credit Card (KCC) 4% interest subvention work?",
    category: "Rural Banking",
    audioDuration: "0:50",
    answer: "Standard agricultural credit rates are 9%. The Government of India provides a 2% upfront interest subvention, reducing it to 7%. Farmers who practice prompt, on-time annual repayments receive an additional 3% rebate, reducing effective interest to just 4% per year.",
    takeaway: "Disciplined annual repayment unlocks the lowest 4% interest rate.",
    compliance: "NABARD & RBI Scheme"
  },
  {
    id: "pause-sip",
    tag: "SIP Flexibility",
    question: "Can I pause or stop my SIP during financial emergencies?",
    category: "Liquidity",
    audioDuration: "0:32",
    answer: "Yes, mutual fund SIPs offer 100% flexibility. You can pause monthly deductions for up to 3-6 months or stop them entirely with zero penalty fees. Accumulated units continue to earn compounding market returns.",
    takeaway: "SIPs carry no contractual lock-in penalties unlike insurance policies.",
    compliance: "SEBI Mutual Fund Regulations"
  }
];
