// ---------------------------------------------------------------------------
// app/_layout.tsx  —  the ROOT layout
//
// expo-router turns files in the app/ folder into screens, the same way
// Next.js turns files in pages/ into routes. A "_layout" file wraps everything
// beside and below it. This root layout wraps the WHOLE app.
//
// <Stack> = a stack of screens you push/pop (like a deck of cards). The tabs
// live inside it as one entry, and the match-detail screen pushes on top.
// ---------------------------------------------------------------------------
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";

export default function RootLayout() {
  return (
    // SafeAreaProvider keeps content out from under notches & the home bar.
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        {/* The tab group renders its own header, so hide the stack's. */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="match/[id]" options={{ title: "Match Detail" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
