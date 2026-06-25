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
