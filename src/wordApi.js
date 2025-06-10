// Fonction pour nettoyer un mot : retirer les accents et mettre en majuscule
function cleanWord(word) {
  return word.toUpperCase();
}

// Configuration des APIs par langue
const API_CONFIG = {
  en: {
    randomWord:
      "https://random-word-api.herokuapp.com/word?lang=en&number=1&length=5",
    checkWord: (word) =>
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`,
  },
  fr: {
    randomWord: "https://trouve-mot.fr/api/size/5",
    checkWord: (word) =>
      `https://www.larousse.fr/dictionnaires/francais/${word.toLowerCase()}`,
  },
};

// API pour obtenir un mot aléatoire
export async function getRandomWord(lang = "en") {
  try {
    // Vérifier si la langue est supportée
    if (!API_CONFIG[lang]) {
      console.warn(`langue ${lang} non supportée, retour au français`);
      lang = "fr";
    }

    const response = await fetch(API_CONFIG[lang].randomWord);
    const data = await response.json();

    if (lang === "en" && data && data[0]) {
      return cleanWord(data[0]);
    } else if (lang === "fr" && data && data[0] && data[0].name) {
      return cleanWord(data[0].name);
    }

    throw new Error("Format de réponse invalide");
  } catch (error) {
    console.error("Erreur lors de la récupération du mot:", error);
    throw error;
  }
}

// Vérification de l'existence du mot
export async function checkWordExists(word, lang = "en") {
  try {
    const response = await fetch(API_CONFIG[lang].checkWord(word));

    if (lang === "en") {
      const data = await response.json();
      return {
        exists: response.ok && data.length > 0,
        message: response.ok ? "Valid word" : "This word doesn't exist",
      };
    } else {
      // Pour le français, on vérifie juste si la page existe
      return {
        exists: response.ok,
        message: response.ok ? "Mot valide" : "Ce mot n'existe pas",
      };
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du mot:", error);
    const message =
      lang === "en"
        ? "Unable to verify the word at the moment"
        : "Impossible de vérifier le mot pour le moment";
    return { exists: false, message };
  }
}
