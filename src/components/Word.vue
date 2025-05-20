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

<style scoped>
.word {
  display: flex;
  gap: 4px;
  justify-content: center;
  margin-bottom: 16px;
}

.letter {
  width: 40px;
  height: 40px;
  background: #eee;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
  text-transform: uppercase;
  transition: background 0.3s, border-color 0.3s, color 0.3s;
}

/*  Mode sombre */
body.dark .letter {
  background: #333;
  border-color: #888;
  color: #f0f0f0;
}
</style>