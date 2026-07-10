# DESIGN_SYSTEM.md

> Version: 1.0.0
> Status: Active
> Project: VotiQra

---

# Purpose

This document defines the visual language of VotiQra.

Every screen, component, animation, illustration, icon, and interaction must follow this design system.

No component should invent its own styling.

---

# Design Philosophy

VotiQra should communicate:

- Trust
- Professionalism
- Clarity
- Simplicity
- Reliability

The interface should feel calm instead of crowded.

Whitespace is part of the design.

---

# Design Principles

Every interface should be:

- Consistent
- Accessible
- Responsive
- Minimal
- Predictable
- Elegant

Avoid decorative elements that do not improve usability.

---

# Design Tokens

All visual values must come from centralized design tokens.

Never hardcode:

- Colors
- Font sizes
- Spacing
- Border radius
- Shadows
- Opacity
- Animation durations

All tokens should live in the project's theme configuration.

---

# Color System

The design system defines semantic colors rather than component-specific colors.

Examples:

Primary

Secondary

Success

Warning

Error

Info

Surface

Background

Border

Text

Muted

Disabled

Future documentation will define the exact color values.

---

# Typography

Typography should prioritize readability.

Hierarchy:

- Display
- Heading 1
- Heading 2
- Heading 3
- Title
- Body
- Caption
- Label

Text should never rely on color alone to communicate meaning.

---

# Spacing System

Use an 8-point spacing system.

Spacing should scale consistently.

Examples:

4

8

12

16

20

24

32

40

48

64

Avoid arbitrary spacing values.

---

# Border Radius

Use a small set of reusable radius values.

Examples:

Small

Medium

Large

Extra Large

Full

Do not invent new radius values.

---

# Shadows

Shadows should be subtle.

Cards should appear elevated without becoming distracting.

Prefer low elevation over heavy shadows.

---

# Icons

Use Lucide React Native.

Icons should:

Be consistent.

Use semantic meaning.

Avoid decorative icons.

Keep sizes consistent across screens.

---

# Buttons

Every button belongs to a variant.

Primary

Secondary

Outline

Ghost

Danger

Link

Loading

Disabled

Every button should support:

Loading

Disabled

Pressed

Focused

Accessible labels

---

# Inputs

Every input should support:

Label

Placeholder

Helper Text

Validation

Error

Disabled

Success

Required Indicator

Secure Entry

---

# Cards

Cards are the primary surface container.

Cards should:

Have consistent padding

Consistent radius

Consistent elevation

Optional header

Optional footer

---

# Lists

Lists should support:

Loading

Empty

Pagination

Search

Pull to Refresh

Infinite Scroll (when required)

---

# Avatars

Support:

User

Organization

Candidate

Placeholder

Initials

Image

---

# Badges

Use badges for status.

Examples:

Draft

Active

Published

Completed

Archived

Pending

Verified

Rejected

Success

Warning

---

# Chips

Chips should represent:

Filters

Categories

Tags

Selections

---

# Tables

Although the mobile app is card-first, tables may be used where necessary.

Tables should remain responsive.

---

# Empty States

Every feature should have a dedicated empty state.

Each empty state should include:

Illustration

Title

Description

Primary Action

Optional Secondary Action

---

# Loading States

Prefer skeleton loaders.

Avoid blocking spinners whenever possible.

Loading should preserve layout stability.

---

# Error States

Error screens should include:

Illustration

Title

Explanation

Retry Action

Support Action (where appropriate)

---

# Success States

Success feedback should be clear and reassuring.

Examples:

Vote Submitted

Election Published

Organization Created

Profile Updated

Avoid excessive celebrations or distracting animations.

---

# Toast Notifications

Toast messages should be:

Short

Informative

Non-blocking

Automatically dismissed when appropriate

---

# Dialogs

Use dialogs only for important decisions.

Examples:

Delete

Archive

Leave Organization

Submit Vote

Dialogs should clearly communicate the consequences of the action.

---

# Bottom Sheets

Preferred for lightweight actions.

Examples:

Filter

Sort

Share

Select Image

Choose Organization

Choose Role

---

# Navigation Components

Bottom Navigation

Top App Bar

Back Button

Search Bar

Floating Action Button (when justified)

Navigation components should remain consistent across the application.

---

# Motion

Motion should improve usability.

Animation principles:

Fast

Natural

Purposeful

Subtle

Avoid excessive motion.

---

# Haptic Feedback

Use haptic feedback for meaningful actions.

Examples:

Vote Submitted

Success

Error

Selection

Long Press

Avoid excessive vibration.

---

# Illustrations

Illustrations should:

Share one visual style

Use soft colors

Represent diverse users where appropriate

Avoid excessive detail

Support the product rather than distract from it

---

# Images

Optimize all images.

Avoid unnecessarily large assets.

Support light and dark themes where applicable.

---

# Accessibility

Support:

Dynamic font scaling

Screen readers

Proper contrast

Large touch targets

Keyboard accessibility where applicable

Accessibility is a core requirement.

---

# Responsive Design

The application should work well across a range of phone sizes.

Layouts should adapt gracefully.

Avoid fixed dimensions whenever possible.

---

# Component Reuse

Before creating a new component:

Check whether an existing component satisfies the requirement.

Prefer extending existing components over creating duplicates.

---

# Design Consistency

Every new component must feel like it belongs to the same product.

If a component looks inconsistent with the rest of the application, redesign it before implementation.

---

# Future Evolution

The design system is expected to grow over time.

New components, tokens, and interaction patterns should be documented before widespread use.

---

# Guiding Principle

A user should immediately feel that VotiQra is secure, modern, and professional through its design alone.

Every visual decision should reinforce trust in the platform.