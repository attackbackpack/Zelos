// Babel turns the modern JS/TS + JSX you write into code the phone can run.
// For Expo you almost never touch this — "babel-preset-expo" handles
// expo-router, TypeScript, and JSX all at once.
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
  };
};
