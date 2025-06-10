<template>
  <div class="flex flex-col items-center gap-2">
    <button
      @click="useHint"
      :disabled="hintsRemaining === 0 || gameStatus !== 'playing'"
      class="p-2 transition-colors duration-200 ease-in-out border-b-2 rounded-lg motion-preset-pop"
      :class="[
        hintsRemaining > 0 && gameStatus === 'playing'
          ? 'bg-amber-500 text-amber-100 border-amber-600 hover:bg-amber-400'
          : 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed',
        'dark:bg-red-400 dark:text-black dark:border-red-500 dark:hover:bg-red-300',
      ]"
    >
      <span class="text-sm font-bold">Indice ({{ hintsRemaining }})</span>
    </button>

    <div
      v-if="revealedHints.length > 0"
      class="flex flex-wrap justify-center gap-2 mt-2"
    >
      <div
        v-for="hint in revealedHints"
        :key="hint.position"
        class="flex items-center gap-1 px-3 py-1 bg-amber-200 dark:bg-[#0F313C] rounded-lg"
      >
        <span class="font-bold text-amber-800 dark:text-amber-200">{{
          hint.letter
        }}</span>
        <span class="text-sm text-amber-600 dark:text-amber-300"
          >position {{ hint.position + 1 }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hints",
  props: {
    hintsRemaining: {
      type: Number,
      required: true,
    },
    gameStatus: {
      type: String,
      required: true,
    },
    revealedHints: {
      type: Array,
      required: true,
    },
  },
  emits: ["useHint"],
  methods: {
    useHint() {
      this.$emit("useHint");
    },
  },
};
</script>
