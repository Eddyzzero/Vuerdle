<script setup>
import GameGrid from "./components/GameGrid.vue";

const grid = [
  [
    { letter: "S", status: "correct" },
    { letter: "A", status: "present" },
    { letter: "L", status: "absent" },
    { letter: "U", status: null },
    { letter: "", status: null },
  ],
  
  ...Array(5)
    .fill()
    .map(() => Array(5).fill({ letter: "", status: null })),
];
</script>

<template>
  <div class="p-6">
    <GameGrid :grid="grid" />
  </div>
</template>
