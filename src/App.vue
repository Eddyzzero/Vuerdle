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

        <Modal :is-open="showModal" :word="currentWord" :message="modalMessage" @close="closeModal"
            @next-word="startNewGame" />
    </div>
</template>

<script>

import Word from "./components/Word.vue";
import LetterBox from "./components/LetterBox.vue";
import Modal from "./components/Modal.vue";
import Keyboard from "./components/Keyboard.vue";

export default {
    name: "App",
    components: {
        Keyboard,
        Word,
        LetterBox,
        Modal
    },
    data() {
        return {
            keyStatuses: {
                A: "correct",
                E: "present",
                M: "absent",
            },
            showModal: false,
            currentWord: '',
            modalMessage: '',
        };
    },
    created() {
        // Vérifier l'URL au chargement
        const urlParams = new URLSearchParams(window.location.search);
        const showDemo = urlParams.get('demo');
        if (showDemo === 'true') {
            this.showWordModal('VUERDLE', true);
        }
    },
    methods: {
        handleKeyPress(letter) {
            console.log("Touche appuyée :", letter);
        },
        showWordModal(word, isSuccess) {
            this.currentWord = word;
            this.modalMessage = isSuccess
                ? 'Félicitations ! Vous avez trouvé le mot !'
                : 'Dommage, vous ferez mieux la prochaine fois.';
            this.showModal = true;

            // Mettre à jour l'URL
            const url = new URL(window.location);
            url.searchParams.set('demo', 'true');
            window.history.pushState({}, '', url);
        },
        closeModal() {
            this.showModal = false;
            // Retirer le paramètre de l'URL
            const url = new URL(window.location);
            url.searchParams.delete('demo');
            window.history.pushState({}, '', url);
        },
        startNewGame() {
            this.showModal = false;
            // Réinitialiser le jeu ici
            this.currentWord = '';
            this.modalMessage = '';
            // Retirer le paramètre de l'URL
            const url = new URL(window.location);
            url.searchParams.delete('demo');
            window.history.pushState({}, '', url);
        }
    }
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
    padding: 2rem;
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
