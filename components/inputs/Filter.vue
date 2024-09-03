<template>
  <div class="content">
    <div class="filter" @click="changeStatus">
      <img src="/icons/filter.svg" alt="" />
      <i v-if="!selectedProducts.length">Filter</i>
      <div class="selected-product">
        <span v-for="product in selectedProducts">
          {{ product }}
          <button @click="deleteFilter($event, product)">
            <img src="public/icons/exit.svg" alt="" />
          </button>
        </span>
      </div>
      <div class="filter-open" v-if="filterStatus">
        <h3 @click="selectProduct(key)" v-for="key in data">{{ key }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { data } from "~/mocks/products";

const filterStatus = ref(false);
const selectedProducts = ref<string[]>([]);

const changeStatus = () => {
  filterStatus.value = !filterStatus.value;
};

const selectProduct = (product: string) => {
  if (!selectedProducts.value.includes(product)) {
    selectedProducts.value.push(product);
  }
};

const deleteFilter = (event: Event, product: string) => {
  event.stopPropagation();
  selectedProducts.value = selectedProducts.value.filter(item => item !== product);
};
</script>

<style scoped lang="scss">
@use "@/assets/index";
@include index.filter;
</style>
