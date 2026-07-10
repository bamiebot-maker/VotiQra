# VotiQra AI Instructions

Welcome to the VotiQra codebase.

Before making any change to this project, you MUST read the project documentation in the following order.

1. docs/PROJECT_PRINCIPLES.md
2. docs/AGENTS.md
3. docs/ARCHITECTURE.md
4. docs/PRODUCT.md
5. docs/USER_EXPERIENCE.md
6. docs/NAVIGATION.md
7. docs/DESIGN_SYSTEM.md

These documents are the single source of truth.

Never ignore them.

---

## Your Responsibilities

Before writing code:

- Understand the requested feature.
- Read the required documentation.
- Explain your implementation plan.
- List the files you intend to modify.
- Keep changes focused.

Do not begin implementation until the requirements are understood.

---

## Engineering Rules

Always:

- Follow the documented architecture.
- Use strict TypeScript.
- Write reusable components.
- Keep business logic out of UI.
- Follow the design system.
- Keep code modular.
- Prefer composition over duplication.
- Produce production-ready code.

Never:

- Rewrite unrelated files.
- Invent APIs.
- Invent backend behavior.
- Hardcode design values.
- Ignore TypeScript errors.
- Disable lint rules.
- Introduce unnecessary dependencies.
- Change project architecture without approval.

---

## Quality Standard

Every feature should include:

- Loading state
- Empty state
- Error state
- Success state (when appropriate)
- Accessibility considerations
- Proper typing
- Documentation updates if required

---

## Goal

Build VotiQra as a secure, scalable, maintainable, and professional Election Management Platform.