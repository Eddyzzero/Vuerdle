// Fonction pour nettoyer un mot : retirer les accents et mettre en majuscule
//avec les metheodes de String.normalize et replace
function cleanWord(word) {
  return (
    word
      // ceci a ete trouvé sur https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase()
  );
}

// Configuration des APIs par langue
const API_CONFIG = {
  en: {
    randomWord: (length) =>
      `https://random-word-api.herokuapp.com/word?lang=en&number=1&length=${length}`,
  },
  fr: {
    randomWord: (length) =>
      `https://random-word-api.herokuapp.com/word?lang=fr&number=1&length=${length}`,
  },
};

// API pour obtenir un mot aléatoire
export async function getRandomWord(length = 5, lang = "en") {
  try {
    // Vérifier si la langue est supportée
    if (!API_CONFIG[lang]) {
      console.warn(`langue ${lang} non supportée, retour au français`);
      lang = "fr";
    }

    //
    const response = await fetch(API_CONFIG[lang].randomWord(length));
    const data = await response.json();

    /* Vérifier si la réponse contient un mot et nettoyer le mot */
    if (data && data[0]) {
      return cleanWord(data[0]);
    }

    throw new Error("Format de réponse invalide");
  } catch (error) {
    console.error("Erreur lors de la récupération du mot:", error);
    throw error;
  }
}
