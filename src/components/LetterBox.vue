<template>
  <div class="letter-box transition-all duration-200 rounded-lg" :class="[
    status,
    letter
      ? 'border-gray-400 dark:border-gray-500 shadow-sm'
      : 'border-gray-200 dark:border-gray-700',
  ]">
    {{ letter }}
  </div>
</template>

<script>
export default {
  name: "LetterBox",
  props: {
    letter: {
      type: String,
      default: "",
    },
    status: {
      type: [String, null],
      default: null,
    },
  },
};
</script>

<style scoped>
.letter-box {
  width: 3.5rem;
  height: 3.5rem;
  background-color: theme("colors.wordle.background.light");
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.dark .letter-box {
  background-color: theme("colors.wordle.background.dark");
}

.correct {
  background-color: theme("colors.wordle.correct");
  color: theme("colors.wordle.text.dark");
  border-color: theme("colors.wordle.correct");
  transform: scale(1.02);
}

.dark .correct {
  background-color: theme("colors.wordle.correct-dark");
  border-color: theme("colors.wordle.correct-dark");
}

.present {
  background-color: theme("colors.wordle.present");
  color: theme("colors.wordle.text.dark");
  border-color: theme("colors.wordle.present");
  transform: scale(1.02);
}

.dark .present {
  background-color: theme("colors.wordle.present-dark");
  border-color: theme("colors.wordle.present-dark");
}

.absent {
  background-color: theme("colors.wordle.absent");
  color: white;
  border-color: theme("colors.wordle.absent");
  transform: scale(1.02);
}

.dark .absent {
  background-color: theme("colors.wordle.absent-dark");
  border-color: theme("colors.wordle.absent-dark");
}
</style>
