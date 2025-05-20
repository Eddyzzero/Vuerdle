<template>
  <button @click="$emit('press', letter)"
    class="key w-10 h-14 m-0.5 rounded-md font-bold text-sm flex items-center justify-center uppercase transition-colors duration-200 cursor-pointer"
    :class="[
      statusClass,
      'dark:text-gray-100',
      status ? '' : 'dark:bg-gray-600 dark:hover:bg-gray-500'
    ]">
    <span v-if="letter === 'ENTER'">↩</span>
    <span v-else-if="letter === 'BACKSPACE'">⌫</span>
    <span v-else>{{ letter }}</span>
  </button>
</template>

<script>
export default {
  name: "KeyboardKey",
  props: {
    letter: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: null,
    },
  },
  computed: {
    statusClass() {
      switch (this.status) {
        case "correct":
          return "bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700";
        case "present":
          return "bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-700";
        case "absent":
          return "bg-gray-400 dark:bg-gray-700 hover:bg-gray-500 dark:hover:bg-gray-800";
        default:
          return "bg-gray-300 hover:bg-gray-400";
      }
    },
  },
};
</script>

<style scoped>
.key {
  width: 43px;
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
  background-color: #6aaa64;
}

.key-present {
  background-color: #c9b458;
}

.key-absent {
  background-color: #787c7e;
}
</style>
