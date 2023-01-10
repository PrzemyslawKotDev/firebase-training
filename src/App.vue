<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container">
    <nav>
      <RouterLink class="link" to="/">Show data</RouterLink>
      <RouterLink class="link" to="/addtodo">Add todo</RouterLink>
      <RouterLink class="link" to="/images">Images</RouterLink>
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
}
.link:last-child {
  border: 0;
}
</style>
