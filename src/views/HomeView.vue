<template>
  <div class="todos-display">
    <button v-for="item in listArray" class="link" @click="getDocData(item)">
      {{ item }}
    </button>
  </div>
  <button
    v-if="openedCategory === 'storage'"
    class="restock"
    @click="generateRestockList"
  >
    Restocks
  </button>
  <ToDoViewer
    v-for="item in categoryData"
    :key="item.id"
    :data="item"
    :category="openedCategory"
    @delete="removeItem"
  />
  <Overlay v-if="isOpenRaport">
    <div class="raport">
      <div v-for="item in restocks" class="row">
        <div class="name">{{ item.name }}</div>
        <div class="amount">{{ item.amount }}</div>
      </div>
      <button class="delete" @click="isOpenRaport = false">+</button>
    </div>
  </Overlay>
</template>

<script setup lang="ts">
import ToDoViewer from "../components/ToDoViewer.vue";
import { db } from "@/service/firebaseConnection";
import { ref } from "vue";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  type DocumentData,
} from "firebase/firestore";
import Overlay from "@/components/Overlay.vue";

type RestockType = {
  amount: number;
  image: any;
  name: any;
  isDone: boolean;
};

const listArray = ref<string[]>([]);
const categoryData = ref<DocumentData[]>([]);
const openedCategory = ref("");
const restocks = ref<RestockType[]>([]);
const isOpenRaport = ref(false);
const isRestockDone = ref(false);

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

function generateRestockList() {
  isOpenRaport.value = true;
  if (!isRestockDone.value) {
    restocks.value = [];
    categoryData.value.forEach((item) => {
      if (item.amount < item.expectedStocks) {
        const dataObj = {
          amount: item.expectedStocks - item.amount,
          image: item.image,
          name: item.name,
          isDone: false,
        };
        restocks.value.push(dataObj);
        const docRef = doc(collection(db, "list", "shopping", "list"));
        setDoc(docRef, dataObj);
      }
    });
  }
  isRestockDone.value = true;
}
</script>

<style scoped>
.name {
  padding-right: 10px;
}
.delete {
  position: absolute;
  right: -7px;
  top: -5px;
  border: 0;
  background-color: transparent;
  font-size: 28px;
  rotate: 45deg;
  color: red;
  font-weight: 600;
}
.restock {
  position: fixed;
  top: 20px;
  right: 20px;
  border: 0;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: cornflowerblue;
  color: white;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
}
.raport {
  background-color: aliceblue;
  padding: 20px;
  border-radius: 10px;
}
.row {
  padding: 5px;
  display: grid;
  grid-template-columns: 5fr 1fr;
}
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
