// 📁 storageService.js

const STORAGE_KEY = 'vuerdle-game-state';

function isLocalStorageAvailable() {
  try {
    const test = '__test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

export function saveGameState(state) {
  if (!isLocalStorageAvailable()) return;
  try {
    const json = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, json);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde :', error);
  }
}

export function loadGameState() {
  if (!isLocalStorageAvailable()) return null;
  try {
    const json = localStorage.getItem(STORAGE_KEY);
    const state = json ? JSON.parse(json) : null;
    if (
      state &&
      typeof state === 'object' &&
      Array.isArray(state.attempts) &&
      typeof state.targetWord === 'string'
    ) {
      return state;
    }
    return null;
  } catch (error) {
    console.error('Erreur lors du chargement :', error);
    return null;
  }
}

export function clearGameState() {
  if (!isLocalStorageAvailable()) return;
  localStorage.removeItem(STORAGE_KEY);
}

export const defaultGameState = {
  targetWord: '',
  attempts: [],
  keyStatuses: {},
  theme: 'light',
  gameStatus: 'playing'
};