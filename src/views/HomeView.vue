<template>
  <div>{{ todos }}</div>
</template>

<script setup lang="ts">
import { db } from "@/service/firebaseConnection";
import { useCollection } from "vuefire";
import { collection } from "firebase/firestore";

const todos = useCollection(collection(db, "training"));
</script>

<style scoped></style>
