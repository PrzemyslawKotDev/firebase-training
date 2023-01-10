<template>
  <div class="login-wrapper">
    <div class="form">
      <label for="email">Email: </label>
      <input id="email" name="email" v-model="email" />
    </div>
    <div class="form">
      <label for="password">Password: </label>
      <input type="password" id="password" name="password" v-model="password" />
    </div>
    <div class="form">
      <label for="password2">Repeat Password: </label>
      <input
        type="password"
        id="password2"
        name="password2"
        v-model="password2"
      />
    </div>
    <button class="close" @click="$emit('close')">+</button>
    <button class="login-btn" @click="signin">Create Account</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { auth } from "@/service/firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import router from "@/router";

const email = ref("");
const password = ref("");
const password2 = ref("");
const emit = defineEmits(["close"]);

function signin() {
  if (password.value === password2.value) {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        router.push("/home");
        emit("close");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`CREATE USER ERROR: ${errorMessage}`);
      });
  } else {
    alert("PASSWORDS DO NOT MATCH");
  }
}
</script>

<style scoped>
.login-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}
.form {
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 5px;
  width: 100%;
}
label {
  text-align: end;
  padding-right: 5px;
}
.login-btn {
  border: none;
  font-size: 20px;
  padding: 5px 15px;
  margin-top: 10px;
  background-color: aliceblue;
  cursor: pointer;
  border-radius: 5px;
}
.close {
  position: absolute;
  right: 0;
  top: -10px;
  border: 0;
  background-color: transparent;
  font-size: 28px;
  rotate: 45deg;
  color: red;
  font-weight: 600;
}
</style>
