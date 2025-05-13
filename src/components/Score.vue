<template>
    <div class="m-4 p-4 rounded-lg bg-gray-100 text-center shadow-md transition-all hover:shadow-lg">
        <h3 class="text-xl font-bold text-gray-800 m-0">Score: {{ score }}</h3>
        <div class="flex justify-around mt-2 space-x-4">
            <p class="my-2 text-gray-600">Mots trouvés: {{ wordsFound }}</p>
            <p class="my-2 text-gray-600">Meilleur score: {{ bestScore }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Score',
    data() {
        return {
            score: 0,
            wordsFound: 0,
            bestScore: localStorage.getItem('bestScore') || 0
        }
    },
    methods: {
        incrementScore(attempts) {
            // Plus le nombre d'essais est petit, plus le score est élevé
            const points = Math.max(6 - attempts + 1, 1) * 10;
            this.score += points;
            this.wordsFound++;

            // Mise à jour du meilleur score
            if (this.score > this.bestScore) {
                this.bestScore = this.score;
                localStorage.setItem('bestScore', this.score);
            }

            // Émettre le nouveau score
            this.$emit('score-updated', this.score);
        },
        resetScore() {
            this.score = 0;
            this.wordsFound = 0;
        }
    }
}
</script>