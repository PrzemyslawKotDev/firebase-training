<template>
  <div class="confirm-wrapper">
    <button class="confirm-btn accept" @click="$emit('accept')">&#9745;</button>
    <button class="confirm-btn reject" @click="$emit('reject')">&#9746;</button>
  </div>
</template>

<script setup lang="ts">
defineEmits(["accept", "reject"]);
</script>

<style scoped>
.confirm-wrapper {
  display: flex;
}
.confirm-btn {
  position: relative;
  width: 24px;
  height: 24px;
  border: 0;
  margin: 0 2px;
  display: flex;
  padding-bottom: 4px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  font-size: 30px;
}
.accept {
  color: green;
}
.reject {
  color: red;
}
</style>
