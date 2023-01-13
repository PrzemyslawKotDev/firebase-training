<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/service/firebaseConnection";
import { ref } from "vue";
import router from "./router";

// vuequery
// warianty todos dla pracy, zakupy, relax

const isLogged = ref(false);

//logout function
function logout() {
  signOut(auth)
    .then(() => {
      isLogged.value = false;
    })
    .catch((error) => {
      alert(`ERROR WHILE LOGGING OUT: ${error}`);
    });
}

//observe if user is logged
onAuthStateChanged(auth, (user) => {
  if (user) {
    isLogged.value = true;
    const uid = user.uid;
  } else {
    router.push({ name: "login" });
  }
});
</script>

<template>
  <div class="container">
    <nav v-if="isLogged">
      <RouterLink class="link" :to="{ name: 'home' }">Show data</RouterLink>
      <RouterLink class="link" :to="{ name: 'addtodo' }">Add todo</RouterLink>
      <button class="link" @click="logout">Logout</button>
    </nav>
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 1400px;
  padding: 10px;

  @media screen and (max-width: 768px) {
    padding: 5px;
  }
}
nav {
  width: 100%;
  text-align: center;
  padding-bottom: 30px;
}
.link {
  font-size: 24px;
  font-weight: 600;
  text-decoration: none;
  color: black;
  padding: 5px 10px;
  border-right: 2px solid black;
  background-color: transparent;
  text-transform: uppercase;
}
.link:last-child {
  border: 0;
}
</style>
