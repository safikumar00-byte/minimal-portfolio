import type { UserFlow } from "@/components/case-study/UserFlowDiagram";
import type { StateFlow } from "@/components/case-study/StateFlowGallery";

export type ImageItem = {
  src: string;
  alt: string;
  title: string;
  urlPath?: string;
};

export type CaseStudyHighlight = {
  value: string;
  label: string;
};

export type CaseStudyImageGroup = {
  layout: "single" | "two-up" | "three-up" | "full";
  caption?: string;
  images: {
    src: string;
    alt: string;
    title?: string;
  }[];
};

export type CaseStudySolutionBlock = {
  subheading?: string;
  lead?: string;
  body: string | string[];
  imageGroup?: CaseStudyImageGroup;
};

export type CaseStudyOverview = {
  lead?: string;
  description: string | string[];
  role?: string;
  timeline?: string;
  tools?: string[];
  liveUrl?: string;
  figmaUrl?: string;
};

export type CaseStudySectionItem = {
  id: string;
  title: string;
};

export type PhoneProject = {
  slug: string;
  title: string;
  platform: string;
  deviceType?: "phone" | "desktop";
  summary: string;
  shortDescription?: string;
  categoryTags?: string[];
  year?: string;
  status?: string;
  role?: string;
  timeline?: string;
  tools?: string[];
  liveUrl?: string;
  figmaUrl?: string;
  overview: string;
  overviewData?: CaseStudyOverview;
  focusAreas: string[];
  images: ImageItem[];
  highlights?: CaseStudyHighlight[];
  userFlows?: UserFlow[];
  stateFlows?: StateFlow[];
  solution?: {
    lead?: string;
    blocks: CaseStudySolutionBlock[];
  };
  behindTheBuild?: {
    lead?: string;
    paragraphs: string[];
    note?: string;
  };
  reflection?: {
    lead?: string;
    paragraphs: string[];
  };
};

export type Project = PhoneProject;

/* ==========================================================================
   CRED BUDDHA CASE STUDY DATA
   ========================================================================== */

export const credBuddhaProject: PhoneProject = {
  slug: "credbuddha",
  title: "CredBuddha",
  platform: "Mobile app · Lending & financial services",
  deviceType: "phone",
  summary:
    "A mobile financial-services experience for discovering loan and credit offers, applying, and following application status in real time.",
  shortDescription:
    "A mobile financial-services experience for discovering loan and credit offers, applying, and tracking approval status in real time.",
  categoryTags: ["Personal project", "Mobile App", "2024"],
  year: "2024",
  status: "Shipped",
  role: "Lead UI/UX Designer & Mobile Flow Architect",
  timeline: "Ten weeks · 2024",
  tools: ["Figma", "Design Systems", "Prototyping", "User Research"],
  figmaUrl:
    "https://www.figma.com/design/L03mwtiwKeLRPx8Ti7SF02/Credbuddha-v-2--Copy-?node-id=102-45&p=f",
  overview:
    "The provided screens cover a loan-discovery journey from the home screen and pre-approved offers into a multi-step application. Separate pending, approved, and rejected states communicate that an application is reviewed after submission.",
  overviewData: {
    lead: "Demystifying credit qualification through transparent, guided micro-steps.",
    description: [
      "Securing personal credit is traditionally an anxious, paper-intensive ordeal fraught with sudden rejection. CredBuddha redesigns loan discovery into a guided, supportive mobile flow.",
      "The application breaks complex financial disclosures and qualification questionnaires into progressive stages, offering immediate feedback and curated pre-approved options from vetted lenders.",
    ],
    role: "Lead UI/UX Designer & Mobile Interface Flow. Ten weeks, 2024",
    timeline: "Ten weeks · 2024",
    tools: ["Figma", "Design Systems", "Prototyping", "User Research"],
    figmaUrl:
      "https://www.figma.com/design/L03mwtiwKeLRPx8Ti7SF02/Credbuddha-v-2--Copy-?node-id=102-45&p=f",
  },
  highlights: [
    {
      value: "5 States",
      label: "Discovery, form, pending, approved & denied",
    },
    {
      value: "Multi-Step",
      label: "Progressive disclosure loan application flow",
    },
    {
      value: "Mobile-First",
      label: "Optimized for frictionless financial decisions",
    },
  ],
  userFlows: [
    {
      id: "loan-application",
      title: "Loan Discovery & 2-Step Application Journey",
      description:
        "The primary borrowing journey: starting from pre-approved discovery cards, moving into progressive disclosure forms, and concluding in explicit credit decision states.",
      steps: [
        {
          stepNumber: 1,
          title: "Pre-Approved Discovery",
          description:
            "Borrower discovers partner offers with transparent rates, loan tenures, and monthly EMI estimates.",
          action: "Select loan card from curated list",
          screenSrc: "/work/credbuddha/credbuddha-loan-discovery-offers-default-02.jpg",
          screenAlt: "CredBuddha list of pre-approved loan offers",
        },
        {
          stepNumber: 2,
          title: "Terms & Introduction",
          description:
            "Contextual breakdown explaining required paperwork, tenure sliders, and repayment policies before starting.",
          action: "Tap 'Apply Now' to initiate application",
          screenSrc: "/work/credbuddha/credbuddha-loan-application-terms-selection-default-01.jpg",
          screenAlt: "CredBuddha apply-for-a-loan introduction screen",
        },
        {
          stepNumber: 3,
          title: "Step 1 — Eligibility Data",
          description:
            "User provides requested loan amount, full legal name, phone number, and primary employment type.",
          action: "Fill basic details & submit step 1",
          screenSrc: "/work/credbuddha/credbuddha-loan-application-personal-details-step-02.jpg",
          screenAlt: "CredBuddha application details form step 1",
        },
        {
          stepNumber: 4,
          title: "Step 2 — Financial & PAN Verification",
          description:
            "Collection of PAN number, address, and pincode required for automated credit bureau validation.",
          action: "Complete KYC verification & submit",
          screenSrc: "/work/credbuddha/credbuddha-loan-application-kyc-verification-step-03.jpg",
          screenAlt: "CredBuddha application details form step 2",
        },
        {
          stepNumber: 5,
          title: "Application Decision Route",
          description:
            "Instant submission receipt with automatic routing to pending underwriting or immediate pre-approval.",
          action: "System triggers bureau underwriting",
          decisionPoint: "Automated credit score check threshold",
          outcome: "Transitions to Pending Verification or Alternative Offers",
          screenSrc: "/work/credbuddha/credbuddha-application-review-pending-01.jpg",
          screenAlt: "CredBuddha pending review status screen",
        },
      ],
    },
    {
      id: "user-onboarding",
      title: "Account Registration & SMS OTP Verification",
      description:
        "Frictionless onboarding flow engineered to verify prospective borrower identities in under sixty seconds.",
      steps: [
        {
          stepNumber: 1,
          title: "Welcome Onboarding",
          description:
            "Illustrated brand introduction outlining loan comparison benefits and safety guarantees.",
          action: "Tap 'Get Started'",
          screenSrc: "/work/credbuddha/credbuddha-onboarding-welcome-default-01.jpg",
          screenAlt: "CredBuddha onboarding welcome screen",
        },
        {
          stepNumber: 2,
          title: "Mobile Sign In",
          description:
            "Minimalist phone number input designed for instant numeric entry.",
          action: "Enter phone number & request OTP",
          screenSrc: "/work/credbuddha/credbuddha-auth-phone-login-default-01.jpg",
          screenAlt: "CredBuddha sign in screen",
        },
        {
          stepNumber: 3,
          title: "OTP Verification",
          description:
            "4-digit verification code screen with automatic focus movement and clear resend timer.",
          action: "Submit SMS code",
          screenSrc: "/work/credbuddha/credbuddha-auth-otp-verification-default-02.jpg",
          screenAlt: "CredBuddha OTP verification screen",
        },
        {
          stepNumber: 4,
          title: "Account Creation Success",
          description:
            "Celebratory confirmation modal confirming profile creation and establishing immediate trust.",
          action: "Continue to personalized feed",
          outcome: "Redirects directly to active Home Screen",
          screenSrc: "/work/credbuddha/credbuddha-registration-success-confirmed-02.jpg",
          screenAlt: "CredBuddha account creation success screen",
        },
      ],
    },
  ],
  stateFlows: [
    {
      id: "review-outcomes",
      title: "Loan Application Review Outcomes",
      description:
        "The application communicates three distinct states after submission, ensuring borrowers never face ambiguous loading loops.",
      states: [
        {
          stateName: "Pending Verification",
          stateType: "pending",
          trigger: "Application submitted to lending partner",
          userAction: "Wait for background underwriting checks",
          behavior:
            "Displays active review animation, 24-hour SLA promise, and direct access to customer support chat.",
          screenSrc: "/work/credbuddha/credbuddha-application-review-pending-01.jpg",
          screenAlt: "Pending review state screen",
        },
        {
          stateName: "Loan Approved & Disbursal Ready",
          stateType: "success",
          trigger: "Lending institution accepts risk profile",
          userAction: "Review final loan contract & sign electronically",
          behavior:
            "Renders green success banner, approved amount, net disbursal date, and download agreement action.",
          screenSrc: "/work/credbuddha/credbuddha-loan-outcome-approved-01.jpg",
          screenAlt: "Loan approved celebration screen",
        },
        {
          stateName: "Declined & Partner Re-route",
          stateType: "rejected",
          trigger: "Applicant credit score below lender minimum",
          userAction: "Explore alternative partner recommendations",
          behavior:
            "Replaces dead-end rejection with constructive credit-builder cards and curated micro-loan alternatives.",
          screenSrc: "/work/credbuddha/credbuddha-loan-outcome-declined-02.jpg",
          screenAlt: "Loan rejected with alternative offers screen",
        },
      ],
    },
  ],
  solution: {
    lead: "Guiding borrowers from initial curiosity to verified funds with complete transparency.",
    blocks: [
      {
        subheading: "Progressive loan application & eligibility",
        lead: "Breaking data-heavy financial forms into digestible stages.",
        body: [
          "Traditional loan applications overwhelm applicants with upfront document demands and complex interest tables. The CredBuddha interface replaces lengthy questionnaires with progressive disclosure—breaking the qualification flow into bite-sized, validated stages.",
          "Each screen features contextual guidance, real-time input validation, and transparent loan terms to reduce applicant drop-off.",
        ],
        imageGroup: {
          layout: "three-up",
          caption:
            "Core applicant journey: discovering eligible loans, selecting terms, and completing details.",
          images: [
            {
              src: "/work/credbuddha/credbuddha-loan-discovery-dashboard-feed-default-01.jpg",
              alt: "CredBuddha home screen with loan categories and offers",
              title: "Home & categories",
            },
            {
              src: "/work/credbuddha/credbuddha-loan-application-terms-selection-default-01.jpg",
              alt: "CredBuddha apply-for-a-loan introduction screen",
              title: "Apply for a loan",
            },
            {
              src: "/work/credbuddha/credbuddha-loan-application-personal-details-step-02.jpg",
              alt: "CredBuddha first step of the loan application details form",
              title: "Application details",
            },
          ],
        },
      },
      {
        subheading: "Status transparency & pre-approved partner offers",
        lead: "Eliminating post-submission anxiety with clear state feedback.",
        body: [
          "After form submission, users receive instantaneous status updates with clear timelines for document verification and lender review.",
          "If a specific loan is held for verification, the app surfaces tailored pre-approved partner alternatives so applicants always have immediate options.",
        ],
        imageGroup: {
          layout: "two-up",
          caption:
            "Application status clarity and instant secondary offer discovery.",
          images: [
            {
              src: "/work/credbuddha/credbuddha-application-review-pending-01.jpg",
              alt: "CredBuddha loan application pending review screen",
              title: "Pending review state",
            },
            {
              src: "/work/credbuddha/credbuddha-loan-discovery-offers-default-02.jpg",
              alt: "CredBuddha list of pre-approved loan offers",
              title: "Pre-approved offers",
            },
          ],
        },
      },
    ],
  },
  behindTheBuild: {
    lead: "Designing for trust in regulated financial environments.",
    paragraphs: [
      "Fintech workflows require strict data collection while maintaining user trust. By standardizing typography, consistent input field tokens, and explicit privacy reassurance at each stage, the design reduces drop-off rates.",
      "Component states were systematically designed for edge cases, including credit verification pauses, rejected status messaging with constructive alternatives, and pre-approved partner cards.",
    ],
    note: "Product behavior and flow descriptions are based on the supplied design files.",
  },
  reflection: {
    lead: "In financial workflows, clarity is speed.",
    paragraphs: [
      "When users clearly understand why information is needed and what happens next, completion rates climb significantly.",
      "Simplicity in visual presentation reduces cognitive fatigue, transforming what could be an intimidating financial chore into an empowering experience.",
    ],
  },
  focusAreas: [
    "Loan and credit offer discovery",
    "Guided multi-step loan application",
    "Application status and outcome states",
    "Account, profile, and referral journeys",
  ],
  images: [
    {
      src: "/work/credbuddha/credbuddha-loan-discovery-dashboard-feed-default-01.jpg",
      alt: "CredBuddha home screen with loan categories and offers",
      title: "Home",
    },
    {
      src: "/work/credbuddha/credbuddha-loan-discovery-offers-default-02.jpg",
      alt: "CredBuddha list of pre-approved loan offers",
      title: "Loan offers",
    },
    {
      src: "/work/credbuddha/credbuddha-loan-application-terms-selection-default-01.jpg",
      alt: "CredBuddha apply-for-a-loan introduction screen",
      title: "Apply for a loan",
    },
    {
      src: "/work/credbuddha/credbuddha-loan-application-personal-details-step-02.jpg",
      alt: "CredBuddha first step of the loan application details form",
      title: "Application details",
    },
    {
      src: "/work/credbuddha/credbuddha-application-review-pending-01.jpg",
      alt: "CredBuddha loan application pending review screen",
      title: "Application status",
    },
  ],
};

/* ==========================================================================
   TURBOPAISA CASE STUDY DATA
   ========================================================================== */

export const turboPaisaProject: PhoneProject = {
  slug: "turbopaisa",
  title: "TurboPaisa",
  platform: "Mobile app · Rewards and earnings",
  deviceType: "phone",
  summary:
    "A gamified mobile rewards experience designed around daily tasks, scratch-card mechanics, and real-time wallet withdrawals.",
  shortDescription:
    "A gamified mobile rewards platform designed around daily tasks, scratch-card mechanics, and real-time wallet withdrawals.",
  categoryTags: ["Personal project", "Mobile App", "2024"],
  year: "2024",
  status: "Shipped",
  role: "Product Designer & Frontend Developer",
  timeline: "Eight weeks · 2024",
  tools: ["Figma", "React Native", "Tailwind CSS", "Motion Design"],
  figmaUrl:
    "https://www.figma.com/design/HvtFw171Xxz7oVaqDQHIGC/TurboPaisa-Mobile-App--Copy-?node-id=0-1&p=f",
  overview:
    "The supplied screens show a colorful mobile product organized around earning opportunities. The home screen brings together tasks, scratch cards, quizzes, games, and offers, while wallet and referral screens support the account journey.",
  overviewData: {
    lead: "A playful, frictionless rewards engine built for daily retention.",
    description: [
      "TurboPaisa was created to turn fragmented reward actions into a cohesive, engaging mobile habit. Many earning apps suffer from cluttered layouts, unclear redemption rules, and opaque transaction states.",
      "By rethinking the journey from initial task discovery to wallet payouts, TurboPaisa combines tactile gamification with immediate financial clarity.",
    ],
    role: "Lead UI/UX Designer & Frontend Developer. Eight weeks, 2024",
    timeline: "Eight weeks · 2024",
    tools: ["Figma", "React Native", "Tailwind CSS", "Design Systems"],
    figmaUrl:
      "https://www.figma.com/design/HvtFw171Xxz7oVaqDQHIGC/TurboPaisa-Mobile-App--Copy-?node-id=0-1&p=f",
  },
  highlights: [
    {
      value: "4 Modes",
      label: "Scratch cards, daily tasks, quizzes & offers",
    },
    {
      value: "Instant Wallet",
      label: "Transparent point ledger & direct payouts",
    },
    {
      value: "Tactile Loops",
      label: "Physics-based reveals & referral multiplier",
    },
  ],
  userFlows: [
    {
      id: "daily-retention-loop",
      title: "Daily Retention & Interactive Task Loop",
      description:
        "The core daily engagement cycle: users launch the app, engage in tactile earning activities, and instantly credit accrued points to their live ledger.",
      steps: [
        {
          stepNumber: 1,
          title: "Home Earning Feed",
          description:
            "Browse active earning modes: scratch cards, bonus wheel spins, daily quizzes, and sponsored partner tasks.",
          action: "Tap 'Scratch Card' card",
          screenSrc: "/work/turbopaisa/turbopaisa-home-rewards-dashboard-default-01.jpg",
          screenAlt: "TurboPaisa home screen with earning activities",
        },
        {
          stepNumber: 2,
          title: "Scratch Card Reveal",
          description:
            "Tactile finger-swipe gesture scrubs away metallic overlay with physics-based confetti feedback.",
          action: "Scratch screen overlay",
          outcome: "Reveals coin reward value",
          screenSrc: "/work/turbopaisa/turbopaisa-tasks-scratch-card-ready-01.jpg",
          screenAlt: "TurboPaisa scratch card rewards screen",
        },
        {
          stepNumber: 3,
          title: "Daily Spin Wheel",
          description:
            "Interactive fortune wheel offering bonus multipliers and consecutive login streaks.",
          action: "Spin the wheel",
          screenSrc: "/work/turbopaisa/turbopaisa-games-spin-wheel-default-01.jpg",
          screenAlt: "TurboPaisa spin game screen",
        },
        {
          stepNumber: 4,
          title: "Reward Claim Popup",
          description:
            "Instant modal confirming points credited to wallet balance with immediate claim CTA.",
          action: "Tap 'Collect Points'",
          outcome: "Points immediately reflect in top navigation balance",
          screenSrc: "/work/turbopaisa/turbopaisa-games-spin-result-celebration-02.jpg",
          screenAlt: "TurboPaisa spin reward popup",
        },
      ],
    },
    {
      id: "wallet-withdrawal",
      title: "Transparent Wallet Payout & Cashout Journey",
      description:
        "Clear point-to-currency ledger enabling users to transfer earned rewards directly to their bank accounts or UPI IDs.",
      steps: [
        {
          stepNumber: 1,
          title: "Wallet Overview",
          description:
            "Check current point balance, rupee equivalent, withdrawal thresholds, and recent transaction entries.",
          action: "Tap 'Withdraw Funds'",
          screenSrc: "/work/turbopaisa/turbopaisa-wallet-balance-default-01.jpg",
          screenAlt: "TurboPaisa wallet balance screen",
        },
        {
          stepNumber: 2,
          title: "Bank & UPI Details",
          description:
            "Provide beneficiary details, bank account number, and IFSC code for direct IMPS deposit.",
          action: "Input payment destination & submit",
          screenSrc: "/work/turbopaisa/turbopaisa-wallet-withdrawal-details-payout-01.jpg",
          screenAlt: "TurboPaisa bank details input screen",
        },
        {
          stepNumber: 3,
          title: "Withdrawal History",
          description:
            "Real-time ledger verifying payout status, transaction ID, and banking transfer confirmation.",
          action: "Review transaction confirmation",
          outcome: "Direct bank transfer credited to account",
          screenSrc: "/work/turbopaisa/turbopaisa-wallet-transaction-history-ledger-01.jpg",
          screenAlt: "TurboPaisa transaction history screen",
        },
      ],
    },
  ],
  stateFlows: [
    {
      id: "wallet-states",
      title: "Wallet Payout & Reward Progression States",
      description:
        "Tracking how points move through the system from initial acquisition to verified banking settlement.",
      states: [
        {
          stateName: "Accumulated Active Balance",
          stateType: "default",
          trigger: "User opens wallet dashboard",
          userAction: "Review eligible payout thresholds",
          behavior:
            "Shows active points balance, conversion rate (1000 pts = ₹10), and available voucher options.",
          screenSrc: "/work/turbopaisa/turbopaisa-wallet-balance-default-01.jpg",
          screenAlt: "Active wallet balance screen",
        },
        {
          stateName: "Withdrawal Under Review",
          stateType: "pending",
          trigger: "User submits cashout request",
          userAction: "Wait for banking gateway clearance",
          behavior:
            "Locks deducted points, displays transfer reference ID, and sets expected 2-hour SLA badge.",
          screenSrc: "/work/turbopaisa/turbopaisa-wallet-withdrawal-details-payout-01.jpg",
          screenAlt: "Withdrawal pending processing screen",
        },
        {
          stateName: "Settlement Confirmed",
          stateType: "success",
          trigger: "Bank webhook verifies IMPS clearance",
          userAction: "Receive push notification and receipt",
          behavior:
            "Updates transaction ledger to green 'Settled' state with downloadable payout voucher.",
          screenSrc: "/work/turbopaisa/turbopaisa-wallet-transaction-history-ledger-01.jpg",
          screenAlt: "Settled transaction history screen",
        },
      ],
    },
  ],
  solution: {
    lead: "Everything you need to turn spare moments into tangible rewards.",
    blocks: [
      {
        subheading: "Tactile earning activities & daily retention",
        lead: "Engaging micro-interactions that make earning fun and rewarding.",
        body: [
          "TurboPaisa centers on quick, delightful daily user actions. The home dashboard provides a dynamic overview of available tasks, interactive scratch cards, and partner offers, encouraging habitual daily retention.",
          "Scratch-card reveals incorporate spring physics and tactile cues, delivering an immediate sense of celebration and reward.",
        ],
        imageGroup: {
          layout: "three-up",
          caption:
            "Core retention loop: home activity feed, tactile scratch card reveal, and instant wallet balance.",
          images: [
            {
              src: "/work/turbopaisa/turbopaisa-home-rewards-dashboard-default-01.jpg",
              alt: "TurboPaisa home screen with earning activities and offers",
              title: "Home & feed",
            },
            {
              src: "/work/turbopaisa/turbopaisa-tasks-scratch-card-ready-01.jpg",
              alt: "TurboPaisa scratch-card rewards screen",
              title: "Scratch cards",
            },
            {
              src: "/work/turbopaisa/turbopaisa-wallet-balance-default-01.jpg",
              alt: "TurboPaisa wallet showing points and recent transactions",
              title: "Points wallet",
            },
          ],
        },
      },
      {
        subheading: "Viral growth loops and transparent cashout",
        lead: "Incentivizing organic growth through clear multi-tier referral bonuses.",
        body: [
          "The referral hub provides users with custom invite links, clear earnings progress, and milestone bonuses that unlock as friends sign up.",
          "The wallet interface provides unambiguous point-to-cash exchange rates and immediate transaction histories, ensuring users trust their accumulated rewards.",
        ],
        imageGroup: {
          layout: "two-up",
          caption:
            "Transparent accounting: real-time referral ledger and verified transaction records.",
          images: [
            {
              src: "/work/turbopaisa/turbopaisa-referrals-invite-hub-default-01.jpg",
              alt: "TurboPaisa refer-and-earn screen",
              title: "Referral hub",
            },
            {
              src: "/work/turbopaisa/turbopaisa-wallet-transaction-history-ledger-01.jpg",
              alt: "TurboPaisa points and payout history",
              title: "Transaction history",
            },
          ],
        },
      },
    ],
  },
  behindTheBuild: {
    lead: "Balancing vibrant gamification with crisp, readable layout.",
    paragraphs: [
      "Rewards applications frequently slide into visual noise. We established a restrained layout grid where vibrant brand accents highlight interactive cards without overwhelming the typography.",
      "Performance on budget smartphones was a critical benchmark, requiring lightweight animations and optimized asset rendering across Android devices.",
    ],
    note: "All screens shown are from the design files. Interactions and animations follow the prototype specifications.",
  },
  reflection: {
    lead: "Trust is the ultimate retention metric in reward platforms.",
    paragraphs: [
      "Gamification gets users through the door, but transparent redemption and prompt payouts are what retain them.",
      "Designing the wallet with bank-grade precision established long-term trust and sustained user engagement across the lifecycle.",
    ],
  },
  focusAreas: [
    "Offer and activity discovery",
    "Points wallet and redemption",
    "Scratch-card and game entry points",
    "Referral, profile, and settings",
  ],
  images: [
    {
      src: "/work/turbopaisa/turbopaisa-home-rewards-dashboard-default-01.jpg",
      alt: "TurboPaisa home screen with earning activities and offers",
      title: "Home & offers",
    },
    {
      src: "/work/turbopaisa/turbopaisa-wallet-balance-default-01.jpg",
      alt: "TurboPaisa wallet showing points and recent transactions",
      title: "Points wallet",
    },
    {
      src: "/work/turbopaisa/turbopaisa-tasks-scratch-card-ready-01.jpg",
      alt: "TurboPaisa scratch-card rewards screen",
      title: "Scratch cards",
    },
    {
      src: "/work/turbopaisa/turbopaisa-referrals-invite-hub-default-01.jpg",
      alt: "TurboPaisa refer-and-earn screen",
      title: "Refer & earn",
    },
  ],
};

/* ==========================================================================
   CORE VOLT MATRIX (CVM HRM) CASE STUDY DATA
   ========================================================================== */

export const cvmHrmProject: PhoneProject = {
  slug: "cvm-hrm",
  title: "Core Volt Matrix",
  platform: "Desktop web portal · Enterprise HRMS",
  deviceType: "desktop",
  summary:
    "An enterprise HRMS platform unifying employee self-service, onboarding workflows, attendance timesheet review, leave management, and asset tracking.",
  shortDescription:
    "An enterprise desktop HRMS platform unifying employee onboarding, attendance tracking, leave self-service, and asset management.",
  categoryTags: ["Enterprise HRMS", "Desktop Web Portal", "2024–2025"],
  year: "2024–2025",
  status: "Production",
  role: "Lead Product Designer & Frontend Developer",
  timeline: "Enterprise rollout · 2024–2025",
  tools: ["React.js", "Tailwind CSS", "Figma", "Enterprise Design Systems"],
  figmaUrl:
    "https://www.figma.com/design/QHz9fHEgbZqwUJKJR6N8ab/CVM-HRM?node-id=374-16318&p=f",
  overview:
    "The supplied screens show a comprehensive desktop portal designed for both employees and HR administrators. Built with a persistent navigation rail, global search, and clean data tables, the system streamlines everyday tasks—such as clocking attendance and requesting leave—while equipping HR teams with structured workflows for employee onboarding, asset tracking, and company announcements.",
  overviewData: {
    lead: "High-density operational clarity for everyday enterprise workflows.",
    description: [
      "Core Volt Matrix unifies fragmented HR spreadsheets and portal tools into an intuitive desktop dashboard. Clocking attendance, submitting expense and leave requests, and reviewing team calendars are accessible in 1-click workflows from the main overview.",
      "HR administrators gain immediate operational visibility with pending request counters, attendance summaries, and department alerts across the organization.",
    ],
    role: "Lead Product Designer & Frontend Developer. Enterprise rollout, 2024–2025",
    timeline: "2024–2025",
    tools: ["React.js", "Tailwind CSS", "Figma", "Enterprise Design Systems"],
    figmaUrl:
      "https://www.figma.com/design/QHz9fHEgbZqwUJKJR6N8ab/CVM-HRM?node-id=374-16318&p=f",
  },
  highlights: [
    {
      value: "6 Modules",
      label: "Onboarding, attendance, leaves, assets & team directory",
    },
    {
      value: "Dual Portals",
      label: "Tailored dashboards for staff and HR administrators",
    },
    {
      value: "Desktop Suite",
      label: "Persistent navigation rail and high-density data tables",
    },
  ],
  userFlows: [
    {
      id: "onboarding-pipeline",
      title: "Employee Onboarding & Equipment Allocation Pipeline",
      description:
        "The complete end-to-end employee induction lifecycle: creating an account, assigning department checklists, and allocating physical IT hardware assets.",
      steps: [
        {
          stepNumber: 1,
          title: "HR Onboarding Hub",
          description:
            "Admin overview tracking incoming hires, pending document reviews, and induction stage percentages.",
          action: "Click '+ Add Employee' action button",
          screenSrc: "/work/cvm-hrm/cvm-hrms-onboarding-cohort-dashboard-default-01.jpg",
          screenAlt: "CVM HRM onboarding dashboard",
        },
        {
          stepNumber: 2,
          title: "Employee Registration Modal",
          description:
            "Structured modal form capturing personal information, role title, department, reporting manager, and salary grade.",
          action: "Complete fields & assign onboarding cohort",
          screenSrc: "/work/cvm-hrm/cvm-hrms-employees-add-dialog-open-03.jpg",
          screenAlt: "CVM HRM add employee dialog",
        },
        {
          stepNumber: 3,
          title: "Milestone Tracking List",
          description:
            "Multi-stage tracker monitoring background checks, contract signatures, security badges, and training modules.",
          action: "Inspect employee verification checklist",
          screenSrc: "/work/cvm-hrm/cvm-hrms-onboarding-milestone-checklist-progress-04.jpg",
          screenAlt: "CVM HRM onboarding milestone list",
        },
        {
          stepNumber: 4,
          title: "IT Asset Provisioning",
          description:
            "Direct handoff to IT inventory module to check out laptop, monitor, and peripherals with serial tracking.",
          action: "Assign serial number and confirm allocation",
          outcome: "Hardware registered to employee inventory ledger",
          screenSrc: "/work/cvm-hrm/cvm-hrms-assets-create-modal-form-03.jpg",
          screenAlt: "CVM HRM asset creation and allocation dialog",
        },
      ],
    },
    {
      id: "timesheet-approval-cycle",
      title: "Attendance & Timesheet Manager Approval Cycle",
      description:
        "Transparent hours logging workflow ensuring precise project billing, overtime validation, and audit-ready managerial approvals.",
      steps: [
        {
          stepNumber: 1,
          title: "Employee Timesheet Logging",
          description:
            "Staff log daily hours against client project codes with task descriptions and billable toggles.",
          action: "Review weekly total & tap 'Submit for Approval'",
          screenSrc: "/work/cvm-hrm/cvm-hrms-attendance-timesheet-default-01.jpg",
          screenAlt: "CVM HRM employee timesheet entry",
        },
        {
          stepNumber: 2,
          title: "Manager Review Queue",
          description:
            "Department leads inspect submitted hours with overtime alerts, sick leave cross-checks, and project caps.",
          action: "Select timesheet entry to inspect details",
          screenSrc: "/work/cvm-hrm/cvm-hrms-attendance-review-queue-02.jpg",
          screenAlt: "CVM HRM manager timesheet dashboard",
        },
        {
          stepNumber: 3,
          title: "Timesheet Detail Inspection",
          description:
            "Granular breakdown of task hours, billable ratios, and project milestone linkages.",
          action: "Choose 'Approve' or 'Reject with Reason'",
          decisionPoint: "Hours verified against sprint scope?",
          outcome: "Approved to payroll or opened in structured rejection dialog",
          screenSrc: "/work/cvm-hrm/cvm-hrms-timesheet-inspection-modal-details-03.jpg",
          screenAlt: "CVM HRM timesheet details inspection dialog",
        },
      ],
    },
  ],
  stateFlows: [
    {
      id: "admin-approval-states",
      title: "Managerial Review & Action States",
      description:
        "Demonstrating consequential interface states across timesheets, asset assignments, and leave approvals.",
      states: [
        {
          stateName: "Pending Department Sign-off",
          stateType: "pending",
          trigger: "Staff submits timesheet or leave form",
          userAction: "Manager filters by pending queue",
          behavior:
            "Highlights entry with amber status chip and displays quick-review actions in data row.",
          screenSrc: "/work/cvm-hrm/cvm-hrms-attendance-review-queue-02.jpg",
          screenAlt: "Timesheet pending review dashboard",
        },
        {
          stateName: "Rejection Reason Dialog",
          stateType: "rejected",
          trigger: "Manager declines timesheet or expense",
          userAction: "Input mandatory explanatory feedback",
          behavior:
            "Blocks accidental rejection without explanation; sends instant notification to employee for correction.",
          screenSrc: "/work/cvm-hrm/cvm-hrms-attendance-rejection-dialog-reason-04.jpg",
          screenAlt: "Timesheet reject reason modal",
        },
        {
          stateName: "Leave Approved & Calendar Synced",
          stateType: "success",
          trigger: "Supervisor signs off on vacation request",
          userAction: "Employee receives automated confirmation",
          behavior:
            "Deducts quota from balance counter, syncs team calendar, and flags substitute coverage.",
          screenSrc: "/work/cvm-hrm/cvm-hrms-leave-approval-confirmation-modal-04.jpg",
          screenAlt: "Leave request approved modal",
        },
      ],
    },
  ],
  solution: {
    lead: "Modern ergonomics and operational clarity for enterprise management.",
    blocks: [
      {
        subheading: "Operational dashboard & self-service leaves",
        lead: "Unifying fragmented HR spreadsheets into intuitive centralized dashboards.",
        body: [
          "The Core Volt Matrix portal replaces disconnected spreadsheets and email threads with a single desktop hub. Employees can check remaining leave quotas, request time off in seconds, and track approval status in real time.",
          "HR administrators gain immediate operational visibility with pending request counters, attendance summaries, and department alerts.",
        ],
        imageGroup: {
          layout: "two-up",
          caption:
            "Centralized administrator dashboard and employee leave self-service portal.",
          images: [
            {
              src: "/work/cvm-hrm/cvm-hrms-dashboard-overview-default-01.jpg",
              alt: "CVM HRM overview dashboard with attendance, quick actions, and metrics",
              title: "Overview dashboard",
            },
            {
              src: "/work/cvm-hrm/cvm-hrms-leave-balances-dashboard-default-01.jpg",
              alt: "CVM HRM leave management dashboard and request history",
              title: "Leave management",
            },
          ],
        },
      },
      {
        subheading: "Employee onboarding & IT asset tracking",
        lead: "Tracking employee progression and equipment handovers from day one.",
        body: [
          "New team members navigate step-by-step onboarding checklists, document uploads, and company policy acknowledgments.",
          "The integrated asset management module tracks serial numbers, hardware warranties, and equipment allocation to ensure zero inventory leakage across distributed teams.",
        ],
        imageGroup: {
          layout: "two-up",
          caption:
            "Structured onboarding pipeline and enterprise hardware asset registry.",
          images: [
            {
              src: "/work/cvm-hrm/cvm-hrms-onboarding-cohort-dashboard-default-01.jpg",
              alt: "CVM HRM employee onboarding dashboard and progress tracker",
              title: "Onboarding milestones",
            },
            {
              src: "/work/cvm-hrm/cvm-hrms-assets-management-dashboard-01.jpg",
              alt: "CVM HRM asset management and equipment allocation list",
              title: "Hardware inventory",
            },
          ],
        },
      },
      {
        subheading: "Attendance tracking & organizational directory",
        lead: "Precision timesheets and transparent company-wide directory.",
        body: [
          "Timesheet reviews, overtime calculations, and shift logs are visualized in high-density data tables with sorting, filtering, and export capabilities.",
          "The team directory facilitates cross-department communication with search, reporting lines, and contact info.",
        ],
        imageGroup: {
          layout: "two-up",
          caption:
            "Attendance verification logs and company-wide staff directory.",
          images: [
            {
              src: "/work/cvm-hrm/cvm-hrms-attendance-overview-calendar-default-01.jpg",
              alt: "CVM HRM attendance tracking and timesheet review",
              title: "Timesheets & attendance",
            },
            {
              src: "/work/cvm-hrm/cvm-hrms-team-department-roster-directory-01.jpg",
              alt: "CVM HRM team directory and department management",
              title: "Department directory",
            },
          ],
        },
      },
    ],
  },
  behindTheBuild: {
    lead: "Architecting a scalable design system for dense enterprise data.",
    paragraphs: [
      "Enterprise software requires consistent data density and keyboard accessibility. We built a modular component library in React and Tailwind CSS featuring standardized table headers, badge variants, modal dialogs, and persistent sidebar navigation.",
      "Color was used deliberately: neutral slates for structures, vibrant greens/ambers/reds strictly reserved for state signals (approved, pending, flagged).",
    ],
    note: "Desktop web portal built for high productivity across multi-department teams.",
  },
  reflection: {
    lead: "Consumer-grade UX belongs in enterprise tools.",
    paragraphs: [
      "Enterprise tools are often tolerated rather than enjoyed. By applying modern spacing, responsive layouts, and responsive transitions, we proved that administrative software can be as fast and pleasant as the best consumer products.",
    ],
  },
  focusAreas: [
    "Overview & operational dashboard",
    "Employee onboarding & progress",
    "Attendance tracking & timesheets",
    "Leave self-service & approvals",
    "Asset inventory & allocation",
    "Team directory & employee self-service",
  ],
  images: [
    {
      src: "/work/cvm-hrm/cvm-hrms-dashboard-overview-default-01.jpg",
      alt: "CVM HRM overview dashboard with attendance, quick actions, and metrics",
      title: "Overview dashboard",
      urlPath: "overview",
    },
    {
      src: "/work/cvm-hrm/cvm-hrms-leave-balances-dashboard-default-01.jpg",
      alt: "CVM HRM leave management dashboard and request history",
      title: "Leave management",
      urlPath: "leaves",
    },
    {
      src: "/work/cvm-hrm/cvm-hrms-attendance-overview-calendar-default-01.jpg",
      alt: "CVM HRM attendance tracking and timesheet review",
      title: "Attendance & timesheets",
      urlPath: "attendance",
    },
    {
      src: "/work/cvm-hrm/cvm-hrms-onboarding-cohort-dashboard-default-01.jpg",
      alt: "CVM HRM employee onboarding dashboard and progress tracker",
      title: "Employee onboarding",
      urlPath: "onboarding",
    },
    {
      src: "/work/cvm-hrm/cvm-hrms-assets-management-dashboard-01.jpg",
      alt: "CVM HRM asset management and equipment allocation list",
      title: "Asset management",
      urlPath: "assets",
    },
    {
      src: "/work/cvm-hrm/cvm-hrms-team-department-roster-directory-01.jpg",
      alt: "CVM HRM team directory and department management",
      title: "Team directory",
      urlPath: "team",
    },
    {
      src: "/work/cvm-hrm/cvm-hrms-employee-profile-overview-default-01.jpg",
      alt: "CVM HRM employee self-service profile and details",
      title: "Employee self-service",
      urlPath: "self-service",
    },
    {
      src: "/work/cvm-hrm/cvm-hrms-approvals-central-hr-queue-01.jpg",
      alt: "CVM HRM HR requests and approval workflow",
      title: "HR requests",
      urlPath: "hr-requests",
    },
  ],
};
