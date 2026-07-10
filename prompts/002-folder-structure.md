# 002 - Folder Structure & Codebase Architecture

## Objective

Design and implement the complete folder structure for the VotiQra mobile application.

The goal is to establish a scalable, feature-first architecture that supports long-term growth and maintains clear separation of concerns.

This task focuses only on project organization.

Do NOT implement application features.

Do NOT build UI.

Do NOT add business logic.

---

# Required Reading

Before implementation, read:

1. docs/PROJECT_PRINCIPLES.md
2. docs/AGENTS.md
3. docs/ARCHITECTURE.md
4. docs/PRODUCT.md
5. docs/USER_EXPERIENCE.md
6. docs/NAVIGATION.md
7. docs/DESIGN_SYSTEM.md

These documents are the source of truth.

---

# Objective

Organize the project so that every future feature has a predictable place.

The architecture must prioritize:

- Scalability
- Readability
- Maintainability
- Reusability
- Testability

---

# Folder Architecture

Implement the following high-level structure.

```text
app/
assets/
components/
constants/
features/
hooks/
lib/
providers/
services/
store/
theme/
types/
utils/
```

---

# App Directory

The `app/` directory is reserved exclusively for Expo Router routes.

It should not contain business logic.

Create the route groups defined in `NAVIGATION.md`.

```text
app/
├── (auth)/
├── (onboarding)/
├── (app)/
│   ├── (tabs)/
│   ├── organizations/
│   ├── elections/
│   ├── candidates/
│   ├── voters/
│   ├── positions/
│   ├── results/
│   └── settings/
├── (modals)/
├── _layout.tsx
└── index.tsx
```

---

# Features Directory

Every business domain owns its code.

```text
features/
├── auth/
├── onboarding/
├── dashboard/
├── organizations/
├── elections/
├── positions/
├── candidates/
├── voters/
├── voting/
├── results/
├── notifications/
├── profile/
└── settings/
```

Each feature should contain:

```text
components/
hooks/
screens/
services/
store/
types/
utils/
```

Only create placeholders.

---

# Components Directory

Shared reusable UI only.

```text
components/
├── ui/
├── forms/
├── feedback/
├── layout/
├── navigation/
└── common/
```

Feature-specific components must remain inside their respective feature.

---

# Providers

Create placeholders for:

```text
providers/
├── AuthProvider.tsx
├── QueryProvider.tsx
├── ThemeProvider.tsx
├── SafeAreaProvider.tsx
└── index.ts
```

---

# Services

```text
services/
├── api/
├── storage/
├── analytics/
├── notifications/
└── index.ts
```

---

# Store

```text
store/
├── app.store.ts
├── theme.store.ts
├── organization.store.ts
└── index.ts
```

No business-specific state should live here.

---

# Theme

```text
theme/
├── colors.ts
├── typography.ts
├── spacing.ts
├── radius.ts
├── shadows.ts
├── animations.ts
├── index.ts
```

Placeholder tokens only.

---

# Constants

```text
constants/
├── routes.ts
├── storage.ts
├── permissions.ts
├── config.ts
└── index.ts
```

---

# Hooks

Shared reusable hooks only.

```text
hooks/
├── useDebounce.ts
├── useNetwork.ts
├── useTheme.ts
├── useKeyboard.ts
└── index.ts
```

---

# Lib

Internal libraries.

```text
lib/
├── axios.ts
├── queryClient.ts
├── clerk.ts
└── index.ts
```

---

# Types

Global shared types only.

```text
types/
├── api.ts
├── navigation.ts
├── common.ts
└── index.ts
```

Feature types belong inside the feature.

---

# Utils

Reusable utility functions.

```text
utils/
├── date.ts
├── validation.ts
├── format.ts
├── strings.ts
└── index.ts
```

---

# Assets

```text
assets/
├── animations/
├── fonts/
├── icons/
├── illustrations/
└── images/
```

Do not add files yet.

---

# Naming Conventions

Folders:

- lowercase
- kebab-case when multiple words

Components:

```text
VoteCard.tsx
OrganizationCard.tsx
```

Hooks:

```text
useVote.ts
useElection.ts
```

Stores:

```text
theme.store.ts
organization.store.ts
```

Services:

```text
auth.service.ts
election.service.ts
```

Types:

```text
election.types.ts
auth.types.ts
```

Constants:

```text
routes.ts
permissions.ts
```

---

# Barrel Exports

Create `index.ts` files where appropriate.

Use them to simplify imports.

---

# README Files

Create a README.md inside:

- features/
- components/
- services/
- theme/
- providers/

Each README should briefly explain the folder's purpose and usage.

---

# Path Aliases

Ensure the project supports imports like:

```ts
import { Button } from "@/components";
import { colors } from "@/theme";
import { api } from "@/services";
import { useTheme } from "@/hooks";
```

Avoid long relative paths.

---

# Constraints

Do NOT:

- Add feature logic.
- Add API endpoints.
- Add screens.
- Add UI components.
- Add business logic.
- Add placeholder data.

Only establish the architecture.

---

# Deliverables

Provide:

1. Folder tree.
2. Files created.
3. Barrel export strategy.
4. Naming convention summary.
5. Architectural explanation.

---

# Definition of Done

✓ Folder structure is complete.

✓ Feature-first architecture is established.

✓ Shared modules are separated correctly.

✓ Path aliases are ready.

✓ Barrel exports exist.

✓ README files explain each major directory.

✓ The project remains clean, modular, and ready for feature development.