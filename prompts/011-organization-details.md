# 011 - Organization Details

## Objective

Implement the complete Organization Details workspace for VotiQra.

This screen serves as the central management hub for a single organization. It provides administrators and members with a comprehensive overview of the organization, quick access to core modules, analytics, branding, membership, elections, and administrative settings.

The experience should be modern, scalable, intuitive, and optimized for mobile-first interactions.

Do not implement backend business logic. Use repository interfaces or mock services where necessary.

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

Read:

specs/ORGANIZATION/

ORG-003-OrganizationDetails.md

ORG-004-Members.md

ORG-005-Roles.md

ORG-007-Branding.md

Follow these specifications exactly.

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

009-organization-list

010-create-organization

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

React Native SVG

---

# Scope

Implement:

Organization Workspace

Overview

Quick Statistics

Organization Header

Quick Actions

Recent Elections

Member Preview

Branding Preview

Organization Activity

Settings Shortcut

Pull To Refresh

---

# Screen Layout

Safe Area

↓

Organization Header

↓

Organization Overview Card

↓

Quick Statistics

↓

Quick Actions

↓

Recent Elections

↓

Member Preview

↓

Recent Activity

↓

Branding Preview

↓

Danger Zone (Admins Only)

---

# Organization Header

Display:

Organization Logo

Organization Name

Organization Code

Verification Badge (future)

Role Badge

Share Button

More Options Button

Support collapsing on scroll.

---

# Overview Card

Display:

Description

Institution

Location

Date Created

Total Members

Total Elections

Current Subscription (future)

Status

---

# Quick Statistics

Cards:

Members

Administrators

Active Elections

Completed Elections

Pending Invitations

Reports Generated

Each card navigates to the appropriate module.

---

# Quick Actions

Show based on permissions.

Available actions:

Create Election

Invite Members

Manage Branding

Manage Roles

View Reports

Organization Settings

Join Requests (future)

---

# Recent Elections

Display:

Election Banner

Election Title

Election Status

Voting Progress

Start Date

End Date

Tap opens Election Details.

---

# Member Preview

Show:

Top Administrators

Recently Joined Members

Avatar Stack

View All Button

---

# Branding Preview

Display:

Logo

Primary Color

Secondary Color

Organization Theme

Edit Branding Shortcut

---

# Recent Activity

Examples:

Member Joined

Election Created

Election Published

Role Updated

Branding Changed

Invitation Accepted

Display relative timestamps.

---

# Danger Zone

Visible only to Organization Owners.

Support:

Archive Organization (future)

Transfer Ownership (future)

Delete Organization (future)

Every destructive action requires confirmation.

---

# Repository Layer

OrganizationRepository

Methods:

getOrganizationDetails()

getOrganizationStats()

getRecentActivity()

getRecentElections()

getMembersPreview()

refreshOrganization()

Future-ready:

archiveOrganization()

deleteOrganization()

---

# State Management

React Query:

Organization Details

Statistics

Activity

Elections

Members

Zustand:

Selected Tab

Refresh State

UI Preferences

Expanded Sections

---

# Navigation

Support navigation to:

Members

Roles

Branding

Election List

Organization Settings

Reports

Profile

Dashboard

---

# Components

Create reusable components:

OrganizationHeader

OrganizationOverviewCard

StatisticsGrid

StatisticCard

QuickActionGrid

QuickActionCard

RecentElectionCard

MemberAvatarStack

BrandingPreviewCard

ActivityTimeline

DangerZoneCard

SectionHeader

OrganizationSkeleton

---

# Empty States

Support:

No Members

No Elections

No Activity

No Branding

Offline

Permission Denied

Organization Not Found

---

# Pull To Refresh

Refresh:

Organization

Members

Statistics

Activity

Elections

Branding

---

# Performance

Use:

FlatList

Memoization

Image Caching

Optimistic Refresh

Lazy Rendering

Virtualized Lists

---

# Accessibility

Support:

VoiceOver

TalkBack

Dynamic Font Sizes

Accessible Cards

Accessible Icons

Accessible Navigation

Large Touch Targets

---

# Animation

Support:

Header Collapse

Statistics Counter Animation

Card Press

Section Fade

Avatar Animation

Skeleton Loading

Refresh Animation

Keep animations subtle.

---

# Security

Hide administrator actions for unauthorized users.

Validate permissions before rendering management features.

Never rely solely on UI restrictions.

---

# Error Handling

Support:

Organization Missing

Unauthorized

Network Failure

Timeout

Unknown Error

Provide retry and recovery options.

---

# Analytics (Future Ready)

Prepare event hooks for:

Organization Viewed

Section Opened

Statistic Selected

Quick Action Clicked

Election Opened

Member Viewed

Branding Viewed

Do not implement analytics services yet.

---

# Testing Checklist

Unit Tests

- Statistics calculations
- Repository methods
- Permission filtering
- State transitions

Component Tests

- Organization Header
- Statistics Cards
- Activity Timeline
- Avatar Stack
- Branding Preview

Navigation Tests

- Quick Actions
- Card Navigation
- Pull To Refresh

Accessibility Tests

- Screen reader labels
- Focus order
- Dynamic font scaling

---

# Quality Checklist

✓ Responsive Layout

✓ Dark Mode

✓ Reusable Components

✓ No Inline Styles

✓ Type Safe

✓ Loading States

✓ Empty States

✓ Error States

✓ Offline Ready

✓ Accessible

✓ Zero ESLint Errors

✓ Zero TypeScript Errors

✓ Production Ready

---

# Deliverables

Implement:

Organization Details Screen

Reusable Components

Repository

Hooks

Store

Navigation

Animations

Accessibility

Loading States

Error States

---

# Unlocks

012-organization-members.md

013-roles-and-permissions.md

014-election-list.md

015-create-election.md

017-election-settings.md

024-reports.md

---

# Definition of Done

The Organization Details module serves as the central workspace for every organization in VotiQra, providing an elegant, scalable, secure, and production-ready experience for both members and administrators while adhering to all architectural and design standards.