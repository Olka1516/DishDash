<template>
  <header class="container">
    <NuxtLink class="nav-home" :to="LINK_TEMPLATES.HOME">
      <img src="/logo.png" alt="" />
    </NuxtLink>

    <div class="navs">
      <NuxtLink :to="LINK_TEMPLATES.CATEGORY">Category</NuxtLink>
      <NuxtLink :to="LINK_TEMPLATES.CATEGORY">Form</NuxtLink>
      <NuxtLink v-if="!authenticated" :to="LINK_TEMPLATES.SIGN_IN"
        >Sign in</NuxtLink
      >
      <NuxtLink v-else :to="LINK_TEMPLATES.ADMIN">Admin</NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { LINK_TEMPLATES } from "~/constants";
import { useAuthStore } from "~/store/auth";

const { authenticated } = storeToRefs(useAuthStore());
</script>

<style scoped lang="scss">
@use "@/assets/index";
@include index.header;
</style>
