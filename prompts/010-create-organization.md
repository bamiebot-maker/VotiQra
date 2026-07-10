# 009 - Organization List

## Objective

Implement the complete Organization Management landing experience for VotiQra.

The Organization List screen is the primary entry point for managing organizations. It allows users to browse, search, filter, switch between organizations, and create new ones based on their permissions.

This module lays the foundation for multi-tenant architecture and organization-scoped data throughout the application.

Do not implement backend business logic beyond repository interfaces or mock implementations.

---

# IMPORTANT

Before writing any code, read completely:

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

Read these specifications:

specs/ORGANIZATION/

ORG-001-OrganizationList.md

ORG-002-CreateOrganization.md

ORG-003-OrganizationDetails.md

Never violate these specifications.

---

# Dependencies

Requires:

001-project-setup

002-folder-structure

003-design-system

004-navigation

005-ui-foundation

006-authentication

007-onboarding

008-home-dashboard

---

# Tech Stack

Use exactly:

Expo Router

React Native

TypeScript

NativeWind

TanStack Query

Zustand

Clerk

Lucide React Native

React Native Reanimated

---

# Scope

Implement:

Organization List Screen

Organization Cards

Organization Search

Organization Filters

Organization Switcher

Organization Selection

Pull To Refresh

Infinite Scroll Ready

Floating Action Button

---

# Screen Purpose

This screen allows users to:

View all organizations

Search organizations

Filter organizations

Switch active organization

Open organization details

Create new organizations

Join organizations

---

# Screen Layout

Safe Area

↓

Header

↓

Search Bar

↓

Filter Chips

↓

Organization List

↓

Floating Action Button

---

# Header

Display:

Screen title

Current organization indicator

Search shortcut

Notification shortcut

Profile shortcut

---

# Search

Support:

Organization Name

Organization Code

Organization Slug

Real-time filtering

Clear search

Recent searches (future-ready)

---

# Filter Chips

Support:

All

Owned

Member

Admin

Recently Joined

Alphabetical

Newest

Oldest

Active

Archived (future)

Only one filter active at a time.

---

# Organization Card

Every card should display:

Organization Logo

Organization Name

Short Description

Member Count

Election Count

Role Badge

Verification Badge (future)

Current Active Indicator

Last Active Date

---

# Card Actions

Tap Card

↓

Organization Details

Long Press

↓

Bottom Sheet

Options:

Switch Organization

Copy Invite Code

Share Invite

Leave Organization

Report Organization (future)

---

# Organization Switching

Selecting another organization should:

Update active organization

Refresh application context

Refresh dashboard

Refresh elections

Refresh members

Refresh permissions

Persist selection locally

---

# Empty States

Handle:

No Organizations

Search Returned Nothing

Offline

Permission Denied

Loading

---

# Floating Action Button

Visible only when user has permission.

Actions:

Create Organization

Join Organization

---

# Pull To Refresh

Refresh:

Organizations

Membership Status

Counts

Recent Activity

---

# Pagination

Prepare for infinite scrolling.

Use cursor-based pagination architecture.

Do not hardcode page numbers.

---

# Repository Layer

Create:

OrganizationRepository

Methods:

getOrganizations()

getOrganization()

searchOrganizations()

switchOrganization()

createOrganization()

joinOrganization()

leaveOrganization()

Repository should support future API integration.

---

# State Management

React Query:

Remote organization data

Zustand:

Current organization

Selected filters

Search query

UI state

---

# Navigation

Support navigation to:

Organization Details

Create Organization

Join Organization

Dashboard

Election List

Members

Branding

Settings

---

# Components

Create reusable components:

OrganizationCard

OrganizationList

OrganizationLogo

OrganizationSwitcher

OrganizationHeader

OrganizationEmptyState

OrganizationSkeleton

OrganizationFilterChip

OrganizationSearchBar

OrganizationFAB

---

# Accessibility

Support:

VoiceOver

TalkBack

Dynamic Font Size

Accessible Labels

Accessible Icons

Large Touch Targets

---

# Performance

Use:

FlatList

Memoized Cards

Image Caching

Virtualization

Lazy Rendering

Optimistic Updates

---

# Animation

Support:

Card Press

Fade In

Organization Switch Animation

Skeleton Loading

Bottom Sheet

FAB Expansion

---

# Security

Never expose organizations the user cannot access.

Validate permissions before displaying admin actions.

Never rely solely on UI restrictions.

---

# Error Handling

Support:

Network Failure

Unauthorized

Organization Not Found

Timeout

Unknown Error

Display actionable recovery options.

---

# Analytics (Future Ready)

Prepare event hooks for:

Organization Viewed

Organization Switched

Organization Created

Organization Joined

Search Performed

Filter Applied

Do not implement analytics service yet.

---

# Quality Checklist

Before completion verify:

✓ Uses reusable UI components

✓ No duplicated logic

✓ No inline styles

✓ Dark mode supported

✓ Empty states implemented

✓ Loading states implemented

✓ Error states implemented

✓ Offline ready

✓ Type-safe

✓ Responsive

✓ Accessible

✓ Zero ESLint errors

✓ Zero TypeScript errors

✓ Production-ready

---

# Deliverables

Implement:

Organization List Screen

Organization Components

Repository

Hooks

Store

Navigation

Loading States

Error States

Accessibility

---

# Unlocks

010-create-organization.md

011-organization-details.md

012-organization-members.md

013-roles-and-permissions.md

---

# Definition of Done

The Organization List module is fully functional, scalable, and serves as the central hub for managing and switching between organizations within VotiQra. It adheres to all architecture, design, accessibility, and quality standards defined by the project.