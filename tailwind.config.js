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
        },
        "light-blue": "var(--color-light-blue)",
        "dark-blue": "var(--color-dark-blue)",
        primary: "#118AB2",
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
