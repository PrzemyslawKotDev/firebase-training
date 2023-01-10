<template>
  <div>
    <img ref="itemImage" src="" alt="" />
  </div>
</template>

<script setup lang="ts">
import getFileRef from "@/service/getFileRef";
import { getDownloadURL } from "@firebase/storage";
import { ref } from "vue";

type PropsType = {
  imageName: string;
};
const props = defineProps<PropsType>();
const itemImage = ref();
const imageUrl = getDownloadURL(getFileRef("images", props.imageName));

imageUrl.then((item) => {
  itemImage.value.setAttribute("src", item);
});
</script>

<style scoped></style>
