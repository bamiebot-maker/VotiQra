# ARCHITECTURE.md

> Version: 1.0.0
> Status: Active
> Project: VotiQra

---

# Overview

This document defines the technical architecture of VotiQra.

It serves as the single source of truth for how the application is organized, how features are implemented, and how different parts of the system communicate.

Every contributor and AI assistant must follow this architecture.

No architectural decision should be changed without approval.

---

# Architecture Philosophy

VotiQra is designed around the following principles:

- Mobile First
- Feature First
- Component Driven
- Strongly Typed
- Offline Friendly
- Scalable
- Maintainable
- Secure by Design
- Modular
- Testable

The architecture should allow new features to be added without requiring large-scale refactoring.

---

# High Level System

The VotiQra ecosystem consists of multiple products.

```text
                VotiQra

        ┌──────────────────┐
        │ Marketing Website│
        └──────────────────┘

                 │

        ┌──────────────────┐
        │ Public API       │
        └──────────────────┘

                 │

      ┌──────────┴──────────┐

      │                     │

 Mobile App          Web Dashboard

      │                     │

      └──────────┬──────────┘

                 │

           Backend Services

                 │

           PostgreSQL Database

                 │

      Object Storage / Blockchain
```

This repository currently focuses on the Mobile App.

---

# Mobile Architecture

The mobile application follows a layered architecture.

```text
Screens

↓

Components

↓

Hooks

↓

Services

↓

API

↓

Backend
```

Responsibilities:

Screens

- Layout
- Navigation
- Screen coordination

Components

- Reusable UI

Hooks

- Business logic
- Reusable behaviors

Services

- API communication

Store

- Global application state

Utils

- Pure helper functions

---

# Feature First Organization

Every major feature owns its code.

Example:

```text
features/

authentication/

organization/

dashboard/

elections/

candidates/

voters/

voting/

results/

notifications/

profile/

settings/
```

Each feature should contain only code related to that feature.

Avoid mixing unrelated functionality.

---

# Shared Modules

Reusable code belongs in shared folders.

Examples:

```text
components/

hooks/

services/

utils/

types/

constants/

lib/
```

Shared modules must remain generic.

---

# State Management Strategy

Different state types use different solutions.

## React State

Use for:

- Local UI state

Examples:

- Modal visibility
- Input focus
- Toggle buttons

---

## Zustand

Use for:

- Authentication state
- User preferences
- Selected organization
- App settings
- Persistent global state

Do not store API collections inside Zustand.

---

## TanStack Query

Use for:

- API requests
- Pagination
- Infinite lists
- Synchronization
- Caching
- Refetching

Server data belongs here.

---

# Networking

All API communication passes through dedicated service classes.

Never perform fetch or axios requests directly inside screens.

Flow:

```text
Screen

↓

Hook

↓

Service

↓

Axios Client

↓

Backend
```

---

# Authentication

Authentication is handled by Clerk.

Authentication responsibilities include:

- Sign In
- Sign Up
- Session Management
- Token Management
- User Identity

Business authorization remains the responsibility of the backend.

---

# Routing

Navigation uses Expo Router.

Navigation groups include:

```text
(auth)

(onboarding)

(app)

(modals)
```

The routing structure should remain predictable.

---

# Screen Responsibilities

A screen should:

- Render UI
- Connect hooks
- Trigger navigation

A screen should not:

- Contain API logic
- Contain large business logic
- Manage unrelated state

---

# Component Architecture

Components should be:

Small

Reusable

Composable

Well typed

Independent

Prefer composition over inheritance.

---

# Forms

Every form uses:

- React Hook Form
- Zod

Validation belongs inside schemas.

Never duplicate validation logic.

---

# Design System

The design system is the single source of truth for:

- Colors
- Typography
- Spacing
- Shadows
- Border Radius
- Icons
- Buttons

Never hardcode design values.

---

# Assets

Project assets include:

Images

Illustrations

Animations

Icons

Fonts

Assets should remain organized by type.

---

# Animations

Animations should be:

Meaningful

Fast

Consistent

Non-blocking

Use:

- Reanimated
- Lottie

Avoid excessive animations.

---

# Error Handling

Every feature should provide:

Loading State

Empty State

Success State

Error State

Offline State (where applicable)

---

# Offline Strategy

The architecture should allow future offline support.

Persistent local data should be isolated from server state.

Synchronization logic should remain separate.

---

# Security Principles

Sensitive data should never be stored insecurely.

Authentication tokens should not be manually managed.

Environment variables should never be committed.

All external data should be validated.

---

# API Layer

Every API endpoint should have:

Request type

Response type

Validation

Error handling

Typed models

Services should expose simple methods for screens.

---

# Dependency Rules

Avoid unnecessary dependencies.

Before adding a package:

- Verify necessity
- Check maintenance
- Check compatibility with Expo
- Check bundle impact

Document why it was added.

---

# Performance

Optimize for:

Fast startup

Smooth navigation

Low memory usage

Minimal re-renders

Efficient lists

Optimized images

---

# Accessibility

Support:

Screen readers

Dynamic text

Touch targets

Accessible labels

High contrast

Accessibility is required.

---

# Scalability

The architecture should support:

Additional features

Backend replacement

Future web application

Future admin dashboard

Future public portal

Future blockchain integration

Without requiring major rewrites.

---

# Future Architecture

Future repositories may include:

```text
apps/

mobile/

web/

admin/

marketing/

packages/

ui/

types/

config/

services/

notifications/

storage/

analytics/
```

The current repository should remain compatible with future migration into a monorepo.

---

# Architecture Rules

Always:

Use feature-first organization.

Separate UI from business logic.

Use shared components.

Use shared hooks.

Keep services isolated.

Write strongly typed code.

Prefer reusable solutions.

Never:

Fetch directly inside screens.

Duplicate business logic.

Mix unrelated features.

Hardcode design values.

Use global state unnecessarily.

Create circular dependencies.

---

# Architecture Goal

The architecture should remain understandable, predictable, maintainable, and scalable.

Every contributor should be able to locate code quickly, understand feature boundaries, and extend the application without introducing unnecessary complexity.