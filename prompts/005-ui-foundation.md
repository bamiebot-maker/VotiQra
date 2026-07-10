# 005 - UI Foundation

## Objective

Build the complete reusable UI foundation for VotiQra.

This task creates the application's design primitives and reusable components that every future feature will consume.

This is NOT a feature implementation.

This is NOT authentication.

This is NOT business logic.

Everything produced here must be generic, reusable, accessible, fully typed, and production-ready.

---

# IMPORTANT

Before doing anything, read completely:

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

These documents are the source of truth.

Do not violate them.

---

# Tech Stack

Use exactly:

- React Native
- Expo
- Expo Router
- TypeScript
- NativeWind
- React Native Reanimated
- React Native Gesture Handler
- React Native SVG
- Lucide React Native
- Zustand
- Clerk

Do not introduce UI libraries such as:

- NativeBase
- React Native Paper
- UI Kitten
- React Native Elements
- Tamagui
- Gluestack UI

Everything must be built from scratch.

---

# Component Folder Structure

Implement the following architecture:

components/

    ui/

        Button/

        Input/

        Text/

        Card/

        Avatar/

        Badge/

        Chip/

        Divider/

        Icon/

        Image/

        Checkbox/

        Radio/

        Switch/

        Progress/

        Spinner/

        Skeleton/

        EmptyState/

        ErrorState/

        Banner/

        Tooltip/

    feedback/

        Toast/

        Dialog/

        BottomSheet/

        Alert/

        LoadingOverlay/

    forms/

        FormField/

        FormSection/

        FieldError/

        FieldHint/

        CharacterCounter/

    layout/

        Screen/

        Container/

        Section/

        Header/

        Footer/

        ScrollContainer/

        SafeArea/

    navigation/

        AppHeader/

        TabBar/

        BackButton/

        SearchButton/

        AvatarButton/

---

# Typography Components

Create reusable typography components.

Include:

Display

Heading

Title

Subtitle

Body

Caption

Label

ButtonText

Code

Each component must consume typography tokens.

---

# Button System

Implement:

Primary

Secondary

Outline

Ghost

Danger

Icon

Loading

Disabled

Support:

leftIcon

rightIcon

loading

fullWidth

small

medium

large

haptic feedback (future-ready)

---

# Input System

Support:

Label

Placeholder

Helper Text

Error Text

Password

Email

Number

Search

OTP

Phone

Read Only

Disabled

Loading

Character Counter

Icons

Validation

---

# Card System

Support:

Default

Outlined

Elevated

Interactive

Selectable

Loading

---

# Avatar System

Support:

Image

Initials

Placeholder

Online Status

Size Variants

---

# Badge System

Support:

Success

Warning

Danger

Info

Neutral

Small

Medium

Large

---

# Empty States

Prepare reusable screens for:

No Organizations

No Elections

No Notifications

No Search Results

No Internet

Coming Soon

Access Denied

---

# Loading Components

Implement:

Spinner

Skeleton

Loading Card

Loading List

Loading Screen

Progress Bar

---

# Error Components

Support:

Error Screen

Retry Button

Error Banner

Network Error

Permission Error

404

---

# Dialog System

Support:

Confirmation

Delete

Success

Warning

Information

Error

---

# Toast System

Support:

Success

Error

Warning

Information

Queue

Dismiss

Auto Close

---

# Bottom Sheets

Support:

Snap Points

Drag to Close

Scrollable Content

Action List

Selection List

---

# Layout Components

Implement:

Screen

Container

Section

Page Header

Scrollable Screen

Keyboard Avoiding Screen

Safe Area Wrapper

---

# Image Component

Support:

Caching

Placeholder

Rounded

Circle

Error State

Loading State

---

# Icons

Use Lucide React Native only.

Wrap icons in a reusable Icon component.

Never import Lucide directly in feature screens.

---

# Accessibility

Support:

Screen Readers

Dynamic Font Size

44x44 Touch Targets

Accessible Labels

Focus Order

High Contrast

---

# Performance

Use:

React.memo where appropriate

Forward Refs

Lazy loading where beneficial

Avoid unnecessary re-renders

---

# Styling Rules

Use NativeWind exclusively.

Do not hardcode:

- Colors
- Font sizes
- Border radius
- Shadows
- Spacing

Everything must use theme tokens.

---

# Animation

Implement subtle reusable animations for:

Button Press

Card Press

Screen Fade

Skeleton Pulse

Loading

Modal Open

Bottom Sheet Open

---

# Deliverables

Return:

- Complete UI folder
- Generic reusable components
- Typography system
- Button system
- Input system
- Feedback system
- Layout system
- Accessibility support
- Theme integration

---

# Acceptance Criteria

✓ Every component typed

✓ No duplicated code

✓ Dark mode compatible

✓ Accessible

✓ Theme driven

✓ Production ready

✓ Feature independent

✓ Documentation comments included where appropriate

---

# Definition of Done

The UI foundation provides all primitives required to build every VotiQra screen without recreating components.