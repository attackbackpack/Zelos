// ---------------------------------------------------------------------------
// app/(tabs)/matches.tsx  —  MATCHES list ("/matches")
//
// Shows how to render a list with <FlatList> (the right tool for long scrolling
// lists — it only renders rows that are on screen) and how to navigate to a
// detail screen by tapping a row.
// ---------------------------------------------------------------------------
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Card from "@/components/Card";
import Pill from "@/components/Pill";
import { colors, font, spacing } from "@/constants/theme";
import { matches } from "@/data/sampleData";
import { Match } from "@/types";

export default function MatchesScreen() {
  const router = useRouter();

  // How to draw ONE row. FlatList calls this for each item.
  function renderItem({ item }: { item: Match }) {
    const score = item.sets.map((s) => `${s.player}-${s.opponent}`).join("  ");
    return (
      <Pressable onPress={() => router.push(`/match/${item.id}`)}>
        <Card style={styles.card}>
          <View style={styles.top}>
            <Text style={styles.opponent}>vs {item.opponent}</Text>
            <Pill
              label={item.result}
              color={item.result === "win" ? colors.win : colors.loss}
            />
          </View>
          <Text style={styles.meta}>
            {score} · {item.surface} · {item.date}
          </Text>
        </Card>
      </Pressable>
    );
  }

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      data={matches}
      keyExtractor={(m) => m.id}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  card: {},
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  opponent: { color: colors.text, fontSize: font.size.lg, fontWeight: font.weight.medium },
  meta: { color: colors.textMuted, fontSize: font.size.md, marginTop: spacing.xs },
});
