<template>
  <div class="container">
    <div class="detailed-title">
      <img :src="data.image" alt="" />
      <div class="detailed-texts">
        <h1>{{ data.title }}</h1>
        <h2>Ingredients</h2>
        <ul>
          <li v-for="ingredient in data.ingredients">
            <h3>
              {{ ingredient.name }}
            </h3>
            ..................................................................................
            <h3>
              {{ ingredient.amount }}
            </h3>
          </li>
        </ul>
      </div>
    </div>
    <div class="detailed-subtitle">
      <h2>Description</h2>
      <p>
        {{ data.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const data = {
  title: "Lorem Ipsum",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum industry's..., Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum industry's...",
  id: "1",
  image: "/temp2.jpg",
  ingredients: [
    {
      name: "milk",
      amount: "220ml",
    },
    {
      name: "milk",
      amount: "220ml",
    },
    {
      name: "milk",
      amount: "220ml",
    },
    {
      name: "milk",
      amount: "220ml",
    },
  ],
};
</script>

<style scoped lang="scss">
@use "@/assets/index";
@include index.detailed;
</style>
