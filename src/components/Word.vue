<template>
  <div class="flex items-center justify-center p-20">
    <p class="tracking-widest text-gray-900 dark:text-gray-100" v-if="word">
      {{ word }}
    </p>
    <p class="text-gray-700 dark:text-gray-300" v-else>Chargement...</p>
  </div>
</template>

<script>
import { getRandomWord } from "../wordApi.js";

export default {
  data() {
    return {
      word: null,
    };
  },
  // Méthode pour récupérer un mot aléatoire
  // cree un mot aléatoire en utilisant l'API
  async created() {
    try {
      this.word = await getRandomWord();
    } catch (error) {
      console.error("Erreur lors du chargement du mot:", error);
    }
  },
};
</script>
