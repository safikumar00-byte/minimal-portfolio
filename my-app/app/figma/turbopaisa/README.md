# TurboPaisa Design System & Flow Architecture

## 1. Project Overview
TurboPaisa is a mobile rewards ecosystem offering users instant micro-earnings through daily tasks, gamified mechanics (scratch cards, lucky spin wheels), and peer referrals with immediate UPI/Paytm withdrawals.

- **Platform**: React Native Mobile App
- **Design Resolution**: 1080 × 2400 (Full HD Mobile)
- **Primary Design Reference**: [TurboPaisa Figma](https://www.figma.com/design/HvtFw171Xxz7oVaqDQHIGC/TurboPaisa-Mobile-App--Copy-?node-id=0-1&p=f) (`0:1`)

## 2. Directory Layout
```text
app/figma/turbopaisa/
├── README.md
├── asset-manifest.json
├── source/figma-reference.md
├── screens/
│   ├── onboarding/
│   ├── authentication/
│   ├── home-dashboard/
│   ├── scratch-cards/
│   ├── spin-wheel/
│   ├── challenges/
│   ├── wallet/
│   ├── withdrawals/
│   ├── transactions/
│   ├── referrals/
│   ├── account/
│   └── system/
├── user-flows/
│   ├── onboarding-flow/
│   ├── scratch-and-spin-flow/
│   ├── wallet-withdrawal-flow/
│   └── referral-reward-flow/
└── state-flows/
    ├── reward-states/
    ├── wallet-states/
    └── withdrawal-states/
```

## 3. Screen Inventory & Modules
TurboPaisa contains 18 verified canonical screens across 12 functional modules:
1. `onboarding`: Splash, value proposition hero, language selector.
2. `authentication`: Login and sign-up with referral code input.
3. `home-dashboard`: Live coin balance, daily streak counters, task cards.
4. `scratch-cards`: Interactive scratch canvas with instant reward reveal.
5. `spin-wheel`: Multiplier wheel with physics rotation and celebratory victory modal.
6. `challenges`: Weekly progress bar and milestone unlocks.
7. `wallet`: Coin-to-INR conversion rate and cashout options.
8. `withdrawals`: Payout method input (UPI/Bank) and processing status screen.
9. `transactions`: Comprehensive debit/credit financial ledger.
10. `referrals`: Personal referral code hub and WhatsApp share tutorial.
11. `account`: User settings, audio toggles, and help center.
12. `system`: Forced/recommended app version update alert.
