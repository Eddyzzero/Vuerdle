<template>
  <div>
    <button
      @click="showRules = true"
      class="p-2 transition-colors duration-200 ease-in-out border-b-2 rounded-lg motion-preset-pop border-amber-600 dark:border-red-500 bg-amber-500 dark:bg-red-400 dark:text-black text-amber-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>

    <!-- Modal des règles -->
    <div
      v-if="showRules"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-black/50 dark:bg-black/70"
        @click="showRules = false"
      ></div>
      <div
        class="bg-amber-100 dark:bg-[#073B4C] rounded-lg p-6 max-w-lg w-full mx-4 z-10 relative motion-preset-pop"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            Règles du jeu
          </h2>
          <button
            @click="showRules = false"
            class="text-gray-500 hover:text-gray-700 dark:text-gray-300 hover:motion-preset-seesaw"
          >
            <div
              class="p-1 text-white transition-colors border-b-2 rounded-lg bg-amber-500 dark:bg-red-400 hover:bg-amber-400 dark:text-black dark:border-amber-600 dark:hover:bg-red-300 dark:hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </button>
        </div>

        <div class="space-y-4 text-gray-800 dark:text-gray-400">
          <p>Devinez le mot en 6 essais :</p>
          <ul class="pl-5 space-y-2 list-decimal">
            <li>Chaque essai doit être un mot de 5 lettres</li>
            <li>
              Les couleurs des tuiles changent pour montrer votre progression :
            </li>
          </ul>

          <div class="mt-4 space-y-2">
            <div class="flex items-center gap-3">
              <div
                class="flex items-center justify-center w-10 h-10 text-white rounded bg-wordle-correct dark:bg-wordle-correct-dark"
              >
                A
              </div>
              <span>La lettre est dans le mot et bien placée</span>
            </div>
            <div class="flex items-center gap-3">
              <div
                class="flex items-center justify-center w-10 h-10 text-white rounded bg-wordle-present dark:bg-wordle-present-dark"
              >
                B
              </div>
              <span>La lettre est dans le mot mais mal placée</span>
            </div>
            <div class="flex items-center gap-3">
              <div
                class="flex items-center justify-center w-10 h-10 text-white rounded bg-wordle-absent dark:bg-wordle-absent-dark"
              >
                C
              </div>
              <span>La lettre n'est pas dans le mot</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rules",
  data() {
    return {
      showRules: false,
    };
  },
};
</script>
