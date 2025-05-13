<template>
  <div class="keyboard">
    <div class="row" v-for="(row, rowIndex) in rows" :key="rowIndex">
      <KeyboardKey v-for="key in row" :key="key" :letter="key" :status="keyStatuses[key]" @press="emitKey" />
    </div>
    <div class="row">
      <KeyboardKey letter="ENTER" @press="emitKey" />
      <KeyboardKey v-for="key in specialRow" :key="key" :letter="key" :status="keyStatuses[key]" @press="emitKey" />
      <KeyboardKey letter="BACKSPACE" @press="emitKey" />
    </div>
  </div>
</template>

<script>
import KeyboardKey from './KeyboardKey.vue';

export default {
  name: 'Keyboard',
  props: {
    keyStatuses: {
      type: Object,
      required: true
    },
    letter: {
      type: String,
      required: true
    }
  },
  components: {
    KeyboardKey,
  },
  data() {
    return {
      rows: [
        ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
      ],
      specialRow: ['W', 'X', 'C', 'V', 'B', 'N'],
    };
  },
  methods: {
    emitKey(key) {
      this.$emit('key-press', key);
    },
  },
};
</script>

<style scoped>
.keyboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.row {
  display: flex;
  gap: 0.25rem;
}
</style>