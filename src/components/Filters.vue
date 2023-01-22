<template>
  <div class="filter" v-for="item in filters">
    <input
      :id="item"
      :name="item"
      type="radio"
      v-model="filter"
      :value="item"
      @change="$emit('filter', filter)"
    />
    <label class="filter-label" :for="item">{{ item }}</label>
  </div>
  <button :class="{ 'is-visible': filter }" class="clear" @click="clearFilter">
    CLEAR
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
type PropsType = {
  filters: string[];
};
const props = defineProps<PropsType>();
const emit = defineEmits(["filter"]);
const filter = ref("");

function clearFilter() {
  filter.value = "";
  emit("filter", filter.value);
}
</script>

<style scoped>
.filter {
  margin: 0 5px;
  display: flex;
  align-items: center;
}
.filter-label {
  display: block;
  padding-left: 3px;
}
.filter-label::first-letter {
  text-transform: capitalize;
}
.clear {
  opacity: 0;
  padding: 3px;
  margin: 0;
  background-color: transparent;
  border: 0;
  font-weight: 600;
  color: red;
}
.is-visible {
  opacity: 1;
}
</style>
