<template>
  <div :class="{ 'is-done': isChecked }" class="todo-bar">
    <ImageDisplay :image-name="data.image" :alt="`${data.name} image`" />
    <div class="info">
      <div class="title">{{ data.name }}</div>
      <div class="description">
        {{ data.description }}
      </div>
      <div class="todo-state">
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
</style>
