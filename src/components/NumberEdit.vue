<template>
  <div class="number-edit-wrapper">
    <button class="edit-btn" @click="isEdited = true">
      <div class="edit-label">{{ label }}:</div>
      <div v-if="!isEdited" class="text width">
        {{ amount }}
      </div>
    </button>
    <div v-if="isEdited" class="edit width">
      <Confirm
        class="confirm-btns"
        @accept="handleDecision(true)"
        @reject="handleDecision(false)"
      />
      <input
        id="editInput"
        name="editInput"
        type="number"
        class="edit-input width"
        v-model="newValue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Confirm from "@/components/Confirm.vue";

type PropsType = {
  label: string;
  num: number;
  width?: number;
};

const props = defineProps<PropsType>();
const isEdited = ref(false);
const amount = ref(props.num);
const newValue = ref(amount.value);
const emit = defineEmits(["updateValue"]);
const width = computed(() => {
  if (props.width) {
    if (props.width > 140) {
      return `${props.width}px`;
    }
  } else return "140px";
});

function handleDecision(change: boolean) {
  if (change) {
    amount.value = newValue.value;
    emit("updateValue", newValue.value);
  } else {
    newValue.value = amount.value;
  }
  isEdited.value = false;
}
</script>

<style scoped>
.confirm-btns {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translate(00%, -50%);
  z-index: 1;
}
.number-edit-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 5px 0;
}
.edit-btn {
  font-size: 20px;
  padding: 0;
  margin: 0;
  border: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
  height: 30px;
  color: inherit;
}
.edit-label {
  padding-right: 5px;
}
.edit-input {
  font-size: 20px;
}
.width {
  text-align: left;
  width: v-bind(width);
}
</style>
