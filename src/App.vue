<template>
  <div
    class="p-8 flex gap-4 bg-gray-100 min-h-screen items-center justify-center"
  >
    <LetterBox letter="A" status="correct" />
    <LetterBox letter="B" status="present" />
    <LetterBox letter="C" status="absent" />
    <LetterBox letter="D" status="" />
    <LetterBox letter="" status="" />
  </div>
</template>

<script setup>
import LetterBox from "./components/LetterBox.vue";
</script>
<style lang=""></style>
