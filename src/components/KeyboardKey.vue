<!-- Template d'une touche du clavier -->
<template>
  <button
    @click="$emit('press', letter)"
    class="key min-w-[2.5rem] h-14 m-0.5 rounded-md font-bold text-xl uppercase transition-all duration-200 cursor-pointer shadow-sm hover:scale-105 border-b-2 border-gray-600"
    :class="[
      statusClass,
      used ? 'opacity-40' : '',
      'dark:text-wordle-text-dark',
      status
        ? ''
        : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500',
    ]"
  >
    <span v-if="letter === 'ENTER'" class="text-xs">Entrée</span>
    <span v-else-if="letter === 'BACKSPACE'" class="text-lg">⌫</span>
    <span v-else>{{ letter }}</span>
  </button>
</template>

<script>
export default {
  name: "KeyboardKey",
  props: {
    // la lettre ou le symbole à afficher sur la touche
    letter: { type: String, required: true },
    // le statut de la lettre (correct, present, absent)
    status: { type: String, default: null },
    // si la touche a déjà été utilisée
    used: { type: Boolean, default: false },
  },
  computed: {
    /* calcule la classe CSS en fonction du statut de la lettre */
    statusClass() {
      switch (this.status) {
        case "correct":
          return "bg-wordle-correct dark:bg-wordle-correct-dark text-white hover:bg-opacity-90 dark:hover:bg-opacity-90";
        case "present":
          return "bg-wordle-present dark:bg-wordle-present-dark text-white hover:bg-opacity-90 dark:hover:bg-opacity-90";
        case "absent":
          return "bg-wordle-absent dark:bg-wordle-absent-dark text-white hover:bg-opacity-90 dark:hover:bg-opacity-90";
        default:
          return "";
      }
    },
  },
};
</script>
