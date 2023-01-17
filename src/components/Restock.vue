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
  doc,
  getDocs,
  setDoc,
  updateDoc,
  type DocumentData,
} from "@firebase/firestore";
import { db } from "@/service/firebaseConnection";
import { ref } from "vue";

type PropsType = {
  data: DocumentData;
};

const props = defineProps<PropsType>();
const listId = ref("");

function acceptRestock() {
  let shoppingList: DocumentData[] = [...props.data];
  let fetchedList: DocumentData[] = [];
  getDocs(collection(db, "list", "shopping", "list")).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const itemData = doc.data();
      shoppingList.forEach((item) => {
        if (item.name.toLowerCase() === itemData.name.toLowerCase()) {
          item.amount = item.amount + itemData.amount;
          return;
        } else {
          fetchedList = [...fetchedList, itemData];
        }
      });
    });
    console.log(shoppingList);
    console.log(fetchedList);
    // shoppingList.value = [...shoppingList.value, ...props.data];
    // if (listId.value) {
    //   try {
    //     updateDoc(doc(db, "list", "shopping", "list", listId.value), {}).then(
    //       () => {
    //         initialExpStock.value = expStockNum.value;
    //       }
    //     );
    //   } catch (er) {
    //     alert("DATA SAVE ERROR");
    //     console.log(er);
    //     isChecked.value = !isChecked.value;
    //   }
    // }
    // const docRef = doc(collection(db, "list", "shopping", "list"));
    // setDoc(docRef, data);
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
