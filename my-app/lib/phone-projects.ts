export type ImageItem = {
  src: string;
  alt: string;
  title: string;
  urlPath?: string;
};

export type PhoneProject = {
  slug: string;
  title: string;
  platform: string;
  deviceType?: "phone" | "desktop";
  summary: string;
  overview: string;
  focusAreas: string[];
  images: ImageItem[];
};

export type Project = PhoneProject;

export const turboPaisaProject: PhoneProject = {
  slug: "turbopaisa",
  title: "TurboPaisa",
  platform: "Mobile app · Rewards and earnings",
  deviceType: "phone",
  summary:
    "A rewards experience for discovering earning activities, tracking points, and managing wallet and referral journeys.",
  overview:
    "The supplied screens show a colorful mobile product organized around earning opportunities. The home screen brings together tasks, scratch cards, quizzes, games, and offers, while wallet and referral screens support the account journey.",
  focusAreas: [
    "Offer and activity discovery",
    "Points wallet and redemption",
    "Scratch-card and game entry points",
    "Referral, profile, and settings",
  ],
  images: [
    {
      src: "/work/turbopaisa/home.jpg",
      alt: "TurboPaisa home screen with earning activities and offers",
      title: "Home & offers",
    },
    {
      src: "/work/turbopaisa/wallet.jpg",
      alt: "TurboPaisa wallet showing points and recent transactions",
      title: "Points wallet",
    },
    {
      src: "/work/turbopaisa/scratch-card.jpg",
      alt: "TurboPaisa scratch-card rewards screen",
      title: "Scratch cards",
    },
    {
      src: "/work/turbopaisa/referrals.jpg",
      alt: "TurboPaisa refer-and-earn screen",
      title: "Refer & earn",
    },
  ],
};

export const credBuddhaProject: PhoneProject = {
  slug: "credbuddha",
  title: "CredBuddha",
  platform: "Mobile app · Lending and credit",
  deviceType: "phone",
  summary:
    "A mobile financial-services experience for discovering loan and credit offers, applying, and following application status.",
  overview:
    "The provided screens cover a loan-discovery journey from the home screen and pre-approved offers into a multi-step application. Separate pending, approved, and rejected states communicate that an application is reviewed after submission.",
  focusAreas: [
    "Loan and credit offer discovery",
    "Guided multi-step loan application",
    "Application status and outcome states",
    "Account, profile, and referral journeys",
  ],
  images: [
    {
      src: "/work/credbuddha/home.jpg",
      alt: "CredBuddha home screen with loan categories and offers",
      title: "Home",
    },
    {
      src: "/work/credbuddha/pre-approved.jpg",
      alt: "CredBuddha list of pre-approved loan offers",
      title: "Loan offers",
    },
    {
      src: "/work/credbuddha/apply-loan.jpg",
      alt: "CredBuddha apply-for-a-loan introduction screen",
      title: "Apply for a loan",
    },
    {
      src: "/work/credbuddha/loan-details.jpg",
      alt: "CredBuddha first step of the loan application details form",
      title: "Application details",
    },
    {
      src: "/work/credbuddha/pending.jpg",
      alt: "CredBuddha loan application pending review screen",
      title: "Application status",
    },
  ],
};

export const cvmHrmProject: PhoneProject = {
  slug: "cvm-hrm",
  title: "Core Volt Matrix",
  platform: "Desktop web portal · Enterprise HRMS",
  deviceType: "desktop",
  summary:
    "An enterprise HRMS platform unifying employee self-service, onboarding workflows, attendance and timesheet review, leave management, and asset tracking.",
  overview:
    "The supplied screens show a comprehensive desktop portal designed for both employees and HR administrators. Built with a persistent navigation rail, global search, and clean data tables, the system streamlines everyday tasks—such as clocking attendance and requesting leave—while equipping HR teams with structured workflows for employee onboarding, asset tracking, and company announcements.",
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
      src: "/work/cvm-hrm/dashboard.jpg",
      alt: "CVM HRM overview dashboard with attendance, quick actions, and metrics",
      title: "Overview dashboard",
      urlPath: "overview",
    },
    {
      src: "/work/cvm-hrm/leaves.jpg",
      alt: "CVM HRM leave management dashboard and request history",
      title: "Leave management",
      urlPath: "leaves",
    },
    {
      src: "/work/cvm-hrm/attendance.jpg",
      alt: "CVM HRM attendance tracking and timesheet review",
      title: "Attendance & timesheets",
      urlPath: "attendance",
    },
    {
      src: "/work/cvm-hrm/onboarding.jpg",
      alt: "CVM HRM employee onboarding dashboard and progress tracker",
      title: "Employee onboarding",
      urlPath: "onboarding",
    },
    {
      src: "/work/cvm-hrm/assets.jpg",
      alt: "CVM HRM asset management and equipment allocation list",
      title: "Asset management",
      urlPath: "assets",
    },
    {
      src: "/work/cvm-hrm/team.jpg",
      alt: "CVM HRM team directory and department management",
      title: "Team directory",
      urlPath: "team",
    },
    {
      src: "/work/cvm-hrm/self-service.jpg",
      alt: "CVM HRM employee self-service profile and details",
      title: "Employee self-service",
      urlPath: "self-service",
    },
    {
      src: "/work/cvm-hrm/hr-requests.jpg",
      alt: "CVM HRM HR requests and approval workflow",
      title: "HR requests",
      urlPath: "hr-requests",
    },
  ],
};
