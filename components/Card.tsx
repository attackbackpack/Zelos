// A reusable "card" box. In web terms this is <div class="card">...</div>.
// `children` is whatever you nest inside <Card> ... </Card>.
import { View, StyleSheet, ViewProps } from "react-native";
import { colors, radius, spacing } from "@/constants/theme";

export default function Card({ style, children, ...rest }: ViewProps) {
  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
