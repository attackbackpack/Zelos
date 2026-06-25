# Login / Sign Up / Forgot Password Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a login, sign-up, and forgot-password screen that gates the app on launch, bypassable without real credentials.

**Architecture:** An `AuthProvider` wraps the whole app and holds a single `isLoggedIn` boolean. The root layout's `RootStack` component reads that state and uses `useEffect` + `router.replace` to redirect unauthenticated users to `/(auth)/login` and authenticated users away from auth screens. Pressing Log In or Sign Up simply calls `login()`, flipping the boolean and triggering the redirect to `/(tabs)`.

**Tech Stack:** Expo Router (file-based routing), React Context, React Native `StyleSheet`, `@expo/vector-icons` (Ionicons — already installed).

> **Note:** This project has no automated test framework. Each task's verification step is a manual run-and-check using `npx expo start`.

## Global Constraints

- All colors from `colors` in `@/constants/theme` — never hardcode hex values
- All spacing from `spacing` in `@/constants/theme`
- All border radii from `radius` in `@/constants/theme`
- All font sizes/weights from `font` in `@/constants/theme`
- Icons: `Ionicons` from `@expo/vector-icons` only
- Navigation: `expo-router` only (`useRouter`, `useSegments`, `Stack`)
- No form validation, no API calls, no persistent auth state

---

## File Map

```
context/
  auth.tsx                       ← NEW: AuthContext, AuthProvider, useAuth

app/
  _layout.tsx                    ← MODIFY: wrap with AuthProvider, add auth redirect, register (auth) route
  (auth)/
    _layout.tsx                  ← NEW: Stack with headerShown: false
    login.tsx                    ← NEW: login screen
    signup.tsx                   ← NEW: sign up screen
    forgot-password.tsx          ← NEW: forgot password screen

components/
  AuthInput.tsx                  ← NEW: shared pill-style text input with optional password toggle
```

---

### Task 1: Auth Context

**Files:**
- Create: `context/auth.tsx`

**Interfaces:**
- Produces:
  - `AuthProvider: ({ children: ReactNode }) => JSX.Element` — wraps the app
  - `useAuth: () => { isLoggedIn: boolean; login: () => void }` — consumed by root layout and screens

- [ ] **Step 1: Create `context/auth.tsx`**

```tsx
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <AuthContext.Provider value={{ isLoggedIn, login: () => setIsLoggedIn(true) }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add context/auth.tsx
git commit -m "feat: add AuthContext with isLoggedIn state and login()"
```

---

### Task 2: Root Layout + Auth Group Layout

**Files:**
- Modify: `app/_layout.tsx`
- Create: `app/(auth)/_layout.tsx`

**Interfaces:**
- Consumes: `AuthProvider`, `useAuth` from `@/context/auth`
- Produces: App redirects unauthenticated users to `/(auth)/login` on launch

- [ ] **Step 1: Update `app/_layout.tsx`**

Replace the entire file with:

```tsx
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import { colors } from "@/constants/theme";
import { AuthProvider, useAuth } from "@/context/auth";

function RootStack() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    if (!isLoggedIn && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (isLoggedIn && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [isLoggedIn, segments]);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="match/[id]" options={{ title: "Match Detail" }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <AuthProvider>
        <RootStack />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
```

- [ ] **Step 2: Create `app/(auth)/_layout.tsx`**

```tsx
import { Stack } from "expo-router";

export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add app/_layout.tsx app/(auth)/_layout.tsx
git commit -m "feat: add auth redirect in root layout and (auth) group layout"
```

---

### Task 3: Shared AuthInput Component

**Files:**
- Create: `components/AuthInput.tsx`

**Interfaces:**
- Produces:
  ```tsx
  type AuthInputProps = {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    keyboardType?: "default" | "email-address";
    isPassword?: boolean;
  };
  export default function AuthInput(props: AuthInputProps): JSX.Element
  ```

- [ ] **Step 1: Create `components/AuthInput.tsx`**

```tsx
import { useState } from "react";
import { TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, font, spacing, radius } from "@/constants/theme";

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "email-address";
  isPassword?: boolean;
};

export default function AuthInput({
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  isPassword = false,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={isPassword && !showPassword}
        autoCapitalize="none"
      />
      {isPassword && (
        <TouchableOpacity
          onPress={() => setShowPassword((prev) => !prev)}
          style={styles.eye}
        >
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={20}
            color={colors.textMuted}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: font.size.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  eye: {
    paddingHorizontal: spacing.sm,
  },
});
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/AuthInput.tsx
git commit -m "feat: add shared AuthInput component with password show/hide toggle"
```

---

### Task 4: Login Screen

**Files:**
- Create: `app/(auth)/login.tsx`

**Interfaces:**
- Consumes:
  - `useAuth(): { login: () => void }` from `@/context/auth`
  - `AuthInput` from `@/components/AuthInput`
  - `useRouter()` from `expo-router`
- Produces: Visible login screen; pressing Log In calls `login()` and redirects to tabs

- [ ] **Step 1: Create `app/(auth)/login.tsx`**

```tsx
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import AuthInput from "@/components/AuthInput";
import { useAuth } from "@/context/auth";
import { colors, font, spacing, radius } from "@/constants/theme";

const SOCIAL_PROVIDERS = [
  { label: "Continue with Google", icon: "logo-google" as const },
  { label: "Continue with Apple", icon: "logo-apple" as const },
  { label: "Continue with Microsoft", icon: "logo-windows" as const },
];

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.appName}>Zelos</Text>
      <Text style={styles.tagline}>Your athletic edge.</Text>

      <View style={styles.form}>
        <AuthInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <AuthInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          isPassword
        />
        <TouchableOpacity
          onPress={() => router.push("/(auth)/forgot-password")}
          style={styles.forgotWrapper}
        >
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.primaryBtn} onPress={login}>
        <Text style={styles.primaryBtnText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => router.push("/(auth)/signup")}
      >
        <Text style={styles.secondaryBtnText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or continue with</Text>
        <View style={styles.dividerLine} />
      </View>

      {SOCIAL_PROVIDERS.map((p) => (
        <TouchableOpacity key={p.label} style={styles.socialBtn}>
          <Ionicons name={p.icon} size={20} color={colors.text} />
          <Text style={styles.socialBtnText}>{p.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  appName: {
    color: colors.primary,
    fontSize: font.size.xl,
    fontWeight: font.weight.bold,
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  tagline: {
    color: colors.textMuted,
    fontSize: font.size.md,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  form: { marginBottom: spacing.md },
  forgotWrapper: { alignItems: "flex-end", marginTop: spacing.xs },
  forgotText: { color: colors.primary, fontSize: font.size.sm },
  primaryBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.sm + 4,
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  primaryBtnText: {
    color: colors.background,
    fontSize: font.size.md,
    fontWeight: font.weight.bold,
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.sm + 4,
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  secondaryBtnText: {
    color: colors.primary,
    fontSize: font.size.md,
    fontWeight: font.weight.medium,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: {
    color: colors.textMuted,
    fontSize: font.size.sm,
    marginHorizontal: spacing.sm,
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  socialBtnText: {
    color: colors.text,
    fontSize: font.size.md,
    marginLeft: spacing.sm,
  },
});
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Start the app and manually verify**

Run: `npx expo start` then open on simulator or device.

Checklist:
- [ ] App opens directly to the login screen (not the tabs)
- [ ] "Zelos" title is visible in `#C6FF00` yellow-green
- [ ] Email and Password inputs are visible
- [ ] "Forgot password?" link is right-aligned
- [ ] "Log In" button (filled) and "Sign Up" button (outlined) are visible
- [ ] "or continue with" divider and three social buttons are visible
- [ ] Tapping "Log In" with empty fields navigates into the tab bar (home screen)
- [ ] Password field hides text by default; eye icon toggles visibility

- [ ] **Step 4: Commit**

```bash
git add app/(auth)/login.tsx
git commit -m "feat: add login screen with bypass and social login placeholders"
```

---

### Task 5: Sign Up Screen

**Files:**
- Create: `app/(auth)/signup.tsx`

**Interfaces:**
- Consumes:
  - `useAuth(): { login: () => void }` from `@/context/auth`
  - `AuthInput` from `@/components/AuthInput`
  - `useRouter()` from `expo-router`
- Produces: Sign up screen reachable from login; pressing Sign Up bypasses into tabs

- [ ] **Step 1: Create `app/(auth)/signup.tsx`**

```tsx
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import AuthInput from "@/components/AuthInput";
import { useAuth } from "@/context/auth";
import { colors, font, spacing, radius } from "@/constants/theme";

const SOCIAL_PROVIDERS = [
  { label: "Continue with Google", icon: "logo-google" as const },
  { label: "Continue with Apple", icon: "logo-apple" as const },
  { label: "Continue with Microsoft", icon: "logo-windows" as const },
];

export default function SignUpScreen() {
  const { login } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.appName}>Zelos</Text>
      <Text style={styles.tagline}>Create your account.</Text>

      <View style={styles.form}>
        <AuthInput placeholder="Name" value={name} onChangeText={setName} />
        <AuthInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <AuthInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          isPassword
        />
      </View>

      <TouchableOpacity style={styles.primaryBtn} onPress={login}>
        <Text style={styles.primaryBtnText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.back()}>
        <Text style={styles.secondaryBtnText}>Already have an account? Log In</Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or continue with</Text>
        <View style={styles.dividerLine} />
      </View>

      {SOCIAL_PROVIDERS.map((p) => (
        <TouchableOpacity key={p.label} style={styles.socialBtn}>
          <Ionicons name={p.icon} size={20} color={colors.text} />
          <Text style={styles.socialBtnText}>{p.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  appName: {
    color: colors.primary,
    fontSize: font.size.xl,
    fontWeight: font.weight.bold,
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  tagline: {
    color: colors.textMuted,
    fontSize: font.size.md,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  form: { marginBottom: spacing.md },
  primaryBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.sm + 4,
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  primaryBtnText: {
    color: colors.background,
    fontSize: font.size.md,
    fontWeight: font.weight.bold,
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.sm + 4,
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  secondaryBtnText: {
    color: colors.primary,
    fontSize: font.size.md,
    fontWeight: font.weight.medium,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: {
    color: colors.textMuted,
    fontSize: font.size.sm,
    marginHorizontal: spacing.sm,
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  socialBtnText: {
    color: colors.text,
    fontSize: font.size.md,
    marginLeft: spacing.sm,
  },
});
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Manually verify**

With the app running:
- [ ] Tapping "Sign Up" on the login screen navigates to the sign-up screen
- [ ] "Create your account." tagline is visible
- [ ] Name, Email, Password inputs are all visible
- [ ] "Already have an account? Log In" navigates back to login
- [ ] Tapping "Sign Up" button navigates into the tab bar

- [ ] **Step 4: Commit**

```bash
git add app/(auth)/signup.tsx
git commit -m "feat: add sign up screen with bypass and social login placeholders"
```

---

### Task 6: Forgot Password Screen

**Files:**
- Create: `app/(auth)/forgot-password.tsx`

**Interfaces:**
- Consumes:
  - `AuthInput` from `@/components/AuthInput`
  - `useRouter()` from `expo-router`
- Produces: Forgot password screen reachable from login; "Send Reset Link" is a no-op

- [ ] **Step 1: Create `app/(auth)/forgot-password.tsx`**

```tsx
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import AuthInput from "@/components/AuthInput";
import { colors, font, spacing, radius } from "@/constants/theme";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.appName}>Zelos</Text>
      <Text style={styles.tagline}>Reset your password.</Text>

      <View style={styles.form}>
        <AuthInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <TouchableOpacity style={styles.primaryBtn} onPress={() => {}}>
        <Text style={styles.primaryBtnText}>Send Reset Link</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.back()}>
        <Text style={styles.secondaryBtnText}>Back to Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  appName: {
    color: colors.primary,
    fontSize: font.size.xl,
    fontWeight: font.weight.bold,
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  tagline: {
    color: colors.textMuted,
    fontSize: font.size.md,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  form: { marginBottom: spacing.md },
  primaryBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.sm + 4,
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  primaryBtnText: {
    color: colors.background,
    fontSize: font.size.md,
    fontWeight: font.weight.bold,
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.sm + 4,
    alignItems: "center",
  },
  secondaryBtnText: {
    color: colors.primary,
    fontSize: font.size.md,
    fontWeight: font.weight.medium,
  },
});
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Manually verify**

With the app running:
- [ ] Tapping "Forgot password?" on the login screen navigates to this screen
- [ ] "Reset your password." tagline is visible
- [ ] Single email input is visible
- [ ] "Send Reset Link" button does nothing when tapped
- [ ] "Back to Login" navigates back to the login screen
- [ ] No divider or social buttons are present

- [ ] **Step 4: Commit**

```bash
git add app/(auth)/forgot-password.tsx
git commit -m "feat: add forgot password screen (no-op send)"
```
