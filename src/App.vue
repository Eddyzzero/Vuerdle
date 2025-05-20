<template>
  <div class="min-h-screen transition-colors duration-200 dark:bg-gray-900">
    <header class="p-4 flex justify-between items-center">
      <h1 class="text-gray-900 dark:text-white font-bold text-4xl">Vuerdle</h1>
      <DarkMode />
    </header>

    <main class="max-w-lg mx-auto px-4">
      <GameGrid :guesses="coloredGuesses" :current-guess="currentGuess" :maxAttempts="maxAttempts" />

      <Keyboard @letter="handleLetter" @enter="handleEnter" @delete="handleDelete" :getLetterStatus="getLetterStatus" />

      <div class="mt-6 text-center">
        <div v-if="gameStatus === 'win'" class="text-lg font-bold text-[#6AAA64] dark:text-[#538D4E] animate-bounce">
          🎉 Bravo, tu as gagné ! 🎉
        </div>
        <div v-else-if="gameStatus === 'lose'" class="text-lg font-bold text-red-600 dark:text-red-500">
          Perdu ! Le mot était : <span class="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{{ solution
            }}</span>
        </div>
        <div v-else-if="gameStatus === 'loading'" class="text-lg text-gray-600 dark:text-gray-400">
          Chargement...
        </div>
        <div v-else-if="gameStatus === 'error'" class="text-lg text-red-600 dark:text-red-500">
          Erreur lors du chargement du mot
        </div>

        <button v-if="gameStatus === 'win' || gameStatus === 'lose'" @click="restartGame" class="mt-4 px-6 py-3 bg-[#6AAA64] dark:bg-[#538D4E] text-white rounded-lg 
                 hover:bg-[#5C9958] dark:hover:bg-[#487F45] transform hover:scale-105 
                 transition-all duration-200 shadow-md font-bold">
          Nouvelle Partie
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import { useGameLogic } from "../useGameLogic";
import GameGrid from "./components/GameGrid.vue";
import Keyboard from "./components/Keyboard.vue";
import DarkMode from "./components/DarkMode.vue";

export default {
  name: "App",
  components: {
    GameGrid,
    Keyboard,
    DarkMode,
  },
  setup() {
    const {
      currentGuess,
      coloredGuesses,
      gameStatus,
      solution,
      maxAttempts,
      onKeyPress,
      getLetterStatus,
      restartGame,
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

    return {
      currentGuess,
      coloredGuesses,
      gameStatus,
      solution,
      maxAttempts,
      onKeyPress,
      getLetterStatus,
      restartGame,
      handleLetter,
      handleEnter,
      handleDelete,
    };
  },
};
</script>

<style>
#app {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}

.status {
  margin: 1rem 0;
  font-weight: bold;
}
</style>
