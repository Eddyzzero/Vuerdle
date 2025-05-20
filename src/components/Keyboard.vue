<template>
  <div class="keyboard">
    <div class="row" v-for="(row, i) in rows" :key="i">
      <KeyboardKey v-for="key in row" :key="key" :letter="key" :status="keyStatuses[key]" @press="handlePress" />
    </div>
    <div class="row">
      <KeyboardKey letter="ENTER" @press="handlePress" />
      <KeyboardKey v-for="key in specialRow" :key="key" :letter="key" :status="keyStatuses[key]" @press="handlePress" />
      <KeyboardKey letter="BACKSPACE" @press="handlePress" />
    </div>
  </div>
</template>

<script>
import KeyboardKey from "./KeyboardKey.vue";

export default {
  name: "Keyboard",
  components: { KeyboardKey },
  props: {
    keyStatuses: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      rows: [
        ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
      ],
      specialRow: ["W", "X", "C", "V", "B", "N"],
    };
  },
  methods: {
    handlePress(letter) {
      this.$emit("key-press", letter);
    },
  },
};
</script>

<style scoped>
.keyboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-top: 20px;
}

.row {
  display: flex;
  justify-content: center;
}
</style>
