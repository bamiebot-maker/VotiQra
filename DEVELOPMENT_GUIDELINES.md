# VotiQra Development Guidelines

## Code Quality Standards

All code in VotiQra must meet these standards:

### TypeScript
- Strict mode enabled (`strict: true`)
- No `any` types (use `unknown` if needed, with proper type guards)
- Explicit return types on functions
- Proper type definitions for all variables
- No implicit `any` from parameters or variables

### Component Structure
```tsx
// 1. Imports
import React from 'react';
import { View, Text } from 'react-native';
import type { ComponentProps } from '@/types';

// 2. Type definition
interface MyComponentProps {
  title: string;
  description?: string;
  onPress?: () => void;
}

// 3. Component
export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  description,
  onPress,
}) => {
  // Component logic
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};
```

### Styling Rules
- Use Tailwind classes via `className` prop
- Never hardcode colors (use design tokens from `src/constants/colors.ts`)
- Never hardcode spacing (use design tokens from `src/constants/spacing.ts`)
- Use semantic color names: `primary`, `secondary`, `success`, `warning`, `error`
- Use responsive modifiers for different screen sizes

### State Management
- **Global client state** → Use Zustand (`src/store/`)
- **Server state** → Use TanStack Query (`@tanstack/react-query`)
- **Form state** → Use React Hook Form (`react-hook-form`)
- **Local component state** → Use React `useState`

### Example State Usage
```tsx
// Zustand for global state
import { useAppStore } from '@/store/app';

export const Component: React.FC = () => {
  const organizationId = useAppStore((state) => state.selectedOrganizationId);
  const setOrganizationId = useAppStore((state) => state.setSelectedOrganizationId);
  
  // ...
};

// TanStack Query for API data
import { useQuery } from '@tanstack/react-query';

export const Component: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['organizations'],
    queryFn: async () => {
      const { data } = await apiClient.get('/organizations');
      return data;
    },
  });
  
  // ...
};

// React Hook Form for forms
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

export const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  
  // ...
};
```

### Feature-First Organization

Each feature owns its code:

```
features/auth/
├── components/
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── index.ts
├── hooks/
│   ├── useAuth.ts
│   └── index.ts
├── services/
│   ├── authService.ts
│   └── index.ts
├── store/
│   ├── authStore.ts
│   └── index.ts
├── types/
│   ├── index.ts
│   └── auth.ts
└── README.md
```

### API Communication

All API calls go through the Axios client:

```typescript
// src/services/electionService.ts
import apiClient from '@/lib/axios';
import type { Election } from '@/types';

export const electionService = {
  async getElections(organizationId: string): Promise<Election[]> {
    try {
      const { data } = await apiClient.get(`/organizations/${organizationId}/elections`);
      return data;
    } catch (error) {
      console.error('Failed to fetch elections:', error);
      throw error;
    }
  },

  async createElection(organizationId: string, electionData: Partial<Election>): Promise<Election> {
    const { data } = await apiClient.post(`/organizations/${organizationId}/elections`, electionData);
    return data;
  },
};
```

### Error Handling

All features must handle:
- Loading state
- Error state
- Empty state
- Success state

```tsx
export const Component: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['elections'],
    queryFn: electionService.getElections,
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!data || data.length === 0) {
    return <EmptyState />;
  }

  return (
    <View>
      {data.map((election) => (
        <ElectionCard key={election.id} election={election} />
      ))}
    </View>
  );
};
```

### Accessibility

Every component must be accessible:
- [ ] Proper semantic structure
- [ ] Clear labels for inputs
- [ ] Sufficient color contrast
- [ ] Touch targets at least 48x48dp
- [ ] Keyboard navigation support

### Documentation

- Comment complex logic
- Document component props
- Include JSDoc for functions
- Update NAVIGATION.md when adding routes

```tsx
/**
 * ElectionCard displays a summary of an election
 * @param election - The election data to display
 * @param onPress - Callback when card is pressed
 */
interface ElectionCardProps {
  election: Election;
  onPress?: (id: string) => void;
}

export const ElectionCard: React.FC<ElectionCardProps> = ({
  election,
  onPress,
}) => {
  // ...
};
```

## Common Tasks

### Adding a New Route
1. Create folder: `src/app/(group)/route-name/`
2. Create `_layout.tsx` for group layouts
3. Create `index.tsx` for route screen
4. Update `docs/NAVIGATION.md`

### Adding a New Component
1. Create file: `src/components/ComponentName.tsx`
2. Define props interface
3. Add JSDoc comments
4. Export from `src/components/index.ts`

### Adding a New Hook
1. Create file: `src/hooks/useHookName.ts`
2. Document parameters and return type
3. Export from `src/hooks/index.ts`

### Adding a New Feature
1. Create folder: `src/features/feature-name/`
2. Create subdirectories: `components/`, `hooks/`, `services/`, `store/`, `types/`
3. Create `README.md` explaining the feature
4. Create `index.ts` for exports

### Making an API Call
1. Create service: `src/services/resourceService.ts`
2. Use `apiClient` for HTTP requests
3. Define types in `src/types/`
4. Use with `useQuery` or `useMutation`

### Styling a Component
1. Use Tailwind classes from `tailwind.config.ts`
2. Reference colors from `src/constants/colors.ts`
3. Reference spacing from `src/constants/spacing.ts`
4. Never hardcode design values

## Code Review Checklist

Before committing code, verify:

- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] Properly formatted (`npm run format`)
- [ ] No `any` types without justification
- [ ] All components accept proper prop types
- [ ] Components handle loading/error/empty states
- [ ] Accessibility considered
- [ ] No hardcoded colors or spacing
- [ ] No console.log statements in production code
- [ ] Tests included (when applicable)
- [ ] Documentation updated
- [ ] Commit message follows conventions

## Useful Commands

```bash
# Development
npm run start          # Start Expo dev server
npm run ios          # Run on iOS simulator
npm run android      # Run on Android emulator
npm run web          # Run on web

# Code Quality
npm run lint         # Check ESLint errors
npm run lint -- --fix # Fix ESLint errors automatically
npm run format       # Format code with Prettier
npm run type-check   # Check TypeScript errors

# Other
npm run reset-project # Reset to initial state
```

## Resources

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [Expo Router](https://expo.github.io/router)
- [React Hook Form](https://react-hook-form.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/)
- [NativeWind](https://www.nativewind.dev/)

## Support

For questions, refer to:
1. Project documentation in `docs/`
2. Feature README files
3. Code examples in existing components
4. Official library documentation
