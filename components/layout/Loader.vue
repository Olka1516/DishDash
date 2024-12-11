<template>
  <div>
    <div class="loader">
      <div v-for="_ in 5" class="loader__circle"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/index";
@include index.loader;
</style>
