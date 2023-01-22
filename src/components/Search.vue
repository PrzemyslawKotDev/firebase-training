<template>
  <label for="search" class="search-label">Search: </label>
  <input
    id="search"
    name="search"
    type="search"
    class="search-input"
    v-model.trim="search"
    @change="$emit('searchValue', search)"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

const search = ref("");
defineEmits(["searchValue"]);
</script>

<style scoped>
.search-input {
  margin-left: 5px;
  font-size: 20px;
  width: 100%;
}
</style>
