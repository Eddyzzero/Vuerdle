<template>
  <div class="space-y-2 motion-preset-expand motion-duration-1000 keyboard">
    <div class="grid grid-cols-10 gap-1 row" v-for="(row, i) in rows" :key="i">
      <KeyboardKey
        v-for="key in row"
        :key="key"
        :letter="key"
        :status="getLetterStatus(key)"
        :used="letterUsed(key)"
        @press="handlePress"
      />
    </div>
    <div class="grid grid-cols-10 gap-1 row">
      <KeyboardKey letter="↵" class="col-span-2" @press="$emit('enter')" />
      <KeyboardKey
        v-for="key in specialRow"
        :key="key"
        :letter="key"
        :status="getLetterStatus(key)"
        :used="letterUsed(key)"
        @press="handlePress"
      />
      <KeyboardKey
        letter="BACKSPACE"
        class="col-span-2"
        @press="$emit('delete')"
      />
    </div>
  </div>
</template>

<script>
import KeyboardKey from "./KeyboardKey.vue";

export default {
  name: "Keyboard",
  components: { KeyboardKey },
  props: {
    getLetterStatus: { type: Function, required: true },
    guesses: { type: Array, required: true },
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
      this.$emit("letter", letter);
    },
    letterUsed(letter) {
      return this.guesses.join("").includes(letter);
    },
  },
};
</script>
