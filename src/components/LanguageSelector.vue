<template>
  <!-- Overlay pour fermer le menu en cliquant à l'extérieur -->
  <div v-if="isOpen" class="fixed inset-0 z-40" @click="isOpen = false"></div>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="h-10 px-3 rounded-lg transition-colors duration-200 ease-in-out border-b-2 bg-amber-500 text-white dark:text-black dark:bg-red-400 hover:bg-amber-400 dark:hover:bg-red-300 border-amber-600 dark:border-red-500 flex items-center gap-2"
    >
      <span class="text-sm">{{
        currentLanguage === "fr" ? "🇫🇷 FR" : "🇬🇧 EN"
      }}</span>
    </button>

    <!-- Menu déroulant -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-amber-200 dark:bg-red-400 ring-1 ring-black ring-opacity-5 z-50 motion-scale-in-[0.5] motion-translate-x-in-[-120%] motion-translate-y-in-[-60%] motion-opacity-in-[33%] motion-rotate-in-[-1080deg] motion-blur-in-[10px] motion-duration-[0.50s] motion-delay-[0.25s]/scale motion-duration-[0.25s]/opacity motion-duration-[0.80s]/rotate motion-duration-[0.10s]/blur motion-delay-[0.40s]/blur motion-ease-spring-bouncier"
    >
      <div class="py-1 flex flex-col gap-1 m-1">
        <button
          @click="selectLanguage('en')"
          class="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-amber-100 dark:rounded-lg dark:hover:bg-red-500 flex items-center gap-2"
          :class="{ ' bg-amber-100 dark:bg-red-600': currentLanguage === 'en' }"
        >
          <span>🇬🇧</span> English
        </button>
        <button
          @click="selectLanguage('fr')"
          class="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-amber-100 dark:rounded-lg dark:hover:bg-red-500 flex items-center gap-2"
          :class="{ 'bg-amber-100 dark:bg-red-600': currentLanguage === 'fr' }"
        >
          <span>🇫🇷</span> Français
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LanguageSelector",
  emits: ["language-change"],
  data() {
    const supportedLanguages = ["fr", "en"];
    const savedLanguage = localStorage.getItem("gameLanguage") || "fr";
    const currentLanguage = supportedLanguages.includes(savedLanguage)
      ? savedLanguage
      : "fr";

    return {
      isOpen: false,
      supportedLanguages,
      currentLanguage,
    };
  },
  methods: {
    selectLanguage(lang) {
      if (!this.supportedLanguages.includes(lang)) {
        console.warn(`Language ${lang} not supported, using French as default`);
        lang = "fr";
      }
      this.currentLanguage = lang;
      localStorage.setItem("gameLanguage", lang);
      this.isOpen = false;
      this.$emit("language-change", lang);
    },
  },
  mounted() {
    // Émettre la langue actuelle au chargement
    this.$emit("language-change", this.currentLanguage);
  },
};
</script>
