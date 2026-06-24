// ---------------------------------------------------------------------------
// app/(tabs)/meals.tsx  —  MEALS list ("/meals")
//
// Lists planned meals and shows a daily macro total computed at the top. Good
// example of summarizing an array into a few numbers before rendering.
// ---------------------------------------------------------------------------
import { ScrollView, View, Text, StyleSheet } from "react-native";
import Card from "@/components/Card";
import Pill from "@/components/Pill";
import { colors, font, spacing } from "@/constants/theme";
import { meals } from "@/data/sampleData";

export default function MealsScreen() {
  // Add up every meal's macros into one totals object.
  const totals = meals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.calories,
      protein: acc.protein + m.protein,
      carbs: acc.carbs + m.carbs,
      fat: acc.fat + m.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Card style={styles.totals}>
        <Text style={styles.totalCals}>{totals.calories} kcal</Text>
        <Text style={styles.totalMacros}>
          {totals.protein}g protein · {totals.carbs}g carbs · {totals.fat}g fat
        </Text>
      </Card>

      {meals.map((m) => (
        <Card key={m.id} style={styles.card}>
          <View style={styles.top}>
            <Text style={styles.title}>{m.title}</Text>
            <Pill label={m.type} />
          </View>
          <Text style={styles.macros}>
            {m.calories} kcal · {m.protein}p / {m.carbs}c / {m.fat}f
          </Text>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, gap: spacing.sm },
  totals: { alignItems: "center", paddingVertical: spacing.lg, marginBottom: spacing.sm },
  totalCals: { color: colors.primary, fontSize: font.size.xl, fontWeight: font.weight.bold },
  totalMacros: { color: colors.textMuted, fontSize: font.size.md, marginTop: spacing.xs },
  card: {},
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { color: colors.text, fontSize: font.size.lg, fontWeight: font.weight.medium },
  macros: { color: colors.textMuted, fontSize: font.size.md, marginTop: spacing.xs },
});
