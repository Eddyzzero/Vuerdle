<template>
  <button class="keyboard-key" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup lang="ts"></script>

<style scoped>
.keyboard-key {
  width: 40px;
  height: 40px;
  margin: 2px;
  background-color: #ddd;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.keyboard-key:hover {
  background-color: #ccc;
}

/* Mode sombre */
body.dark .keyboard-key {
  background-color: #444;
  color: white;
}
body.dark .keyboard-key:hover {
  background-color: #666;
}
</style>