// A labeled horizontal bar for showing a stat as a proportion.
// e.g. <StatBar label="1st serve %" value={64} max={100} suffix="%" />
import { View, Text, StyleSheet } from "react-native";
import { colors, font, radius, spacing } from "@/constants/theme";

type Props = {
  label: string;
  value: number;
  max?: number;
  suffix?: string;
  color?: string;
};

export default function StatBar({
  label,
  value,
  max = 100,
  suffix = "",
  color = colors.primary,
}: Props) {
  // clamp the fill between 0% and 100% so a weird value can't overflow the bar
  const pct = Math.max(0, Math.min(1, value / max));

  return (
    <View style={styles.wrap}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>
          {value}
          {suffix}
        </Text>
      </View>
      <View style={styles.track}>
        <View
          style={[styles.fill, { width: `${pct * 100}%`, backgroundColor: color }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.md },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  label: { color: colors.textMuted, fontSize: font.size.sm },
  value: { color: colors.text, fontSize: font.size.sm, fontWeight: font.weight.medium },
  track: {
    height: 8,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceAlt,
    overflow: "hidden",
  },
  fill: { height: "100%", borderRadius: radius.sm },
});
