<template>
    <div class="app">
        <h1>Vuerdle</h1>
        <Score ref="scoreComponent" />
        <div class="game-container">
            <!-- Ici, vous ajouterez votre grille de jeu -->
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

<style>
.app {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
}

h1 {
    color: #2c3e50;
    margin-bottom: 2rem;
}

.game-container {
    margin: 2rem 0;
}
</style>