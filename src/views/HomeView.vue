<template>
  <div class="todos-display">
    <button v-for="item in listArray" class="link" @click="getDocData(item)">
      {{ item }}
    </button>
  </div>
  <ToDoViewer
    v-for="item in categoryData"
    :key="item.id"
    :data="item"
    :category="openedCategory"
    @delete="removeItem"
  />
</template>

<script setup lang="ts">
import ToDoViewer from "../components/ToDoViewer.vue";
import { db } from "@/service/firebaseConnection";
import { ref } from "vue";
import { collection, getDocs, type DocumentData } from "firebase/firestore";

const listArray = ref<string[]>([]);
const categoryData = ref<DocumentData[]>([]);
const openedCategory = ref("");

//get categories
getDocs(collection(db, "list")).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    listArray.value.push(`${doc.id}`);
  });
});

//get data of category
async function getDocData(docName: string) {
  categoryData.value = [];
  openedCategory.value = docName;
  getDocs(collection(db, "list", docName, "list")).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      categoryData.value.push({ id: doc.id, ...doc.data() });
    });
  });
}

function removeItem(id: string) {
  categoryData.value = categoryData.value.filter((obj) => obj.id !== id);
}
</script>

<style scoped>
.todos-display {
  width: 700px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.link {
  border: 0;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  color: black;
  padding: 5px 10px;
  border-right: 2px solid black;
  background-color: transparent;
  text-transform: uppercase;
  cursor: pointer;
}
.link:last-child {
  border: 0;
}
</style>
