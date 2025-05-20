<template>
  <div class="grid">
    <div v-for="(row, rowIndex) in allRows" :key="rowIndex" class="grid-row">
      <div
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        class="cell"
        :class="cell.status"
      >
        {{ cell.letter }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameGrid",
  props: {
    guesses: Array,
    currentGuess: String,
  },
  computed: {
    allRows() {
      const rows = [...this.guesses];

      if (this.guesses.length < 6) {
        rows.push(
          this.currentGuess
            .padEnd(5)
            .split("")
            .map((l) => ({ letter: l, status: "" }))
        );
      }

      while (rows.length < 6) {
        rows.push(
          Array.from({ length: 5 }, () => ({ letter: "", status: "" }))
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
  gap: 0.2rem;
  margin-bottom: 1rem;
}

.grid-row {
  display: flex;
  gap: 0.2rem;
}

.cell {
  width: 3rem;
  height: 3rem;
  border: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
  text-transform: uppercase;
  background-color: white;
  transition: background-color 0.3s;
}

.cell.correct {
  background-color: #6aaa64;
  color: white;
}

.cell.present {
  background-color: #c9b458;
  color: white;
}

.cell.absent {
  background-color: #787c7e;
  color: white;
}
</style>
