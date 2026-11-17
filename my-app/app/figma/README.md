# Figma Source Registry & Asset Documentation

This directory houses the audited, verified, and canonical Figma asset structure for the three primary portfolio projects:

1. **CredBuddha** — Fintech Loan & Credit Marketplace
2. **TurboPaisa** — Gamified Rewards & Micro-Task Platform
3. **CVM HRMS** — Enterprise Human Resource Management System

---

## 1. Project Reference Index

| Project Name | Remote Figma URL | File Identifier | Starting Node | Local Root Path | Reviewed Canonical Screens | Access Status |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| **CredBuddha** | [Figma File](https://www.figma.com/design/L03mwtiwKeLRPx8Ti7SF02/Credbuddha-v-2--Copy-?node-id=102-45&p=f) | `L03mwtiwKeLRPx8Ti7SF02` | `102:45` | `app/figma/credbuddha/` | 17 | Local Exports Verified / Remote View Only (403 unauth) |
| **TurboPaisa** | [Figma File](https://www.figma.com/design/HvtFw171Xxz7oVaqDQHIGC/TurboPaisa-Mobile-App--Copy-?node-id=0-1&p=f) | `HvtFw171Xxz7oVaqDQHIGC` | `0:1` | `app/figma/turbopaisa/` | 18 | Local Exports Verified / Remote View Only (403 unauth) |
| **CVM HRMS** | [Figma File](https://www.figma.com/design/QHz9fHEgbZqwUJKJR6N8ab/CVM-HRM?node-id=374-16318&p=f) | `QHz9fHEgbZqwUJKJR6N8ab` | `374:16318` | `app/figma/cvm-hrms/` | 27 | Local Exports Verified / Remote View Only (403 unauth) |

---

## 2. Access Requirements & Limitations

- **View Access Policy**: All Figma URLs are configured for view reference by designated project reviewers. No direct write, rename, or deletion operations are performed on the remote files.
- **Automated API / Bot Detection**: Direct CLI HTTP requests to `figma.com` endpoints encounter CloudFront bot prevention checks (`HTTP/1.1 403 Forbidden`). Inspection has been verified against the authentic high-resolution Figma exports provided in the workspace repository (`figma-files/` and case study documentation `figma-files/UI-UX-Case-Study.md`).
- **Web App Embeds**: External links use the canonical `View in Figma ↗` external link format with `target="_blank"` and `rel="noopener noreferrer"`. Local static mirrors reside in `public/figma/` and `public/work/` for high-performance zero-latency rendering.

---

## 3. Directory Standard & Architecture

Each project directory follows a uniform structure:

```text
app/figma/<project>/
├── README.md                  # Comprehensive architectural and flow documentation
├── source/
│   └── figma-reference.md     # Remote Figma URLs, node pointers, and frame hierarchy
├── screens/                   # Categorized by functional module
│   └── <module>/
│       └── <project>-<module>-<screen-purpose>-<state>-<seq>.ext
├── user-flows/                # Verified end-to-end user journeys
│   └── <flow-name>/
│       ├── README.md          # Flow overview, actors, steps, decision logic
│       ├── flow.json          # Machine-readable flow specification
│       └── diagram.mmd        # Mermaid flowchart diagram
├── state-flows/               # Component & screen interaction states
│   └── <state-group>/
│       ├── README.md          # Trigger, action, transition, and feedback documentation
│       ├── flow.json          # Machine-readable state graph
│       └── diagram.mmd        # Mermaid state diagram
└── asset-manifest.json        # Single source of truth for asset metadata & portfolio bindings
```

Root directory ledger:
- `app/figma/rename-map.json`: Full physical rename ledger recording every original path and new destination path.
- `app/figma/ASSET-AUDIT-REPORT.md`: Comprehensive 92-file audit and physical reorganization report.

---

## 4. Canonical Naming Convention

All design assets adhere strictly to the pattern:
```text
<project>-<module>-<screen>-<purpose>-<state>-<sequence>.<ext>
```

- **`<project>`**: `credbuddha`, `turbopaisa`, `cvm-hrms`
- **`<module>`**: e.g., `loan-application`, `scratch-cards`, `employee-onboarding`
- **`<screen>`**: specific view identifier, e.g., `personal-details`, `spin-wheel`, `registry-table`
- **`<purpose>`**: functional interaction intent, e.g., `terms-selection`, `dashboard-feed`, `milestone-checklist`
- **`<state>`**: interaction state, e.g., `default`, `pending`, `confirmed`, `step`, `ready`, `celebration`
- **`<sequence>`**: two-digit progression step, e.g., `01`, `02`, `03`
