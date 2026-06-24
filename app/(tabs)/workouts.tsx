// ---------------------------------------------------------------------------
// app/(tabs)/workouts.tsx  —  WORKOUTS list ("/workouts")
//
// A scrollable list of workout plans. Each card maps over its exercises to
// render rows — the same .map() you'd use to build a list in web React.
// ---------------------------------------------------------------------------
import { ScrollView, View, Text, StyleSheet } from "react-native";
import Card from "@/components/Card";
import Pill from "@/components/Pill";
import { colors, font, spacing } from "@/constants/theme";
import { workouts } from "@/data/sampleData";

export default function WorkoutsScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {workouts.map((w) => (
        <Card key={w.id} style={styles.card}>
          <View style={styles.top}>
            <Text style={styles.title}>{w.title}</Text>
            <Pill label={`${w.durationMin} min`} />
          </View>
          <Text style={styles.focus}>{w.focus}</Text>

          {w.exercises.map((ex, i) => (
            <View key={i} style={styles.exRow}>
              <Text style={styles.exName}>{ex.name}</Text>
              <Text style={styles.exDose}>
                {ex.sets} × {ex.reps}
              </Text>
            </View>
          ))}
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, gap: spacing.sm },
  card: {},
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { color: colors.text, fontSize: font.size.lg, fontWeight: font.weight.medium },
  focus: { color: colors.primary, fontSize: font.size.sm, marginTop: 2, marginBottom: spacing.sm },
  exRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  exName: { color: colors.text, fontSize: font.size.md },
  exDose: { color: colors.textMuted, fontSize: font.size.md },
});
