/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}", "./src/**/*.css"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        wordle: {
          correct: "#6AAA64",
          "correct-dark": "#538D4E",
          present: "#CEB02C",
          "present-dark": "#B59F3B",
          absent: "#939B9F",
          "absent-dark": "#818384",
          background: {
            light: "#FEF4DC",
            dark: "#0F313C",
          },
          text: {
            light: "#1A1A1A",
            dark: "#FEF4DC",
          },
        },
        primary: {
          light: "#118AB2",
          dark: "#0D6B8C",
        },
        secondary: {
          light: "#FFD166",
          dark: "#E6BC5C",
        },
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
        amatic: ["Amatic SC", "cursive"],
        athiti: ["Athiti", "sans-serif"],
        delius: ["Delius", "cursive"],
      },
    },
  },
  plugins: [],
};
