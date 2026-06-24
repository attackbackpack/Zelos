// ---------------------------------------------------------------------------
// app/match/[id].tsx  —  MATCH DETAIL ("/match/m1", "/match/m2", ...)
//
// The square brackets in the filename make this a DYNAMIC route: whatever id is
// in the URL is handed to us via useLocalSearchParams(). This is the screen
// that shows the per-match stats — the heart of the app.
// ---------------------------------------------------------------------------
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import Card from "@/components/Card";
import StatBar from "@/components/StatBar";
import Pill from "@/components/Pill";
import SectionHeader from "@/components/SectionHeader";
import { colors, font, spacing } from "@/constants/theme";
import { matches } from "@/data/sampleData";

export default function MatchDetailScreen() {
  // Pull the id out of the URL, then find the matching record.
  const { id } = useLocalSearchParams<{ id: string }>();
  const match = matches.find((m) => m.id === id);

  // Always handle the "not found" case so the app can't crash on a bad id.
  if (!match) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Match not found.</Text>
      </View>
    );
  }

  const { stats } = match;
  const bpPct = stats.breakPointsTotal
    ? Math.round((stats.breakPointsWon / stats.breakPointsTotal) * 100)
    : 0;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Set this screen's header title dynamically to the opponent's name. */}
      <Stack.Screen options={{ title: match.opponent }} />

      <View style={styles.headerRow}>
        <Text style={styles.title}>vs {match.opponent}</Text>
        <Pill
          label={match.result}
          color={match.result === "win" ? colors.win : colors.loss}
        />
      </View>
      <Text style={styles.meta}>
        {match.surface} · {match.date}
      </Text>

      <SectionHeader>Score</SectionHeader>
      <Card style={styles.scoreRow}>
        {match.sets.map((s, i) => (
          <View key={i} style={styles.setBox}>
            <Text style={styles.setLabel}>Set {i + 1}</Text>
            <Text style={styles.setScore}>
              {s.player}-{s.opponent}
            </Text>
          </View>
        ))}
      </Card>

      <SectionHeader>Serving</SectionHeader>
      <Card>
        <StatBar label="1st serve in" value={stats.firstServePct} max={100} suffix="%" />
        <StatBar label="Aces" value={stats.aces} max={15} />
        <StatBar
          label="Double faults"
          value={stats.doubleFaults}
          max={15}
          color={colors.loss}
        />
      </Card>

      <SectionHeader>Rally</SectionHeader>
      <Card>
        <StatBar label="Winners" value={stats.winners} max={40} color={colors.win} />
        <StatBar
          label="Unforced errors"
          value={stats.unforcedErrors}
          max={40}
          color={colors.loss}
        />
        <StatBar
          label={`Break points (${stats.breakPointsWon}/${stats.breakPointsTotal})`}
          value={bpPct}
          max={100}
          suffix="%"
        />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  notFound: { color: colors.textMuted, fontSize: font.size.md },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { color: colors.text, fontSize: font.size.xl, fontWeight: font.weight.bold },
  meta: {
    color: colors.textMuted,
    fontSize: font.size.md,
    marginTop: spacing.xs,
    textTransform: "capitalize",
  },
  scoreRow: { flexDirection: "row", gap: spacing.md },
  setBox: { alignItems: "center" },
  setLabel: { color: colors.textMuted, fontSize: font.size.sm },
  setScore: {
    color: colors.text,
    fontSize: font.size.lg,
    fontWeight: font.weight.bold,
    marginTop: spacing.xs,
  },
});
