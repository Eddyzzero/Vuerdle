/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}", "./src/**/*.css"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        reveal: {
          "0%": { transform: "rotateX(0deg)" },
          "50%": { transform: "rotateX(90deg)" },
          "100%": { transform: "rotateX(0deg)" },
        },
        pop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        reveal: "reveal 0.6s ease-in-out",
        pop: "pop 0.3s ease-in-out",
      },
      colors: {
        wordle: {
          correct: "#6AAA64",
          "correct-dark": "#0C9E78",
          present: "#FFD166",
          "present-dark": "#FFD166",
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
      },
    },
  },
  plugins: [require("tailwindcss-motion")],
};
