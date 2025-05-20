<template>
  <button @click="$emit('press', letter)"
    class="key min-w-[2.5rem] h-14 m-0.5 rounded-md font-bold text-sm flex items-center justify-center uppercase transition-all duration-200 cursor-pointer shadow-sm hover:scale-105"
    :class="[
      statusClass,
      'dark:text-gray-100',
      status ? '' : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'
    ]">
    <span v-if="letter === 'ENTER'" class="text-xs">Entrée</span>
    <span v-else-if="letter === 'BACKSPACE'" class="text-lg">⌫</span>
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
          return "bg-[#6AAA64] dark:bg-[#538D4E] text-white hover:bg-[#5C9958] dark:hover:bg-[#487F45]";
        case "present":
          return "bg-[#CEB02C] dark:bg-[#B59F3B] text-white hover:bg-[#B89B27] dark:hover:bg-[#9E8B34]";
        case "absent":
          return "bg-[#939B9F] dark:bg-[#818384] text-white hover:bg-[#848B8E] dark:hover:bg-[#737475]";
        default:
          return "";
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
