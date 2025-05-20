<template>
  <div
    class="w-14 h-14 flex items-center justify-center border-2 text-xl font-bold uppercase transition-all duration-200 rounded-xl"
    :class="boxClasses">
    {{ letter }}
  </div>
</template>

<script>
export default {
  name: "LetterBox",
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
    boxClasses() {
      switch (this.status) {
        case "correct":
          return "bg-green-500 dark:bg-green-600 text-white border-green-500 dark:border-green-600";
        case "present":
          return "bg-yellow-500 dark:bg-yellow-600 text-white border-yellow-500 dark:border-yellow-600";
        case "absent":
          return "bg-gray-400 dark:bg-gray-600 text-white border-gray-400 dark:border-gray-600";
        default:
          return "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600";
      }
    },
  },
};
</script>
