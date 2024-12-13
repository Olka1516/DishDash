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

const value = ref(
  '<p>Img:&nbsp</p><p>Title:&nbsp</p><p>Ingredients:</p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span><br></li></ol><p>Details:&nbsp</p>'
);

const store = useReceiptsStore();
const submit = async () => {
  const { showSuccess, showError } = useToastsStore();
  try {
    await store.addOrUpdateReceipts(value.value, "receipts");
    await navigateTo("/category");
    showSuccess("Added receipt successfully");
  } catch (error: any) {
    const message = error.message.includes(ErrorMessageEnum.InvalidData)
      ? "Invalid data, please rewrite form"
      : error.message;
    showError(message);
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/index";
@include index.add-receipt;
</style>
