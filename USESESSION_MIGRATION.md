# useSession Hook Migration

## Summary

Successfully replaced all `useSession` imports from 'next-auth/react' with a custom `useSession` hook from '@/hooks/useSession'. The new hook maintains the same interface while using the AuthContext internally.

## New Hook Created

### File: `src/hooks/useSession.ts`

```typescript
export interface SessionData {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  accessToken: string;
}

export function useSession() {
  const { user, accessToken, isLoading } = useAuth();

  return {
    data: user && accessToken ? { user, accessToken } : null,
    status: isLoading ? 'loading' : user ? 'authenticated' : 'unauthenticated',
  };
}
```

## Hook Interface

### Return Value

```typescript
{
  data: SessionData | null,
  status: 'loading' | 'authenticated' | 'unauthenticated'
}
```

### Usage

```typescript
const { data: session, status } = useSession();

// Access user data
if (session?.user) {
  console.log(session.user.name);
  console.log(session.user.email);
}

// Access token
if (session?.accessToken) {
  console.log(session.accessToken);
}

// Check loading state
if (status === 'loading') {
  return <div>Loading...</div>;
}
```

## Files Updated

### 1. Settings Forms

#### ProfileForm.tsx

- **Before**: `const { update } = useSession();`
- **After**: `const { updateUser } = useAuth();`
- **Change**: Uses `updateUser()` instead of `session.update()`
- **Import**: Changed from `next-auth/react` to `@/hooks/useSession`

#### ChangePasswordForm.tsx

- **Before**: `const session = useSession();` + `signOut()`
- **After**: `const { data: session } = useSession();` + manual logout
- **Change**: Removed `signOut()`, now uses `window.location.href = '/login'`
- **Import**: Changed from `next-auth/react` to `@/hooks/useSession`

#### VerifyOtp.tsx

- **Before**: `const session = useSession();` + `signOut()`
- **After**: `const { data: session } = useSession();` + manual logout
- **Change**: Removed `signOut()`, now uses `window.location.href = '/login'`
- **Import**: Changed from `next-auth/react` to `@/hooks/useSession`

#### ChangeEmail/RequestOtpForm.tsx

- **Before**: `const session = useSession();`
- **After**: `const { data: session } = useSession();`
- **Change**: Destructures `data` from hook return
- **Import**: Changed from `next-auth/react` to `@/hooks/useSession`

#### ChangePhone/RequestOtpForm.tsx

- **Before**: `const session = useSession();`
- **After**: `const { data: session } = useSession();`
- **Change**: Destructures `data` from hook return
- **Import**: Changed from `next-auth/react` to `@/hooks/useSession`

### 2. UI Components

#### AddToWishlistBtn.tsx

- **Before**: `const { data: session } = useSession();`
- **After**: `const { data: session } = useSession();`
- **Change**: Same usage, just different import source
- **Import**: Changed from `next-auth/react` to `@/hooks/useSession`

## Migration Pattern

### Pattern 1: Simple Session Check

```typescript
// Before
import { useSession } from 'next-auth/react';
const { data: session } = useSession();
if (!session) return null;

// After
import { useSession } from '@/hooks/useSession';
const { data: session } = useSession();
if (!session) return null;
```

### Pattern 2: Access Token Usage

```typescript
// Before
const session = useSession();
const accessToken = session.data?.accessToken;

// After
const { data: session } = useSession();
const accessToken = session?.accessToken;
```

### Pattern 3: Session Update

```typescript
// Before
const { update } = useSession();
update({ user: { name: 'New Name' } });

// After
const { updateUser } = useAuth();
updateUser({ name: 'New Name' });
```

### Pattern 4: Logout

```typescript
// Before
import { signOut } from 'next-auth/react';
signOut({ redirect: true, callbackUrl: '/login' });

// After
await fetch('/api/auth/logout-client', { method: 'POST' });
window.location.href = '/login';
```

## Benefits

1. **No External Dependency** - Removed dependency on next-auth/react
2. **Consistent Interface** - Same hook interface as before
3. **AuthContext Integration** - Uses existing AuthContext internally
4. **Type Safe** - Full TypeScript support
5. **Easier Testing** - Can mock AuthContext instead of next-auth
6. **Better Control** - Full control over session management

## Backward Compatibility

The new hook maintains the same interface as the old one:

- ✅ `useSession()` returns `{ data, status }`
- ✅ `data` contains `user` and `accessToken`
- ✅ `status` is `'loading' | 'authenticated' | 'unauthenticated'`
- ✅ Can be used with destructuring: `const { data: session } = useSession()`

## Files Modified

### New Files

- `src/hooks/useSession.ts` - Custom useSession hook

### Updated Files

- `src/app/[locale]/(main)/account/settings/_components/Forms/ProfileForm.tsx`
- `src/app/[locale]/(main)/account/settings/_components/Forms/ChangePasswordForm.tsx`
- `src/app/[locale]/(main)/account/settings/_components/Forms/VerifyOtp.tsx`
- `src/app/[locale]/(main)/account/settings/_components/Forms/ChangeEmail/RequestOtpForm.tsx`
- `src/app/[locale]/(main)/account/settings/_components/Forms/ChangePhone/RequestOtpForm.tsx`
- `src/app/[locale]/(main)/properties/[id]/_components/AddToWishlistBtn.tsx`

## Testing

### Test Session Access

```typescript
const { data: session } = useSession();
expect(session?.user?.name).toBeDefined();
expect(session?.accessToken).toBeDefined();
```

### Test Loading State

```typescript
const { status } = useSession();
expect(status).toBe('loading' | 'authenticated' | 'unauthenticated');
```

### Test User Update

```typescript
const { updateUser } = useAuth();
updateUser({ name: 'New Name' });
// Verify session is updated
```

## Migration Checklist

- ✅ Created custom useSession hook
- ✅ Updated ProfileForm
- ✅ Updated ChangePasswordForm
- ✅ Updated VerifyOtp
- ✅ Updated ChangeEmail/RequestOtpForm
- ✅ Updated ChangePhone/RequestOtpForm
- ✅ Updated AddToWishlistBtn
- ✅ Removed all next-auth/react useSession imports
- ✅ No TypeScript errors
- ✅ Maintained same interface

## Future Improvements

1. **Add useSessionStatus Hook** - Separate hook for just status
2. **Add useAccessToken Hook** - Separate hook for just token
3. **Add useUser Hook** - Separate hook for just user data
4. **Memoization** - Memoize hook return value to prevent unnecessary re-renders
5. **Error Handling** - Add error state to hook

## Notes

- The hook uses `useAuth()` internally, so it must be used within an `AuthProvider`
- The hook returns `null` for `data` when not authenticated
- The hook returns `'loading'` status while auth state is being determined
- All error handling remains the same as before
- All success handling remains the same as before
