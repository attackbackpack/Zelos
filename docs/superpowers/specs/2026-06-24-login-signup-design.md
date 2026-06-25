# Login & Sign Up Screens — Design Spec
_Date: 2026-06-24_

## Overview

Add a login and sign-up screen pair that gates access to the app. Both screens are purely visual ("for show") — no real authentication logic. Pressing Log In or Sign Up on either screen bypasses auth and drops the user into the existing tab navigator.

---

## Architecture

### Auth Context (`context/auth.tsx`)

A minimal React Context that holds:
- `isLoggedIn: boolean` — defaults to `false`
- `login: () => void` — sets `isLoggedIn` to `true`

This context wraps the entire app so any screen can read or update auth state.

### Root Layout (`app/_layout.tsx`)

Reads `isLoggedIn` from the auth context. Uses expo-router's `<Redirect>` to send unauthenticated users to `/(auth)/login`. Authenticated users proceed to `/(tabs)` as normal. Registers the new `(auth)` route group in the Stack navigator with `headerShown: false`.

### Route Groups

```
app/
  _layout.tsx          ← updated: adds auth redirect + (auth) stack entry
  (auth)/
    _layout.tsx        ← new: hides stack header for full-bleed screens
    login.tsx          ← new: login screen
    signup.tsx         ← new: sign up screen
  (tabs)/              ← unchanged
    _layout.tsx
    index.tsx
    matches.tsx
    meals.tsx
    workouts.tsx
  match/
    [id].tsx           ← unchanged
context/
  auth.tsx             ← new: AuthContext + AuthProvider
```

---

## Screens

### Login Screen (`app/(auth)/login.tsx`)

Top to bottom:

1. **App name** — "Zelos" in `font.size.xl`, `font.weight.bold`, color `colors.primary` (`#C6FF00`)
2. **Tagline** — "Your athletic edge." in `font.size.md`, color `colors.textMuted`
3. **Email input** — pill-shaped `TextInput`, `keyboardType="email-address"`, placeholder "Email"
4. **Password input** — pill-shaped `TextInput`, `secureTextEntry` toggle with eye icon from `@expo/vector-icons` (Ionicons), placeholder "Password"
5. **Log In button** — full-width, filled `colors.primary` background, dark label text. Calls `login()` on press → navigates to `/(tabs)`.
6. **Sign Up button** — full-width, outlined (`colors.primary` border, transparent fill, `colors.primary` text). Navigates to `/(auth)/signup`.
7. **Divider** — thin rule (`colors.border`) with "or continue with" centered in `colors.textMuted`
8. **Social buttons** — three outlined buttons, stacked vertically, each with an icon on the left:
   - "Continue with Google" — `Ionicons` logo-google icon
   - "Continue with Apple" — `Ionicons` logo-apple icon
   - "Continue with Microsoft" — `Ionicons` logo-windows icon
   - All three are visual only; `onPress` is a no-op.

**Layout:** `ScrollView` with `contentContainerStyle` centered vertically. Padding `spacing.lg` on sides.

---

### Sign Up Screen (`app/(auth)/signup.tsx`)

Same visual skeleton as Login. Differences:

1. **Tagline** — "Create your account."
2. **Inputs** — three fields: Name, Email, Password (with show/hide toggle)
3. **Sign Up button** — filled `colors.primary`, calls `login()` → navigates to `/(tabs)`
4. **Back to Login button** — outlined, label "Already have an account? Log In", navigates back to `/(auth)/login`
5. **Divider + Social buttons** — identical to login screen

---

## Shared Input Style

Both screens use the same input component appearance:
- Background: `colors.surface`
- Border: `colors.border`, `radius.md`
- Text color: `colors.text`
- Placeholder color: `colors.textMuted`
- Padding: `spacing.sm` vertical, `spacing.md` horizontal
- Font size: `font.size.md`

---

## What Is Out of Scope

- No form validation
- No API calls or network requests
- No persistent auth state (refreshing the app resets to login)
- Social buttons do nothing on press
- No "Forgot password" flow
