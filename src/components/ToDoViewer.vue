<template>
  <div :class="{ 'is-done': isChecked }" class="todo-bar">
    <div class="image">
      <ImageDisplay :image-name="data.imageName" />
    </div>
    <div class="info">
      <div class="title">{{ data.id }}</div>
      <div class="description">
        {{ data.todo }}
      </div>
      <div class="todo-state">
        <label class="checkbox-label">Check if is done </label>
        <div
          :class="{ 'is-checked': isChecked }"
          class="checkbox"
          @click="changeDoneState"
        >
          <div v-if="isChecked" class="bird"></div>
        </div>
      </div>
    </div>
    <button class="delete" @click="deleteToDo(data.id, data.imageName)">
      +
    </button>
  </div>
</template>

<script setup lang="ts">
import type { DocumentData } from "@firebase/firestore";
import { useDebounceFn } from "@vueuse/core";
import { ref } from "vue";
import handleToDo from "@/service/handleTodo";
import deleteToDo from "@/service/deleteToDo";
import ImageDisplay from "./ImageDisplay.vue";

type PropsType = {
  data: DocumentData;
};
const props = defineProps<PropsType>();
const isChecked = ref(props.data.isDone);

//nie wiem czy to dobry pomysł dawac tu debounce, z jednej strony ograniczy traffic z drugiej mogą być bugi
const debouncedIsDoneSave = useDebounceFn(() => {
  handleToDo(
    props.data.id,
    props.data.todo,
    isChecked.value,
    props.data.imageName
  );
}, 1000);

function changeDoneState() {
  isChecked.value = !isChecked.value;
  debouncedIsDoneSave();
}
</script>

<style scoped>
.todo-bar {
  border-radius: 10px;
  padding: 10px;
  margin: 15px 0;
  border: 2px solid cornflowerblue;
  display: flex;
  align-items: center;
}
.image {
  height: 150px;
  aspect-ratio: 1/1;
  border: 1px solid black;
  margin-right: 10px;
}

.title {
  font-size: 30px;
}
.description {
  padding: 10px 0;
  font-size: 25px;
}
.checkbox-label {
  font-size: 20px;
  padding-right: 5px;
}
.checkbox {
  width: 20px;
  aspect-ratio: 1/1;
  border: 1px solid black;
  border-radius: 6px;
  position: relative;
}
.bird {
  position: absolute;
  rotate: 40deg;
  border-bottom: 2px solid black;
  border-right: 2px solid black;
  width: 6px;
  top: 3px;
  left: 5.75px;
  aspect-ratio: 2/3;
}

.is-done {
  text-decoration: line-through;
  color: gray;
}
.is-checked {
  background-color: rgb(156, 191, 255);
}
.todo-state {
  display: flex;
  align-items: center;
}
.delete {
  position: absolute;
  right: 0;
  top: 2px;
  border: 0;
  background-color: transparent;
  font-size: 28px;
  rotate: 45deg;
  color: red;
  font-weight: 600;
}
</style>
