<template>
  <Teleport to=".navigation">
    <div class="todos-display">
      <button v-for="item in listArray" class="link" @click="getDocData(item)">
        {{ item }}
      </button>
    </div>
  </Teleport>
  <button
    v-if="openedCategory === 'storage' && filteredData"
    class="restock"
    @click="generateRestockList"
  >
    Restocks
  </button>
  <div v-if="openedCategory && categoryData.length" class="search-filter">
    <div class="search-wrapper">
      <Search @search-value="updateSearch" />
    </div>
    <div class="filters-wrapper">
      <Filters :filters="itemCategories" @filter="updateFilter" />
    </div>
  </div>

  <div
    v-if="openedCategory === 'work' || openedCategory === 'house'"
    class="todos"
  >
    <ToDoRow
      v-for="item in filteredData"
      :key="item.id"
      :data="item"
      :category="openedCategory"
      @delete="removeItem"
    />
  </div>
  <div
    v-if="openedCategory === 'shopping' || openedCategory === 'storage'"
    class="items"
  >
    <ItemRow
      v-for="item in filteredData"
      :key="item.id"
      :data="item"
      :category="openedCategory"
      @delete="removeItem"
    />
  </div>

  <Overlay v-if="isOpenRaport" @click.self="isOpenRaport = false"
    ><Restock :data="restocks" @close-restock="isOpenRaport = false"
  /></Overlay>
</template>

<script setup lang="ts">
import ToDoRow from "../components/ToDoRow.vue";
import ItemRow from "../components/ItemRow.vue";
import { db } from "@/service/firebaseConnection";
import { ref, computed } from "vue";
import { collection, getDocs, type DocumentData } from "firebase/firestore";
import Overlay from "@/components/Overlay.vue";
import Restock from "@/components/Restock.vue";
import Filters from "@/components/Filters.vue";
import Search from "@/components/Search.vue";

type RestockType = {
  amount: number;
  image: any;
  name: any;
  isDone: boolean;
};

const listArray = ref<string[]>([]);
const categoryData = ref<DocumentData[]>([]);
const filteredData = ref<DocumentData[]>([]);
const itemCategories = computed(() => {
  const categories = categoryData.value.map((item) => {
    return item.itemType;
  });
  const uniqueCategories = [...new Set(categories)];
  return uniqueCategories;
});
const openedCategory = ref("");
const restocks = ref<RestockType[]>([]);
const isOpenRaport = ref(false);
const search = ref("");
const filter = ref("");

//szukajka
function searchFilter() {
  filteredData.value = [];
  let modifiedData: DocumentData[] = [];
  console.log(search.value);
  if (search.value) {
    categoryData.value.forEach((item: DocumentData) => {
      if (item.name.includes(search.value)) {
        modifiedData.push(item);
      }
    });
    filteredData.value = modifiedData;
  } else {
    modifiedData = categoryData.value;
    filteredData.value = categoryData.value;
  }
  if (filter.value) {
    filteredData.value = [];
    modifiedData.forEach((item: DocumentData) => {
      if (item.itemType === filter.value) {
        filteredData.value.push(item);
      }
    });
  }
}
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
    filteredData.value = categoryData.value;
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

function updateFilter(val: string) {
  filter.value = val;
  searchFilter();
}

function updateSearch(val: string) {
  search.value = val;
  searchFilter();
}
</script>

<style scoped>
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
.search-filter {
  width: 100%;
  display: flex;
}
.search-wrapper {
  font-size: 20px;
  width: 40%;
  display: flex;
  align-items: center;
  margin-right: 10px;
  max-width: 300px;
}
.search-input {
  margin-left: 5px;
  font-size: 20px;
  width: 100%;
}
.filters-wrapper {
  display: flex;
}
</style>
