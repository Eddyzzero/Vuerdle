<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200"
  >
    <header class="p-4 flex justify-between items-center">
      <h1 class="text-gray-900 dark:text-white font-bold text-4xl">Vuerdle</h1>
      <DarkMode />
    </header>

    <main class="max-w-lg mx-auto px-4 space-y-6">
      <GameGrid
        :guesses="coloredGuesses"
        :current-guess="currentGuess"
        :maxAttempts="maxAttempts"
      />

      <Keyboard
        @letter="handleLetter"
        @enter="handleEnter"
        @delete="handleDelete"
        :getLetterStatus="getLetterStatus"
      />

      <Score
        v-if="showStats"
        :games-played="gamesPlayed"
        :wins="wins"
        :current-streak="currentStreak"
      />

      <Modal
        :is-open="showModal"
        :word="solution"
        :message="modalMessage"
        @close="closeModal"
        @next-word="startNewGame"
      />
    </main>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useGameLogic } from "./useGameLogic.js";
import GameGrid from "./components/GameGrid.vue";
import Keyboard from "./components/Keyboard.vue";
import DarkMode from "./components/DarkMode.vue";
import Score from "./components/Score.vue";
import Modal from "./components/Modal.vue";

export default {
  name: "App",
  components: {
    GameGrid,
    Keyboard,
    DarkMode,
    Score,
    Modal,
  },
  setup() {
    const showModal = ref(false);
    const showStats = ref(false);
    const modalMessage = ref("");

    const {
      currentGuess,
      coloredGuesses,
      gameStatus,
      solution,
      maxAttempts,
      onKeyPress,
      getLetterStatus,
      restartGame,
      gamesPlayed,
      wins,
      currentStreak,
    } = useGameLogic();

    function handleLetter(letter) {
      onKeyPress(letter);
    }

    function handleEnter() {
      onKeyPress("ENTER");
    }

    function handleDelete() {
      onKeyPress("DELETE");
    }

    function closeModal() {
      showModal.value = false;
    }

    function startNewGame() {
      closeModal();
      restartGame();
    }

    // Observer les changements de gameStatus
    watch(gameStatus, (newStatus) => {
      if (newStatus === "win") {
        modalMessage.value = "Félicitations ! Vous avez trouvé le mot !";
        showModal.value = true;
        showStats.value = true;
      } else if (newStatus === "lose") {
        modalMessage.value = "Dommage, vous ferez mieux la prochaine fois !";
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
      onKeyPress,
      getLetterStatus,
      handleLetter,
      handleEnter,
      handleDelete,
      gamesPlayed,
      wins,
      currentStreak,
      showModal,
      showStats,
      modalMessage,
      closeModal,
      startNewGame,
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
