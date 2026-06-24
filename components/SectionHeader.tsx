// A small heading used above lists/sections.
import { Text, StyleSheet } from "react-native";
import { colors, font, spacing } from "@/constants/theme";

export default function SectionHeader({ children }: { children: string }) {
  return <Text style={styles.header}>{children}</Text>;
}

const styles = StyleSheet.create({
  header: {
    color: colors.textMuted,
    fontSize: font.size.sm,
    fontWeight: font.weight.bold,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
});
