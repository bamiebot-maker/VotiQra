# VotiQra Project Setup

## Overview

VotiQra is a mobile-first Election Management Platform built with React Native and Expo. This document explains the project structure and how to get started.

## Technology Stack

- **Framework**: Expo & React Native with TypeScript
- **Navigation**: Expo Router
- **Styling**: NativeWind v5 + TailwindCSS v4
- **State Management**: 
  - Zustand for global client state
  - TanStack Query for server state
- **Authentication**: Clerk
- **Forms**: React Hook Form + Zod
- **Networking**: Axios
- **Storage**: Expo Secure Store
- **Icons**: Lucide React Native
- **Animations**: React Native Reanimated, Lottie
- **Lists**: FlashList

## Project Structure

```
src/
├── app/                    # Expo Router routes
│   ├── (auth)/            # Authentication routes
│   ├── (onboarding)/      # Onboarding routes
│   ├── (app)/             # Main app routes
│   └── (modals)/          # Modal routes
├── components/            # Reusable UI components
├── constants/             # App constants (colors, spacing, etc.)
├── features/              # Feature-specific code
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries (axios, query-client, etc.)
├── providers/             # React context/providers
├── services/              # API services
├── store/                 # Zustand stores
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions

assets/
├── images/                # Image assets
├── icons/                 # Icon assets
├── fonts/                 # Font files
├── illustrations/         # Illustration assets
└── animations/            # Animation files (Lottie JSON)
```

## Configuration Files

- **tailwind.config.ts** - Tailwind CSS configuration with design tokens
- **babel.config.js** - Babel configuration for NativeWind and Reanimated
- **.eslintrc.json** - ESLint configuration with TypeScript support
- **.prettierrc.json** - Prettier formatting rules
- **tsconfig.json** - TypeScript configuration with path aliases
- **.env.example** - Environment variables template
- **.env.local** - Local environment variables (not committed)

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Start the development server**
   ```bash
   npm run start
   ```

4. **Run on iOS or Android**
   ```bash
   npm run ios      # iOS simulator
   npm run android  # Android emulator
   npm run web      # Web browser
   ```

## Design System

All visual values come from centralized design tokens:

- **Colors**: `src/constants/colors.ts`
- **Spacing**: `src/constants/spacing.ts`
- **Tailwind Config**: `tailwind.config.ts`

Never hardcode colors or spacing values directly in components.

## Architecture Principles

1. **Layered Architecture**: Screens → Components → Hooks → Services → API
2. **Feature First**: Each feature owns its own code
3. **Separation of Concerns**: UI, business logic, and data are separated
4. **Reusable Components**: Components are generic and composable
5. **Type Safety**: Strict TypeScript everywhere
6. **Mobile First**: Design for mobile, scale to larger screens

## Providers

All providers are configured in the root layout:

- **AuthProvider** - Clerk authentication
- **ThemeProvider** - Theme management
- **QueryProvider** - TanStack Query
- **GestureProvider** - React Native Gesture Handler
- **SafeAreaProvider** - Safe area context

## State Management

- **Zustand** for global client state (theme, selected organization)
- **TanStack Query** for server state (data from API)
- **React Hook Form** for form state

## Styling

Use Tailwind CSS classes with NativeWind:

```tsx
<View className="flex-1 items-center justify-center bg-primary-500">
  <Text className="text-xl font-bold text-white">Hello</Text>
</View>
```

## Environment Variables

Required environment variables:

- `EXPO_PUBLIC_API_URL` - Backend API URL
- `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `EXPO_PUBLIC_ENV` - Environment (development, staging, production)

## Scripts

- `npm run start` - Start development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web
- `npm run lint` - Run ESLint
- `npm run reset-project` - Reset project to initial state

## Key Files to Know

- **src/app/_layout.tsx** - Root layout with all providers
- **src/providers/index.ts** - Provider exports
- **src/lib/axios.ts** - Axios client with interceptors
- **src/lib/query-client.ts** - TanStack Query configuration
- **src/store/** - Zustand stores
- **tailwind.config.ts** - Design tokens

## Next Steps

Before building features, read these documentation files:

1. docs/PROJECT_PRINCIPLES.md
2. docs/AGENTS.md
3. docs/ARCHITECTURE.md
4. docs/PRODUCT.md
5. docs/USER_EXPERIENCE.md
6. docs/NAVIGATION.md
7. docs/DESIGN_SYSTEM.md

## Common Tasks

### Adding a new route
Create a folder under `src/app/` with `_layout.tsx` and screen files.

### Adding a component
Create a file under `src/components/` and export it from `src/components/index.ts`.

### Adding a hook
Create a file under `src/hooks/` and export it from `src/hooks/index.ts`.

### Adding a service
Create a file under `src/services/` with API calls using the Axios client.

### Adding a feature
Create a folder under `src/features/` with its own components, hooks, and services.

## Troubleshooting

- **Port already in use**: Change the port in `expo start` command
- **NativeWind not working**: Make sure babel.config.js includes NativeWind plugin
- **Clerk not configured**: Set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in .env.local
- **TypeScript errors**: Run `npm run lint` and fix any issues

## Support

For more information, see the project documentation in the `docs/` folder.
