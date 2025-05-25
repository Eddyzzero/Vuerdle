<template>
  <div v-if="isOpen" class="fixed min-h-full inset-0 flex items-center justify-center z-50">
    <!-- Fond semi-transparent -->
    <div class="absolute inset-0 bg-black/50 dark:bg-black/70" @click="closeModal"></div>

    <!-- Contenu de la modal -->
    <div
      class="bg-wordle-background-light dark:bg-wordle-background-dark rounded-lg p-6 shadow-xl z-10 max-w-md w-full mx-4 transition-colors duration-200">
      <div class="flex justify-between items-center mb-10">
        <h3 class="text-xl font-bold text-wordle-text-light dark:text-wordle-text-dark">
          {{ title }}
        </h3>
        <button @click="closeModal"
          class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-2xl border-none bg-transparent cursor-pointer">
          <span>&times;</span>
        </button>
      </div>

      <div class="text-wordle-text-light dark:text-wordle-text-dark mb-6">
        <p class="text-center text-lg">
          Le mot était :
          <span class="font-bold text-xl text-wordle-correct dark:text-wordle-correct-dark">{{ word }}</span>
        </p>
        <p v-if="message" class="mt-2 text-center">{{ message }}</p>
      </div>

      <div class="flex justify-center">
        <button @click="$emit('next-word')"
          class="bg-primary-light dark:bg-primary-dark text-white px-6 py-2 rounded-lg hover:bg-opacity-90 dark:hover:bg-opacity-90 transition-colors duration-200 border-none cursor-pointer">
          Mot suivant
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    word: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
  },
  computed: {
    title() {
      return this.message.includes("Félicitations")
        ? "Victoire !"
        : "Partie terminée";
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
