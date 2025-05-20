<template>
  <main>
    <button class="toggle-button" @click="toggleDarkMode">
      {{ isDark ? ' Mode clair' : ' Mode sombre' }}
    </button>
    <Word :letters="currentLetters" />
    <Keyboard @key-click="handleKeyClick" />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Word from './components/Word.vue'
import Keyboard from './components/keyboard.vue'

const currentLetters = ref<string[]>([])
const isDark = ref(false)

function handleKeyClick(key: string) {
  if (key === '⌫') {
    currentLetters.value.pop()
  } else if (key === '⏎') {
  } else if (currentLetters.value.length < 5) {
    currentLetters.value.push(key)
  }
}

function toggleDarkMode() {
  isDark.value = !isDark.value
  document.body.classList.toggle('dark', isDark.value)
}

onMounted(() => {
  document.body.classList.toggle('dark', isDark.value)
})
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  gap: 20px;
}

.toggle-button {
  padding: 8px 16px;
  border: none;
  background-color: #333;
  color: white;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
}

body.dark {
  background-color: #121212;
  color: #f0f0f0;
}

:global(body) {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background-color: #f7f7f7;
  color: #111;
  transition: background-color 0.3s, color 0.3s;
}

:global(body.dark) {
  background-color: #121212;
  color: #f0f0f0;
}
</style>