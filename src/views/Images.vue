<template>
  <div class="images-container">
    <div class="iamges">
      <h1>Your images</h1>
      <h2 v-if="noImages">{{ noImages }}</h2>
      <div v-if="images.length > 0" class="images-grid">
        <h2 v-for="name in images">{{ removeExtension(name) }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import getFileRef from "@/service/getFileRef";
import { listAll } from "@firebase/storage";
import { ref } from "vue";

const images = ref<string[]>([]);
const noImages = ref("");

listAll(getFileRef("images", ""))
  .then((res) => {
    if (res.items.length) {
      res.items.forEach((itemRef) => {
        images.value.push(itemRef.name);
      });
    } else {
      noImages.value = "You have no images saved.";
    }
  })
  .catch((error) => {
    alert(`ERROR: ${error}`);
  });

function removeExtension(name: string) {
  return name.split(".")[0];
}
</script>

<style scoped>
h1 {
  padding-bottom: 20px;
  text-align: center;
}
h2 {
  text-align: center;
  width: 100%;
  padding: 10px;
}
.images-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
