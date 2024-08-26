<template>
  <header class="container">
    <img src="/logo.png" alt="" />

    <div class="navs">
      <NuxtLink>Sign in</NuxtLink>
      <NuxtLink>Sign up</NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use "@/assets/index";
@include index.header;
</style>
