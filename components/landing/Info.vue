<template>
  <div class="container">
    <img class="img-1" src="/landing/texts.png" alt="" />
    <DetailedText
      v-for="info in information"
      :title="info.title"
      :description="info.description"
    />
    <img class="img-2" src="/landing/clock.png" alt="" />
  </div>
</template>

<script setup lang="ts">
const information = [
  {
    title: "Breakfast",
    description:
      "Kickstart your day with our delicious breakfast options. From classic favorites like pancakes and eggs to healthy choices like smoothies and granola, we’ve got everything you need to fuel your morning.",
  },
  {
    title: "Lunch",
    description:
      "Take a break and enjoy our diverse lunch menu. Whether you're in the mood for a light salad, a savory sandwich, or something more filling, our lunch offerings are designed to satisfy every craving.",
  },
  {
    title: "Dinner",
    description:
      "End your day on a high note with a delightful dinner. Our dinner menu features a variety of dishes, from comforting classics to adventurous new flavors, ensuring that your evening meal is nothing short of spectacular.",
  },
];
</script>

<style lang="scss" scoped>
@use "@/assets/index";
@include index.info;
</style>
