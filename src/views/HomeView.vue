<template>
  <Teleport to=".navigation">
    <div class="todos-display">
      <button v-for="item in listArray" class="link" @click="getDocData(item)">
        {{ item }}
      </button>
    </div>
  </Teleport>
  <button
    v-if="openedCategory === 'storage'"
    class="restock"
    @click="generateRestockList"
  >
    Restocks
  </button>
  <div v-if="openedCategory" class="search-filter">
    <label for="search" class="search-label">Search: </label>
    <input
      id="search"
      name="search"
      type="text"
      class="search-input"
      v-model="search"
    />
  </div>
  <ToDoViewer
    v-for="item in dataToDisplay"
    :key="item.id"
    :data="item"
    :category="openedCategory"
    @delete="removeItem"
  />
  <Overlay v-if="isOpenRaport" @click.self="isOpenRaport = false"
    ><Restock :data="restocks" @close-restock="isOpenRaport = false"
  /></Overlay>
</template>

<script setup lang="ts">
import ToDoViewer from "../components/ToDoViewer.vue";
import { db } from "@/service/firebaseConnection";
import { ref, computed } from "vue";
import { collection, getDocs, type DocumentData } from "firebase/firestore";
import Overlay from "@/components/Overlay.vue";
import Restock from "@/components/Restock.vue";

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
const search = ref("");

//szukajka
const dataToDisplay = computed(() => {
  if (search.value) {
    const data: DocumentData[] = [];
    categoryData.value.forEach((item: DocumentData) => {
      if (item.name.includes(search.value)) {
        data.push(item);
      }
    });
    return data;
  } else return categoryData.value;
});

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
    }
  });
}
</script>

<style scoped>
.row {
  padding: 5px;
  display: grid;
  grid-template-columns: 5fr 1fr;
}
.todos-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.link {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
  color: black;
  padding: 5px 10px;
  background-color: transparent;
  text-transform: uppercase;
  border: 0;
  border-bottom: 2px solid black;
  width: 100%;
}
.link:last-child {
  border: 0;
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
  z-index: 51;
}
</style>
