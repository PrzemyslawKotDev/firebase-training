<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/service/firebaseConnection";
import { ref } from "vue";
import router from "./router";
import HamburgerMenu from "./components/HamburgerMenu.vue";

// vuequery
// warianty todos dla pracy, zakupy, relax
//szukajka po tytułach
//typy produktów i filtry (radio buttons)

const isLogged = ref(false);
const isSideMenuOpen = ref(false);

//logout function
function logout() {
  signOut(auth)
    .then(() => {
      isLogged.value = false;
      isSideMenuOpen.value = false;
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
  <div class="title">resource manager</div>
  <nav class="side-menu" :class="{ 'is-closed': !isLogged }">
    <HamburgerMenu
      :is-open="isSideMenuOpen"
      @hamburger-click="isSideMenuOpen = !isSideMenuOpen"
    />
    <div class="links" :class="{ 'is-closed': !isSideMenuOpen }">
      <div class="navigation">
        <RouterLink class="link" :to="{ name: 'additem' }">Add item</RouterLink>
        <RouterLink class="link" :to="{ name: 'home' }">Show data</RouterLink>
      </div>

      <button class="link logout" @click="logout">Logout</button>
    </div>
  </nav>
  <div class="container">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin-top: 100px;
  max-width: 1400px;
  padding: 10px;

  @media screen and (max-width: 768px) {
    padding: 5px;
  }
}
.title {
  width: 100%;
  height: 100px;
  font-size: 40px;
  padding: 0px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(231, 240, 244);
  position: fixed;
  top: 0;
  left: 0;
  text-transform: uppercase;
  z-index: 50;
}
.links {
  height: 100%;

  background-color: white;
  border-right: 1px solid black;
  padding-top: 50px;
}
.navigation {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.side-menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 150;
}
.link {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
  color: black;
  padding: 5px 10px;
  background-color: transparent;
  text-transform: uppercase;
  border: 0;
  border-bottom: 2px solid black;
  width: 100%;
}
.logout {
  border-bottom: 0;
  border-top: 2px solid black;
  position: absolute;
  bottom: 0;
}
.is-closed {
  opacity: 0;
  pointer-events: none;
}
</style>
