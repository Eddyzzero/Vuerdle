<template>
  <div id="app">
    <GameView />
  </div>
</template>

<script>
import GameView from './components/GameView.vue';

export default {
  name: 'App',
  components: {
    GameView,
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f4f4;
  color: #333;
}
</style>