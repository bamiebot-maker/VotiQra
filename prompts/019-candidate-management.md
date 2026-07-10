# 019 - Candidate Management

## Objective

Implement the complete Candidate Management module for VotiQra.

This module enables administrators to nominate, review, approve, publish, and manage candidates within election positions.

Candidates belong to positions, not directly to elections.

The implementation must support enterprise election workflows while remaining scalable and mobile-first.

Do not implement backend business logic.

Repository interfaces and mock services should be used where necessary.

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

specs/CANDIDATES/

CND-001-CandidateList.md

CND-002-CandidateProfile.md

CND-003-Nomination.md

These specifications are the source of truth.

---

# Dependencies

Requires:

001 through 018

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

Expo Image Picker

Lucide React Native

---

# Scope

Implement:

Candidate List

Candidate Profile

Nomination Flow

Approval Workflow

Candidate Details

Search

Filters

Bulk Import (Repository Ready)

Candidate Status

Audit Timeline

---

# Candidate Architecture

Relationship:

Organization Member

↓

Candidate Profile

↓

Nomination

↓

Approval

↓

Published Candidate

↓

Ballot

Candidates must always belong to a Position.

---

# Candidate Lifecycle

Support:

Draft

Nominated

Under Review

Approved

Published

Withdrawn

Disqualified

Archived

Prevent invalid transitions.

---

# Candidate Profile

Display:

Profile Photo

Full Name

Student/Employee ID

Department

Faculty

Biography

Manifesto

Campaign Poster

Verification Badge

Current Position

Status

Approval Timeline

Future-ready:

Campaign Video

Social Links

Documents

---

# Candidate Card

Display:

Profile Photo

Candidate Name

Position

Department

Status Badge

Verification Badge

Manifesto Available

Tap opens Candidate Details.

---

# Candidate Details

Sections:

Overview

Manifesto

Activity

Approval Timeline

Audit History

Documents (future)

Campaign Assets (future)

---

# Nomination Flow

Support:

Select Organization Member

Assign Position

Add Biography

Upload Photo

Write Manifesto

Review

Submit Nomination

Save Draft

---

# Approval Workflow

Support:

Approve

Reject

Return for Revision

Publish

Withdraw

Disqualify

Display reviewer history.

---

# Search

Support:

Name

Department

Faculty

Student ID

Position

Status

---

# Filters

All

Draft

Nominated

Under Review

Approved

Published

Withdrawn

Disqualified

Archived

---

# Bulk Operations

Prepare repository support for:

Bulk Nomination

Bulk Approval

Bulk Publish

Bulk Withdraw

CSV Import

Member Import

---

# Validation

Prevent:

Duplicate nominations

Invalid member

Missing required profile

Missing manifesto (if configured)

Editing locked candidates

Publishing without approval

---

# Repository Layer

Create:

CandidateRepository

Methods:

getCandidates()

getCandidate()

nominateCandidate()

updateCandidate()

approveCandidate()

rejectCandidate()

publishCandidate()

withdrawCandidate()

disqualifyCandidate()

deleteCandidate()

searchCandidates()

validateCandidate()

---

# State Management

React Query:

Candidates

Candidate Details

Validation

Zustand:

Selected Candidate

Filters

Search

Draft Nomination

Approval State

UI State

---

# Components

Create reusable:

CandidateCard

CandidateProfileHeader

CandidateStatusBadge

VerificationBadge

ManifestoCard

NominationForm

ApprovalTimeline

ApprovalBadge

CandidateSearchBar

CandidateFilterBar

CandidateSkeleton

CandidateFAB

---

# Navigation

Support:

Candidate Details

Position Details

Election Workspace

Election Settings

Dashboard

---

# Accessibility

Support:

VoiceOver

TalkBack

Dynamic Font Scaling

Accessible Forms

Accessible Images

Large Touch Targets

---

# Performance

Use:

FlatList

Memoization

Lazy Loading

Image Caching

Optimistic Updates

---

# Animation

Support:

Card Press

Status Changes

Profile Image

Approval Timeline

Skeleton Loading

Bottom Sheets

---

# Security

Respect RBAC permissions.

Respect election lifecycle.

Prevent candidate modifications after voting opens.

Repository should enforce authorization.

---

# Error Handling

Support:

Duplicate Candidate

Permission Denied

Candidate Locked

Validation Failure

Upload Failure

Network Failure

Unknown Error

---

# Analytics (Future Ready)

Prepare event hooks:

Candidate Nominated

Candidate Approved

Candidate Published

Candidate Withdrawn

Candidate Viewed

Manifesto Opened

---

# Testing Checklist

Unit Tests

- Candidate validation
- Approval workflow
- Repository methods

Component Tests

- Candidate Card
- Nomination Form
- Candidate Details

Navigation Tests

- Candidate Profile
- Approval Flow

Accessibility Tests

- Screen readers
- Focus order
- Dynamic font scaling

---

# Quality Checklist

✓ Candidate lifecycle enforced

✓ Position relationship enforced

✓ Approval workflow implemented

✓ Reusable components

✓ Loading states

✓ Error states

✓ Accessible

✓ Responsive

✓ Dark mode

✓ Type-safe

✓ Zero TypeScript errors

✓ Zero ESLint errors

✓ Production-ready

---

# Deliverables

Implement:

Candidate Management

Nomination Workflow

Approval Workflow

Repository Interfaces

Hooks

Store

Reusable Components

Navigation

Accessibility

Animations

---

# Unlocks

020-voter-management.md

021-voting-flow.md

022-results.md

023-audit-logs.md

024-reports.md

---

# Definition of Done

The Candidate Management module provides a complete lifecycle for candidates, from nomination through approval and publication. It ensures candidates are correctly associated with positions, enforces election lifecycle constraints, and provides a scalable architecture suitable for organizations of all sizes.