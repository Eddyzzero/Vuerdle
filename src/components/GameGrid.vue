<template>
  <div class="flex flex-col gap-2">
    <div
      v-for="(row, rowIndex) in grid"
      :key="rowIndex"
      class="grid grid-cols-5 gap-2"
    >
      <LetterBox
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        :letter="cell.letter"
        :status="cell.status"
      />
    </div>
  </div>
</template>

<script setup>
import LetterBox from "./LetterBox.vue";

defineProps({
  grid: {
    type: Array,
    required: true,
    // Exemple :
    // [
    //   [ { letter: 'A', status: 'correct' }, { letter: 'B', status: 'present' }, ... ],
    //   ...
    // ]
  },
});
</script>
