<template>
  <div class="container">
    <div v-if="!data.length" class="category-empty">
      <h1>Ти не маєш рецептів</h1>
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
const data = [
  {
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum industry's..., Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum industry's...",
    id: "1",
    image: "/temp1.png",
  },
  {
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum industry's...",
    id: "1",
    image: "/temp1.png",
  },
  {
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum industry's...",
    id: "1",
    image: "/temp1.png",
  },
  {
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum industry's...",
    id: "1",
    image: "/temp1.png",
  },
];

const dataSearch = ref("");
const dataFilter = ref([]);
</script>

<style scoped lang="scss">
@use "@/assets/index";
@include index.category-page;
</style>
