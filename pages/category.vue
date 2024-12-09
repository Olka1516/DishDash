<template>
  <div class="container">
    <div v-if="!data.length" class="category-empty">
      <h1>Тут нема рецептів</h1>
    </div>
    <div v-else class="category">
      <InputsFilter v-model="dataFilter" />
      <InputsSearch v-model="dataSearch" />
      <DetailedReceiptCard
        v-for="item in data"
        :title="item.title"
        :description="item.description"
        :id="item.id"
        :image="item.image"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useReceiptsStore } from "~/store/receipts";
import type { IReceipt } from "~/types";

const query = useRoute().query;
const data = ref<IReceipt[]>([]);
const store = useReceiptsStore();

const dataSearch = ref("");
const dataFilter = ref(query.data ? [query.data] : []);

onMounted(async () => {
  if (!store.receipts.length) {
    await store.getReceipts("receipts");
  }
  data.value = store.receipts;
});
</script>

<style scoped lang="scss">
@use "@/assets/index";
@include index.category-page;
</style>
