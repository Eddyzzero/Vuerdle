<template>
    <div class="max-w-3xl mx-auto p-8 text-center">
        <h1 class="text-3xl font-bold text-gray-800 mb-8">Vuerdle</h1>
        <Score ref="scoreComponent" />
        <div class="my-8">
        </div>
    </div>
</template>

<script>
import Score from './components/Score.vue'

export default {
    name: 'App',
    components: {
        Score,
    },
    data() {
        return {
            keyStatuses: {},
            currentAttempts: 0
        }
    },
    methods: {
        handleKeyPress(key) {
            // Logique de gestion des touches
            console.log('Touche pressée:', key)
        },
        handleWordFound() {
            // Appelez cette méthode quand un mot est trouvé
            this.$refs.scoreComponent.incrementScore(this.currentAttempts)
        }
    }
}
</script>
