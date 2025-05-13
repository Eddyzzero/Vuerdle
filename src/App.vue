<template>
  <div class="app">
    <header class="header">
      <h1 class="color">Vuerdle</h1>
    </header>

    <main class="main">
      <Word class="color" />
      <div style="display: flex; gap: 8px">
        <LetterBox :letter="'V'" :status="'correct'" />
        <LetterBox :letter="'U'" :status="'present'" />
        <LetterBox :letter="'E'" :status="'absent'" />
        <LetterBox :letter="'R'" :status="null" />
        <LetterBox :letter="'D'" :status="null" />
      </div>

      <Keyboard :keyStatuses="keyStatuses" @key-press="handleKeyPress" />
    </main>
  </div>
</template>

<script>
import Keyboard from "./components/Keyboard.vue";
import Word from "./components/Word.vue";
import LetterBox from "./components/LetterBox.vue";

export default {
  name: "App",
  components: {
    Keyboard,
    Word,
    LetterBox,
  },
  data() {
    return {
      keyStatuses: {
        A: "correct",
        E: "present",
        M: "absent",
      },
    };
  },
  methods: {
    handleKeyPress(letter) {
      console.log("Touche appuyée :", letter);
    },
  },
};
</script>

<style scoped>
.app {
  background-color: #fef4dc;
  min-height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 24px;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  padding-bottom: 40px;
}

.color {
  color: black;
}
</style>
