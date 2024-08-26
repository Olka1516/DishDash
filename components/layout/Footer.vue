<template>
  <footer class="container">
    <h2>Social Media</h2>
    <div class="footer-media">

      <img v-for="media in medias" :src="`/icons/${media}.svg`" alt="" />
    </div>
  </footer>
</template>

<script setup lang="ts">
const medias = ["telegram", "linkedin", "instagram", "github"];
</script>

<style scoped lang="scss">
@use "@/assets/index";
@include index.footer;
</style>
