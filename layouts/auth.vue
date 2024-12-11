<template>
  <div v-if="loading">
    <LayoutLoader />
  </div>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp();
const loading = ref(true);

nuxtApp.hook("page:finish", () => {
  loading.value = false;
});
</script>
