# AGENTS.md

> Version: 1.0.0
> Status: Active
> Project: VotiQra
> Last Updated: July 2026

---

# Purpose

This document defines the engineering standards, development workflow, architecture rules, AI behavior, and coding conventions for the VotiQra project.

Every AI assistant, contributor, and developer must read this document before making any modification to the codebase.

This document is the engineering constitution of VotiQra.

If another project document conflicts with this file, stop and ask for clarification instead of making assumptions.

---

# Required Reading Order

Before performing any task, always read these documents in the following order:

1. PROJECT_PRINCIPLES.md
2. AGENTS.md
3. PRODUCT.md
4. ARCHITECTURE.md
5. DESIGN_SYSTEM.md
6. NAVIGATION.md
7. SECURITY.md
8. API.md (when applicable)

Do not skip any required document.

---

# About VotiQra

VotiQra is a mobile-first Election Management Platform (Election-as-a-Service).

Its purpose is to help organizations conduct secure, reliable, transparent, and professional digital elections.

The primary platform is the React Native mobile application.

Future products may include:

- Web Dashboard
- Marketing Website
- Super Admin Portal
- Public Verification Portal

This repository currently focuses on the mobile application.

---

# Official Technology Stack

The following technologies are mandatory unless explicitly changed by the project owner.

## Framework

- Expo
- React Native
- TypeScript

## Routing

- Expo Router

## Styling

- NativeWind

## Authentication

- Clerk

## Global State

- Zustand

## Server State

- TanStack Query

## Forms

- React Hook Form
- Zod

## Animations

- React Native Reanimated
- Lottie React Native

## Icons

- Lucide React Native

## Lists

- FlashList

## HTTP Client

- Axios

## Date Utilities

- date-fns

Do not replace any technology without approval.

---

# Engineering Philosophy

Every implementation should prioritize:

- Simplicity
- Security
- Maintainability
- Scalability
- Accessibility
- Performance
- Consistency

Readable code is preferred over clever code.

---

# Project Architecture

The project follows a feature-first architecture.

Business logic must remain separate from UI components.

Screens should only coordinate UI.

Reusable logic belongs in hooks, services, stores, or utilities.

Avoid duplicate implementations.

---

# Folder Organization

Every file must belong to a logical feature.

Avoid dumping unrelated files into common folders.

Group code by feature rather than by file type whenever practical.

---

# TypeScript Standards

Always use strict TypeScript.

Never disable strict mode.

Avoid using "any".

Prefer explicit types.

Use interfaces or type aliases where appropriate.

Export reusable types.

Keep type definitions organized.

---

# React Standards

Prefer functional components.

Use hooks.

Keep components focused.

Avoid deeply nested JSX.

Extract reusable UI.

Keep components small whenever practical.

---

# Expo Standards

Use Expo-supported APIs whenever possible.

Avoid unnecessary native dependencies.

Keep the project compatible with Expo updates.

---

# Navigation Standards

Use Expo Router.

Navigation should follow the structure defined in NAVIGATION.md.

Avoid creating custom navigation patterns.

Protect authenticated routes properly.

---

# Styling Standards

Use NativeWind only.

Do not mix styling approaches.

Do not hardcode colors.

Do not hardcode spacing.

Do not hardcode typography.

All design tokens come from DESIGN_SYSTEM.md.

---

# State Management

Use the appropriate tool.

React State

- Temporary UI state

Zustand

- Global application state

TanStack Query

- Server state
- API caching
- Synchronization

Avoid storing server data in Zustand.

---

# API Layer

Screens must never call APIs directly.

API communication belongs inside dedicated service modules.

Always return typed responses.

Handle errors consistently.

---

# Authentication

Authentication is handled exclusively by Clerk.

Do not implement custom authentication.

Never store authentication secrets manually.

---

# Forms

Every form should use:

- React Hook Form
- Zod

All forms require validation.

Display helpful validation messages.

---

# UI Components

Build reusable components.

Avoid duplication.

Every component should have a single responsibility.

Prefer composition over inheritance.

---

# Screen Standards

Every screen should support:

Loading State

Empty State

Success State

Error State

Offline State (when applicable)

---

# Accessibility

Support:

- Screen readers
- Proper touch targets
- Dynamic font scaling
- Color contrast
- Keyboard navigation where applicable

Accessibility is mandatory.

---

# Performance

Avoid unnecessary re-renders.

Memoize expensive calculations.

Optimize images.

Lazy-load heavy resources when appropriate.

Keep animations smooth.

---

# Security

Never expose secrets.

Never commit API keys.

Never hardcode tokens.

Use secure storage for sensitive information.

Validate all external data.

---

# Error Handling

Handle errors gracefully.

Provide meaningful user feedback.

Never expose internal implementation details to users.

Log useful debugging information during development.

---

# Animations

Animations should improve usability.

Avoid excessive motion.

Keep transitions smooth and subtle.

---

# Design Reference

The project contains reference UI images inside:

assets/design-reference/

These images are **visual references only**.

They exist to guide:

- Layout hierarchy
- Spacing
- Card proportions
- Illustration placement
- White space
- Visual density
- Navigation patterns
- Screen composition

They MUST NOT be copied.

Do NOT reproduce:

- Logos
- Icons
- Colors
- Branding
- Typography
- Text
- Images

Create original UI while maintaining the same professional quality.

-----

# Illustrations

All illustrations should follow one consistent visual style.

Avoid mixing illustration packs.

Use project-approved assets.

---

# Documentation

Whenever introducing a major feature:

Update the relevant documentation.

Keep architecture documents synchronized.

Do not allow documentation to become outdated.

---

# Git Standards

Write meaningful commit messages.

Keep commits focused.

Avoid committing unrelated changes together.

---

# AI Rules

Every AI assistant working on this repository must follow these rules.

Always:

- Read the required project documentation first.
- Explain the implementation plan before coding.
- Keep changes focused.
- Follow existing architecture.
- Reuse existing components.
- Prefer maintainable solutions.
- Produce production-ready code.

Never:

- Rewrite unrelated files.
- Change project architecture without approval.
- Replace libraries without approval.
- Introduce unnecessary dependencies.
- Ignore TypeScript errors.
- Disable linting.
- Use "any" without justification.
- Duplicate existing code.
- Hardcode design values.
- Invent backend APIs.
- Invent database schemas.
- Invent business requirements.
- Remove existing functionality unless requested.

If requirements are unclear:

Stop.

Explain the uncertainty.

Ask for clarification.

Never guess.

---

# Definition of Done

A feature is considered complete only if:

- Requirements are satisfied.
- Code follows project standards.
- No TypeScript errors.
- No lint errors.
- Loading state implemented.
- Error state implemented.
- Empty state implemented.
- Accessibility considered.
- Responsive where applicable.
- Documentation updated when necessary.

---

# Prompt Execution Checklist

Before generating code, always:

1. Read the required documentation.
2. Summarize the requested task.
3. Explain the implementation plan.
4. List the files that will be modified.
5. Wait for clarification if requirements are ambiguous.
6. Generate production-ready code.
7. Verify that project standards have been followed.

---

# Guiding Principle

Every line of code added to VotiQra should make the platform more secure, more maintainable, easier to understand, and more trustworthy.

When in doubt, choose the solution that best supports long-term maintainability and user trust.