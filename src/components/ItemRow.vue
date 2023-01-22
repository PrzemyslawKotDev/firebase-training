<template>
  <div v-if="data" :class="{ 'is-done': isChecked }" class="todo-bar">
    <ImageDisplay
      :image-name="`${data.storageRef}.png`"
      :alt="`${data.name} image`"
    />
    <div class="info">
      <div class="title">{{ data.name }}</div>
      <div v-if="data.itemType" class="category">
        <div>Category:</div>
        <div class="text">{{ data.itemType }}</div>
      </div>
      <div v-if="data.amount" class="amount">
        <NumberEdit
          label="Amount"
          :num="data.amount"
          @update-value="updateAmount"
        />
      </div>
      <div
        v-if="data.expectedStocks && category === 'storage'"
        class="exp-stocks"
      >
        <NumberEdit
          label="Expected stocks"
          :num="data.expectedStocks"
          @update-value="updateExpStock"
        />
      </div>
      <div v-if="category === 'shopping'" class="bought-state">
        <Checkbox
          :is-checked="isChecked"
          is-loader
          @clicked-checkbox="changeDoneState"
          label="Mark as bought"
        />
      </div>
    </div>
    <button class="delete" @click="handleDelete(category, data.id, data.image)">
      +
    </button>
  </div>
</template>

<script setup lang="ts">
import { doc, updateDoc, type DocumentData } from "@firebase/firestore";
import { ref } from "vue";
import deleteToDo from "@/service/deleteToDo";
import ImageDisplay from "./ImageDisplay.vue";
import { db } from "@/service/firebaseConnection";
import NumberEdit from "@/components/NumberEdit.vue";
import Checkbox from "./Checkbox.vue";

type PropsType = {
  data: DocumentData;
  category: string;
};
const props = defineProps<PropsType>();
const isChecked = ref(props.data.isDone);
const emit = defineEmits(["delete"]);
const initialExpStock = ref(props.data.expectedStocks);
const expStockNum = ref(props.data.expectedStocks);

function changeDoneState() {
  isChecked.value = !isChecked.value;
  try {
    updateDoc(doc(db, "list", props.category, "list", props.data.id), {
      isDone: isChecked.value,
    }).then(() => {});
  } catch (er) {
    alert("DATA SAVE ERROR");
    console.log(er);
    isChecked.value = !isChecked.value;
  }
}

function updateAmount(newValue: number) {
  try {
    updateDoc(doc(db, "list", props.category, "list", props.data.id), {
      amount: newValue,
    }).then(() => {});
  } catch (er) {
    alert("DATA SAVE ERROR");
    console.log(er);
  }
}

function updateExpStock(newValue: number) {
  try {
    updateDoc(doc(db, "list", props.category, "list", props.data.id), {
      expectedStocks: newValue,
    }).then(() => {});
  } catch (er) {
    alert("DATA SAVE ERROR");
    console.log(er);
  }
}

function handleDelete(category: string, id: string, img: string) {
  let image: string | boolean = img;
  if (props.category === "shopping") {
    image = false;
  }
  const isDeleted = deleteToDo(category, id, image);
  if (isDeleted) {
    emit("delete", id);
  }
}

function updateExpectedStock() {
  try {
    updateDoc(doc(db, "list", props.category, "list", props.data.id), {
      expectedStocks: expStockNum.value,
    }).then(() => {
      initialExpStock.value = expStockNum.value;
    });
  } catch (er) {
    alert("DATA SAVE ERROR");
    console.log(er);
    isChecked.value = !isChecked.value;
  }
}
</script>

<style scoped>
.todo-bar {
  border-radius: 10px;
  padding: 10px;
  margin: 15px 0;
  border: 2px solid cornflowerblue;
  display: flex;
  align-items: center;
}

.title {
  font-size: 30px;
}
.title:first-letter {
  text-transform: uppercase;
}
.category {
  font-size: 22px;
  display: flex;
}
.text {
  padding-left: 5px;
}
.text:first-letter {
  text-transform: uppercase;
}

.is-done {
  text-decoration: line-through;
  color: gray;
}
.delete {
  position: absolute;
  right: 0;
  top: 2px;
  border: 0;
  background-color: transparent;
  font-size: 28px;
  rotate: 45deg;
  color: red;
  font-weight: 600;
}
.bought-state {
  display: flex;
  justify-content: flex-start;
}
</style>
