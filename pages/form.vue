<template>
  <div class="container">
    <AdminRedactor v-model="value"></AdminRedactor>
    <button @click="submit">Submit</button>
  </div>
</template>

<script setup lang="ts">
import { useReceiptsStore } from "~/store/receipts";

const value = ref(
  '<p>Img:&nbsp</p><p>Title:</p><p>Ingredients: </p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span><br></li></ol><p>Details:</p>'
);
const store = useReceiptsStore();

const submit = async () => {
  try {
    await store.addOrUpdateReceipts(value.value, "requests");
    console.log("Документ додано");
    await navigateTo("/category");
  } catch (error) {
    console.error("Помилка додавання документа:", error);
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/index";
@include index.add-receipt;
</style>
