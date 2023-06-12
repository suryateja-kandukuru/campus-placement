const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        smoke: "#F2F3F4",
        "light-smoke": "#EEEEEE",
        "dark-smoke": "#ECECEC",
        gray10: "#1A1A1A",
        skyblue: "#E9F6FC",
        navyblue: "#235696",
      },
    },
  },
  plugins: [],
};
