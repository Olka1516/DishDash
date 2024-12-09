<template>
  <div class="container">
    <div v-if="!data.length" class="receipts-empty">
      <h1>Here no one receipt</h1>
    </div>
    <div v-else class="receipts">
      <DetailedReceiptCard
        v-for="item in data.slice(0, 4)"
        :title="item.title"
        :description="item.description"
        :id="item.id"
        :image="item.image"
      />
    </div>
    <NuxtLink :to="LINK_TEMPLATES.CATEGORY('')">More</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import { LINK_TEMPLATES } from "~/constants";
import { useReceiptsStore } from "~/store/receipts";
import type { IReceipt } from "~/types";

const store = useReceiptsStore();
const data = ref<IReceipt[]>([]);

onMounted(async () => {
  if (!store.receipts.length) {
    await store.getReceipts("receipts");
  }
  data.value = store.receipts;
});
</script>

<style scoped lang="scss">
@use "@/assets/index";
@include index.receipt;
</style>
