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

      <Keyboard :keyStatuses="keyStatuses" @key-press="handleKeyPress" />
    </main>

    <Modal :is-open="showModal" :word="currentWord" :message="modalMessage" @close="closeModal"
      @next-word="startNewGame" />
  </div>
</template>

<script>

import Word from "./components/Word.vue";
import LetterBox from "./components/LetterBox.vue";
import Modal from "./components/Modal.vue";
import Keyboard from "./components/keyboard.vue";
import DarkMode from "./components/DarkMode.vue";

export default {
  name: "App",
  components: {
    Keyboard,
    Word,
    LetterBox,
    Modal,
    DarkMode
  },
  data() {
    return {
      keyStatuses: {
        A: "correct",
        E: "present",
        M: "absent",
      },
      showModal: false,
      currentWord: '',
      modalMessage: '',
    };
  },
  created() {
    // Vérifier l'URL au chargement
    const urlParams = new URLSearchParams(window.location.search);
    const showDemo = urlParams.get('demo');
    if (showDemo === 'true') {
      this.showWordModal('VUERDLE', true);
    }
  },
  methods: {
    handleKeyPress(letter) {
      console.log("Touche appuyée :", letter);
    },
    showWordModal(word, isSuccess) {
      this.currentWord = word;
      this.modalMessage = isSuccess
        ? 'Félicitations ! Vous avez trouvé le mot !'
        : 'Dommage, vous ferez mieux la prochaine fois.';
      this.showModal = true;

      // Mettre à jour l'URL
      const url = new URL(window.location);
      url.searchParams.set('demo', 'true');
      window.history.pushState({}, '', url);
    },
    closeModal() {
      this.showModal = false;
      // Retirer le paramètre de l'URL
      const url = new URL(window.location);
      url.searchParams.delete('demo');
      window.history.pushState({}, '', url);
    },
    startNewGame() {
      this.showModal = false;
      // Réinitialiser le jeu ici
      this.currentWord = '';
      this.modalMessage = '';
      // Retirer le paramètre de l'URL
      const url = new URL(window.location);
      url.searchParams.delete('demo');
      window.history.pushState({}, '', url);

    },

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
  }
};
</script>

<style scoped>
.app {
  min-height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
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
