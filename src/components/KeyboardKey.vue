<template>
  <button class="key" :class="statusClass" @click="$emit('press', letter)">
    <span v-if="letter === 'ENTER'">↩</span>
    <span v-else-if="letter === 'BACKSPACE'">⌫</span>
    <span v-else>{{ letter }}</span>
  </button>
</template>

<script>
export default {
  name: "KeyboardKey",
  props: {
    letter: { type: String, required: true },
    status: { type: String, default: null }, // correct | present | absent | null
  },
  computed: {
    statusClass() {
      switch (this.status) {
        case "correct":
          return "key-correct";
        case "present":
          return "key-present";
        case "absent":
          return "key-absent";
        default:
          return "";
      }
    },
  },
};
</script>

<style scoped>
.key {
  width: 40px;
  height: 58px;
  background-color: #999;
  border: none;
  border-radius: 6px;
  margin: 2px;
  font-weight: bold;
  font-size: 14px;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
}

.key-correct {
  background-color: #4caf50;
}

.key-present {
  background-color: #fbbc04;
}

.key-absent {
  background-color: #787c7e;
}
</style>
