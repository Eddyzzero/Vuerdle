<template>
    <button @click="toggleDarkMode"
        class=" p-2 rounded-lg transition-colors duration-200 ease-in-out border-b-2 border-blue-950 dark:border-b-2 dark:border-red-500 "
        :class="isDarkMode ? ' bg-red-400 text-gray-900' : ' bg-blue-800 text-amber-100'">
        <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
    </button>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
    setup() {
        const isDarkMode = ref(false)

        onMounted(() => {
            // Vérifier les préférences utilisateur ou un paramètre sauvegardé
            const savedTheme = localStorage.getItem('theme')
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

            isDarkMode.value = savedTheme === 'dark' || (!savedTheme && prefersDark)
            applyTheme()
        })

        function toggleDarkMode() {
            isDarkMode.value = !isDarkMode.value
            applyTheme()
        }

        function applyTheme() {
            // Ajouter ou supprimer la classe 'dark' de l'élément HTML
            if (isDarkMode.value) {
                document.documentElement.classList.add('dark')
                localStorage.setItem('theme', 'dark')
            } else {
                document.documentElement.classList.remove('dark')
                localStorage.setItem('theme', 'light')
            }
        }

        return {
            isDarkMode,
            toggleDarkMode
        }
    }
}
</script>