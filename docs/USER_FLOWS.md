# VotiQra User Flows

> Version 1.0

This document defines every major user journey in VotiQra.

Every feature implementation must follow these flows unless explicitly updated.

---

# User Roles

## Visitor

Can:

- View Welcome Screen
- Login
- Register
- Join an Organization

Cannot:

- Vote
- Create Organizations
- Create Elections

---

## Member

Can:

- Join Organizations
- Participate in Elections
- Vote
- View Results (if allowed)
- Manage Profile

Cannot:

- Create Elections (unless granted)

---

## Organization Administrator

Can:

- Create Organization
- Invite Members
- Manage Members
- Create Elections
- Publish Elections
- Manage Candidates
- Manage Positions
- Manage Voters
- View Reports
- View Audit Logs

---

## Super Administrator (Future)

Can access everything.

---

# FLOW 001 — Create Account

Welcome

↓

Register

↓

Verify Email

↓

Create Profile

↓

Join Organization

↓

Dashboard

---

# FLOW 002 — Login

Welcome

↓

Login

↓

Dashboard

---

# FLOW 003 — Forgot Password

Login

↓

Forgot Password

↓

Email Verification

↓

Reset Password

↓

Login

---

# FLOW 004 — Create Organization

Dashboard

↓

Organizations

↓

Create Organization

↓

Enter Information

↓

Upload Logo

↓

Review

↓

Create

↓

Organization Dashboard

---

# FLOW 005 — Invite Members

Organization

↓

Members

↓

Invite

↓

Generate Invite Link

OR

Organization Code

OR

QR Code

↓

Member Joins

↓

Admin Approval (optional)

↓

Member Added

---

# FLOW 006 — Join Organization

Welcome

↓

Join Organization

↓

Enter Invite Code

OR

Scan QR Code

↓

Verification

↓

Organization Preview

↓

Join

↓

Dashboard

---

# FLOW 007 — Create Election

Organization Dashboard

↓

Election List

↓

Create Election

↓

Basic Information

↓

Configure Settings

↓

Create Positions

↓

Add Candidates

↓

Import Voters

↓

Review

↓

Draft Saved

---

# FLOW 008 — Publish Election

Election Details

↓

Validation Checklist

↓

Fix Issues (if any)

↓

Confirm Publish

↓

Election Live

---

# FLOW 009 — Add Candidate

Election

↓

Candidates

↓

Add Candidate

↓

Upload Photo

↓

Candidate Information

↓

Manifesto

↓

Review

↓

Save

---

# FLOW 010 — Import Voters

Election

↓

Voters

↓

Import CSV

↓

Validate File

↓

Preview

↓

Resolve Errors

↓

Import Successful

---

# FLOW 011 — Vote

Dashboard

↓

Election

↓

Election Overview

↓

Start Voting

↓

Position 1

↓

Select Candidate

↓

Next Position

↓

Continue Until Complete

↓

Review Votes

↓

Confirm Submission

↓

Vote Submitted

↓

Receipt Generated

---

# FLOW 012 — Verify Vote

Dashboard

↓

Voting History

↓

Select Vote

↓

Receipt

↓

Verify Vote

↓

Blockchain Verification (Future)

↓

Verified

---

# FLOW 013 — View Results

Dashboard

↓

Election

↓

Results

↓

Charts

↓

Candidate Breakdown

↓

Statistics

↓

Export (if permitted)

---

# FLOW 014 — Edit Organization Branding

Organization

↓

Branding

↓

Update Logo

↓

Update Colors

↓

Update Banner

↓

Preview

↓

Save

---

# FLOW 015 — Update Profile

Profile

↓

Edit Profile

↓

Update Information

↓

Save

↓

Profile Updated

---

# FLOW 016 — Notification Flow

System Event

↓

Push Notification

↓

Notification Center

↓

Open Notification

↓

Navigate to Related Screen

---

# FLOW 017 — Search

Tap Search

↓

Enter Query

↓

Results

↓

Select Result

↓

Navigate

---

# FLOW 018 — Subscription Upgrade

Settings

↓

Subscription

↓

Plans

↓

Select Plan

↓

Checkout

↓

Payment Success

↓

Subscription Activated

---

# FLOW 019 — Organization Switching

Dashboard

↓

Organization Switcher

↓

Choose Organization

↓

Load Organization Context

↓

Dashboard Updated

---

# FLOW 020 — Logout

Profile

↓

Settings

↓

Logout

↓

Confirmation

↓

Welcome Screen

---

# Universal Navigation Rules

Every flow must support:

- Back navigation
- Loading state
- Error recovery
- Session expiration recovery
- Offline handling (where applicable)

---

# Error Recovery

Every failed operation should provide:

- Clear explanation
- Retry action
- Cancel action
- Support option (if required)

Never leave users stranded.

---

# Success Feedback

Every successful action should provide immediate visual confirmation through:

- Success toast
- Success screen
- Updated data
- Optional haptic feedback

---

# Design Principles

Every flow should be:

- Simple
- Predictable
- Fast
- Secure
- Accessible
- Mobile-first

Minimize unnecessary steps while preserving clarity and security.