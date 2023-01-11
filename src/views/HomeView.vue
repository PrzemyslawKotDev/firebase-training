<template>
  <div class="todos-display">
    <button v-for="item in listArray" class="link" @click="getDocData(item)">
      {{ item }}
    </button>
  </div>
  <!-- <ToDoViewer v-for="item in list" :key="item.id" :data="item.data()" /> -->
</template>

<script setup lang="ts">
import ToDoViewer from "../components/ToDoViewer.vue";
import { db } from "@/service/firebaseConnection";
import { ref } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

const listArray = ref<string[]>([]);
const categoryData = ref("");

getDocs(collection(db, "list")).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    listArray.value.push(`${doc.id}`);
  });
});

async function getDocData(docName: string) {
  getDocs(collection(db, "list", docName, "todos")).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  });
  // const docRef = doc(db, "list", `${docName}/todos`);
  // getDoc(docRef).then((docSnap) => {
  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // });
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
}
.link:last-child {
  border: 0;
}
</style>
