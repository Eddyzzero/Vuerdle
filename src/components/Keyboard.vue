<template>
  <div class="keyboard">
<<<<<<< HEAD
    <div class="row">
      <KeyboardKey
        v-for="key in row1"
        :key="key"
        :letter="key"
        :status="getLetterStatus(key)"
        @press="handleKey"
      />
    </div>
    <div class="row">
      <KeyboardKey
        v-for="key in row2"
        :key="key"
        :letter="key"
        :status="getLetterStatus(key)"
        @press="handleKey"
      />
    </div>
    <div class="row">
      <KeyboardKey letter="ENTER" @press="$emit('enter')" />
      <KeyboardKey
        v-for="key in row3"
        :key="key"
        :letter="key"
        :status="getLetterStatus(key)"
        @press="handleKey"
      />
      <KeyboardKey letter="BACKSPACE" @press="$emit('delete')" />
=======
    <div class="row" v-for="(row, i) in rows" :key="i">
      <KeyboardKey v-for="key in row" :key="key" :letter="key" :status="keyStatuses[key]" @press="handlePress" />
    </div>
    <div class="row">
      <KeyboardKey letter="ENTER" @press="handlePress" />
      <KeyboardKey v-for="key in specialRow" :key="key" :letter="key" :status="keyStatuses[key]" @press="handlePress" />
      <KeyboardKey letter="BACKSPACE" @press="handlePress" />
>>>>>>> 8204dd7fc025fb75392190d79ee2d3df5969ea9e
    </div>
  </div>
</template>

<script>
import KeyboardKey from "./KeyboardKey.vue";

export default {
  name: "Keyboard",
  components: {
    KeyboardKey,
  },
  props: {
    getLetterStatus: {
      type: Function,
      required: true,
    },
  },
  emits: ["letter", "enter", "delete"],
  data() {
    return {
      row1: ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
      row2: ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
      row3: ["W", "X", "C", "V", "B", "N"],
    };
  },
  methods: {
    handleKey(letter) {
      this.$emit("letter", letter);
    },
  },
};
</script>

<style scoped>
.keyboard {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-top: 1rem;
}
.row {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 0.25rem;
}
</style>
