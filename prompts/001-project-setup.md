# 001 - Project Setup

## Objective

Transform this empty GitHub repository into the production-ready foundation for **VotiQra**, a mobile-first Election Management Platform.

This task establishes the engineering foundation of the application.

Do NOT build application features.

Do NOT build authentication screens.

Do NOT build UI components beyond what is required to verify the project boots correctly.

The objective is to create a clean, scalable, maintainable foundation that every future feature will build upon.

---

# Required Reading

Before writing any code, read these documents completely:

1. docs/PROJECT_PRINCIPLES.md
2. docs/AGENTS.md
3. docs/ARCHITECTURE.md
4. docs/PRODUCT.md
5. docs/USER_EXPERIENCE.md
6. docs/NAVIGATION.md
7. docs/DESIGN_SYSTEM.md

These documents are the project's source of truth.

Follow them strictly.

---

# Implementation Plan

Before writing code:

- Explain your implementation plan.
- List every dependency that will be installed.
- Explain why each dependency is needed.
- List every folder that will be created.
- List every configuration file that will be created or modified.

Only after completing the plan should implementation begin.

---

# Technology Stack

Use the latest stable versions that are compatible with each other.

Framework

- Expo
- React Native
- TypeScript

Navigation

- Expo Router

Styling

- NativeWind
- TailwindCSS

Authentication

- Clerk

Global State

- Zustand

Server State

- TanStack Query

Forms

- React Hook Form
- Zod

Networking

- Axios

Icons

- Lucide React Native

Animation

- React Native Reanimated
- Lottie React Native

Lists

- FlashList

Secure Storage

- Expo Secure Store

Utilities

- date-fns

Do not substitute these libraries.

---

# Configure

Configure the following completely.

## TypeScript

Enable strict mode.

Configure path aliases.

Enable modern compiler settings.

No implicit any.

No unused locals.

No unused parameters.

---

## Expo Router

Configure routing.

Create the root layout.

Configure route groups.

Prepare:

(auth)

(onboarding)

(app)

(modals)

Only placeholders are required.

---

## NativeWind

Configure NativeWind correctly.

Configure Tailwind.

Ensure IntelliSense works.

Ensure className works everywhere.

---

## Babel

Configure all required plugins.

Especially:

NativeWind

Reanimated

Expo Router

---

## ESLint

Configure ESLint.

Use strict rules.

Remove unused imports.

Disallow unnecessary any.

---

## Prettier

Configure Prettier.

Create formatting rules.

---

## Git

Create:

.gitignore

.editorconfig

---

## Environment Variables

Configure environment variable support.

Create:

.env.example

Do not include secrets.

---

## Folder Structure

Create the following folders.

app/

assets/

assets/images/

assets/icons/

assets/fonts/

assets/illustrations/

assets/animations/

components/

constants/

features/

hooks/

lib/

providers/

services/

store/

types/

utils/

docs/

prompts/

---

# Providers

Prepare providers.

Create placeholders for:

Theme Provider

Query Provider

Authentication Provider

Gesture Handler

Safe Area

---

# Networking

Create a reusable Axios client.

No endpoints yet.

Only create the architecture.

---

# State

Create the initial Zustand store.

Only include:

Theme

Selected Organization

Future placeholders

---

# Query

Create the global Query Client.

Configure sensible defaults.

---

# Theme

Create placeholders for:

Colors

Typography

Spacing

Radius

Shadows

Animations

Do not define final design values yet.

---

# Assets

Create placeholder folders.

Do not add assets.

---

# Root Layout

Configure:

Gesture Handler

Safe Area

Clerk Provider

Query Provider

Theme Provider

Status Bar

Navigation

---

# Validation

Ensure:

Project starts successfully.

Expo Router works.

TypeScript passes.

ESLint passes.

Prettier passes.

NativeWind works.

Reanimated works.

Path aliases work.

---

# Do NOT Build

Do NOT build:

Authentication

Dashboard

Organizations

Elections

Voting

Results

Notifications

Profile

Settings

Any production screens

Only create minimal placeholder routes required to verify navigation.

---

# Expected Folder Structure

The project should resemble:

app/
assets/
components/
constants/
features/
hooks/
lib/
providers/
services/
store/
types/
utils/
docs/
prompts/

---

# Deliverables

Return:

1. Project setup summary

2. Installed dependencies

3. Folder structure

4. Configuration files

5. Explanation of architectural decisions

6. Verification checklist

---

# Definition of Done

This task is complete only if:

✓ Project builds successfully

✓ Expo starts successfully

✓ TypeScript has zero errors

✓ ESLint has zero errors

✓ Prettier is configured

✓ Expo Router is configured

✓ NativeWind is configured

✓ Clerk is integrated at the provider level

✓ Zustand is configured

✓ TanStack Query is configured

✓ Reanimated is configured

✓ FlashList is installed

✓ Axios client exists

✓ Folder structure is complete

✓ Providers are configured

✓ Root layout is production-ready

✓ No unnecessary code exists

✓ No application features have been implemented