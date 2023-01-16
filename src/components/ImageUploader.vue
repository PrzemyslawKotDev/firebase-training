<template>
  <div class="image-uploader">
    <label class="file-label"
      >Click to add image
      <input
        type="file"
        @change="handleFileLoad($event)"
        accept="image/*"
        capture
        :key="fileInputKey"
        class="image-input"
      />
    </label>
  </div>
  <canvas ref="canva" width="300" height="300" class="canva"></canvas>
</template>

<script setup lang="ts">
import getFileRef from "@/service/getFileRef";
import { ref } from "vue";
import { type StorageReference, uploadBytesResumable } from "firebase/storage";

const canva = ref();
const fileInputKey = ref(0);
const file = ref<Blob>();
const emit = defineEmits(["clearInputs"]);
const imageRef = ref<StorageReference>();
const progressBar = ref("");

//LET PARENT COMPONENT SEE YOUR FUNCTION
defineExpose({ sendFile });

//handle img load and get extension
function handleFileLoad(e: any) {
  const eventFile = e.target.files[0];
  if (eventFile) {
    const blobURL = URL.createObjectURL(eventFile);
    const img = new Image();
    img.src = blobURL;

    img.onerror = function () {
      URL.revokeObjectURL(this.src);
      alert("Cannot load image");
    };

    img.onload = async function () {
      URL.revokeObjectURL(img.src);
      const ctx = canva.value.getContext("2d");
      ctx.drawImage(img, 0, 0, 300, 300);
      file.value = await new Promise((resolve) =>
        canva.value.toBlob(resolve, "image/png")
      );
    };
  }
}

//exposed function to send image to firestore
function sendFile(imgName: string) {
  imageRef.value = getFileRef("images", `${imgName}`);
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
        fileInputKey.value++;
        canva.value.width = canva.value.width;
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
.canva {
  position: absolute;
  visibility: hidden;
}
</style>
