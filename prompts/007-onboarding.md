# 007 - Onboarding Module

## Objective

Implement the complete onboarding experience for VotiQra.

The onboarding flow introduces new users to the platform, requests essential permissions, helps them join or create an organization, and prepares them for their first experience inside the application.

The onboarding experience should be smooth, welcoming, minimal, and informative.

Do not implement business logic beyond what is necessary for onboarding.

---

# IMPORTANT

Before doing anything, read completely:

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

Read all relevant specifications inside:

specs/AUTH/
specs/ORGANIZATION/

These documents are the source of truth.

---

# Dependencies

Must already be completed:

- 001-project-setup
- 002-folder-structure
- 003-design-system
- 004-navigation
- 005-ui-foundation
- 006-authentication

---

# Tech Stack

Use exactly:

- Expo Router
- React Native
- TypeScript
- NativeWind
- Clerk
- Zustand
- React Native Reanimated
- React Native Gesture Handler
- Expo Notifications (permission request only)
- Lucide React Native

---

# Scope

Implement:

- Introduction Slides
- Feature Highlights
- Notification Permission
- Join Organization
- Create Organization Shortcut
- Finish Setup
- Skip where appropriate

---

# Screen Flow

Authenticated User

↓

Introduction

↓

Feature Overview

↓

Notification Permission

↓

Join Organization

↓

Finish Setup

↓

Dashboard

---

# Introduction Screen

Display:

- App logo
- Welcome message
- Short description
- Continue button

---

# Feature Highlights

Create swipeable onboarding slides.

Topics:

- Secure Elections
- Transparent Results
- Organization Management
- Mobile Voting
- Vote Verification

Support:

- Previous
- Next
- Skip

Include page indicators.

---

# Notification Permission

Explain why notifications are useful.

Examples:

- Election reminders
- Organization invitations
- Voting confirmations
- Result announcements

Request permission only after explanation.

If denied:

Allow users to continue.

---

# Join Organization

Support:

- Search Organization
- Join via Invite Code
- Join via QR Code (future-ready)
- Create Organization shortcut

---

# Finish Setup

Display:

- Success illustration
- Summary
- Continue to Dashboard button

Persist onboarding completion state.

---

# State Management

Store:

- Onboarding completed
- Notification permission status
- Selected organization (if any)

Sensitive authentication remains managed by Clerk.

---

# Navigation

Follow:

docs/SCREEN_MAP.md

docs/USER_FLOWS.md

---

# UI Requirements

Use reusable components only.

No duplicated UI.

No inline styles.

Use design tokens exclusively.

---

# Accessibility

Support:

- Screen readers
- Dynamic font scaling
- Accessible buttons
- Proper focus order
- Large touch targets

---

# Performance

Lazy load illustrations.

Optimize onboarding images.

Avoid unnecessary re-renders.

---

# Animations

Use subtle animations only.

Examples:

- Fade
- Slide
- Progress indicator
- Illustration transitions

Avoid excessive motion.

---

# Deliverables

Implement:

- Introduction
- Feature Slides
- Permission Screen
- Join Organization Screen
- Finish Setup
- Navigation
- State persistence

---

# Acceptance Criteria

✓ Smooth onboarding flow

✓ Fully responsive

✓ Accessible

✓ Dark mode compatible

✓ Uses reusable UI components

✓ Zero TypeScript errors

✓ Zero ESLint errors

✓ Production ready

---

# Unlocks

- 008-home-dashboard.md
- 009-organization-list.md
- 010-create-organization.md

---

# Definition of Done

The onboarding experience is complete, polished, accessible, and seamlessly transitions authenticated users into the VotiQra dashboard.