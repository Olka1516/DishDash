<template>
  <div class="container">
    <img :src="`/landing/${category[selectedCategory].title}.png`" alt="" />
    <div class="category">
      <div class="category-navs">
        <button
          class="light-button"
          v-for="key in category"
          @click="changeTab(key.id)"
          :class="{ active: key.id === selectedCategory }"
        >
          {{ key.title }}
        </button>
      </div>
      <p>
        {{ category[selectedCategory].description }}
      </p>
      <NuxtLink class="light-button">See More</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const category = [
  {
    id: 0,
    title: "Desserts",
    description:
      "This category contains recipes for every taste: from classic cakes and pies to modern desserts with a minimum of sugar. You will learn to cook delicate creams, lush biscuits, cakes, ice cream and other goodies that will please your family and friends. For lovers of healthy food, we have prepared dessert recipes based on fruits, nuts and honey. And for those who like to experiment - desserts with unexpected ingredients, such as avocado or quinoa.",
  },
  {
    id: 1,
    title: "Meat",
    description:
      "In this category you will find recipes for cooking different types of meat, including beef, pork, chicken, lamb and others. From traditional dishes such as baked chicken or beef stew to more exotic options such as lamb ribs or pork tenderloin with fruit. These recipes are suitable both for everyday menus and for festive feasts. Learn how to cook succulent meat with minimal effort using our detailed instructions and tips from our chefs.",
  },
  {
    id: 2,
    title: "Seafood",
    description:
      "This category will be a find for those who appreciate light and healthy cuisine, rich in protein, omega-3 fatty acids and trace elements. From classic fish dishes such as baked trout or steamed salmon to more exotic options such as calamari, prawns, mussels and oysters. Cook delicious sushi, paella with seafood or light fish soups with us. All recipes are accompanied by detailed instructions and recommendations for choosing the perfect ingredients.",
  },
  {
    id: 3,
    title: "Soups",
    description:
      "In this section you will find soup recipes for every taste and for every season. From light vegetable soups and broths to thick cream soups and rich borschts. Learn how to make the perfect French onion soup, Italian minestrone or Thai tom yum. And for those who are looking for quick solutions - soup recipes that can be prepared in just 20-30 minutes. Soups not only warm, but also saturate the body with useful substances.",
  },
  {
    id: 4,
    title: "Snacks",
    description:
      "Appetizers are not only an appetizing start to a meal, but also an ideal option for quick snacks or light parties. Here you will find recipes for making sandwiches, tartlets, various dips, salads and other dishes that can be served as a snack. From simple and quick to more complex and sophisticated options, our recipes will help you surprise your guests and create the perfect appetite before the main course. Each recipe comes with serving suggestions and decorating ideas.",
  },
];

const selectedCategory = ref(0);

const changeTab = (id: number) => {
  selectedCategory.value = id;
};
</script>

<style scoped lang="scss">
@use "@/assets/index";
@include index.category;
</style>
