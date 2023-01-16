<template>
  <div class="checkbox-wrapper">
    <label v-if="label" class="checkbox-label">{{ label }} </label>
    <div
      :class="{
        'is-checked': isChecked && !showLoader,
        'is-disabled': showLoader,
      }"
      class="checkbox"
      @click="handleCheckbox"
    >
      <div
        v-if="showLoader"
        class="loader"
        :class="{
          'is-disabled': showLoader,
        }"
      ></div>
      <div v-if="isChecked" class="bird"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

type PropsType = {
  label?: string;
  isLoader?: boolean;
  isChecked: boolean;
};
const showLoader = ref(false);
const props = defineProps<PropsType>();
const emit = defineEmits(["clickedCheckbox"]);

function handleCheckbox() {
  if (showLoader.value) {
    return;
  } else {
    showLoader.value = true;
    emit("clickedCheckbox");
    window.setTimeout(() => {
      showLoader.value = false;
    }, 500);
  }
}
</script>

<style scoped>
.checkbox-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.checkbox-label {
  font-size: 20px;
  padding-right: 7px;
}
.is-checked {
  background-color: rgb(156, 191, 255);
}
.is-disabled {
  cursor: not-allowed;
}
.checkbox {
  width: 24px;
  aspect-ratio: 1/1;
  border: 2px solid cornflowerblue;
  border-radius: 6px;
  position: relative;
  cursor: pointer;
}
.bird {
  position: absolute;
  rotate: 40deg;
  border-bottom: 2px solid black;
  border-right: 2px solid black;
  width: 8px;
  top: 3px;
  left: 6px;
  aspect-ratio: 3/4;
}

.loader {
  position: absolute;
  z-index: 1;
  inset: 0;
  border-radius: 50%;
  aspect-ratio: 1/1;
  border: 2px dotted black;
  margin: 2px;
  animation-name: spin;
  animation-duration: 4000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  background-color: var(--color-background);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
