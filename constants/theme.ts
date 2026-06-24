// ---------------------------------------------------------------------------
// constants/theme.ts
// One source of truth for colors, spacing, and fonts.
//
// This is the React Native version of CSS variables (:root { --primary: ... }).
// Change a value here and every screen that imports it updates at once.
// ---------------------------------------------------------------------------

export const colors = {
  background: "#0B0F14", // app background (near-black)
  surface: "#151B23", // cards, headers, tab bar
  surfaceAlt: "#1E2630", // slightly lighter blocks inside cards
  primary: "#C6FF00", // tennis-ball yellow-green (accent)
  text: "#F5F7FA",
  textMuted: "#8A97A6",
  win: "#3DDC84",
  loss: "#FF6B6B",
  border: "#222C38",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 22,
};

// `as const` locks these to exact values so TypeScript knows "800" is a valid
// fontWeight rather than just "some string".
export const font = {
  size: { sm: 13, md: 16, lg: 20, xl: 28 },
  weight: { regular: "400", medium: "600", bold: "800" },
} as const;
