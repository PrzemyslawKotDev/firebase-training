<template>
  <div class="images-container">
    <div class="images">
      <h1>Your images</h1>
      <h2 v-if="noImages">{{ noImages }}</h2>
      <div v-if="images.length > 0" class="images-grid">
        <div v-for="name in images">
          <ImageDisplay :image-name="name" />
          <h2>{{ removeExtension(name) }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageDisplay from "@/components/ImageDisplay.vue";
import getFileRef from "@/service/getFileRef";
import { listAll } from "@firebase/storage";
import { ref } from "vue";

const images = ref<string[]>([]);
const noImages = ref("");
//podepnij to na dole pod funkcję i odpalaj przy emicie z upload
listAll(getFileRef("images", "")).then((res) => {
  if (res.items.length) {
    res.items.forEach((itemRef) => {
      images.value.push(itemRef.name);
    });
  } else {
    noImages.value = "You have no images saved.";
  }
});

function removeExtension(name: string) {
  return name.split(".")[0];
}
</script>

<style scoped>
.images {
  padding-bottom: 30px;
}
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
