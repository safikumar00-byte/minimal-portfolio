# CVM HRMS Design System & Flow Architecture

## 1. Project Overview
CVM HRMS (Core Volt Matrix) is an enterprise desktop Human Resource Management System engineered to automate high-volume employee lifecycle management: onboarding cohorts, IT asset provisioning, bi-directional timesheet auditing, and hierarchical leave approvals.

- **Platform**: Responsive Enterprise Web Application (1920 × 1080 Desktop Viewport)
- **Primary Design Reference**: [CVM HRMS Figma](https://www.figma.com/design/QHz9fHEgbZqwUJKJR6N8ab/CVM-HRM?node-id=374-16318&p=f) (`374:16318`)

## 2. Directory Layout
```text
app/figma/cvm-hrms/
├── README.md
├── asset-manifest.json
├── source/figma-reference.md
├── screens/
│   ├── dashboard/
│   ├── employee-profile/
│   ├── employee-onboarding/
│   ├── asset-management/
│   ├── attendance/
│   ├── timesheets/
│   ├── leave-management/
│   ├── approvals/
│   ├── employee-management/
│   └── company-management/
├── user-flows/
│   ├── employee-onboarding-flow/
│   ├── timesheet-review-flow/
│   ├── leave-approval-flow/
│   └── asset-allocation-flow/
└── state-flows/
    ├── employee-states/
    ├── timesheet-states/
    ├── leave-approval-states/
    └── asset-request-states/
```

## 3. Screen Inventory & Modules
CVM HRMS contains 27 verified canonical desktop screens across 10 functional enterprise modules:
1. `dashboard`: Executive summary cards, headcount statistics, pending request alerts.
2. `employee-profile`: Profile summary, modal editing forms, and residential address settings.
3. `employee-onboarding`: Multi-hire cohort tracker, candidate modal, checklist milestone board, and employee directory table.
4. `asset-management`: Hardware inventory cards, asset registration dialog, manager review queue, and master asset table.
5. `attendance`: Monthly time-tracking matrix and clock-in logs.
6. `timesheets`: Employee weekly project breakdown, supervisor review queue, audit inspection modal, and mandatory rejection reason modal.
7. `leave-management`: Quota balances, employee application modal, supervisor approvals inbox, and confirmation dialog.
8. `approvals`: Centralized HR administration queue.
9. `employee-management`: Departmental team directory and organizational charts.
10. `company-management`: Company-wide announcements, scheduled events, and holiday calendar editor.
