<template>
  <div class="add-todo">
    <div class="input">
      <label for="typeOfTodo">Type:</label>
      <select v-model="todoType" name="typeOfTodo" id="typeOfTodo">
        <option value="work">Work</option>
        <option value="house">House</option>
        <option value="shopping">Shopping</option>
        <option value="storage">Storage</option>
      </select>
    </div>
    <div class="input">
      <label for="todoTitle">Name:</label>
      <input id="todoTitle" name="todoTitle" v-model="name.value" />
    </div>
    <div v-if="todoType === 'work' || todoType === 'house'" class="input">
      <label for="description">Description:</label>
      <input id="description" name="description" v-model="description.value" />
    </div>
    <div v-if="todoType === 'shopping' || todoType === 'storage'" class="input">
      <label for="description">Amount:</label>
      <input
        id="description"
        name="description"
        type="number"
        v-model="amount.value"
      />
    </div>
    <div v-if="todoType === 'storage'" class="input">
      <label for="description">Expected stock:</label>
      <input
        id="description"
        name="description"
        type="number"
        v-model="expectedStocks.value"
      />
    </div>
    <ImageUploader
      ref="imageUploader"
      @filename="setFileName"
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
import { collection, doc, setDoc } from "firebase/firestore";
type DataObjType = {
  name: string;
  description?: string;
  amount?: string;
  expectedStocks?: string;
  isDone?: boolean;
  image: string;
};

const name = ref({ name: "name", value: "" });
const description = ref({ name: "description", value: "" });
const amount = ref({ name: "amount", value: 0 });
const expectedStocks = ref({ name: "expectedStocks", value: 0 });
const fileExtension = ref("");
const imageUploader = ref();
const isSuccess = ref(false);
const todoType = ref("work");

//build data object and send to database
async function sendToDo() {
  const todoNameStr =
    name.value.value.charAt(0).toUpperCase() + name.value.value.slice(1);
  const docRef = doc(collection(db, "list", todoType.value, "list"));
  const imgName = `${docRef.id}.${fileExtension.value}`;
  const dataObj = <DataObjType>{};

  dataObj["image"] = imgName;
  //use of exposed function from child
  imageUploader.value.sendFile(imgName);

  if (name.value.value) {
    dataObj[name.value.name] = todoNameStr;
  }
  if (description.value.value) {
    const todoStr =
      description.value.value.charAt(0).toUpperCase() +
      description.value.value.slice(1);
    dataObj[description.value.name] = todoStr;
  }
  if (amount.value.value) {
    dataObj[amount.value.name] = amount.value.value;
  }
  if (expectedStocks.value.value) {
    dataObj[expectedStocks.value.name] = expectedStocks.value.value;
  }
  if (todoType.value !== "storage") {
    dataObj["isDone"] = false;
  }

  setDoc(docRef, dataObj);
}

function setFileName(name: string) {
  fileExtension.value = name;
}

function clearInputs() {
  name.value.value = "";
  description.value.value = "";
  amount.value.value = 0;
  expectedStocks.value.value = 0;
  fileExtension.value = "";
  isSuccess.value = true;
  window.setTimeout(() => {
    isSuccess.value = false;
  }, 2000);
}
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
