// ---------------------------------------------------------------------------
// app/(tabs)/index.tsx  —  HOME / dashboard ("/")
//
// A quick read-out of recent activity. It derives a couple of numbers from the
// sample data to show how you compute UI values from raw data.
// ---------------------------------------------------------------------------
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Card from "@/components/Card";
import SectionHeader from "@/components/SectionHeader";
import Pill from "@/components/Pill";
import { colors, font, spacing } from "@/constants/theme";
import { matches, workouts, meals } from "@/data/sampleData";

export default function HomeScreen() {
  // Derive some summary numbers (this runs every render — cheap for small data).
  const wins = matches.filter((m) => m.result === "win").length;
  const winRate = Math.round((wins / matches.length) * 100);
  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const nextWorkout = workouts[0];
  const lastMatch = matches[0];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>Hey Connor 👋</Text>
      <Text style={styles.sub}>Here's your tennis snapshot.</Text>

      {/* Three small stat tiles in a row */}
      <View style={styles.row}>
        <Card style={styles.tile}>
          <Text style={styles.tileValue}>{winRate}%</Text>
          <Text style={styles.tileLabel}>Win rate</Text>
        </Card>
        <Card style={styles.tile}>
          <Text style={styles.tileValue}>{matches.length}</Text>
          <Text style={styles.tileLabel}>Matches</Text>
        </Card>
        <Card style={styles.tile}>
          <Text style={styles.tileValue}>{totalCalories}</Text>
          <Text style={styles.tileLabel}>Cals planned</Text>
        </Card>
      </View>

      <SectionHeader>Last match</SectionHeader>
      <Link href={`/match/${lastMatch.id}`} asChild>
        <Pressable>
          <Card>
            <View style={styles.cardTop}>
              <Text style={styles.cardTitle}>vs {lastMatch.opponent}</Text>
              <Pill
                label={lastMatch.result}
                color={lastMatch.result === "win" ? colors.win : colors.loss}
              />
            </View>
            <Text style={styles.cardMeta}>
              {lastMatch.sets.map((s) => `${s.player}-${s.opponent}`).join("  ")}
              {"   ·   "}
              {lastMatch.surface}
            </Text>
            <Text style={styles.link}>View stats →</Text>
          </Card>
        </Pressable>
      </Link>

      <SectionHeader>Next workout</SectionHeader>
      <Card>
        <Text style={styles.cardTitle}>{nextWorkout.title}</Text>
        <Text style={styles.cardMeta}>
          {nextWorkout.focus} · {nextWorkout.durationMin} min ·{" "}
          {nextWorkout.exercises.length} exercises
        </Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  greeting: { color: colors.text, fontSize: font.size.xl, fontWeight: font.weight.bold },
  sub: { color: colors.textMuted, fontSize: font.size.md, marginTop: spacing.xs },
  row: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.lg },
  tile: { flex: 1, alignItems: "center", paddingVertical: spacing.md },
  tileValue: { color: colors.primary, fontSize: font.size.lg, fontWeight: font.weight.bold },
  tileLabel: { color: colors.textMuted, fontSize: font.size.sm, marginTop: spacing.xs },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardTitle: { color: colors.text, fontSize: font.size.lg, fontWeight: font.weight.medium },
  cardMeta: { color: colors.textMuted, fontSize: font.size.md, marginTop: spacing.xs },
  link: { color: colors.primary, fontSize: font.size.md, marginTop: spacing.sm },
});
