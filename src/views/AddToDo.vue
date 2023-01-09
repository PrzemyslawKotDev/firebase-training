<template>
  <div class="add-todo">
    Name:<input v-model="todoName" /> Description:<input v-model="todo" />
    <button class="add-btn" @click="sendToDo">Add ToDo</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import addToDo from "@/service/addTodo";

const todoName = ref("");
const todo = ref("");

function sendToDo() {
  addToDo(todoName.value, todo.value, false);
}
</script>

<style scoped>
.add-todo {
  width: 50%;
  margin: 0 auto;
  padding: 10px;
}
input {
}
</style>
