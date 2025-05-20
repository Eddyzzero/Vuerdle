<template>
  <div class="letter-box transition-all duration-200 rounded-lg" :class="[
    status,
    letter ? 'border-gray-400 dark:border-gray-500 shadow-sm' : 'border-gray-200 dark:border-gray-700'
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
      default: ''
    },
    status: {
      type: [String, null],
      default: null
    }
  }
};
</script>

<style scoped>
.letter-box {
  width: 3.5rem;
  height: 3.5rem;
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  background-color: white;
  transition: all 0.3s ease;
}

.correct {
  background-color: #6AAA64;
  color: white;
  border-color: #6AAA64;
  transform: scale(1.02);
}

.present {
  background-color: #CEB02C;
  color: white;
  border-color: #CEB02C;
  transform: scale(1.02);
}

.absent {
  background-color: #939B9F;
  color: white;
  border-color: #939B9F;
  transform: scale(1.02);
}

.dark .letter-box {
  background-color: #1a1a1a;
  color: white;
}

.dark .correct {
  background-color: #538D4E;
  border-color: #538D4E;
}

.dark .present {
  background-color: #B59F3B;
  border-color: #B59F3B;
}

.dark .absent {
  background-color: #818384;
  border-color: #818384;
}
</style>
