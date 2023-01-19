<template>
  <div v-if="!isSignin" class="login-wrapper">
    <div class="form">
      <label for="email">Email: </label>
      <input id="email" name="email" v-model="email" />
    </div>
    <div class="form">
      <label for="password">Password: </label>
      <input type="password" id="password" name="password" v-model="password" />
    </div>
    <button class="login-btn" @click="login">Log in</button>
    <button class="sign-btn" @click="isSignin = !isSignin">Sign in</button>
  </div>
  <SignIn v-if="isSignin" @close="isSignin = !isSignin" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { auth } from "@/service/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import SignIn from "@/components/SignIn.vue";
import router from "@/router";

const email = ref("");
const password = ref("");
const isSignin = ref(false);

//login function
function login() {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      // Signed in
      router.push("/home");
      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(`CREATE USER ERROR: ${errorMessage}`);
    });
}
</script>

<style scoped>
.login-wrapper {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
.sign-btn {
  font-size: 16px;
  border: 0;
  padding: 10px;
  background-color: transparent;
  cursor: pointer;
}
</style>
