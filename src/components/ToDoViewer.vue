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
      <div v-if="data.expectedStocks" class="description">
        Expected stocks: {{ data.expectedStocks }}
      </div>
      <div v-else class="todo-state">
        <label class="checkbox-label">Check if is done </label>
        <div
          :class="{
            'is-checked': isChecked && !isLoader,
            'is-disabled': isLoader,
          }"
          class="checkbox"
          @click="changeDoneState"
        >
          <div
            v-if="isLoader"
            class="loader"
            :class="{
              'is-disabled': isLoader,
            }"
          ></div>
          <div v-if="isChecked" class="bird" :class="{}"></div>
        </div>
        <!-- zrobić spinnera, disable na czas requestow, ew 500ms timeout na disable -->
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

type PropsType = {
  data: DocumentData;
  category: string;
};
const props = defineProps<PropsType>();
const isChecked = ref(props.data.isDone);
const isLoader = ref(false);
const emit = defineEmits(["delete"]);

function changeDoneState() {
  if (isLoader.value) {
    return;
  } else {
    isLoader.value = true;
    isChecked.value = !isChecked.value;

    try {
      updateDoc(doc(db, "list", props.category, "list", props.data.id), {
        isDone: isChecked.value,
      }).then(() => {
        window.setTimeout(() => {
          isLoader.value = false;
        }, 500);
      });
    } catch (er) {
      alert("DATA SAVE ERROR");
      console.log(er);
      isChecked.value = !isChecked.value;
      window.setTimeout(() => {
        isLoader.value = false;
      }, 100);
    }
  }
}

function handleDelete(category: string, id: string, img: string) {
  const isDeleted = deleteToDo(category, id, img);
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
.description {
  padding: 10px 0;
  font-size: 25px;
}
.checkbox-label {
  font-size: 20px;
  padding-right: 5px;
}
.checkbox {
  width: 24px;
  aspect-ratio: 1/1;
  border: 2px solid cornflowerblue;
  border-radius: 6px;
  position: relative;
  cursor: pointer;
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
.loader {
  position: absolute;
  z-index: 1;
  inset: 0;
  border-radius: 50%;
  aspect-ratio: 1/1;
  border: 2px dotted black;
  margin: 2px;
  animation-name: spin;
  animation-duration: 4000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  background-color: var(--color-background);
}

.is-done {
  text-decoration: line-through;
  color: gray;
}
.is-checked {
  background-color: rgb(156, 191, 255);
}
.is-disabled {
  cursor: not-allowed;
}
.todo-state {
  display: flex;
  align-items: center;
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

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
