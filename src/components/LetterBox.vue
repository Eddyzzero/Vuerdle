<template>
  <div class="letter-box" :class="status">
    {{ letter }}
  </div>
</template>

<script>
export default {
  name: "LetterBox",
  props: {
    letter: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      validator: (value) =>
        ["correct", "present", "absent", ""].includes(value),
    },
  },
};
</script>

<style scoped>
.letter-box {
  width: 3rem;
  height: 3rem;
  border: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  background-color: white;
  transition: background-color 0.3s, color 0.3s;
}

.correct {
  background-color: #6aaa64;
  color: white;
  border-color: #6aaa64;
}

.present {
  background-color: #c9b458;
  color: white;
  border-color: #c9b458;
}

.absent {
  background-color: #787c7e;
  color: white;
  border-color: #787c7e;
}
</style>
