<template>
  <header class="container">
    <NuxtLink class="nav-home" :to="LINK_TEMPLATES.HOME">
      <img class="logo" src="/logo.png" alt="" />
    </NuxtLink>

    <div class="navs">
      <NuxtLink :to="LINK_TEMPLATES.CATEGORY('')">Category</NuxtLink>
      <NuxtLink v-if="!authenticated" :to="LINK_TEMPLATES.FORM">Form</NuxtLink>
      <NuxtLink v-else :to="LINK_TEMPLATES.ADD_RECEIPT">Add receipt</NuxtLink>
      <NuxtLink v-if="!authenticated" :to="LINK_TEMPLATES.SIGN_IN"
        >Sign in</NuxtLink
      >
      <NuxtLink v-else :to="LINK_TEMPLATES.ADMIN">Admin</NuxtLink>
    </div>
    <button @click="openBurger" class="burger-btn">
      <img class="burger-icon" src="/icons/burgerMenu.svg" alt="" />
    </button>
  </header>
  <div class="burger-menu">
    <LayoutBurger
      :authenticated="authenticated"
      :isClosed="isBurgerClosed"
      @update:isClosed="(val: boolean) => isBurgerClosed = val"
    />
  </div>
</template>

<script setup lang="ts">
import { LINK_TEMPLATES } from "~/constants";
import { useAuthStore } from "~/store/auth";

const { authenticated } = storeToRefs(useAuthStore());
const isBurgerClosed = ref(true);

const openBurger = () => {
  isBurgerClosed.value = false;
  document.body.style.overflow = "hidden";
  document.body.style.maxHeight = "100vh";
};
</script>

<style scoped lang="scss">
@use "@/assets/index";
@include index.header;
</style>
