<template>
  <div class="image-uploader">
    <label for="file" class="file-label" tabindex="0"
      >Click to add image
      <input
        type="file"
        id="file"
        name="file"
        @change="handleFileUpload($event)"
        accept="image/*"
        capture
        :key="fileInputKey"
        class="image-input"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
import getFileRef from "@/service/getFileRef";
import { ref } from "vue";
import { type StorageReference, uploadBytes } from "firebase/storage";

type PropsType = {
  name: string;
};

const props = defineProps<PropsType>();
const fileInputKey = ref(0);
const file = ref<File>();
const emit = defineEmits(["filename"]);
const imageRef = ref<StorageReference>();
const fileName = ref("");
defineExpose({ sendFile });

function handleFileUpload(e: any) {
  const target = e.target as HTMLInputElement;
  if (target && target.files) {
    file.value = target.files[0];
    const fileExtension = file.value?.name.split(".").reverse()[0];
    fileName.value = `${props.name
      .toLowerCase()
      .replace(/\s/g, "")}.${fileExtension}`;
    imageRef.value = getFileRef("images", `${fileName.value}`);
    emit("filename", fileName.value);
    fileInputKey.value++;
  }
}
function sendFile() {
  if (imageRef.value && file.value) {
    uploadBytes(imageRef.value, file.value).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  } else {
    if (!imageRef.value) {
      alert("ERROR WITH GETING REFERENCE");
    }
    if (!file.value) {
      alert("ERROR WITH UPLOADING FILE");
    }
  }
}
</script>

<style scoped>
.image-uploader {
  width: 100%;
  height: 50px;
  position: relative;
  margin: 10px 0;
}
label {
  padding-right: 5px;
}
.image-input {
  display: none;
}
.file-label {
  position: absolute;
  inset: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
