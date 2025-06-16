<template>
  <div v-if="isOpen" class="fixed inset-0 z-50">
    <!-- Fond semi-transparent -->
    <div class="fixed inset-0 bg-black/50 dark:bg-black/70" @click="closeModal"></div>

    <!-- Contenu de la modal -->
    <div class="fixed inset-0 flex items-center justify-center">
      <div
        class="z-10 w-full max-w-md p-6 mx-4 transition-colors duration-200 rounded-lg shadow-xl bg-wordle-background-light dark:bg-wordle-background-dark">
        <div class="flex items-center justify-between mb-10">
          <h3 class="text-xl font-bold text-wordle-text-light dark:text-wordle-text-dark">
            {{ title }}
          </h3>
          <button @click="closeModal"
            class="p-1 text-white transition-colors border-b-2 rounded-lg cursor-pointer bg-amber-500 dark:bg-red-400 hover:bg-amber-400 dark:text-black dark:border-amber-600 dark:hover:bg-red-300 dark:hover:text-white hover:motion-preset-seesaw">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="mb-6 text-wordle-text-light dark:text-wordle-text-dark">
          <p class="text-lg text-center">
            Le mot était :
            <span class="text-xl font-bold text-wordle-correct dark:text-wordle-correct-dark">{{ word }}</span>
          </p>
          <p v-if="message" class="mt-2 text-center">{{ message }}</p>
        </div>

        <div class="flex justify-center">
          <button @click="$emit('next-word')"
            class="px-6 py-2 text-white transition-colors duration-200 border-none rounded-lg cursor-pointer bg-primary-light dark:bg-primary-dark hover:bg-opacity-90 dark:hover:bg-opacity-90">
            Mot suivant
          </button>
        </div>
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
