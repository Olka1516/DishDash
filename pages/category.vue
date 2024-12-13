<template>
  <div class="container">
    <Toast />
    <div>
      <div class="category">
        <InputsFilter v-model="dataFilter" />
        <InputsSearch v-model="dataSearch" />
      </div>
      <div v-if="loading" class="category-empty">
        <LayoutLoader />
      </div>
      <div v-else-if="!data.length" class="category-empty">
        <h1>Тут нема рецептів</h1>
      </div>
      <div v-else>
        <DataView :value="data" :layout="'grid'" paginator :rows="4">
          <template #grid="slotProps">
            <div class="category">
              <DetailedReceiptCard
                v-for="item in slotProps.items"
                :title="item.title"
                :description="item.description"
                :id="item.id"
                :image="item.image"
              />
            </div>
          </template>
        </DataView>
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
const loading = ref(true);

const dataSearch = ref("");
const dataFilter = ref<string[]>(query.data ? ([query.data] as string[]) : []);

const getFilteredReceipts = async () => {
  loading.value = true;
  const newData = await store.getReceiptsByFilters(
    dataSearch.value,
    dataFilter.value as string[]
  );
  data.value = newData;
  loading.value = false;
};

onMounted(async () => {
  if (!store.receipts.length) {
    await store.getReceipts("receipts");
  }
  if (dataFilter.value.length) await getFilteredReceipts();
  else data.value = store.receipts;
  loading.value = false;
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
