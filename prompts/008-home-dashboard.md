# 008 - Home Dashboard

## Objective

Implement the complete VotiQra Home Dashboard.

The dashboard is the first screen users see after authentication and onboarding.

It provides a personalized overview of the user's organizations, active elections, upcoming elections, voting activity, notifications, and quick actions.

The dashboard should feel modern, fast, informative, and uncluttered.

Do not implement placeholder business logic.

Use mock repositories where backend functionality is not yet available.

---

# IMPORTANT

Before writing any code, read:

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

Also read:

specs/DASHBOARD/

Follow every documented requirement.

---

# Dependencies

Must already be completed:

- 001-project-setup
- 002-folder-structure
- 003-design-system
- 004-navigation
- 005-ui-foundation
- 006-authentication
- 007-onboarding

---

# Tech Stack

Use exactly:

- Expo Router
- React Native
- TypeScript
- NativeWind
- Clerk
- Zustand
- React Query (TanStack Query)
- React Native Reanimated
- Lucide React Native

---

# Scope

Implement:

- Dashboard Home
- Personalized Greeting
- Organization Switcher
- Dashboard Statistics
- Quick Actions
- Active Elections
- Upcoming Elections
- Recent Activity
- Notifications Preview
- Pull To Refresh

---

# Screen Layout

Safe Area

↓

Header

↓

Greeting

↓

Organization Switcher

↓

Statistics Cards

↓

Quick Actions

↓

Active Elections

↓

Upcoming Elections

↓

Recent Activity

↓

Notification Preview

---

# Header

Display:

- User Avatar
- Greeting
- Current Organization
- Search Button
- Notification Button

Support organization switching from the header.

---

# Greeting

Display:

Good Morning

Good Afternoon

Good Evening

Include user's first name.

Example:

Good Morning,
Ibrahim 👋

---

# Organization Switcher

Display current organization.

Support:

- Switch organization
- Search organizations
- Recent organizations

Future-ready for multiple memberships.

---

# Dashboard Statistics

Show cards for:

- Active Elections
- Draft Elections
- Completed Elections
- Total Members

Cards should be tappable.

---

# Quick Actions

Display a responsive grid.

Actions:

- Create Election
- View Elections
- Invite Members
- Add Candidate
- Import Voters
- View Reports

Visibility depends on user permissions.

---

# Active Elections

Card should include:

- Banner
- Election Name
- Organization
- Status Badge
- Countdown
- Progress Indicator

Tap opens Election Details.

---

# Upcoming Elections

Display upcoming elections ordered by start date.

Support empty state.

---

# Recent Activity

Display:

- New member joined
- Election created
- Election published
- Vote submitted (if visible)
- Results published

Each activity links to its related screen.

---

# Notifications Preview

Show latest three notifications.

Include:

- Icon
- Title
- Timestamp
- Read/Unread Indicator

Provide "View All".

---

# Empty States

Support:

No Organization

No Elections

No Notifications

No Activity

No Internet

Each state should guide the user with a clear next action.

---

# Pull To Refresh

Refresh:

- Dashboard statistics
- Elections
- Activities
- Notifications

Use optimistic loading where appropriate.

---

# State Management

Separate:

- UI State (Zustand)
- Remote Data (React Query)

Avoid storing server data in Zustand.

---

# Navigation

Support navigation to:

- Organizations
- Elections
- Notifications
- Search
- Profile
- Reports
- Create Election

---

# UI Requirements

Use reusable components only.

Examples:

DashboardHeader

StatCard

QuickActionCard

ElectionCard

ActivityItem

NotificationItem

OrganizationSwitcher

SectionHeader

EmptyState

LoadingSkeleton

---

# Accessibility

Support:

- Screen readers
- Dynamic fonts
- Accessible touch targets
- VoiceOver
- TalkBack

---

# Performance

Use:

- FlatList
- Memoization
- Lazy rendering
- Image optimization
- Pagination-ready architecture

---

# Animations

Support:

- Header fade
- Card press
- Pull-to-refresh
- Statistics counter animation
- List appearance animation

Keep animations subtle.

---

# Quality Checklist

Before completion verify:

✓ No duplicated UI

✓ No inline styles

✓ Uses reusable components

✓ Loading states exist

✓ Empty states exist

✓ Error states exist

✓ Offline state considered

✓ Accessibility labels added

✓ Responsive layout

✓ Dark mode works

✓ Navigation tested

✓ Type-safe

✓ ESLint clean

✓ Production-ready

---

# Deliverables

Implement:

- Dashboard Screen
- Dashboard Widgets
- Dashboard Components
- Dashboard Hooks
- Dashboard State
- Dashboard Navigation

---

# Unlocks

- 009-organization-list.md
- 014-election-list.md
- 025-notifications.md
- 026-search.md

---

# Definition of Done

The Home Dashboard provides users with a personalized, responsive, accessible, and production-ready overview of their organizations, elections, and activities while following all VotiQra architecture and design standards.