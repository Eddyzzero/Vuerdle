// Fonction pour nettoyer un mot : retirer les accents et mettre en majuscule
function cleanWord(word) {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
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

// Liste de mots de secours en cas d'échec de l'API
const FALLBACK_WORDS = {
  en: [
    "APPLE",
    "BEACH",
    "CLOUD",
    "DREAM",
    "EARTH",
    "FLAME",
    "GRASS",
    "HEART",
    "JUICE",
    "KNIFE",
    "LIGHT",
    "MONEY",
    "NIGHT",
    "OCEAN",
    "PEACE",
  ],
  fr: [
    "ARBRE",
    "BONHEUR",
    "CHANCE",
    "DROLE",
    "ETOILE",
    "FLEUR",
    "GENTIL",
    "HIVER",
    "JARDIN",
    "LIVRE",
    "MUSIQUE",
    "NATURE",
    "OISEAU",
    "PLAGE",
    "QUIET",
  ],
};

// API pour obtenir un mot aléatoire
export async function getRandomWord(length = 5, lang = "en") {
  try {
    // Vérifier si la langue est supportée
    if (!API_CONFIG[lang]) {
      console.warn(`langue ${lang} non supportée, retour au français`);
      lang = "fr";
    }

    const response = await fetch(API_CONFIG[lang].randomWord(length));
    const data = await response.json();

    if (data && data[0]) {
      return cleanWord(data[0]);
    }

    throw new Error("Format de réponse invalide");
  } catch (error) {
    console.warn(
      "Utilisation de la liste de mots de secours suite à l'échec de l'API"
    );
    // Utiliser la liste de secours en cas d'échec
    const fallbackList = FALLBACK_WORDS[lang] || FALLBACK_WORDS.fr;
    const randomIndex = Math.floor(Math.random() * fallbackList.length);
    return fallbackList[randomIndex];
  }
}
