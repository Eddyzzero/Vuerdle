<template>
    <header class=" flex justify-center items-center h-16">
        <h1>Vuerdle</h1>
    </header>

    <main>
        <Word />
    </main>
</template>


<script>

import Word from './components/Word.vue';

export default {
    name: 'App',

    components: {
        Word,
    },
}
</script>
