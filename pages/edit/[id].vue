<template>
  <div class="container">
    <Toast />
    <AdminRedactor v-model="value"></AdminRedactor>
    <button @click="submit">Submit</button>
  </div>
</template>

<script setup lang="ts">
import { useReceiptsStore } from "~/store/receipts";
import { useToastsStore } from "~/store/toasts";
import { ErrorMessageEnum } from "~/types";

const value = ref("");
const route = useRoute();

const store = useReceiptsStore();
const submit = async () => {
  const { showSuccess, showError } = useToastsStore();
  try {
    await store.addOrUpdateReceipts(
      value.value,
      route.query.data as string,
      route.params.id as string
    );
    await navigateTo(`/detailed/${route.params.id}?data=${route.query.data}`);
    showSuccess("Added receipt successfully");
  } catch (error: any) {
    const message = error.message.includes(ErrorMessageEnum.InvalidDataUpdate)
      ? "Invalid data, please rewrite form"
      : error.message;
    showError(message);
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
