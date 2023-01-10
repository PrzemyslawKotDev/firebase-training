<template>
  <div class="add-todo">
    <label for="todoTitle">To do:</label>
    <input id="todoTitle" name="todoTitle" v-model="todoName" />
    <label for="description">Description:</label>
    <input id="description" name="description" v-model="todo" />
    <button class="add-btn" @click="sendToDo">Add ToDo</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import handleToDo from "@/service/handleTodo";

const todoName = ref("");
const todo = ref("");

function sendToDo() {
  const todoStr = todo.value.charAt(0).toUpperCase() + todo.value.slice(1);
  handleToDo(todoName.value, todoStr, false);
}
</script>

<style scoped>
.add-todo {
  width: 50%;
  margin: 0 auto;
  padding: 10px;
}
</style>
