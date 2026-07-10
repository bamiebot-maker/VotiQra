# 018 - Position Management

## Objective

Implement the complete Position Management module for VotiQra.

This module enables administrators to define, organize, configure, and manage election positions.

Positions determine the structure of ballots and act as the parent entity for candidates.

The implementation must support future voting systems while initially implementing plurality voting only.

Do not implement backend business logic.

Use repository interfaces and mock implementations where appropriate.

---

# IMPORTANT

Before writing code read:

README.md

CLAUDE.md

docs/PROJECT_PRINCIPLES.md

docs/AGENTS.md

docs/ARCHITECTURE.md

docs/PRODUCT.md

docs/USER_EXPERIENCE.md

docs/DESIGN_SYSTEM.md

docs/SCREEN_MAP.md

docs/USER_FLOWS.md

Read:

specs/ELECTION/

ELC-005-Positions.md

This specification is the source of truth.

---

# Dependencies

Requires:

001 through 017

---

# Tech Stack

Use exactly:

Expo Router

React Native

TypeScript

NativeWind

React Hook Form

Zod

TanStack Query

Zustand

React Native Reanimated

React Native Draggable FlatList

Lucide React Native

---

# Scope

Implement:

Position List

Create Position

Edit Position

Delete Position

Reorder Positions

Duplicate Position

Position Details

Position Validation

Search

Filters

---

# Position Architecture

Relationship:

Election

↓

Position

↓

Candidate

↓

Vote

Do not associate candidates directly with elections.

---

# Position Model

Each position contains:

Position Name

Description

Display Order

Maximum Candidates

Number of Winners

Voting Method

Status

Created Date

Updated Date

Future-ready fields:

Eligibility Rules

Required Documents

Metadata

---

# Voting Method

Implement:

Plurality (First-Past-The-Post)

Prepare architecture for:

Approval Voting

Ranked Choice Voting

Score Voting

Weighted Voting

Do not implement future voting methods.

---

# Position Lifecycle

Support:

Draft

Configured

Published

Locked

Archived

Lock editing after voting opens.

---

# Screen Layout

Safe Area

↓

Header

↓

Search

↓

Filter Chips

↓

Position List

↓

Floating Action Button

---

# Position Card

Display:

Position Name

Description

Candidate Count

Winner Count

Voting Method

Status

Display Order

Tap opens Position Details.

---

# Position Details

Display:

Full configuration

Candidate summary

Voting method

Timeline

Audit summary

Quick actions

---

# Position Form

Collect:

Name

Description

Maximum Candidates

Winner Count

Voting Method

Display Order

Validation

Review

Save

---

# Drag & Drop

Support:

Long press

Drag

Drop

Animated reorder

Persist order locally

Prepare repository support.

---

# Search

Support:

Name

Description

Voting Method

Status

---

# Filters

All

Draft

Configured

Published

Locked

Archived

---

# Validation

Prevent:

Duplicate names

Empty names

Winner count < 1

Winner count > Maximum candidates

Unsupported voting methods

Editing locked positions

---

# Repository Layer

Create:

PositionRepository

Methods:

getPositions()

getPosition()

createPosition()

updatePosition()

deletePosition()

duplicatePosition()

reorderPositions()

validatePosition()

---

# State Management

React Query:

Positions

Validation

Zustand:

Selected Position

Search

Filters

Sorting

Drag State

UI State

---

# Components

Create reusable:

PositionCard

PositionForm

PositionBadge

VotingMethodBadge

WinnerBadge

CandidateCountBadge

PositionSearchBar

PositionFilterBar

DragHandle

PositionSkeleton

PositionFAB

---

# Navigation

Support:

Position Details

Candidate Management

Election Workspace

Election Settings

Dashboard

---

# Accessibility

Support:

VoiceOver

TalkBack

Dynamic Font Scaling

Accessible Drag Handles

Accessible Forms

Large Touch Targets

---

# Performance

Use:

FlatList

Memoization

Lazy Rendering

Optimistic Updates

Image Caching

---

# Animation

Support:

Drag & Drop

Card Press

Position Creation

Delete Confirmation

Reorder Animation

Loading Skeletons

---

# Security

Respect election lifecycle.

Respect RBAC permissions.

Prevent unauthorized edits.

Repository must enforce authorization.

---

# Error Handling

Support:

Validation Failure

Duplicate Position

Locked Position

Permission Denied

Network Failure

Unknown Error

---

# Analytics (Future Ready)

Prepare event hooks:

Position Created

Position Updated

Position Deleted

Position Reordered

Voting Method Changed

---

# Testing Checklist

Unit Tests

- Validation
- Reordering
- Repository methods

Component Tests

- Position Card
- Position Form
- Drag & Drop

Navigation Tests

- Position Details
- Candidate Navigation

Accessibility Tests

- Screen reader labels
- Drag accessibility
- Dynamic font scaling

---

# Quality Checklist

✓ Position hierarchy enforced

✓ Plurality voting implemented

✓ Future-ready voting architecture

✓ Drag & Drop

✓ Reusable components

✓ Responsive

✓ Accessible

✓ Dark mode

✓ Loading states

✓ Error states

✓ Type-safe

✓ Zero TypeScript errors

✓ Zero ESLint errors

✓ Production-ready

---

# Deliverables

Implement:

Position Management

Repository Interfaces

Hooks

Store

Reusable Components

Validation

Animations

Accessibility

Navigation

---

# Unlocks

019-candidate-management.md

020-voter-management.md

021-voting-flow.md

022-results.md

023-audit-logs.md

024-reports.md

---

# Definition of Done

The Position Management module provides a scalable, secure, and extensible way to define the structure of elections. Positions act as the foundation for ballots and candidates, enforce lifecycle constraints, support drag-and-drop ordering, and prepare VotiQra for multiple voting methods while initially implementing plurality voting only.