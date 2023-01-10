<template>
  <div class="todos-display">
    <ToDoViewer v-for="item in todos" :key="item.id" :data="item" />
  </div>
</template>

<script setup lang="ts">
import ToDoViewer from "../components/ToDoViewer.vue";
import { db } from "@/service/firebaseConnection";
import { useCollection } from "vuefire";
import { collection } from "firebase/firestore";

const todos = useCollection(collection(db, "training"));
</script>

<style scoped>
.todos-display {
  width: 700px;
  margin: 0 auto;
}

</style>
