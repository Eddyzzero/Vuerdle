<template>
  <div class="keyboard">
    <div
      class="keyboard-row"
      v-for="(row, rowIndex) in rows"
      :key="rowIndex"
    >
      <KeyboardKey
        v-for="key in row"
        :key="key"
        @click="$emit('key-click', key)"
      >
        {{ key }}
      </KeyboardKey>
    </div>
  </div>
</template>

<script setup lang="ts">
import KeyboardKey from './KeyboardKey.vue'

const rows = [
  ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
  ['⌫', 'W', 'X', 'C', 'V', 'B', 'N', '⏎']
]
</script>

<style scoped>
.keyboard {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.keyboard-row {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
}
</style>