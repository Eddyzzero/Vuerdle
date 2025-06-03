// Fonction pour nettoyer un mot : retirer les accents et mettre en majuscule
function cleanWord(word) {
  return word.toUpperCase();
}

// API Random Word
export async function getRandomWord() {
  try {
    const response = await fetch(
      "https://random-word-api.herokuapp.com/word?lang=en&number=1&length=5"
    );
    const data = await response.json();

    // L'API retourne un tableau avec un seul mot
    if (data && data[0]) {
      return cleanWord(data[0]);
    }
    throw new Error("Format de réponse invalide");
  } catch (error) {
    console.error("Erreur lors de la récupération du mot:", error);
    throw error;
  }
}

// Vérification de l'existence du mot avec l'API Free Dictionary
export async function checkWordExists(word) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`
    );
    const data = await response.json();

    if (response.ok && data.length > 0) {
      return {
        exists: true,
        message: "Valid word",
      };
    } else {
      return {
        exists: false,
        message: "This word doesn't exist",
      };
    }
  } catch (error) {
    console.error("Error checking word:", error);
    return {
      exists: false,
      message: "Unable to verify the word at the moment",
    };
  }
}
