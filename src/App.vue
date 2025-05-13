<template>
    <header class="flex justify-center items-center h-16">
        <h1>Vuerdle</h1>
    </header>

    <main>
        <Word />
        <div class="p-8 flex gap-4 bg-gray-100 min-h-screen items-center justify-center">
            <LetterBox letter="A" status="correct" />
            <LetterBox letter="B" status="present" />
            <LetterBox letter="C" status="absent" />
            <LetterBox letter="D" status="" />
            <LetterBox letter="" status="" />
        </div>
    </main>
</template>

<script>
import Word from "./components/Word.vue";
import LetterBox from "./components/LetterBox.vue";

export default {
    name: "App",

    components: {
        Word,
        LetterBox,
    },
};
</script>
