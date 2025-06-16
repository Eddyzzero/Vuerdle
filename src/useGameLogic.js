import { ref, computed, onMounted, watch } from "vue";
import { getRandomWord } from "./wordApi";

/**
 * Messages du jeu selon la langue
 * Contient les textes pour les différents états du jeu (victoire, défaite, etc.)
 */
const messages = {
  en: {
    win: "Congratulations! You found the word!",
    lose: "Game Over! Try again!",
    invalidWord: "This word doesn't exist",
    error: "An error occurred",
  },
  fr: {
    win: "Félicitations ! Vous avez trouvé le mot !",
    lose: "Dommage, vous ferez mieux la prochaine fois !",
    invalidWord: "Ce mot n'existe pas",
    error: "Une erreur est survenue",
  },
};

/* gère toute la logique métier du jeu Vuerdle */
export function useGameLogic() {
  // état du jeu
  const solution = ref(""); // le mot à deviner
  const currentGuess = ref(""); // la tentative actuelle
  const guesses = ref([]); // historique des tentatives
  const isExpertMode = ref(localStorage.getItem("expertMode") === "true");
  const maxAttempts = computed(() => (isExpertMode.value ? 5 : 6)); // nbr d'essais selon le mode
  const wordLength = computed(() => (isExpertMode.value ? 7 : 5)); // longueur du mot selon le mode
  const gameStatus = ref("loading"); // état actuel du jeu
  const currentLanguage = ref(localStorage.getItem("gameLanguage") || "en");
  const errorMessage = ref("");

  // système d'indices
  const hintsRemaining = ref(2);
  const revealedHints = ref([]);
  const hintsUsed = ref(0);

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
    const savedHintsRemaining = localStorage.getItem("hintsRemaining");
    const savedRevealedHints = localStorage.getItem("revealedHints");
    const savedHintsUsed = localStorage.getItem("hintsUsed");

    if (savedSolution && savedGuesses && savedGameStatus) {
      solution.value = savedSolution;
      guesses.value = JSON.parse(savedGuesses);
      currentGuess.value = savedCurrentGuess || "";
      gameStatus.value = savedGameStatus;

      // Restaurer les indices seulement si on a une partie en cours
      if (savedGameStatus === "playing") {
        hintsUsed.value = parseInt(savedHintsUsed) || 0;
        hintsRemaining.value = Math.max(0, 2 - hintsUsed.value);
        revealedHints.value = JSON.parse(savedRevealedHints || "[]");
      } else {
        // Réinitialiser les indices si la partie est terminée
        hintsRemaining.value = 2;
        hintsUsed.value = 0;
        revealedHints.value = [];
      }
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
    localStorage.setItem("hintsRemaining", hintsRemaining.value.toString());
    localStorage.setItem("revealedHints", JSON.stringify(revealedHints.value));
    localStorage.setItem("hintsUsed", hintsUsed.value.toString());
  }

  // save stats
  function saveStats() {
    localStorage.setItem("gamesPlayed", gamesPlayed.value.toString());
    localStorage.setItem("wins", wins.value.toString());
    localStorage.setItem("currentStreak", currentStreak.value.toString());
  }

  /* récupère un nouveau mot aléatoire depuis l'API */
  async function fetchSolution() {
    try {
      gameStatus.value = "loading";
      const word = await getRandomWord(wordLength.value, currentLanguage.value);
      solution.value = word;
      guesses.value = [];
      currentGuess.value = "";
      gameStatus.value = "playing";
      saveGameState();
    } catch (error) {
      gameStatus.value = "error";
    }
  }

  /* toggle mode expert */
  function toggleExpertMode() {
    isExpertMode.value = !isExpertMode.value;
    localStorage.setItem("expertMode", isExpertMode.value.toString());
    restartGame();
  }

  // chargement initial du jeu
  onMounted(loadGameState);

  // watch changement pour save l'état du jeu
  watch(
    [
      guesses,
      currentGuess,
      gameStatus,
      hintsRemaining,
      revealedHints,
      hintsUsed,
    ],
    () => {
      saveGameState();
    }
  );

  // Réinitialiser les indices quand la partie est terminée
  watch(gameStatus, (newStatus) => {
    if (newStatus === "win" || newStatus === "lose") {
      hintsRemaining.value = 2;
      hintsUsed.value = 0;
      revealedHints.value = [];
    }
  });

  /* gère les entrées clavier du joueur */
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

  // Fonction pour changer la langue
  async function changeLanguage(newLang) {
    currentLanguage.value = newLang;
    localStorage.setItem("gameLanguage", newLang);
    await restartGame();
  }

  async function submitGuess() {
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

  /* statut de la lettre (correct, present, absent) */
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

  /* calcule les couleurs pour chaque lettre des tentatives */
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

  /* utiliser un indice pour révéler une lettre du mot */
  function useHint() {
    if (hintsUsed.value >= 2 || gameStatus.value !== "playing") {
      return;
    }

    // créer un tableau des lettres déjà révélées
    const revealedLetters = new Set(
      revealedHints.value.map((hint) => hint.letter)
    );

    // trouver les positions disponibles (non révélées)
    const availablePositions = Array.from(
      { length: solution.value.length },
      (_, i) => i
    ).filter(
      (pos) => !revealedHints.value.some((hint) => hint.position === pos)
    );

    // filtrer les positions pour ne garder que celles dont la lettre n'a pas encore été révélée
    const validPositions = availablePositions.filter(
      (pos) => !revealedLetters.has(solution.value[pos])
    );

    if (validPositions.length > 0) {
      // random pos là où valide
      const randomIndex = Math.floor(Math.random() * validPositions.length);
      const position = validPositions[randomIndex];
      const letter = solution.value[position];

      // nouvel indice
      revealedHints.value.push({ letter, position });
      hintsUsed.value++;
      hintsRemaining.value = Math.max(0, 2 - hintsUsed.value);
      saveGameState();
    }
  }

  function restartGame() {
    localStorage.removeItem("currentSolution");
    localStorage.removeItem("currentGuesses");
    localStorage.removeItem("currentGuess");
    localStorage.removeItem("gameStatus");
    localStorage.removeItem("hintsRemaining");
    localStorage.removeItem("revealedHints");
    localStorage.removeItem("hintsUsed");
    hintsRemaining.value = 2;
    hintsUsed.value = 0;
    revealedHints.value = [];
    fetchSolution();
  }

  return {
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
    messages: computed(() => messages[currentLanguage.value]),
  };
}
