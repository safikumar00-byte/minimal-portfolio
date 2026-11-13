import type { ImageItem } from "@/components/ui/phone-carousel";

export type PhoneProject = {
  slug: string;
  title: string;
  platform: string;
  summary: string;
  overview: string;
  focusAreas: string[];
  images: ImageItem[];
};

export const turboPaisaProject: PhoneProject = {
  slug: "turbopaisa",
  title: "TurboPaisa",
  platform: "Mobile app · Rewards and earnings",
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
