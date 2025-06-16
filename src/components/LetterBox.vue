<template>
  <!-- Composant pour afficher une case de lettre dans le jeu Wordle -->
  <!-- La case peut afficher une lettre et son statut (correct, présent, absent) -->
  <div class="transition-all duration-200 rounded-lg letter-box" :class="[
    status,
    letter
      ? 'border-gray-400 dark:border-gray-500 shadow-sm'
      : 'border-gray-200 dark:border-gray-700',
    {
      'animate-reveal': status === 'correct',
      'animate-pop': status === 'present',
    },
  ]">
    {{ letter }}
  </div>
</template>

<script>
export default {
  name: "LetterBox",
  props: {
    // lettre à afficher dans la case
    letter: {
      type: String,
      default: "",
    },
    // statut de la lettre (correct, present, absent)
    status: {
      type: [String, null],
      default: null,
    },
  },
};
</script>


<style scoped>
/* Styles pour la boîte de lettre */
/* Utilisation de la fonction theme() pour les couleurs */
/* Les couleurs sont définies dans le fichier de configuration Tailwind CSS */
.letter-box {
  width: min(3.5rem, calc((100vw - 2rem) / 7));
  height: min(3.5rem, calc((100vw - 2rem) / 7));
  background-color: #e9dab5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: min(1.5rem, calc((100vw - 2rem) / 14));
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s ease;
  perspective: 1000px;
  transform-style: preserve-3d;
}

.dark .letter-box {
  background-color: theme("colors.wordle.background.dark");
}

.correct {
  background-color: theme("colors.wordle.correct");
  color: theme("colors.wordle.text.dark");
  border-color: theme("colors.wordle.correct");
}

.dark .correct {
  background-color: theme("colors.wordle.correct-dark");
  border-color: theme("colors.wordle.correct-dark");
}

.present {
  background-color: theme("colors.wordle.present");
  color: theme("colors.wordle.text.dark");
  border-color: theme("colors.wordle.present");
}

.dark .present {
  background-color: theme("colors.wordle.present-dark");
  border-color: theme("colors.wordle.present-dark");
}

.absent {
  background-color: theme("colors.wordle.absent");
  color: white;
  border-color: theme("colors.wordle.absent");
}

.dark .absent {
  background-color: theme("colors.wordle.absent-dark");
  border-color: theme("colors.wordle.absent-dark");
}

.animate-reveal {
  animation-delay: calc(var(--index, 0) * 0.2s);
}
</style>
