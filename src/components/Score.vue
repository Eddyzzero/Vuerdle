<template>
  <div class="grid grid-cols-3 gap-6 p-6 transition-colors duration-200">
    <div class="score-card bg-amber-200 dark:bg-[#0F313C]/60">
      <h3 class="mb-5 text-center score-label">Parties jouées</h3>
      <p class="score-value score-value-games">{{ gamesPlayed }}</p>
    </div>
    <div class="score-card bg-amber-200 dark:bg-[#0F313C]/60">
      <h3 class="mb-5 score-label">Victoires</h3>
      <p class="score-value score-value-wins">{{ wins }}</p>
    </div>
    <div class="score-card bg-amber-200 dark:bg-[#0F313C]/60">
      <h3 class="mb-5 score-label">Série actuelle</h3>
      <p class="score-value score-value-streak">{{ currentStreak }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Score",
  props: {
    gamesPlayed: {
      type: Number,
      default: 0,
    },
    wins: {
      type: Number,
      default: 0,
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
  },
};
</script>
