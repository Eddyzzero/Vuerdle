<template>
  <div class="game-grid">
    <div
      class="letter-row"
      v-for="(guess, rowIndex) in guesses"
      :key="rowIndex"
    >
      <LetterBox
        v-for="(letter, colIndex) in 5"
        :key="colIndex"
        :letter="guess.letters[colIndex] || ''"
        :status="guess.statuses[colIndex]"
      />
    </div>
  </div>
</template>

<script>
import LetterBox from "./LetterBox.vue";

export default {
  name: "GameGrid",
  props: {
    guesses: {
      type: Array,
      required: true,
    },
  },
  components: {
    LetterBox,
  },
};
</script>

<style scoped>
.game-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.letter-row {
  display: flex;
  gap: 8px;
  justify-content: center;
}
</style>
