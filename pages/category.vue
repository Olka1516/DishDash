<template>
  <div class="container">
    <div>
      <div class="category">
        <InputsFilter v-model="dataFilter" />
        <InputsSearch v-model="dataSearch" />
      </div>
      <div v-if="!data.length" class="category-empty">
        <h1>Тут нема рецептів</h1>
      </div>
      <div class="category" v-else>
        <DetailedReceiptCard
          v-for="item in data"
          :title="item.title"
          :description="item.description"
          :id="item.id"
          :image="item.image"
        />
      </div>
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

const getFilteredReceipts = async () => {
  const newData = await store.getReceiptsByFilters(
    dataSearch.value,
    dataFilter.value as string[]
  );
  data.value = newData;
};

onMounted(async () => {
  if (!store.receipts.length) {
    await store.getReceipts("receipts");
  }
  if (dataFilter.value.length) await getFilteredReceipts();
  else data.value = store.receipts;
});

watch(
  () => dataSearch.value,
  async () => {
    await getFilteredReceipts();
  }
);
watch(
  () => dataFilter.value.length,
  async () => {
    await getFilteredReceipts();
  }
);
</script>

<style scoped lang="scss">
@use "@/assets/index";
@include index.category-page;
</style>
