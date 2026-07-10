# 003 - Design System

---

## Design Reference

A UI reference image is available at:

assets/design-reference/mobile-ui-reference.png

Before designing any screen:

Study the reference.

Pay attention to:

- Layout rhythm
- Card spacing
- Vertical spacing
- Illustration sizing
- Navigation hierarchy
- Modern mobile UX
- Information hierarchy
- Use of white space

Do NOT copy the design.

Use it only as inspiration for creating an original interface that matches the VotiQra design language.

---


## Objective

Design and establish the complete visual design system for VotiQra.

This task creates the visual foundation that every screen and component in the application will follow.

The goal is to ensure the application has a consistent, accessible, scalable, and professional user interface.

Do NOT implement application features.

Do NOT implement authentication.

Do NOT build business logic.

Focus only on the design system.

---

# IMPORTANT

Before doing anything:

Read:

- README.md
- CLAUDE.md
- docs/PROJECT_PRINCIPLES.md
- docs/AGENTS.md
- docs/ARCHITECTURE.md
- docs/PRODUCT.md
- docs/USER_EXPERIENCE.md
- docs/NAVIGATION.md

Follow every rule.

Do not violate the architecture.

---

# Objective

Create a complete design system that supports:

- Light Mode
- Dark Mode
- Accessibility
- Responsive layouts
- Future Web version
- Consistent branding

---

# Theme Architecture

Create a scalable theme architecture.

```
theme/

colors.ts
typography.ts
spacing.ts
radius.ts
elevation.ts
opacity.ts
borders.ts
animations.ts
zIndex.ts
breakpoints.ts
index.ts
```

Use TypeScript.

Everything must be strongly typed.

---

# Color System

Design a professional election platform color palette.

Include:

Primary

Secondary

Success

Warning

Danger

Info

Neutral

Background

Surface

Card

Border

Divider

Text Primary

Text Secondary

Text Tertiary

Disabled

Overlay

Skeleton

Do NOT hardcode colors inside components.

Every color must come from the theme.

---

# Typography

Create typography tokens.

Include:

Display Large

Display Medium

Display Small

Heading 1

Heading 2

Heading 3

Title

Subtitle

Body Large

Body Medium

Body Small

Caption

Label

Button

Monospace

Every text component must use typography tokens.

---

# Spacing

Create spacing tokens.

Example:

xs

sm

md

lg

xl

2xl

3xl

4xl

Use an 8-point spacing system.

Never use magic numbers.

---

# Radius

Create reusable border radius tokens.

Example:

xs

sm

md

lg

xl

pill

full

---

# Shadows / Elevation

Create reusable elevation tokens.

Support Android and iOS.

Levels:

1

2

3

4

5

---

# Opacity

Create reusable opacity values.

Example:

disabled

overlay

pressed

hover

loading

---

# Borders

Create reusable border widths.

Example:

hairline

thin

medium

thick

---

# Icon System

Use Lucide React Native.

Define standard icon sizes:

16

20

24

28

32

40

48

Create an Icon wrapper component architecture.

---

# Animation Tokens

Prepare reusable animation durations.

Example:

Fast

Normal

Slow

Very Slow

Also define:

Spring

Fade

Scale

Slide

Timing presets

Do not implement complex animations yet.

---

# Illustration Guidelines

The application uses modern flat illustrations.

Requirements:

- Clean
- Friendly
- Professional
- Inclusive
- Minimal

Do not use 3D illustrations.

---

# Image Guidelines

Images should:

- Use rounded corners
- Support lazy loading
- Be optimized
- Use placeholders

---

# Accessibility

The design system must support:

- WCAG contrast
- Dynamic font scaling
- Screen readers
- Touch targets of at least 44x44
- Color independence
- Focus states

---

# Dark Mode

Every token must support:

Light

Dark

No hardcoded values.

---

# Component Rules

Future UI components must consume only design tokens.

Never hardcode:

- Colors
- Font sizes
- Radius
- Padding
- Margin
- Elevation

Everything must come from the design system.

---

# Deliverables

Return:

1. Theme architecture

2. Design token files

3. Color palette

4. Typography scale

5. Spacing scale

6. Radius scale

7. Elevation scale

8. Animation presets

9. Accessibility considerations

10. Dark mode strategy

---

# Definition of Done

✓ Theme structure exists

✓ Design tokens are reusable

✓ Dark mode supported

✓ Accessibility considered

✓ No hardcoded styling values

✓ Ready for component development
