<template>
  <div
    class="w-14 h-14 flex items-center justify-center border-2 text-xl font-bold uppercase transition-all duration-200"
    :class="boxClasses"
  >
    {{ letter }}
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  letter: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: null, // 'correct' | 'present' | 'absent' | null
  },
});

const boxClasses = computed(() => {
  switch (props.status) {
    case "correct":
      return "bg-green-500 text-white border-green-500";
    case "present":
      return "bg-yellow-500 text-white border-yellow-500";
    case "absent":
      return "bg-gray-400 text-white border-gray-400";
    default:
      return "bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white";
  }
});
</script>
