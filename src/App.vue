<template>
  <div class="app">
    <header class="header">
      <h1 class="color">Vuerdle</h1>
    </header>

    <main class="main">
      <Word class="color" />

      <!-- gamegrid -->
      <GameGrid :guesses="guesses" />

      <!-- keyboard -->
      <Keyboard :keyStatuses="keyStatuses" @key-press="handleKeyPress" />
    </main>
  </div>
</template>

<script>
import Word from "./components/Word.vue";
import Keyboard from "./components/Keyboard.vue";
import LetterBox from "./components/LetterBox.vue";
import GameGrid from "./components/GameGrid.vue";
import { getRandomWord } from "../wordApi";

export default {
  name: "App",
  components: {
    Word,
    Keyboard,
    LetterBox,
    GameGrid,
  },
  data() {
    return {
      wordToGuess: "",
      currentAttemptIndex: 0,
      guesses: Array(6)
        .fill()
        .map(() => ({
          letters: Array(5).fill(""),
          statuses: Array(5).fill(null),
        })),
      keyStatuses: {},
    };
  },
  async created() {
    try {
      const word = await getRandomWord();
      this.wordToGuess = word;
      console.log("Mot à deviner :", word);
    } catch (e) {
      console.error("Erreur chargement mot :", e);
    }
  },
  methods: {
    handleKeyPress(letter) {
      const current = this.guesses[this.currentAttemptIndex];

      if (letter === "BACKSPACE") {
        const lastFilled = current.letters.lastIndexOf("") - 1;
        if (lastFilled >= 0) current.letters[lastFilled] = "";
        else {
          const lastIndex = current.letters.findLastIndex((l) => l !== "");
          if (lastIndex !== -1) current.letters[lastIndex] = "";
        }
      } else if (letter === "ENTER") {
        if (current.letters.every((l) => l !== "")) {
          this.validateWord();
        }
      } else {
        const firstEmpty = current.letters.indexOf("");
        if (firstEmpty !== -1) current.letters[firstEmpty] = letter;
      }
    },
    validateWord() {
      const current = this.guesses[this.currentAttemptIndex];
      const statuses = Array(5).fill(null);
      const target = this.wordToGuess.split("");
      const guess = [...current.letters];
      const used = Array(5).fill(false);

      // lettres ok
      for (let i = 0; i < 5; i++) {
        if (guess[i] === target[i]) {
          statuses[i] = "correct";
          used[i] = true;
        }
      }

      // lettre ok mais mal placé
      for (let i = 0; i < 5; i++) {
        if (statuses[i]) continue;
        const index = target.findIndex(
          (l, idx) => l === guess[i] && !used[idx]
        );
        if (index !== -1) {
          statuses[i] = "present";
          used[index] = true;
        } else {
          statuses[i] = "absent";
        }
      }

      this.guesses[this.currentAttemptIndex].statuses = statuses;

      guess.forEach((letter, i) => {
        const status = statuses[i];
        this.keyStatuses[letter] = status;
      });

      this.currentAttemptIndex++;
    },
  },
};
</script>

<style scoped>
.app {
  background-color: #fef4dc;
  min-height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 24px;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  padding-bottom: 40px;
}

.color {
  color: black;
}
</style>
