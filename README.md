# Zelos 🎾

A tennis companion app — match stats, workout plans, and meal plans — built with
**Expo (React Native)**. This README is written for someone comfortable with web
(HTML/CSS/JS) who is new to mobile.

## What this stack is (in web terms)

| Mobile thing | The web thing it's like |
| --- | --- |
| **React Native** | React, but components render to real native iOS/Android views instead of the DOM |
| **Expo** | A toolkit + dev server that removes the painful native setup (think Vite/CRA, but for mobile) |
| **expo-router** | File-based routing like Next.js — files in `app/` become screens |
| `<View>` | `<div>` |
| `<Text>` | `<span>` / `<p>` (all text MUST be inside `<Text>`) |
| `<Pressable>` | a clickable `<button>` / `<a>` |
| `StyleSheet.create({...})` | CSS, written as JS objects. Layout is flexbox by default |
| `<FlatList>` | an efficient list that only renders rows currently on screen |

## Run it

You need [Node.js](https://nodejs.org) installed. Then, in this folder:

```bash
# 1. Install dependencies
npm install

# 2. Align every package to the exact versions Expo SDK 56 expects.
#    (Do this once now, and any time a red version warning appears.)
npx expo install --fix

# 3. Start the dev server
npx expo start
```

Then either:
- Install **Expo Go** on your iPhone/Android and scan the QR code in the terminal, or
- Press `i` for the iOS simulator (Mac + Xcode) / `a` for the Android emulator.

The app hot-reloads: save a file and the phone updates instantly.

## Project structure

```
app/                     ← every file here is a screen (expo-router)
  _layout.tsx            ← root layout: wraps the whole app in a Stack
  (tabs)/                ← "(parentheses)" = a group that adds no URL segment
    _layout.tsx          ← defines the 4 bottom tabs
    index.tsx            ← Home dashboard          → "/"
    matches.tsx          ← Matches list            → "/matches"
    workouts.tsx         ← Workout plans           → "/workouts"
    meals.tsx            ← Meal plans               → "/meals"
  match/
    [id].tsx             ← Match detail w/ stats   → "/match/m1"  ([id] = dynamic)

components/              ← small reusable UI pieces (Card, StatBar, Pill, ...)
constants/theme.ts       ← colors / spacing / fonts (your "CSS variables")
types/index.ts           ← TypeScript data shapes (Match, Workout, Meal, ...)
data/sampleData.ts       ← fake data so screens have something to show
```

## How navigation works

`expo-router` reads the `app/` folder. A **Stack** is a pile of screens you push
and pop. The four tabs are one entry in that stack; tapping a match pushes
`match/[id]` on top with a back button. You navigate either declaratively with
`<Link href="/match/m1">` or imperatively with `router.push("/match/m1")`.

## Where to go next

- **Make data persist.** Right now data is hard-coded in `data/sampleData.ts`.
  Swap it for on-device storage (`expo-sqlite` or AsyncStorage) so matches you
  add survive an app restart.
- **Add a "new match" form** so you can log stats instead of editing the file.
- **AI features.** When you add them, your API key must NOT live in the app
  (anyone can extract it from a shipped build). Put a tiny backend in front that
  holds the key and the app calls that. Frameworks don't change for this.

## Notes on versions

Pinned to **Expo SDK 56** (React Native 0.85, React 19.2). The versions in
`package.json` are close, but `npx expo install --fix` is the source of truth —
run it if anything complains.
