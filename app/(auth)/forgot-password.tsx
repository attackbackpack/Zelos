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
    paddingVertical: spacing.sm + spacing.xs,
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
    paddingVertical: spacing.sm + spacing.xs,
    alignItems: "center",
  },
  secondaryBtnText: {
    color: colors.primary,
    fontSize: font.size.md,
    fontWeight: font.weight.medium,
  },
});
