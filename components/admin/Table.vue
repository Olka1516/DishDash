<template>
  <div class="card">
    <DataTable
      :value="products"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem"
      :loading="loading"
    >
      <template #header>
        <div>
          <h3>Receipts</h3>
        </div>
      </template>
      <template #loading>
        <LayoutLoader />
      </template>
      <template #empty>
        <div>
          <div class="empty">
            <h3>You do not have requests with receipts</h3>
          </div>
        </div>
      </template>
      <Column header="Image">
        <template #body="slotProps">
          <img :src="`${slotProps.data.image}`" alt="" />
        </template>
      </Column>
      <Column field="title" header="Title"></Column>
      <Column field="id" header="Id">
        <template #body="slotProps">
          <NuxtLink
            class="table-link"
            :to="LINK_TEMPLATES.DETAILED(slotProps.data.id, 'requests')"
          >
            {{ slotProps.data.id }}</NuxtLink
          >
        </template>
      </Column>
      <template #footer>
        In total there are {{ products ? products.length : 0 }} products.
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { LINK_TEMPLATES } from "~/constants";
import { useReceiptsStore } from "~/store/receipts";
import type { IReceipt } from "~/types";

const store = useReceiptsStore();
const loading = ref(true);
const products = ref<IReceipt[]>([]);

onMounted(async () => {
  if (!store.requests.length) {
    await store.getReceipts("requests");
  }
  products.value = store.requests;
  loading.value = false;
});
</script>
<style lang="scss" scoped>
@use "@/assets/index";
@include index.admin-table;
</style>
