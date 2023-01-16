<template>
  <div :class="{ 'is-done': isChecked }" class="todo-bar">
    <ImageDisplay :image-name="data.image" :alt="`${data.name} image`" />
    <div class="info">
      <div class="title">{{ data.name }}</div>
      <div v-if="data.description" class="description">
        {{ data.description }}
      </div>
      <div v-if="data.amount" class="description">
        Amonut: {{ data.amount }}
      </div>
      <div v-if="data.expectedStocks" class="exp-stocks">
        <button
          v-if="expStockNum != initialExpStock"
          @click="updateExpectedStock"
          class="stock-btn accept"
        >
          <div class="stock-bird bird"></div>
        </button>
        <button
          v-if="expStockNum != initialExpStock"
          @click="expStockNum = initialExpStock"
          class="stock-btn cancel"
        >
          +
        </button>
        <label for="expStock">Expected stocks:</label>
        <input
          id="expStock"
          name="expStock"
          v-model="expStockNum"
          type="number"
        />
      </div>
      <div v-else class="todo-state">
        <Checkbox
          :is-checked="isChecked"
          is-loader
          @clicked-checkbox="changeDoneState"
          label="Mark as done"
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

function checkboxState() {}
</script>

<style scoped>
#expStock {
  width: 80px;
}
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
.description {
  padding: 10px 0;
  font-size: 25px;
}

.description:first-letter {
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
.cancel {
  top: 0.5px;
  right: 20px;
  font-size: 18px;
  rotate: 45deg;
  font-weight: 600;
  color: red;
}
.accept {
  top: 3.5px;
  right: 40px;
}
.exp-stocks {
  margin: 10px 0;
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
</style>
