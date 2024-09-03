<template>
  <div class="container">
    <div v-if="!data.length" class="receipts-empty">
      <h1>Here no one receipt</h1>
    </div>
    <div v-else class="receipts">
      <DetailedReceiptCard
        v-for="item in data"
        :title="item.title"
        :description="item.description"
        :id="item.id"
        :image="item.image"
      />
    </div>
    <button>More</button>
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
</script>

<style scoped lang="scss">
@use "@/assets/index";
@include index.receipt;
</style>
