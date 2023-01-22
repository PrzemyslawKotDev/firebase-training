<template>
  <div class="raport">
    <div class="row desc">
      <div class="name">Item name</div>
      <div class="amount">Item amount</div>
    </div>
    <div v-for="item in data" class="row">
      <div class="name">{{ item.name }}</div>

      <div class="number">{{ item.amount }}</div>
    </div>
    <button class="delete" @click="$emit('closeRestock')">+</button>
    <button class="add" @click="acceptRestock">Add to shopping list</button>
  </div>
</template>

<script setup lang="ts">
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  type DocumentData,
} from "@firebase/firestore";
import { db } from "@/service/firebaseConnection";
import { ref } from "vue";

type PropsType = {
  data: DocumentData[];
};

const props = defineProps<PropsType>();
const shoppingData = ref<DocumentData[]>([]);
const newList = ref<DocumentData[]>([]);

getDocs(collection(db, "list", "shopping", "list")).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    shoppingData.value.push({ ...doc.data(), storageId: doc.id });
  });
});

function acceptRestock() {
  const mergedLists: DocumentData[] = [];

  if (shoppingData.value.length) {
    props.data.forEach((restock: DocumentData) => {
      shoppingData.value.forEach((item) => {
        if (item.name === restock.name && item.amount > restock.amount) {
          mergedLists.push(item);
        } else {
          if (!mergedLists.includes(restock)) {
            mergedLists.push(restock);
          }
        }
      });
    });

    newList.value = [...new Set(mergedLists)];
  } else {
    newList.value = props.data;
  }
  console.log(newList.value);
  newList.value.forEach((item) => {
    const docRef = doc(collection(db, "list", "shopping", "list"));
    setDoc(docRef, { ...item, id: docRef.id });
  });
  // JEŚLI WCZEŚNIEJSZY BLOK OK TO WTEDY WYKONAJ TEN BLOK
  shoppingData.value.forEach((item) => {
    deleteDoc(doc(db, "list", "shopping", "list", item.id));
  });
}
</script>

<style scoped>
.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
}
.name {
  padding-right: 10px;
}
.number {
  width: 100%;
}
input:focus ~ div {
  display: none;
}
.desc {
  border-bottom: 1px solid black;
  margin-bottom: 10px;
}
.name::first-letter {
  text-transform: uppercase;
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

.raport {
  background-color: aliceblue;
  padding: 20px;
  border-radius: 10px;
  font-size: 20px;
}

.bird {
  position: absolute;
  rotate: 40deg;
  border-bottom: 2px solid black;
  border-right: 2px solid black;
  width: 8px;
  top: 3px;
  left: 6px;
  aspect-ratio: 3/4;
}
.stock-bird {
  border-bottom: 3px solid green;
  border-right: 3px solid green;
}

.stock-btn {
  position: absolute;
  width: 18px;
  aspect-ratio: 1/1;
  background-color: transparent;
  border: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cancel {
  top: 5px;
  right: 0px;
  font-size: 18px;
  rotate: 45deg;
  font-weight: 600;
  color: red;
}
.accept {
  top: 8px;
  right: 25px;
}
.add {
  font-size: 20px;
  width: 100%;
  border: 1px solid black;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
  background-color: white;
}
</style>
