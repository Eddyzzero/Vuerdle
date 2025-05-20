<template>
  <div class="app min-h-screen transition-colors duration-200 dark:bg-gray-900">
    <header class="header">
      <h1 class="text-gray-900 dark:text-white font-bold text-4xl">Vuerdle</h1>
      <DarkMode />
    </header>

    <main class="main">
      <Word class="text-gray-900 dark:text-white" />
      <div class="flex gap-2">
        <LetterBox :letter="'V'" :status="'correct'" />
        <LetterBox :letter="'U'" :status="'present'" />
        <LetterBox :letter="'E'" :status="'absent'" />
        <LetterBox :letter="'R'" :status="null" />
        <LetterBox :letter="'D'" :status="null" />
      </div>
    </main>
    <div id="app">
      <h1>Vuerdle</h1>

      <GameGrid :guesses="coloredGuesses" :currentGuess="currentGuess" :maxAttempts="maxAttempts" />

      <Keyboard @letter="handleLetter" @enter="handleEnter" @delete="handleDelete" :getLetterStatus="getLetterStatus" />

      <div v-if="gameStatus === 'win'" class="status">Bravo, tu as gagné !</div>
      <div v-else-if="gameStatus === 'lose'" class="status">
        Perdu ! Le mot était : {{ solution }}
      </div>
      <div v-else-if="gameStatus === 'loading'" class="status">Chargement...</div>
      <div v-else-if="gameStatus === 'error'" class="status">
        Erreur lors du chargement du mot
      </div>

      <button @click="restartGame">Rejouer</button>
    </div>
  </div>
</template>

<script>
import { useGameLogic } from "../useGameLogic";
import GameGrid from "./components/GameGrid.vue";
import Keyboard from "./components/Keyboard.vue";

export default {
  name: "App",
  components: {
    GameGrid,
    Keyboard,
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
