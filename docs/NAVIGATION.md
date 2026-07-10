# NAVIGATION.md

> Version: 1.0.0
> Status: Active
> Project: VotiQra

---

# Purpose

This document defines the complete navigation architecture of VotiQra.

Every screen, route, navigation stack, modal, protected route, and navigation pattern must follow this document.

No new navigation flow should be introduced without updating this document.

---

# Navigation Philosophy

Navigation should be:

- Predictable
- Simple
- Consistent
- Fast
- Easy to understand

Users should always know:

- Where they are
- Where they came from
- How to go back
- What to do next

---

# Navigation Technology

VotiQra uses:

- Expo Router
- React Navigation (via Expo Router)

No other routing solution should be introduced.

---

# Root Application Flow

```text
App Launch

↓

Splash

↓

Authentication Check

↓

┌───────────────┐
│Authenticated? │
└───────┬───────┘
        │
   No   │   Yes
        │
        ▼
 (auth) Routes
        │
        ▼
 Organization Check
        │
        ▼
No Organization?
        │
        ▼
Create / Join Organization
        │
        ▼
(app)
```

---

# Route Groups

The application uses the following route groups.

```text
app/

(auth)

(onboarding)

(app)

(modals)

(public)

```

Each group has a specific responsibility.

---

# (auth)

Authentication only.

Contains:

```text
(auth)/

login

register

verify-email

forgot-password

reset-password

```

Unauthenticated users only.

Authenticated users should never remain inside this group.

---

# (onboarding)

Shown only once.

Contains:

```text
(onboarding)/

welcome

introduction

security

organizations

finish

```

After completion:

Mark onboarding as completed.

Never show again unless reset.

---

# (app)

Protected application routes.

Requires:

- Authenticated user
- Completed onboarding
- Active organization

---

# Main Navigation

Inside (app), the application uses Bottom Tabs.

```text
Home

Organizations

Elections

Notifications

Profile
```

These five tabs represent the primary application.

---

# Home Stack

```text
Home

↓

Dashboard

↓

Activity

↓

Quick Actions
```

---

# Organizations Stack

```text
Organizations

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
```

---

# Elections Stack

```text
Election List

↓

Election Details

↓

Candidates

↓

Positions

↓

Voters

↓

Results

↓

Audit Logs
```

---

# Notifications Stack

```text
Notifications

↓

Notification Details
```

---

# Profile Stack

```text
Profile

↓

Account

↓

Security

↓

Sessions

↓

Appearance

↓

Help

↓

About
```

---

# Modal Routes

The following screens should open as modals instead of full navigation pages.

Examples:

```text
Create Organization

Invite Member

Share Election

Candidate Preview

Vote Receipt

QR Code

Image Picker

Date Picker

Confirmation Dialog
```

Modal screens should not interrupt the user's workflow unnecessarily.

---

# Bottom Sheets

Use Bottom Sheets for lightweight interactions.

Examples:

Organization Switcher

Sort

Filter

Choose Image

Select Country

Select Role

Theme Picker

Language Picker

---

# Protected Routes

The following routes require authentication.

Everything inside:

```text
(app)
```

If authentication fails:

Redirect to:

```text
(auth)/login
```

---

# Organization Guard

Some screens require an active organization.

Example:

Dashboard

Election Management

Candidate Management

Member Management

If no organization exists:

Redirect to:

Create Organization

or

Join Organization

---

# Deep Linking

Future versions should support deep linking.

Examples:

```text
votiqra://organization/{id}

votiqra://election/{id}

votiqra://candidate/{id}

votiqra://notification/{id}
```

Deep links should respect authentication rules.

---

# Navigation Rules

Every screen must have a clear entry point.

Avoid hidden screens.

Avoid circular navigation.

Avoid duplicate routes.

Navigation should always have a predictable back behavior.

---

# Back Navigation

Android Back Button

Should return to the previous screen.

Never unexpectedly exit the application.

iOS Back Gesture

Should remain enabled whenever appropriate.

---

# Navigation Titles

Screen titles should be concise.

Prefer:

Organizations

Instead of:

Organization Management Dashboard

---

# Search

Large collections should include search.

Examples:

Organizations

Members

Candidates

Voters

Notifications

Elections

---

# Empty Navigation States

If no data exists:

Guide users toward the next action.

Examples:

No Elections

↓

Create Election

No Organization

↓

Create Organization

No Notifications

↓

Return Home

---

# Navigation Animations

Transitions should feel fast.

Use platform defaults whenever appropriate.

Avoid unnecessary custom transitions.

---

# Future Navigation

Future products may include:

- Web Dashboard
- Admin Portal
- Public Portal

Navigation architecture should remain consistent across products.

---

# Folder Structure

The Expo Router structure should resemble:

```text
app/

├── (auth)/
│   ├── login.tsx
│   ├── register.tsx
│   ├── forgot-password.tsx
│   ├── verify-email.tsx
│   └── reset-password.tsx
│
├── (onboarding)/
│   ├── welcome.tsx
│   ├── introduction.tsx
│   ├── security.tsx
│   ├── organizations.tsx
│   └── finish.tsx
│
├── (app)/
│   ├── (tabs)/
│   │   ├── home.tsx
│   │   ├── organizations.tsx
│   │   ├── elections.tsx
│   │   ├── notifications.tsx
│   │   └── profile.tsx
│   │
│   ├── organizations/
│   ├── elections/
│   ├── candidates/
│   ├── voters/
│   ├── positions/
│   ├── results/
│   └── settings/
│
├── (modals)/
│   ├── create-organization.tsx
│   ├── invite-member.tsx
│   ├── qr-code.tsx
│   ├── image-picker.tsx
│   └── confirmation.tsx
│
├── +not-found.tsx
├── _layout.tsx
└── index.tsx
```

---

# Navigation Principles

Navigation should never surprise the user.

Every action should have a clear destination.

Every screen should have a clear purpose.

The navigation structure should remain simple enough that a new user can understand it without training.