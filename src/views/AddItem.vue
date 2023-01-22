<template>
  <div class="add-todo">
    <div class="input">
      <label for="list">List:</label>
      <select v-model="todoType" name="list" id="list">
        <option value="work">Work</option>
        <option value="house">House</option>
        <option value="shopping">Shopping</option>
        <option value="storage">Storage</option>
      </select>
    </div>
    <div class="input">
      <label for="title">Name:</label>
      <select
        v-if="todoType === 'shopping'"
        v-model="dataObj.name"
        name="title"
        id="title"
      >
        <option v-for="item in shoppingItems" :value="item.name">
          {{ item.name }}
        </option>
      </select>
      <input v-else id="title" name="title" v-model="dataObj.name" />
    </div>
    <div v-if="todoType === 'work' || todoType === 'house'" class="input">
      <label for="description">Description:</label>
      <input id="description" name="description" v-model="description" />
    </div>
    <div v-if="todoType === 'shopping' || todoType === 'storage'" class="input">
      <label for="description">Amount:</label>
      <input
        id="description"
        name="description"
        type="number"
        v-model="dataObj.amount"
      />
    </div>
    <div v-if="todoType === 'storage'" class="input">
      <label for="description">Expected stock:</label>
      <input
        id="description"
        name="description"
        type="number"
        v-model="dataObj.expectedStocks"
      />
    </div>
    <div v-if="todoType === 'storage'" class="input">
      <label for="Type">Type:</label>
      <select v-model="itemType" name="Type" id="Type">
        <option value="fruits">Fruits</option>
        <option value="vegetables">Vegetables</option>
        <option value="dairy">Dairy</option>
        <option value="Meat">Meat</option>
        <option value="snacks">Snacks</option>
        <option value="other">Other</option>
      </select>
    </div>
    <ImageUploader
      v-if="todoType !== 'shopping'"
      ref="imageUploader"
      @clear-inputs="clearInputs"
    />

    <button class="add-btn" @click="sendToDo">Add to database</button>
    <div v-if="isSuccess" class="success">Successfuly added</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ImageUploader from "@/components/ImageUploader.vue";
import { db } from "@/service/firebaseConnection";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  type DocumentData,
} from "firebase/firestore";

type DataObjType = {
  name: string;
  description?: string;
  amount?: number;
  expectedStocks?: number;
  isDone?: boolean;
  itemType?: string;
  storageRef?: string;
};

const dataObj = ref<DataObjType>({
  name: "",
  amount: 0,
  expectedStocks: 0,
  isDone: false,
});
const fileExtension = ref("");
const imageUploader = ref();
const isSuccess = ref(false);
const todoType = ref("work");
const itemType = ref("");
const description = ref("");
const shoppingItems = ref<DocumentData>([]);

//build data object and send to database
async function sendToDo() {
  const docRef = doc(collection(db, "list", todoType.value, "list"));
  const imgName = `${docRef.id}.png`;

  if (todoType.value === "shopping") {
    shoppingItems.value.forEach((item: DataObjType) => {
      if (item.name === dataObj.value.name) {
        const amount = dataObj.value.amount;
        dataObj.value = { ...item, amount: amount };
      }
    });
  } else {
    dataObj.value.name =
      dataObj.value.name.charAt(0).toUpperCase() + dataObj.value.name.slice(1);

    if (todoType.value === "storage") {
      dataObj.value["storageRef"] = docRef.id;
    }
    if (todoType.value === "storage" || todoType.value === "shopping") {
      dataObj.value["itemType"] = itemType.value;
    }
    if (todoType.value === "work" || todoType.value === "house") {
      dataObj.value["description"] = description.value;
    }
  }

  //use of exposed function from child
  imageUploader.value.sendFile(imgName);

  setDoc(docRef, dataObj.value).then(() => {
    if (todoType.value === "shopping") {
      clearInputs();
    }
  });
}

function clearInputs() {
  dataObj.value.name = "";
  dataObj.value.amount = 0;
  dataObj.value.expectedStocks = 0;
  fileExtension.value = "";
  itemType.value = "";
  isSuccess.value = true;
  window.setTimeout(() => {
    isSuccess.value = false;
  }, 2000);
}

getDocs(collection(db, "list", "storage", "list")).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    shoppingItems.value.push(doc.data());
  });
});
</script>

<style scoped>
.add-todo {
  margin: 0 auto;
  padding: 10px;
}
select {
  margin: 5px 0 5px 5px;
  padding: 5px;
}
.input {
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
}
input {
  margin: 5px 0 5px 5px;
  padding: 5px;
}
.add-btn {
  width: 100%;
  padding: 5px 0;
  margin: 5px 0;
}
.success {
  text-align: center;
  padding: 10px;
  width: 100%;
  margin: 10px 0;
  border-radius: 5px;
  font-weight: 700;
  background-color: greenyellow;
}
</style>
