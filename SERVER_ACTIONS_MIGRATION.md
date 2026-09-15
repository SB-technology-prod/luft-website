# Server Actions Migration for Login & Signup

## Summary

Converted `login` and `setRegisteredUserPassword` functions to Server Actions while maintaining the exact same response format and error handling.

## Changes Made

### 1. Created Server Actions File

**File**: `src/app/[locale]/(auth)/actions.ts`

Two new Server Actions:

- `loginAction(credentials: LoginFormData)` - Handles login with cookie setting
- `setRegisteredUserPasswordAction(passwordData: SetRegisteredUserPasswordFormData)` - Handles password setup with cookie setting

**Key Features**:

- Both actions call the same backend API endpoints
- Both set session cookies directly on the server
- Both return the exact same response format as the original functions
- Both throw errors the same way for consistent error handling

### 2. Updated LoginForm Component

**File**: `src/app/[locale]/(auth)/login/_components/LoginForm.tsx`

Changes:

- Removed: `import { signIn } from 'next-auth/react'`
- Removed: `import { login } from '@/api/auth'`
- Added: `import { loginAction } from '../../actions'`
- Changed: `mutationFn: login` → `mutationFn: loginAction`
- Changed: `onSuccess` handler to use `window.location.href = '/'` instead of `signIn()`
- No changes to error handling or form validation

### 3. Updated SetRegisteredUserPassword Component

**File**: `src/app/[locale]/(auth)/signup/_components/SetRegisteredUserPassword.tsx`

Changes:

- Removed: `import { signIn } from 'next-auth/react'`
- Removed: `import { setRegisteredUserPassword } from '@/api/auth'`
- Added: `import { setRegisteredUserPasswordAction } from '../../actions'`
- Changed: `onSubmit` to call `setRegisteredUserPasswordAction` instead of `setRegisteredUserPassword`
- Changed: `onSubmissionSuccess` handler to use `window.location.href = '/'` instead of `signIn()`
- No changes to error handling

## How It Works

### Server Action Flow

1. User submits form with credentials
2. Client calls Server Action via `useMutation`
3. Server Action:
   - Calls backend API with credentials
   - Receives response with user data and tokens
   - Sets HTTP-only cookies on the server
   - Returns the same response format
4. Client receives response
5. `onSuccess` handler redirects to home page
6. Full page reload picks up the cookies

### Response Format

Both Server Actions return the exact same format as the original functions:

```typescript
{
  result: {
    userId: string;
    email: string;
    fullName: string;
    profilePicture?: string;
    accessToken: string;
    refreshToken: string;
  }
}
```

This ensures no changes needed to error/success handling in components.

## Benefits

1. **Server-Side Cookie Setting** - Cookies are set on the server, not via API routes
2. **Cleaner Code** - No need for separate API routes to set cookies
3. **Better Security** - Cookies set directly in server response
4. **Same Error Handling** - Errors thrown the same way, caught by mutation handler
5. **Same Success Handling** - Response format unchanged, only redirect method changed

## Error Handling

- Errors from backend API are caught and re-thrown
- `useMutation` catches errors and calls `onError` handler
- Error messages displayed the same way as before
- No changes to error handling logic

## Testing

### Login Flow

1. Navigate to `/login`
2. Enter valid credentials
3. Click "Login"
4. **Expected**: Redirected to home page with cookies set

### Signup Flow

1. Complete signup process
2. Verify OTP
3. Set password
4. **Expected**: Redirected to home page with cookies set

### Error Handling

1. Enter invalid credentials
2. Click "Login"
3. **Expected**: Error message displayed, no redirect

## Files Modified

- `src/app/[locale]/(auth)/actions.ts` - **NEW** Server Actions
- `src/app/[locale]/(auth)/login/_components/LoginForm.tsx` - Updated to use Server Action
- `src/app/[locale]/(auth)/signup/_components/SetRegisteredUserPassword.tsx` - Updated to use Server Action

## Files NOT Modified

- `src/api/auth.ts` - Original functions still available for other uses
- All error handling in components
- All form validation
- All UI components
- All other authentication flows

## Migration Notes

### Why Server Actions?

- Cookies can be set directly in the server response
- No need for separate API routes
- Cleaner separation of concerns
- Better performance (no extra API call)

### Why Keep Same Response Format?

- Ensures error/success handling doesn't need changes
- Maintains consistency with existing code
- Easier to test and debug
- Reduces risk of breaking changes

### Why window.location.href?

- Forces full page reload
- Ensures middleware sees cookies
- Guarantees consistent auth state
- Simple and reliable

## Future Improvements

If you want to avoid full page reloads:

1. Use `revalidatePath('/')` in Server Action
2. Use `useRouter().refresh()` in component
3. Update AuthContext manually

However, full page reload is recommended for auth flows to ensure consistency.
