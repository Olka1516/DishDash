<template>
  <div class="container">
    <AdminRedactor v-model="value"></AdminRedactor>
    <button @click="submit">Submit</button>
  </div>
</template>

<script setup lang="ts">
import { useReceiptsStore } from "~/store/receipts";
import { useToastsStore } from "~/store/toasts";
import { ErrorMessageEnum } from "~/types";

const value = ref(
  '<p>Img:&nbsp</p><p>Title:</p><p>Ingredients: </p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span><br></li></ol><p>Details:</p>'
);
const store = useReceiptsStore();

const submit = async () => {
  const { showSuccess, showError } = useToastsStore();
  try {
    await store.addOrUpdateReceipts(value.value, "requests");
    await navigateTo("/category");
    showSuccess("Receipt successfully sent to administrator");
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
