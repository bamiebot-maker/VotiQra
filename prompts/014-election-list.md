# 014 - Election List

## Objective

Implement the complete Election List module for VotiQra.

The Election List is the primary entry point for viewing and managing elections within an organization.

It should provide administrators with a comprehensive overview of every election while allowing voters to quickly discover elections they are eligible to participate in.

The implementation must support organizations managing hundreds or thousands of elections.

Do not implement backend business logic.

Use repository interfaces or mock implementations where appropriate.

---

# IMPORTANT

Before writing any code read:

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

ELC-001-ElectionList.md

ELC-003-ElectionDetails.md

These documents are the source of truth.

---

# Dependencies

Requires:

001 through 013

---

# Tech Stack

Use exactly:

Expo Router

React Native

TypeScript

NativeWind

TanStack Query

Zustand

React Native Reanimated

Lucide React Native

---

# Scope

Implement:

Election List

Election Search

Election Filters

Election Sorting

Election Status

Election Cards

Infinite Scroll

Pull To Refresh

Quick Actions

Floating Action Button

---

# Election Lifecycle

Support these states only:

Draft

Configuration

Ready For Review

Scheduled

Published

Voting Open

Voting Closed

Counting

Results Published

Archived

Never allow invalid transitions.

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

Summary Cards

↓

Election List

↓

Floating Action Button

---

# Summary Cards

Display:

Total Elections

Draft

Scheduled

Active

Completed

Archived

Each card is interactive.

---

# Search

Search by:

Election Name

Election Code

Description

Tags

---

# Filters

Support:

All

Draft

Scheduled

Published

Voting Open

Voting Closed

Completed

Archived

My Elections

Recently Updated

---

# Sorting

Newest

Oldest

Alphabetical

Most Votes

Most Candidates

Closing Soon

Recently Updated

---

# Election Card

Display:

Election Banner

Election Logo

Election Name

Organization

Status Badge

Timeline

Progress Bar

Voting Progress

Eligible Voters

Votes Cast

Remaining Voters

Position Count

Candidate Count

Tap opens Election Workspace.

---

# Card Quick Actions

Depending on permissions:

Open

Publish

Duplicate

Archive

Share

Delete

---

# Empty States

Support:

No Elections

Search Empty

Offline

Permission Denied

Archived Only

Loading

---

# Floating Action Button

Visible only for authorized users.

Actions:

Create Election

Import Election (future)

Duplicate Election

---

# Repository Layer

Create:

ElectionRepository

Methods:

getElections()

getElection()

search()

filter()

publish()

archive()

duplicate()

delete()

---

# Components

Create reusable:

ElectionCard

ElectionSummaryCard

StatusBadge

TimelineBadge

ElectionSearchBar

ElectionFilterBar

ElectionSkeleton

ElectionFAB

EmptyState

---

# State Management

React Query

Election Lists

Statistics

Pagination

Zustand

Search

Filters

Sorting

UI State

Selected Election

---

# Navigation

Support:

Election Workspace

Create Election

Organization Details

Reports

Dashboard

---

# Performance

Use:

FlatList

Memoization

Cursor Pagination

Image Caching

Lazy Rendering

Optimistic Updates

---

# Accessibility

Support:

VoiceOver

TalkBack

Dynamic Fonts

Accessible Cards

Large Touch Targets

---

# Animation

Support:

Card Press

Status Transition

Skeleton Loading

List Animation

Pull To Refresh

---

# Security

Only display elections users are authorized to access.

Permission-based quick actions.

Repository should enforce authorization boundaries.

---

# Error Handling

Support:

Election Missing

Permission Denied

Offline

Timeout

Unknown Error

Retry

---

# Analytics (Future Ready)

Prepare event hooks:

Election Viewed

Election Created

Election Opened

Election Published

Search Used

Filter Applied

---

# Testing Checklist

Unit Tests

- Search
- Filtering
- Sorting
- Repository methods

Component Tests

- Election Card
- Status Badge
- Summary Cards

Navigation Tests

- Open Election
- Create Election
- Publish Flow

Accessibility Tests

- Screen reader labels
- Focus order
- Dynamic font scaling

---

# Quality Checklist

✓ Lifecycle enforced

✓ Reusable components

✓ No inline styles

✓ Loading states

✓ Empty states

✓ Error states

✓ Dark mode

✓ Responsive

✓ Accessible

✓ Type-safe

✓ Zero ESLint errors

✓ Zero TypeScript errors

✓ Production ready

---

# Deliverables

Implement:

Election List Screen

Repository

Hooks

Store

Reusable Components

Navigation

Accessibility

Animations

Loading States

Error States

---

# Unlocks

015-create-election.md

016-election-workspace.md

017-election-settings.md

018-position-management.md

019-candidate-management.md

020-voter-management.md

021-voting-flow.md

024-reports.md

---

# Definition of Done

The Election List module provides a scalable, production-ready interface for discovering, managing, and navigating elections while respecting lifecycle constraints, permissions, accessibility, and VotiQra architecture.