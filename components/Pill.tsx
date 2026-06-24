// A tiny rounded label ("pill"/"chip"), e.g. for surface type or win/loss.
import { Text, View, StyleSheet } from "react-native";
import { colors, font, radius, spacing } from "@/constants/theme";

export default function Pill({
  label,
  color = colors.primary,
}: {
  label: string;
  color?: string;
}) {
  return (
    <View style={[styles.pill, { borderColor: color }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: font.size.sm,
    fontWeight: font.weight.medium,
    textTransform: "capitalize",
  },
});
