import { ref, computed, onMounted, watch } from "vue";
import { getRandomWord } from "./wordApi";

export function useGameLogic() {
  const solution = ref("");
  const currentGuess = ref("");
  const guesses = ref([]);
  const isExpertMode = ref(localStorage.getItem("expertMode") === "true");
  const maxAttempts = computed(() => (isExpertMode.value ? 5 : 6));
  const wordLength = computed(() => (isExpertMode.value ? 7 : 5));
  const gameStatus = ref("loading");

  // stats du jeu
  const gamesPlayed = ref(parseInt(localStorage.getItem("gamesPlayed") || "0"));
  const wins = ref(parseInt(localStorage.getItem("wins") || "0"));
  const currentStreak = ref(
    parseInt(localStorage.getItem("currentStreak") || "0")
  );

  // load le jeu depuis le localstorage
  function loadGameState() {
    const savedSolution = localStorage.getItem("currentSolution");
    const savedGuesses = localStorage.getItem("currentGuesses");
    const savedCurrentGuess = localStorage.getItem("currentGuess");
    const savedGameStatus = localStorage.getItem("gameStatus");

    if (savedSolution && savedGuesses && savedGameStatus) {
      solution.value = savedSolution;
      guesses.value = JSON.parse(savedGuesses);
      currentGuess.value = savedCurrentGuess || "";
      gameStatus.value = savedGameStatus;
    } else {
      fetchSolution();
    }
  }

  // save etat du jeu
  function saveGameState() {
    localStorage.setItem("currentSolution", solution.value);
    localStorage.setItem("currentGuesses", JSON.stringify(guesses.value));
    localStorage.setItem("currentGuess", currentGuess.value);
    localStorage.setItem("gameStatus", gameStatus.value);
  }

  // save stats
  function saveStats() {
    localStorage.setItem("gamesPlayed", gamesPlayed.value.toString());
    localStorage.setItem("wins", wins.value.toString());
    localStorage.setItem("currentStreak", currentStreak.value.toString());
  }

  async function fetchSolution() {
    try {
      gameStatus.value = "loading";
      const word = await getRandomWord(isExpertMode.value ? 7 : 5);
      solution.value = word;
      guesses.value = [];
      currentGuess.value = "";
      gameStatus.value = "playing";
      saveGameState();
    } catch (error) {
      gameStatus.value = "error";
    }
  }

  function toggleExpertMode() {
    isExpertMode.value = !isExpertMode.value;
    localStorage.setItem("expertMode", isExpertMode.value.toString());
    restartGame();
  }

  onMounted(loadGameState);

  // watch changement pour save l'état du jeu
  watch([guesses, currentGuess, gameStatus], () => {
    saveGameState();
  });

  function onKeyPress(key) {
    if (gameStatus.value !== "playing") return;

    if (key === "ENTER") {
      submitGuess();
    } else if (key === "DELETE") {
      currentGuess.value = currentGuess.value.slice(0, -1);
    } else if (
      /^[A-ZÀ-ÿ]$/.test(key) &&
      currentGuess.value.length < wordLength.value
    ) {
      currentGuess.value += key.toUpperCase();
    }
  }

  function submitGuess() {
    if (currentGuess.value.length !== wordLength.value) return;

    guesses.value.push(currentGuess.value);

    if (currentGuess.value === solution.value) {
      gameStatus.value = "win";
      wins.value++;
      currentStreak.value++;
      gamesPlayed.value++;
      saveStats();
    } else if (guesses.value.length >= maxAttempts.value) {
      gameStatus.value = "lose";
      currentStreak.value = 0;
      gamesPlayed.value++;
      saveStats();
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
    localStorage.removeItem("currentSolution");
    localStorage.removeItem("currentGuesses");
    localStorage.removeItem("currentGuess");
    localStorage.removeItem("gameStatus");
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
    wordLength,
    gamesPlayed,
    wins,
    currentStreak,
    isExpertMode,
    toggleExpertMode,
  };
}
