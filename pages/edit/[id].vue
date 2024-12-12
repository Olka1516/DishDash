<template>
  <div class="container">
    <AdminRedactor v-model="value"></AdminRedactor>
    <button @click="submit">Submit</button>
  </div>
</template>

<script setup lang="ts">
import { useReceiptsStore } from "~/store/receipts";

const value = ref("");
const route = useRoute();

const store = useReceiptsStore();
const submit = async () => {
  try {
    await store.addOrUpdateReceipts(
      value.value,
      route.query.data as string,
      route.params.id as string
    );
    console.log("Документ додано");
    await navigateTo(`/detailed/${route.params.id}?data=${route.query.data}`);
  } catch (error) {
    console.error("Помилка додавання документа:", error);
  }
};

onMounted(async () => {
  const data = await store.getReceiptById(
    route.query.data as string,
    route.params.id as string
  );
  if (data) value.value = data.page;
});
</script>

<style scoped lang="scss">
@use "@/assets/index";
@include index.add-receipt;
</style>
