<template>
    <div class="flex justify-center items-center p-20">
        <p class=" tracking-widest" v-if="word">{{ word }}</p>
        <p v-else>Chargement...</p>
    </div>
</template>

<script>
import { getRandomWord } from '../../wordApi.js';

export default {
    data() {
        return {
            word: null
        }
    },
    async created() {
        try {
            this.word = await getRandomWord();
        } catch (error) {
            console.error('Erreur lors du chargement du mot:', error);
        }
    }
}
</script>

<style></style>