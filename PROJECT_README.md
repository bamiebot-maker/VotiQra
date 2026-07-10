# VotiQra - Election Management Platform

## Project Overview

VotiQra is a modern, mobile-first Election Management Platform built with React Native and Expo. It enables organizations to conduct secure, transparent, and reliable digital elections.

**Status**: Foundation setup complete - Ready for feature development

**Technology Stack**: React Native • Expo • TypeScript • NativeWind • Zustand • TanStack Query • Clerk

---

## Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- Expo CLI (`npm install -g expo-cli`)
- iOS/Android simulator or physical device (optional)

### Setup
```bash
# 1. Clone repository and install dependencies
npm install

# 2. Create local environment file
cp .env.example .env.local

# 3. Configure Clerk (add your publishable key to .env.local)

# 4. Start development server
npm run start

# 5. Run on device/emulator
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Web browser
```

---

## Project Structure

```
votiqra/
├── src/
│   ├── app/                      # Expo Router - Routes & Navigation
│   │   ├── (auth)/              # Authentication flows
│   │   ├── (onboarding)/        # User onboarding
│   │   ├── (app)/               # Main application
│   │   └── (modals)/            # Modal routes
│   │
│   ├── components/               # Reusable UI components
│   ├── constants/                # App constants & design tokens
│   ├── features/                 # Feature-specific code (auth, elections, etc.)
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Utility libraries (axios, query-client)
│   ├── providers/                # React context providers
│   ├── services/                 # API services
│   ├── store/                    # Zustand state stores
│   ├── types/                    # TypeScript type definitions
│   └── utils/                    # Utility functions
│
├── assets/                        # Static assets
│   ├── images/
│   ├── icons/
│   ├── fonts/
│   ├── illustrations/
│   └── animations/
│
├── docs/                          # Project documentation
├── prompts/                       # Feature implementation prompts
├── specs/                         # Feature specifications
│
├── SETUP.md                       # Setup guide
├── DEVELOPMENT_GUIDELINES.md      # Code standards & conventions
├── VERIFICATION_CHECKLIST.md      # Setup verification steps
├── package.json                   # Dependencies & scripts
├── app.json                       # Expo configuration
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.ts             # Tailwind CSS & design tokens
├── babel.config.js                # Babel configuration
├── .eslintrc.json                 # ESLint configuration
├── .prettierrc.json               # Prettier configuration
└── .env.example                   # Environment variables template
```

---

## Key Technologies

### Frontend Framework
- **React Native** - Cross-platform mobile UI
- **Expo** - Development platform & build system
- **Expo Router** - File-based routing

### Styling & UI
- **NativeWind** - Tailwind CSS for React Native
- **TailwindCSS v4** - Utility-first CSS framework
- **Lucide Icons** - Beautiful icon library

### State Management
- **Zustand** - Global client state (lightweight alternative to Redux)
- **TanStack Query** - Server state & data fetching
- **React Hook Form** - Form state management

### Authentication
- **Clerk** - Authentication & user management

### Networking
- **Axios** - HTTP client with interceptors

### Validation
- **Zod** - TypeScript-first schema validation

### Animations
- **React Native Reanimated** - High-performance animations
- **Lottie** - Complex animations from JSON

### Data & Performance
- **FlashList** - High-performance list rendering
- **Expo Secure Store** - Secure credential storage
- **date-fns** - Date utilities

---

## Development Workflow

### 1. Code Quality Standards

Ensure all code meets quality standards:

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Formatting
npm run format
```

### 2. Feature Development

Follow the feature-first organization:

1. Create feature folder: `src/features/feature-name/`
2. Implement components, hooks, services, store, types
3. Add route in `src/app/`
4. Update documentation in `docs/`

### 3. Commit Workflow

```bash
# Make changes
npm run format  # Auto-format code
npm run lint -- --fix  # Fix lint errors
npm run type-check  # Verify TypeScript

# Commit
git add .
git commit -m "feat: describe your changes"
git push
```

---

## API Integration

### Setting Up API Client

All API calls use the Axios client with built-in auth interceptors:

```typescript
// src/services/organizationService.ts
import apiClient from '@/lib/axios';

export const organizationService = {
  async getOrganizations() {
    const { data } = await apiClient.get('/organizations');
    return data;
  },
};
```

### Using with Queries

```typescript
import { useQuery } from '@tanstack/react-query';

export const Component = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['organizations'],
    queryFn: organizationService.getOrganizations,
  });

  // Handle loading, error, and render data
};
```

---

## Design System

### Colors
Centralized semantic colors in `src/constants/colors.ts`:
- Primary, Secondary, Success, Warning, Error, Info, Neutral

### Spacing
Consistent spacing scale in `src/constants/spacing.ts`:
- xs (4px) through 10xl (96px)

### Typography
Tailwind-based text styles with responsive modifiers

### Never Hardcode
- ❌ Colors: Use constants or Tailwind classes
- ❌ Spacing: Use Tailwind spacing utilities
- ❌ Font sizes: Use Tailwind text size utilities
- ✅ All design values from design tokens

---

## Authentication Flow

Clerk handles authentication:

```typescript
import { useAuth } from '@clerk/clerk-expo';

export const Component = () => {
  const { isSignedIn, user } = useAuth();

  if (!isSignedIn) {
    return <LoginScreen />;
  }

  return <AppScreen user={user} />;
};
```

---

## State Management

### Global Client State (Zustand)
```typescript
// Store
export const useAppStore = create((set) => ({
  selectedOrgId: null,
  setSelectedOrgId: (id) => set({ selectedOrgId: id }),
}));

// Usage
const { selectedOrgId } = useAppStore();
```

### Server State (TanStack Query)
```typescript
const { data: orgs } = useQuery({
  queryKey: ['organizations'],
  queryFn: getOrganizations,
});
```

### Form State (React Hook Form)
```typescript
const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});
```

---

## Documentation

Essential reading (in order):

1. **[SETUP.md](./SETUP.md)** - Project setup guide
2. **[DEVELOPMENT_GUIDELINES.md](./DEVELOPMENT_GUIDELINES.md)** - Code standards
3. **[VERIFICATION_CHECKLIST.md](./VERIFICATION_CHECKLIST.md)** - Setup verification
4. **[docs/PROJECT_PRINCIPLES.md](./docs/PROJECT_PRINCIPLES.md)** - Project mission & principles
5. **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Technical architecture
6. **[docs/DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md)** - Design tokens & styling
7. **[docs/NAVIGATION.md](./docs/NAVIGATION.md)** - Navigation flows
8. **[docs/USER_EXPERIENCE.md](./docs/USER_EXPERIENCE.md)** - UX guidelines

---

## Available Scripts

```bash
# Development
npm run start           # Start Expo dev server
npm run ios           # Run on iOS simulator
npm run android       # Run on Android emulator
npm run web           # Run on web browser

# Code Quality
npm run type-check    # TypeScript checking
npm run lint          # ESLint checking
npm run lint -- --fix # Auto-fix ESLint issues
npm run format        # Format with Prettier
npm run format:check  # Check formatting

# Maintenance
npm run reset-project # Reset to initial state
```

---

## Troubleshooting

### NativeWind Classes Not Working
- Restart dev server: `npm run start`
- Clear cache: `npm run start -- --clear`
- Check `babel.config.js` has NativeWind plugin

### TypeScript Errors
- Run `npm run type-check` to see all errors
- Check type definitions in `src/types/`
- Ensure proper types on function parameters

### ESLint Errors
- Run `npm run lint -- --fix` to auto-fix many issues
- Review `.eslintrc.json` for configurations
- Check for `any` types that should be properly typed

### Clerk Authentication Issues
- Verify `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` in `.env.local`
- Check Clerk dashboard for configuration
- Ensure token cache in `AuthProvider` works correctly

---

## Contributing

1. Read all documentation in `docs/`
2. Follow [DEVELOPMENT_GUIDELINES.md](./DEVELOPMENT_GUIDELINES.md)
3. Ensure code passes quality checks
4. Write descriptive commit messages
5. Update relevant documentation

---

## Project Status

### ✅ Completed
- Project initialization with Expo & React Native
- Folder structure and file organization
- Configuration files (TypeScript, ESLint, Prettier, Tailwind)
- Provider setup (Auth, Query, Theme, Gesture, SafeArea)
- Routing structure with route groups
- State management (Zustand stores)
- API client (Axios with interceptors)
- Design system (colors, spacing, tokens)
- Documentation and guidelines

### 🚀 Next Phase
- Feature development (authentication, organizations, elections, voting)
- UI component library
- Advanced features (real-time updates, offline support, etc.)
- Testing and optimization
- Production build and deployment

---

## Contact & Support

- 📖 See [SETUP.md](./SETUP.md) for detailed setup instructions
- 📋 Check [VERIFICATION_CHECKLIST.md](./VERIFICATION_CHECKLIST.md) to verify setup
- 💡 Read [DEVELOPMENT_GUIDELINES.md](./DEVELOPMENT_GUIDELINES.md) for coding standards
- 📚 Review documentation in `docs/` folder for architecture and design
- 🐛 Report issues in the project repository

---

**VotiQra** - Building trust in digital elections

*Last Updated: 2026-07-10*
