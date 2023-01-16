<template>
  <div class="raport">
    <div class="row desc">
      <div class="name">Item name</div>
      <div class="amount">Item amount</div>
      <div class="is-bought">Mark as bought</div>
    </div>
    <div v-for="item in restocks" class="row">
      <div class="name">{{ item.name }}</div>

      <div v-if="item.amount" class="amount-wrapper">
        <button
          v-if="item.amount != newAmount"
          @click="item.amount = newAmount"
          class="stock-btn accept"
        >
          <div class="stock-bird bird"></div>
        </button>
        <button
          v-if="item.amount != newAmount"
          @click="newAmount = 0"
          class="stock-btn cancel"
        >
          +
        </button>
        <label class="amount">
          <input v-model="newAmount" />
          <div class="number">{{ item.amount }}</div>
        </label>
      </div>

      <div class="is-bought">
        <Checkbox :is-checked="isChecked" />
      </div>
    </div>
    <button class="delete" @click="$emit('closeRestock')">+</button>
    <button class="accept" @click="acceptRestock">Accept restock</button>
  </div>
</template>

<script setup lang="ts">
import {
  collection,
  doc,
  setDoc,
  type DocumentData,
} from "@firebase/firestore";
import { ref } from "vue";
import Checkbox from "./Checkbox.vue";
import { db } from "@/service/firebaseConnection";

type PropsType = {
  data: DocumentData;
};

const props = defineProps<PropsType>();
const restocks = ref<DocumentData[]>([...(props.data as [])]);
const isChecked = ref(false);
const newAmount = ref(0);

function acceptRestock(data: DocumentData) {
  const docRef = doc(collection(db, "list", "shopping", "list"));
  setDoc(docRef, data);
}
</script>

<style scoped>
.row {
  display: grid;
  grid-template-columns: 2fr 2fr 2fr;
  text-align: center;
}
.name {
  padding-right: 10px;
}
.number {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 5px;
  background-color: aliceblue;
  z-index: 50;
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
</style>
