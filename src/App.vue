<template>
  <header class="p-4 flex justify-between items-center bg-amber-200 dark:bg-[#073B4C]/90">
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white motion-preset-confetti">
      Vuerdle
    </h1>
    <div class="flex gap-2">
      <!-- bouton mode expert -->
      <button @click="toggleExpertMode"
        class="p-2 transition-colors duration-200 ease-in-out border-b-2 rounded-lg motion-preset-pop" :class="isExpertMode
          ? 'bg-red-400 text-gray-900 border-red-600'
          : 'bg-amber-500 text-amber-100 border-amber-600'
          ">
        <span class="text-sm font-bold">{{
          isExpertMode ? "Mode Expert" : "Mode Normal"
        }}</span>
      </button>
      <Rules />
      <LanguageSelector @language-change="handleLanguageChange" />
      <DarkMode />
    </div>
  </header>

  <!-- Conteneur principal de l'application -->
  <div
    class="min-h-screen flex justify-center items-center flex-col bg-amber-100 dark:bg-[#073B4C] transition-colors duration-200">
    <main class="max-w-lg px-4 mx-auto space-y-6">
      <!-- grid -->
      <GameGrid :guesses="coloredGuesses" :current-guess="currentGuess" :maxAttempts="maxAttempts"
        :wordLength="wordLength" />

      <!-- indices -->
      <Hints :hints-remaining="hintsRemaining" :game-status="gameStatus" :revealed-hints="revealedHints"
        @use-hint="useHint" />

      <!-- clavier -->
      <Keyboard @letter="handleLetter" @enter="handleEnter" @delete="handleDelete" :getLetterStatus="getLetterStatus"
        :guesses="guesses" />

      <!-- affichage des statistiques -->
      <Score v-if="showStats" :games-played="gamesPlayed" :wins="wins" :current-streak="currentStreak" />

      <!-- modal de fin de partie -->
      <Modal :is-open="showModal" :word="solution" :message="modalMessage" @close="closeModal"
        @next-word="startNewGame" />
    </main>
  </div>
</template>

<script>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useGameLogic } from "./useGameLogic.js";
import GameGrid from "./components/GameGrid.vue";
import Keyboard from "./components/Keyboard.vue";
import DarkMode from "./components/DarkMode.vue";
import Rules from "./components/Rules.vue";
import Score from "./components/Score.vue";
import Modal from "./components/Modal.vue";
import LanguageSelector from "./components/LanguageSelector.vue";
import Hints from "./components/Hints.vue";

export default {
  name: "App",
  components: {
    GameGrid,
    Keyboard,
    DarkMode,
    Score,
    Modal,
    Rules,
    LanguageSelector,
    Hints,
  },
  setup() {
    // état local de l'application
    const showModal = ref(false);
    const showStats = ref(false);
    const modalMessage = ref("");

    // utilisation de la logique de jeu
    const {
      currentGuess,
      coloredGuesses,
      gameStatus,
      solution,
      maxAttempts,
      wordLength,
      onKeyPress,
      getLetterStatus,
      restartGame,
      gamesPlayed,
      wins,
      currentStreak,
      guesses,
      isExpertMode,
      toggleExpertMode,
      hintsRemaining,
      useHint,
      revealedHints,
      changeLanguage,
      currentLanguage,
      errorMessage,
      messages,
    } = useGameLogic();

    // gestionnaires d'événements pour les interactions utilisateur
    function handleLetter(letter) {
      onKeyPress(letter);
    }

    function handleEnter() {
      onKeyPress("ENTER");
    }

    function handleDelete() {
      onKeyPress("DELETE");
    }

    function handleLanguageChange(lang) {
      changeLanguage(lang);
    }

    function closeModal() {
      showModal.value = false;
    }

    function startNewGame() {
      showModal.value = false;
      showStats.value = false;
      modalMessage.value = "";
      restartGame();
    }

    // gestionnaire d'événements clavier
    function handleKeyDown(event) {
      if (showModal.value || showStats.value) return;

      const key = event.key;

      if (key === "Enter") {
        handleEnter();
      } else if (key === "Backspace") {
        handleDelete();
      } else if (/^[a-zA-Z]$/.test(key)) {
        handleLetter(key.toUpperCase());
      }
    }

    // configuration des listeners
    onMounted(() => {
      window.addEventListener("keydown", handleKeyDown);
    });

    onUnmounted(() => {
      window.removeEventListener("keydown", handleKeyDown);
    });

    // Regarde des changements d'état du jeu
    watch(gameStatus, (newStatus) => {
      if (newStatus === "win") {
        modalMessage.value = messages.value.win;
        showModal.value = true;
        showStats.value = true;
      } else if (newStatus === "lose") {
        modalMessage.value = messages.value.lose;
        showModal.value = true;
        showStats.value = true;
      }
    });

    return {
      currentGuess,
      coloredGuesses,
      gameStatus,
      solution,
      maxAttempts,
      wordLength,
      onKeyPress,
      getLetterStatus,
      handleLetter,
      handleEnter,
      handleDelete,
      handleLanguageChange,
      gamesPlayed,
      wins,
      currentStreak,
      showModal,
      showStats,
      modalMessage,
      closeModal,
      startNewGame,
      guesses,
      isExpertMode,
      toggleExpertMode,
      hintsRemaining,
      useHint,
      revealedHints,
      currentLanguage,
      errorMessage,
    };
  },
};
</script>

<style>
.status {
  margin: 1rem 0;
  font-weight: bold;
}
</style>
