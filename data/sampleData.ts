// ---------------------------------------------------------------------------
// data/sampleData.ts
// Hard-coded sample content so the screens have something real to show.
//
// Later you'll replace this with a database or API. For now, treat it like a
// fake backend: import these arrays anywhere and the UI lights up.
// ---------------------------------------------------------------------------

import { Match, Workout, Meal } from "@/types";

export const matches: Match[] = [
  {
    id: "m1",
    opponent: "Diego Alvarez",
    date: "2026-06-20",
    surface: "hard",
    result: "win",
    sets: [
      { player: 6, opponent: 4 },
      { player: 7, opponent: 5 },
    ],
    stats: {
      aces: 8,
      doubleFaults: 2,
      firstServePct: 64,
      winners: 27,
      unforcedErrors: 19,
      breakPointsWon: 4,
      breakPointsTotal: 7,
    },
  },
  {
    id: "m2",
    opponent: "Sam Whitaker",
    date: "2026-06-12",
    surface: "clay",
    result: "loss",
    sets: [
      { player: 4, opponent: 6 },
      { player: 6, opponent: 3 },
      { player: 5, opponent: 7 },
    ],
    stats: {
      aces: 3,
      doubleFaults: 5,
      firstServePct: 55,
      winners: 22,
      unforcedErrors: 31,
      breakPointsWon: 3,
      breakPointsTotal: 9,
    },
  },
  {
    id: "m3",
    opponent: "Marcus Lee",
    date: "2026-06-04",
    surface: "grass",
    result: "win",
    sets: [
      { player: 6, opponent: 2 },
      { player: 6, opponent: 4 },
    ],
    stats: {
      aces: 11,
      doubleFaults: 1,
      firstServePct: 71,
      winners: 33,
      unforcedErrors: 14,
      breakPointsWon: 5,
      breakPointsTotal: 6,
    },
  },
];

export const workouts: Workout[] = [
  {
    id: "w1",
    title: "Court Footwork",
    focus: "Footwork",
    durationMin: 35,
    exercises: [
      { name: "Ladder drills", sets: 4, reps: "30s" },
      { name: "Lateral shuffles", sets: 3, reps: "20m" },
      { name: "Split-step + sprint", sets: 5, reps: "10m" },
      { name: "Cone reaction drill", sets: 3, reps: "45s" },
    ],
  },
  {
    id: "w2",
    title: "Lower Body Strength",
    focus: "Strength",
    durationMin: 50,
    exercises: [
      { name: "Goblet squat", sets: 4, reps: "8-12" },
      { name: "Romanian deadlift", sets: 3, reps: "8-10" },
      { name: "Bulgarian split squat", sets: 3, reps: "10/side" },
      { name: "Calf raises", sets: 4, reps: "15-20" },
    ],
  },
  {
    id: "w3",
    title: "Mobility & Recovery",
    focus: "Recovery",
    durationMin: 25,
    exercises: [
      { name: "Hip 90/90 stretch", sets: 2, reps: "60s" },
      { name: "Thoracic openers", sets: 2, reps: "45s" },
      { name: "Shoulder band work", sets: 3, reps: "15" },
    ],
  },
];

export const meals: Meal[] = [
  {
    id: "f1",
    title: "Oats, berries & whey",
    type: "breakfast",
    calories: 480,
    protein: 35,
    carbs: 62,
    fat: 10,
  },
  {
    id: "f2",
    title: "Grilled chicken rice bowl",
    type: "lunch",
    calories: 640,
    protein: 48,
    carbs: 70,
    fat: 16,
  },
  {
    id: "f3",
    title: "Banana + almond butter",
    type: "snack",
    calories: 260,
    protein: 7,
    carbs: 30,
    fat: 13,
  },
  {
    id: "f4",
    title: "Salmon, quinoa & greens",
    type: "dinner",
    calories: 590,
    protein: 42,
    carbs: 45,
    fat: 24,
  },
];
