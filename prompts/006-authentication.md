# 006 - Authentication Module

## Objective

Implement the complete authentication experience for VotiQra.

This includes every authentication screen, navigation flow, reusable logic, validation, and UI interactions.

This task must strictly follow the specifications under:

specs/AUTH/

No screen should be invented.

No flow should be modified.

Authentication must integrate with Clerk Authentication.

---

# IMPORTANT

Before writing a single line of code:

Read completely:

README.md

CLAUDE.md

docs/PROJECT_PRINCIPLES.md

docs/AGENTS.md

docs/ARCHITECTURE.md

docs/PRODUCT.md

docs/USER_EXPERIENCE.md

docs/DESIGN_SYSTEM.md

docs/BRAND_GUIDELINES.md

docs/SCREEN_MAP.md

docs/USER_FLOWS.md

Read ALL authentication specifications:

specs/AUTH/AUTH-001-Login.md

specs/AUTH/AUTH-002-Register.md

specs/AUTH/AUTH-003-VerifyEmail.md

specs/AUTH/AUTH-004-ForgotPassword.md

specs/AUTH/AUTH-005-ResetPassword.md

specs/AUTH/AUTH-006-Splash.md

specs/AUTH/AUTH-007-Welcome.md

These documents are the source of truth.

Never ignore them.

---

# Tech Stack

Use exactly:

React Native

Expo Router

TypeScript

NativeWind

Zustand

Clerk Authentication

Expo Secure Store

React Hook Form

Zod

Lucide React Native

React Native Reanimated

React Native Gesture Handler

Do not introduce alternative authentication libraries.

---

# Authentication Screens

Implement in this exact order:

1.

Splash

↓

2.

Welcome

↓

3.

Register

↓

4.

Verify Email

↓

5.

Login

↓

6.

Forgot Password

↓

7.

Reset Password

---

# Splash Screen

Purpose:

Determine application state.

Possible outcomes:

Authenticated

↓

Dashboard

Not Authenticated

↓

Welcome

Never remain on splash longer than necessary.

---

# Welcome Screen

Contains:

Illustration

Welcome Message

Login Button

Create Account Button

Join Organization Button

Terms

Privacy

App Version

---

# Register

Collect:

First Name

Last Name

Email

Password

Confirm Password

Validation required.

---

# Verify Email

OTP verification.

Support:

Resend Code

Countdown

Loading

Failure

Success

---

# Login

Support:

Email

Password

Remember Me

Forgot Password

Validation

Loading

Error

Success

---

# Forgot Password

Email input.

Reset request.

Confirmation.

---

# Reset Password

OTP

New Password

Confirm Password

Success

Redirect to Login

---

# Validation

Use:

React Hook Form

Zod

Never validate manually.

---

# Authentication State

Store minimal client state.

Sensitive authentication remains managed by Clerk.

Use Zustand only for UI state such as onboarding completion or selected organization after login.

---

# Navigation

Must follow:

SCREEN_MAP.md

USER_FLOWS.md

Do not bypass screens.

---

# Accessibility

Every screen must support:

Screen readers

Large text

Keyboard handling

Proper focus order

44x44 touch targets

---

# Animation

Subtle only.

Allowed:

Fade

Slide

Scale

Avoid distracting motion.

---

# Error Handling

Support:

Invalid credentials

Weak password

Duplicate email

Expired OTP

Network error

Server error

Unexpected error

Display clear messages.

---

# Deliverables

Implement:

Authentication screens

Authentication navigation

Validation

Clerk integration

Loading states

Empty states

Error states

Accessibility

Dark mode

---

# Acceptance Criteria

✓ All screens match specs

✓ Clerk authentication working

✓ Validation complete

✓ Type-safe

✓ Responsive

✓ Accessible

✓ Dark mode

✓ Zero TypeScript errors

✓ Zero ESLint errors

✓ Production ready

---

# Definition of Done

The authentication module is complete and production-ready, following all VotiQra documentation and specifications exactly.