// ---------------------------------------------------------------------------
// types/index.ts
// The "shapes" of our data, written as TypeScript types.
//
// Coming from plain JS: a type is just a description of what an object should
// look like. It does NOT exist when the app runs — it only helps your editor
// autocomplete and catch typos (e.g. match.opponnet) before you ever run the app.
// ---------------------------------------------------------------------------

export type Surface = "hard" | "clay" | "grass";
export type MatchResult = "win" | "loss";

/** The score of a single set, e.g. 6-4 -> { player: 6, opponent: 4 } */
export interface SetScore {
  player: number;
  opponent: number;
}

/** The numbers we track for one match. */
export interface MatchStats {
  aces: number;
  doubleFaults: number;
  firstServePct: number; // 0–100
  winners: number;
  unforcedErrors: number;
  breakPointsWon: number;
  breakPointsTotal: number;
}

export interface Match {
  id: string;
  opponent: string;
  date: string; // ISO date string, e.g. "2026-06-20"
  surface: Surface;
  result: MatchResult;
  sets: SetScore[];
  stats: MatchStats;
}

// ----- Workouts -----
export interface Exercise {
  name: string;
  sets: number;
  reps: string; // "8-12" reps, or "30s" for timed holds
  notes?: string; // the "?" means this field is optional
}

export interface Workout {
  id: string;
  title: string;
  focus: string; // "Footwork", "Strength", "Recovery"...
  durationMin: number;
  exercises: Exercise[];
}

// ----- Meals -----
export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export interface Meal {
  id: string;
  title: string;
  type: MealType;
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
}
