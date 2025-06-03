
function cleanWord(word) {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}

// API Trouve-Mot
export async function getRandomWord() {
  try {
    const response = await fetch("https://trouve-mot.fr/api/size/5");
    const data = await response.json();

    // L'API retourne un tableau avec un seul objet contenant le mot
    if (data && data[0] && data[0].name) {
      return cleanWord(data[0].name);
    }
    throw new Error("Format de réponse invalide");
  } catch (error) {
    console.error("Erreur lors de la récupération du mot:", error);
    throw error;
  }
}
