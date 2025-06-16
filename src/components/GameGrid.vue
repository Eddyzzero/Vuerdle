<template>
  <div class="grid">
    <!-- boucle ligne grid -->
    <div
      v-for="(row, rowIndex) in allRows"
      :key="rowIndex"
      class="grid-row dark:text-white motion-scale-in-[0.5] motion-rotate-in-[-10deg] motion-blur-in-[10px] motion-delay-[0.75s]/rotate motion-delay-[0.75s]/blur"
    >
      <!-- boucle case grid -->
      <LetterBox
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        :letter="cell.letter"
        :status="cell.status"
        :style="{ '--index': colIndex }"
      />
    </div>
  </div>
</template>

<script>
import LetterBox from "./LetterBox.vue";

export default {
  name: "GameGrid",
  components: {
    LetterBox,
  },
  props: {
    // historique tentatives avec statuts
    guesses: {
      type: Array,
      required: true,
      default: () => [],
    },
    // mot en cours de saisie
    currentGuess: {
      type: String,
      default: "",
    },
    // nbr max de tentatives autorisées
    maxAttempts: {
      type: Number,
      default: 6,
    },
    // longueur mot à deviner
    wordLength: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    /* calcule toutes les lignes de la grille : les tentatives précédentes, la tentative en cours, les lignes vides restantes */
    allRows() {
      const rows = [...this.guesses];

      // Ajouter la ligne courante avec le mot en cours de saisie
      if (rows.length < this.maxAttempts) {
        const currentGuessRow = this.currentGuess.split("").map((letter) => ({
          letter,
          status: "",
        }));

        // Compléter avec des cases vides si nécessaire
        while (currentGuessRow.length < this.wordLength) {
          currentGuessRow.push({ letter: "", status: "" });
        }

        rows.push(currentGuessRow);
      }

      // Remplir les lignes restantes avec des cases vides
      while (rows.length < this.maxAttempts) {
        rows.push(
          Array(this.wordLength)
            .fill()
            .map(() => ({ letter: "", status: "" }))
        );
      }

      return rows;
    },
  },
};
</script>

<style scoped>
.grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
}

.grid-row {
  display: flex;
  gap: 0.5rem;
}
</style>
