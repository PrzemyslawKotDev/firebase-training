<template>
  <div class="add-todo">
    <div class="inputs">
      <label for="todoTitle">To do:</label>
      <input id="todoTitle" name="todoTitle" v-model="todoName" />
      <label for="description">Description:</label>
      <input id="description" name="description" v-model="todo" />
    </div>
    <ImageUploader
      ref="imageUploader"
      v-if="todoName"
      :name="todoName"
      @filename="setFileName"
      @clear-inputs="clearInputs"
    />

    <button class="add-btn" @click="sendToDo">Add ToDo</button>
    <div v-if="isSuccess" class="success">Successfuly added</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ImageUploader from "@/components/ImageUploader.vue";
import handleToDo from "@/service/handleTodo";

const todoName = ref("");
const todo = ref("");
const fileName = ref("");
const imageUploader = ref();
const isSuccess = ref(false);

function sendToDo() {
  const todoNameStr =
    todoName.value.charAt(0).toUpperCase() + todoName.value.slice(1);
  const todoStr = todo.value.charAt(0).toUpperCase() + todo.value.slice(1);
  imageUploader.value.sendFile();
  handleToDo(todoNameStr, todoStr, false, fileName.value);
}

function setFileName(name: string) {
  fileName.value = name;
}

function clearInputs() {
  todoName.value = "";
  todo.value = "";
  fileName.value = "";
  isSuccess.value = true;
  window.setTimeout(() => {
    isSuccess.value = false;
  }, 2000);
}
</script>

<style scoped>
.add-todo {
  margin: 0 auto;
  padding: 10px;
}
.inputs {
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
}
input {
  margin: 5px 0 5px 5px;
  padding: 5px;
}
.add-btn {
  width: 100%;
  padding: 5px 0;
  margin: 5px 0;
}
.success {
  text-align: center;
  padding: 10px;
  width: 100%;
  margin: 10px 0;
  border-radius: 5px;
  font-weight: 700;
  background-color: greenyellow;
}
</style>
