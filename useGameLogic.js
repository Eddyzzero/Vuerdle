import { ref, computed, onMounted } from "vue";
import { getRandomWord } from "./wordApi";

export function useGameLogic() {
  const solution = ref("");
  const currentGuess = ref("");
  const guesses = ref([]);
  const maxAttempts = 6;
  const gameStatus = ref("loading");

  async function fetchSolution() {
    try {
      gameStatus.value = "loading";
      const word = await getRandomWord();
      solution.value = word;
      guesses.value = [];
      currentGuess.value = "";
      gameStatus.value = "playing";
    } catch (error) {
      gameStatus.value = "error";
    }
  }

  onMounted(fetchSolution);

  function onKeyPress(key) {
    if (gameStatus.value !== "playing") return;

    if (key === "ENTER") {
      submitGuess();
    } else if (key === "DELETE") {
      currentGuess.value = currentGuess.value.slice(0, -1);
    } else if (/^[A-ZÀ-ÿ]$/.test(key) && currentGuess.value.length < 5) {
      currentGuess.value += key.toUpperCase();
    }
  }

  function submitGuess() {
    if (currentGuess.value.length !== 5) return;

    guesses.value.push(currentGuess.value);

    if (currentGuess.value === solution.value) {
      gameStatus.value = "win";
    } else if (guesses.value.length >= maxAttempts) {
      gameStatus.value = "lose";
    }

    currentGuess.value = "";
  }

  function getLetterStatus(letter) {
    letter = letter.toUpperCase();
    let foundCorrect = false;
    let foundPresent = false;

    for (const guess of guesses.value) {
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === letter) {
          if (solution.value[i] === letter) {
            foundCorrect = true;
          } else if (solution.value.includes(letter)) {
            foundPresent = true;
          }
        }
      }
    }

    if (foundCorrect) return "correct";
    if (foundPresent) return "present";
    return "absent";
  }

  const coloredGuesses = computed(() => {
    return guesses.value.map((guess) => {
      return guess.split("").map((letter, index) => {
        let status = "absent";
        if (solution.value[index] === letter) {
          status = "correct";
        } else if (solution.value.includes(letter)) {
          status = "present";
        }
        return { letter, status };
      });
    });
  });

  function restartGame() {
    fetchSolution();
  }

  return {
    currentGuess,
    guesses,
    coloredGuesses,
    gameStatus,
    solution,
    onKeyPress,
    getLetterStatus,
    restartGame,
    maxAttempts,
  };
}
