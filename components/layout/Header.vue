<template>
  <header class="container">
    <img src="/logo.png" alt="" />

    <div class="navs">
      <NuxtLink :to="LINK_TEMPLATES.CATEGORY">Category</NuxtLink>
      <NuxtLink :to="LINK_TEMPLATES.CATEGORY">Form</NuxtLink>
      <NuxtLink :to="LINK_TEMPLATES.SIGN_IN">Sign in</NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { LINK_TEMPLATES } from "~/constants";
</script>

<style scoped lang="scss">
@use "@/assets/index";
@include index.header;
</style>
