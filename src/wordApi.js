// Fonction pour nettoyer un mot : retirer les accents et mettre en majuscule
function cleanWord(word) {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}

// API Random Word
export async function getRandomWord(length = 5) {
  try {
    const response = await fetch(
      `https://random-word-api.herokuapp.com/word?lang=fr&number=1&length=${length}`
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
