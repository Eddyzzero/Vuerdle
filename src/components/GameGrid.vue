<template>
  <div class="grid">
    <div v-for="(row, rowIndex) in allRows" :key="rowIndex" class="grid-row text-red-400">
      <LetterBox v-for="(cell, colIndex) in row" :key="colIndex" :letter="cell.letter" :status="cell.status" />
    </div>
  </div>
</template>

<script>
import LetterBox from './LetterBox.vue';

export default {
  name: "GameGrid",
  components: {
    LetterBox
  },
  props: {
    guesses: {
      type: Array,
      required: true,
      default: () => []
    },
    currentGuess: {
      type: String,
      default: ''
    },
    maxAttempts: {
      type: Number,
      default: 6
    }
  },
  computed: {
    allRows() {
      const rows = [...this.guesses];

      // Ajouter la ligne courante avec le mot en cours de saisie
      if (rows.length < this.maxAttempts) {
        const currentGuessRow = this.currentGuess.split('').map(letter => ({
          letter,
          status: ''
        }));

        // Compléter avec des cases vides si nécessaire
        while (currentGuessRow.length < 5) {
          currentGuessRow.push({ letter: '', status: '' });
        }

        rows.push(currentGuessRow);
      }

      // Remplir les lignes restantes avec des cases vides
      while (rows.length < this.maxAttempts) {
        rows.push(Array(5).fill().map(() => ({ letter: '', status: '' })));
      }

      return rows;
    }
  }
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
