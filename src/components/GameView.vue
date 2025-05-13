<template>
  <div class="game-view" :class="theme">
    <h1>Vuerdle</h1>

    <div class="board">
      <div
        v-for="(attempt, index) in displayedAttempts"
        :key="index"
        class="attempt"
      >
        <span
          v-for="(letter, i) in attempt"
          :key="i"
          :class="getLetterStatus(letter, index)"
        >
          {{ letter }}
        </span>
      </div>
    </div>

    <p class="status">{{ statusMessage }}</p>

    <Keyboard :keyStatuses="gameState.keyStatuses" @key-press="handleKeyPress" />

    <button v-if="gameState.gameStatus !== 'playing'" @click="restartGame">
      Rejouer
    </button>
    <button @click="toggleTheme">Thème : {{ theme }}</button>
  </div>
</template>

<script>
import Keyboard from './keyboard.vue';
import {
  loadGameState,
  saveGameState,
  defaultGameState,
  clearGameState,
} from '../services/storageService.js';

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

export default {
  name: 'GameView',
  components: {
    Keyboard,
  },
  data() {
    return {
      gameState: { ...defaultGameState },
      currentAttempt: '',
    };
  },
  computed: {
    theme() {
      return this.gameState.theme;
    },
    displayedAttempts() {
      const filledAttempts = this.gameState.attempts.slice();
      if (
        this.gameState.gameStatus === 'playing' &&
        this.currentAttempt.length > 0 &&
        filledAttempts.length < MAX_ATTEMPTS
      ) {
        filledAttempts.push(this.currentAttempt.padEnd(WORD_LENGTH, ' '));
      }
      while (filledAttempts.length < MAX_ATTEMPTS) {
        filledAttempts.push(' '.repeat(WORD_LENGTH));
      }
      return filledAttempts;
    },
    statusMessage() {
      switch (this.gameState.gameStatus) {
        case 'won':
          return 'Bravo ! 🎉';
        case 'lost':
          return `Dommage ! Le mot était "${this.gameState.targetWord}".`;
        default:
          return '';
      }
    },
  },
  mounted() {
    const saved = loadGameState();
    if (saved) this.gameState = saved;
  },
  methods: {
    handleKeyPress(key) {
      if (this.gameState.gameStatus !== 'playing') return;

      if (key === 'ENTER') {
        if (this.currentAttempt.length === WORD_LENGTH) {
          this.submitAttempt();
        }
      } else if (key === 'BACKSPACE') {
        this.currentAttempt = this.currentAttempt.slice(0, -1);
      } else if (
        key.length === 1 &&
        /^[A-Z]$/.test(key) &&
        this.currentAttempt.length < WORD_LENGTH
      ) {
        this.currentAttempt += key;
      }
    },
    submitAttempt() {
      const attempt = this.currentAttempt.toUpperCase();
      this.gameState.attempts.push(attempt);
      this.updateKeyStatuses(attempt);

      if (attempt === this.gameState.targetWord) {
        this.gameState.gameStatus = 'won';
      } else if (this.gameState.attempts.length >= MAX_ATTEMPTS) {
        this.gameState.gameStatus = 'lost';
      }

      this.currentAttempt = '';
      saveGameState(this.gameState);
    },
    updateKeyStatuses(attempt) {
      for (let i = 0; i < attempt.length; i++) {
        const letter = attempt[i];
        const target = this.gameState.targetWord[i];

        if (letter === target) {
          this.gameState.keyStatuses[letter] = 'correct';
        } else if (
          this.gameState.targetWord.includes(letter) &&
          this.gameState.keyStatuses[letter] !== 'correct'
        ) {
          this.gameState.keyStatuses[letter] = 'present';
        } else if (!this.gameState.keyStatuses[letter]) {
          this.gameState.keyStatuses[letter] = 'absent';
        }
      }
    },
    restartGame() {
      clearGameState();
      this.gameState = { ...defaultGameState };
      this.currentAttempt = '';
    },
    toggleTheme() {
      this.gameState.theme = this.gameState.theme === 'light' ? 'dark' : 'light';
      saveGameState(this.gameState);
    },
    getLetterStatus(letter, rowIndex) {
      if (rowIndex >= this.gameState.attempts.length) return '';
      const attempt = this.gameState.attempts[rowIndex];
      const correct = this.gameState.targetWord[rowIndex];
      if (letter === correct) return 'correct';
      if (this.gameState.targetWord.includes(letter)) return 'present';
      return 'absent';
    },
  },
};
</script>

<style scoped>
.game-view {
  max-width: 500px;
  margin: auto;
  padding: 1rem;
  text-align: center;
}
.board {
  margin: 1rem 0;
}
.attempt {
  display: flex;
  justify-content: center;
  margin: 0.25rem 0;
}
.attempt span {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  margin: 0 0.1rem;
  line-height: 2rem;
  text-align: center;
  border: 2px solid #ccc;
  text-transform: uppercase;
}
.correct {
  background-color: #4caf50;
  color: white;
}
.present {
  background-color: #ffc107;
  color: white;
}
.absent {
  background-color: #9e9e9e;
  color: white;
}
.status {
  font-weight: bold;
  margin-bottom: 1rem;
}
.dark {
  background-color: #121212;
  color: white;
}
</style>