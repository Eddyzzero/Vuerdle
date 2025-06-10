<template>
    <div class="relative">
        <button @click="isOpen = !isOpen"
            class="p-2 rounded-lg transition-colors duration-200 ease-in-out border-b-2 bg-amber-500 text-white dark:bg-amber-600 hover:bg-amber-400 dark:hover:bg-amber-500 border-amber-600 dark:border-amber-700 flex items-center gap-2">
            <span class="text-sm font-medium">{{ currentLanguage === 'en' ? '🇬🇧' : '🇫🇷' }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
            </svg>
        </button>

        <!-- Menu déroulant -->
        <div v-if="isOpen"
            class="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
            <div class="py-1">
                <button @click="selectLanguage('en')"
                    class="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    :class="{ 'bg-gray-100 dark:bg-gray-700': currentLanguage === 'en' }">
                    <span>🇬🇧</span> English
                </button>
                <button @click="selectLanguage('fr')"
                    class="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    :class="{ 'bg-gray-100 dark:bg-gray-700': currentLanguage === 'fr' }">
                    <span>🇫🇷</span> Français
                </button>
            </div>
        </div>
    </div>

    <!-- Overlay pour fermer le menu en cliquant à l'extérieur -->
    <div v-if="isOpen" class="fixed inset-0 z-40" @click="isOpen = false"></div>
</template>

<script>
export default {
    name: "LanguageSelector",
    data() {
        return {
            isOpen: false,
            currentLanguage: localStorage.getItem('gameLanguage') || 'en'
        }
    },
    methods: {
        selectLanguage(lang) {
            this.currentLanguage = lang;
            localStorage.setItem('gameLanguage', lang);
            this.isOpen = false;
            this.$emit('language-change', lang);
        }
    },
    mounted() {
        // Émettre la langue actuelle au chargement
        this.$emit('language-change', this.currentLanguage);
    }
}
</script>