<template>
  <div class="overlay">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
</style>
