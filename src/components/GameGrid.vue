<template>
  <div class="flex flex-col gap-2 p-4">
    <div class="flex gap-2 justify-center" v-for="(guess, rowIndex) in guesses" :key="rowIndex">
      <LetterBox v-for="(letter, colIndex) in 5" :key="colIndex" :letter="guess.letters[colIndex] || ''"
        :status="guess.statuses[colIndex]" />
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

<style scoped></style>
