<template>
  <button
    class="burger-button simple"
    :class="{ 'is-clicked': isOpen }"
    @click="$emit('hamburgerClick')"
  >
    <svg
      fill="black"
      class="hamburger"
      view-box="0 0 30 30"
      width="30"
      height="30"
    >
      <rect class="line top" width="20" height="2" x="5" y="8" rx="1"></rect>
      <rect
        class="line middle"
        width="20"
        height="2"
        x="5"
        y="15"
        rx="1"
      ></rect>
      <rect
        class="line bottom"
        width="20"
        height="2"
        x="5"
        y="22"
        rx="1"
      ></rect>
    </svg>
  </button>
</template>

<script setup lang="ts">
type PropsType = {
  isOpen: Boolean;
};

const props = defineProps<PropsType>();
</script>

<style scoped>
.burger-button {
  background-color: transparent;
  border-radius: 8px;
  z-index: 50;
  padding: 0 2px;
  position: fixed;
  top: 10px;
  left: 10px;
}

.simple {
  border: 2px solid black;
}
.is-clicked :is(.top, .bottom) {
  y: 14;
}
.is-clicked .top {
  rotate: 45deg;
}
.is-clicked .middle {
  opacity: 0;
}
.is-clicked .bottom {
  rotate: -45deg;
}

.simple .line {
  transition: y 200ms ease-in 200ms, rotate 200ms ease-in, opacity 0ms 200ms;
  transform-origin: center;
}

.is-clicked .line {
  transition: y 200ms ease-in, rotate 200ms ease-in 200ms, opacity 0ms 200ms;
}
</style>
