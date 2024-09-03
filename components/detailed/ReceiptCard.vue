<template>
  <div class="card">
    <div class="card-title">
      <img class="card-image" :src="image" alt="" />
      <div class="card-content">
        <img class="card-frame" src="/frame.png" alt="" />
        <h2>{{ title }}</h2>
        <img class="card-frame" src="/frame.png" alt="" />
      </div>
    </div>
    <div class="card-subtitle">
      <p>{{ description }}</p>
      <NuxtLink to="">Detailed</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
  image: string;
  title: string;
  description: string;
}>();
</script>

<style scoped lang="scss">
@use "@/assets/index";
@include index.receipt-card;
</style>
