import { createApp } from "vue";
import App from "./App.vue";

const initDarkMode = () => {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

// Exécuter l'initialisation immédiatement
initDarkMode();

createApp(App).mount("#app");
