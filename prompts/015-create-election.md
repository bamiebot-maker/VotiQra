# 015 - Create Election Wizard

## Objective

Implement the complete Create Election Wizard for VotiQra.

This module enables administrators to create secure, configurable, and scalable elections through a guided multi-step workflow optimized for mobile devices.

The wizard should minimize cognitive load by progressively revealing configuration options while supporting enterprise-grade election management.

Do not implement backend business logic. Use repository interfaces and mock services where required.

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

Read:

specs/ELECTION/

ELC-002-CreateElection.md

ELC-004-ElectionSettings.md

ELC-005-Positions.md

These documents are the source of truth.

---

# Dependencies

Requires:

001 through 014

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

- Multi-step Election Wizard
- Draft Saving
- Validation
- Timeline Builder
- Position Builder
- Eligibility Builder
- Security Configuration
- Review & Publish
- Success Screen

---

# Wizard Flow

Step 1 — Basic Information

↓

Step 2 — Election Structure

↓

Step 3 — Timeline

↓

Step 4 — Voter Eligibility

↓

Step 5 — Security & Voting Rules

↓

Step 6 — Review & Publish

---

# Step 1 — Basic Information

Collect:

- Election Name
- Description
- Banner Image
- Election Type
- Visibility
- Organization
- Election Code (preview)
- Election Slug (preview)

Validation:

- Required fields
- Character limits
- Unique slug (mock validation)
- Reserved word protection

---

# Step 2 — Election Structure

Allow administrators to create positions.

Each position includes:

- Position Name
- Description
- Display Order
- Winners Allowed
- Maximum Candidates
- Voting Method
- Required / Optional

Support:

- Add Position
- Edit Position
- Delete Position
- Reorder via drag-and-drop
- Duplicate Position

Display a live preview of the ballot structure.

---

# Step 3 — Timeline

Configure:

- Candidate Registration Opens
- Candidate Registration Closes
- Voting Opens
- Voting Closes
- Results Publication
- Timezone

Validation:

- Dates must follow logical order.
- Prevent overlapping phases.

Display a visual timeline preview.

---

# Step 4 — Voter Eligibility

Support:

- All Members
- Department
- Faculty
- Academic Level
- Imported List
- Invite Only
- Custom Rules (future)

Display an estimated eligible voter count.

---

# Step 5 — Security & Voting Rules

Authentication:

- Clerk Authentication
- Email Verification
- Student/Employee ID (future)

Verification:

- OTP (future-ready)
- Vote Receipt
- Audit Logging

Voting Rules:

- Anonymous Voting
- Allow Abstain
- Candidate Order (Fixed / Random)
- One Vote Per Position
- Prevent Duplicate Voting

Future-ready:

- Blockchain Verification
- Device Trust
- IP Restrictions

---

# Step 6 — Review & Publish

Display a complete summary:

- Basic Information
- Timeline
- Positions
- Eligibility
- Security Settings

Primary actions:

- Save as Draft
- Schedule Election
- Publish Now

Secondary action:

- Return to Previous Step

---

# Draft Saving

Persist progress locally.

Restore unfinished drafts automatically.

Allow users to discard drafts.

---

# Repository Layer

Create:

ElectionRepository

Methods:

createElection()

updateDraft()

restoreDraft()

publishElection()

scheduleElection()

validateTimeline()

validateElection()

---

# Components

Create reusable:

ElectionWizard

WizardProgressBar

BasicInfoStep

StructureStep

TimelineStep

EligibilityStep

SecurityStep

ReviewStep

PositionCard

TimelinePreview

EligibilityCard

SecurityCard

ElectionSummaryCard

DiscardDraftDialog

---

# State Management

React Query:

Validation

Repository interactions

Zustand:

Wizard State

Current Step

Draft

Selected Positions

Timeline

Eligibility

Security Rules

---

# Navigation

Support:

Back

Next

Cancel

Discard Draft

Publish

Schedule

Save Draft

Navigate to:

Election Workspace

Election List

Dashboard

---

# Accessibility

Support:

- VoiceOver
- TalkBack
- Dynamic Font Scaling
- Accessible Forms
- Accessible Date Pickers
- Large Touch Targets

---

# Performance

Optimize:

- Wizard rendering
- Image uploads
- Drag-and-drop
- Step transitions
- Validation

---

# Animation

Support:

- Step transitions
- Progress bar
- Drag-and-drop feedback
- Success animation
- Button feedback

Keep animations subtle and purposeful.

---

# Security

Validate permissions before allowing election creation.

Do not trust client-side validation alone.

Prepare repository interfaces for server-side validation.

---

# Error Handling

Support:

- Validation failures
- Timeline conflicts
- Image upload errors
- Duplicate election names
- Permission denied
- Network failure
- Unknown errors

Provide actionable recovery options.

---

# Analytics (Future Ready)

Prepare event hooks:

- Election Creation Started
- Step Completed
- Draft Saved
- Draft Restored
- Election Published
- Election Scheduled
- Wizard Cancelled

---

# Testing Checklist

Unit Tests

- Timeline validation
- Position builder
- Draft persistence
- Wizard navigation

Component Tests

- Step components
- Timeline preview
- Position card
- Review summary

Navigation Tests

- Back/Next flow
- Draft restore
- Publish flow

Accessibility Tests

- Screen reader labels
- Focus order
- Dynamic font scaling

---

# Quality Checklist

✓ Six-step wizard implemented

✓ Draft recovery works

✓ Validation complete

✓ Timeline validation

✓ Reusable components only

✓ No inline styles

✓ Dark mode supported

✓ Loading states

✓ Error states

✓ Accessible

✓ Responsive

✓ Type-safe

✓ Zero ESLint errors

✓ Zero TypeScript errors

✓ Production-ready

---

# Deliverables

Implement:

- Election Wizard
- Step Components
- Repository Interfaces
- Hooks
- Store
- Navigation
- Validation
- Draft Persistence
- Animations
- Accessibility

---

# Unlocks

016-election-workspace.md

017-election-settings.md

018-position-management.md

019-candidate-management.md

020-voter-management.md

021-voting-flow.md

---

# Definition of Done

The Create Election Wizard provides a polished, mobile-first, enterprise-grade workflow for creating elections with progressive disclosure, robust validation, reusable components, draft recovery, and a scalable architecture ready for future backend integration.