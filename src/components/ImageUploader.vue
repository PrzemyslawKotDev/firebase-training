<template>
  <div class="image-uploader">
    <label class="file-label"
      >Click to add image
      <input
        type="file"
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
import { type StorageReference, uploadBytesResumable } from "firebase/storage";

type PropsType = {
  name: string;
};

const props = defineProps<PropsType>();
const fileInputKey = ref(0);
const file = ref<File>();
const emit = defineEmits(["filename", "clearInputs"]);
const imageRef = ref<StorageReference>();
const fileName = ref("");
const progressBar = ref("");
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
    const uploadTask = uploadBytesResumable(imageRef.value, file.value);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progressBar.value = `${progress}%`;
      },
      (error) => {
        alert(`FILE UPLOAD UNSUCCESSFUL: ${error}`);
      },
      () => {
        //success
        progressBar.value = "";
        fileName.value = "";
        emit("clearInputs");
      }
    );
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
.file-label {
  position: absolute;
  inset: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding-right: 5px;
  border: 1px solid rgb(118, 118, 118);
  border-radius: 2px;
}
label:focus-within {
  border: 2px solid black;
  outline: 1px solid white;
}
.image-input {
  z-index: -1;
  position: absolute;
}

.file-label:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  background: rgba(0, 255, 0, 0.227);
  width: v-bind(progressBar);
  height: 100%;
}
</style>
