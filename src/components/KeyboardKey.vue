<template>
  <button
    class="key"
    :class="status"
    @click="$emit('press', letter)"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'KeyboardKey',
  props: {
    letter: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: '',
    },
  },
  computed: {
    label() {
      if (this.letter === 'BACKSPACE') return '⌫';
      if (this.letter === 'ENTER') return '⏎';
      return this.letter;
    },
  },
};
</script>

<style scoped>
.key {
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  text-transform: uppercase;
  background-color: #e0e0e0;
  cursor: pointer;
  transition: background-color 0.2s;
}
.key:hover {
  background-color: #d5d5d5;
}
.correct {
  background-color: #4caf50;
  color: white;
}
.present {
  background-color: #ffc107;
  color: white;
}
.absent {
  background-color: #9e9e9e;
  color: white;
}
</style>