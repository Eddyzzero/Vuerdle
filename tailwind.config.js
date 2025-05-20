import darkModePlugin from "./tailwind-plugin.js";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  // Tailwind 4.0 utilise toujours 'class' comme stratégie recommandée pour le dark mode
  darkMode: "class",
  theme: {
    extend: {
      // Couleurs personnalisées
      colors: {
        primary: "#3490dc",
        "primary-dark": "#1a4971",
        secondary: "#ffed4a",
        "secondary-dark": "#9c8a23",
        background: "#ffffff",
        "background-dark": "#121212",
        text: "#333333",
        "text-dark": "#f3f4f6",
      },
    },
  },
  plugins: [darkModePlugin],
};
