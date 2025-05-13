// Fonction pour nettoyer un mot : retirer les accents et mettre en majuscule
function cleanWord(word) {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}

// Ce fichier contient la fonction pour récupérer un mot aléatoire depuis l'API Trouve-Mot
export async function getRandomWord() {
  try {
    const response = await fetch("https://trouve-mot.fr/api/size/5");
    const data = await response.json();

    // L'API retourne un tableau avec un seul objet contenant le mot
    if (data && data[0] && data[0].name) {
      return data[0].name.toUpperCase();
    }
    throw new Error("Format de réponse invalide");
  } catch (error) {
    console.error("Erreur lors de la récupération du mot:", error);
    throw error;
  }
}
