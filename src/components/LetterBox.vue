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
  background-color: #e8e0cd82;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.correct {
  background-color: #0C9E78;
  color: #FEF4DC;
  border-color: #0C9E78;
  transform: scale(1.02);
}

.present {
  background-color: #EF476F;
  color: black;
  border-color: #EF476F;
  transform: scale(1.02);
}

.absent {
  background-color: #939B9F;
  color: white;
  border-color: #939B9F;
  transform: scale(1.02);
}

.dark .letter-box {
  background-color: #0F313C;
  color: #FEF4DC;
}

.dark .correct {
  background-color: #0C9E78;
  border-color: #0C9E78;
}

.dark .present {
  background-color: #FFD166;
  border-color: #FFD166;
}

.dark .absent {
  background-color: #818384;
  border-color: #818384;
}
</style>
