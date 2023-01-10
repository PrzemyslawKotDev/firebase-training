<template>
    <div>
        <label for="todoTitle">To do:</label>
    <input id="todoTitle" name="todoTitle" v-model="todoName" />
    </div>
</template>

<script setup lang="ts">
import getFileRef from "@/service/getFileRef";

getFileRef("images", ""))
</script>

<style scoped>

</style>