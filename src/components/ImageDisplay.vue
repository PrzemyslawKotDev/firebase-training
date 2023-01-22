<template>
  <div class="image">
    <img ref="itemImage" src="" :alt="alt" />
  </div>
</template>

<script setup lang="ts">
import getFileRef from "@/service/getFileRef";
import { getDownloadURL } from "@firebase/storage";
import { ref, onMounted } from "vue";

type PropsType = {
  imageName: string;
  alt: string;
};
const props = defineProps<PropsType>();
const itemImage = ref();

onMounted(() => {
  getDownloadURL(getFileRef("images", props.imageName)).then((item) => {
    itemImage.value.setAttribute("src", item);
  });
});
</script>

<style scoped>
.image {
  height: 150px;
  aspect-ratio: 1/1;
  border: 1px solid black;
  margin-right: 10px;
}
img {
  width: 100%;
  height: 100%;
}
</style>
