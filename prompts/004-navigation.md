# 004 - Navigation System

## Objective

Build the complete navigation architecture for the VotiQra mobile application.

This task establishes the application's routing, navigation hierarchy, guards, deep linking strategy, modal system, and navigation utilities.

Do not implement business logic.

Do not implement authentication logic.

Do not create placeholder screens beyond what is necessary to validate navigation.

Navigation must follow the product architecture exactly.

---

# IMPORTANT

Before doing anything, read these documents completely:

- README.md
- CLAUDE.md
- docs/PROJECT_PRINCIPLES.md
- docs/AGENTS.md
- docs/ARCHITECTURE.md
- docs/PRODUCT.md
- docs/USER_EXPERIENCE.md
- docs/DESIGN_SYSTEM.md
- docs/BRAND_GUIDELINES.md
- docs/SCREEN_MAP.md
- docs/USER_FLOWS.md

These documents are the source of truth.

Never violate them.

---

# Tech Stack

Use exactly:

- Expo SDK (latest stable)
- Expo Router
- React Native
- TypeScript
- NativeWind
- Zustand
- Clerk Authentication
- Expo Secure Store
- React Native Reanimated
- React Native Gesture Handler
- Lucide React Native

Do not introduce additional navigation libraries.

---

# Navigation Philosophy

Navigation must feel:

- Predictable
- Fast
- Minimal
- Native
- Professional

Transitions should never distract users.

---

# Root Navigation

```
App
│
├── Splash
│
├── Welcome
│
├── Authentication
│
│   ├── Login
│   ├── Register
│   ├── Verify Email
│   ├── Forgot Password
│   └── Reset Password
│
├── Onboarding
│
├── Organization Selection
│
└── Main Application
```

---

# Main Application

Use Bottom Tabs.

Tabs:

🏠 Home

🏛 Organizations

🗳 Elections

🔔 Notifications

👤 Profile

Each tab owns its own Stack Navigator.

Navigation state must persist.

---

# Organizations Stack

Organization List

↓

Organization Details

↓

Members

↓

Roles

↓

Branding

↓

Settings

---

# Elections Stack

Election List

↓

Election Details

↓

Positions

↓

Candidates

↓

Voters

↓

Reports

↓

Results

---

# Voting Flow

Voting must never be accessible through tab navigation.

It is a dedicated protected flow.

Election Details

↓

Voting Home

↓

Ballot

↓

Review Vote

↓

Confirmation

↓

Receipt

↓

Verification

---

# Modal Navigation

Use full-screen modals for:

- Create Organization
- Create Election
- Add Candidate
- Import Voters
- Edit Profile

Use Bottom Sheets for:

- Filters
- Sorting
- Organization Switcher
- Share
- Candidate Preview
- Role Selection

---

# Route Groups

Use Expo Router Route Groups.

Example:

```
app/

(auth)

(main)

(modals)

(voting)

(settings)
```

Every route belongs to exactly one group.

---

# Route Guards

Support:

Guest

Authenticated User

Organization Member

Organization Administrator

Future Super Administrator

Unauthorized users must never access protected routes.

Redirect appropriately.

---

# Authentication Flow

Guest

↓

Welcome

↓

Login/Register

↓

Authenticated

↓

Onboarding (if required)

↓

Dashboard

---

# Deep Linking

Prepare navigation for future deep links.

Examples:

votiqra://organization/123

votiqra://election/abc

votiqra://results/xyz

Do not implement server-side handling yet.

---

# Navigation State

Preserve:

Selected Tab

Navigation History

Current Organization

Current Election Context

Filters (where appropriate)

---

# Back Navigation

Android back button must behave naturally.

Never trap users.

Avoid accidental exits.

---

# Header Rules

Headers should be reusable.

Support:

Back Button

Title

Subtitle

Actions

Search

Notification Badge

Profile Avatar

---

# Search Navigation

Global Search should navigate to:

Organizations

Elections

Candidates

Members

Results

Use a unified search experience.

---

# Error Navigation

Handle:

404 Routes

Expired Session

Network Failure

Permission Denied

Organization Not Found

Election Not Found

Display user-friendly screens.

---

# Loading Navigation

Support loading routes.

Example:

Splash

↓

Session Check

↓

Redirect

Never flash incorrect screens.

---

# Accessibility

Navigation must support:

Screen Readers

Keyboard Navigation (future web)

Large Touch Targets

VoiceOver

TalkBack

---

# Performance

Lazy load route groups.

Avoid loading unused stacks.

Use code splitting where possible.

---

# Deliverables

Implement:

- Root Navigation
- Route Groups
- Bottom Tabs
- Stack Navigation
- Protected Routes
- Navigation Utilities
- Navigation Types
- Deep Link Configuration
- Modal Navigation
- Bottom Sheet Navigation
- Header System

---

# Acceptance Criteria

✓ Expo Router configured correctly

✓ Navigation follows SCREEN_MAP.md

✓ Navigation follows USER_FLOWS.md

✓ Protected routes working

✓ Route groups organized

✓ Lazy loading enabled

✓ No duplicated navigation code

✓ Strong TypeScript support

✓ Accessible

✓ Ready for feature implementation

---

# Definition of Done

The VotiQra navigation system is production-ready, scalable, and serves as the foundation for all future feature implementation.