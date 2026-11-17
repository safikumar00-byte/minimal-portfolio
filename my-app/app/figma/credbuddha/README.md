# CredBuddha Design System & Flow Architecture

## 1. Project Overview
CredBuddha is an end-to-end digital lending marketplace connecting retail borrowers with institutional credit providers. The platform delivers instant pre-approvals, digital KYC verification, transparent APR terms, and automated disbursement status tracking.

- **Platform**: React Native / Flutter Cross-Platform Mobile
- **Design Resolution**: 1080 × 2400 (Full HD Mobile)
- **Primary Design Reference**: [CredBuddha Figma](https://www.figma.com/design/L03mwtiwKeLRPx8Ti7SF02/Credbuddha-v-2--Copy-?node-id=102-45&p=f) (`102:45`)

## 2. Directory Layout
```text
app/figma/credbuddha/
├── README.md
├── asset-manifest.json
├── source/figma-reference.md
├── screens/
│   ├── onboarding/
│   ├── authentication/
│   ├── registration/
│   ├── loan-discovery/
│   ├── loan-application/
│   ├── application-status/
│   ├── loan-outcomes/
│   └── account-management/
├── user-flows/
│   ├── registration-flow/
│   ├── loan-discovery-flow/
│   └── loan-application-flow/
└── state-flows/
    ├── authentication-states/
    ├── application-states/
    └── loan-outcome-states/
```

## 3. Screen Inventory & Modules
CredBuddha contains 17 verified canonical screens organized into 8 functional modules:
1. `onboarding`: Welcome entry screen.
2. `authentication`: Phone number entry and 6-digit SMS OTP verification.
3. `registration`: User profile creation and confirmation modal.
4. `loan-discovery`: Personalized feed, credit score gauge, pre-approved loan cards, and credit cards.
5. `loan-application`: Loan configuration slider, PAN verification (Step 1), and Income/Bank KYC (Step 2).
6. `application-status`: Automated underwriting queue animation.
7. `loan-outcomes`: Sanction letter / approved state vs. credit improvement recommendations.
8. `account-management`: Profile overview, edit profile form, and referral earnings hub.

## 4. User Journeys
- **Registration Flow**: From initial splash to authenticated home feed via verified SMS OTP.
- **Loan Discovery Flow**: Exploring tailored credit offers, evaluating interest rates, and browsing financial cards.
- **Loan Application Flow**: Configuring desired tenure/amount, fulfilling 2-step compliance checks, and tracking automated underwriting.

## 5. Interaction States
- **Authentication**: Unauthenticated → Phone Number Input → OTP Sent → Verified Session.
- **Application**: Form Draft → Step 1 Validated → Step 2 Submitted → Processing.
- **Outcomes**: Sanctioned Approved (₹1.5L) vs. Declined with alternative pre-qualification options.
