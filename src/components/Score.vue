<template>
    <div class="flex items-center gap-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 transition-colors duration-200">
        <div class="text-center">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Parties jouées</h3>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ gamesPlayed }}</p>
        </div>
        <div class="text-center">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Victoires</h3>
            <p class="text-2xl font-bold text-green-600 dark:text-green-500">{{ wins }}</p>
        </div>
        <div class="text-center">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Série actuelle</h3>
            <p class="text-2xl font-bold text-blue-600 dark:text-blue-500">{{ currentStreak }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Score',
    props: {
        gamesPlayed: {
            type: Number,
            default: 0
        },
        wins: {
            type: Number,
            default: 0
        },
        currentStreak: {
            type: Number,
            default: 0
        }
    }
}
</script>