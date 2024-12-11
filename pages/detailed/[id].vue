<template>
  <div class="container">
    <NuxtLink
      v-if="authenticated"
      :to="LINK_TEMPLATES.EDIT(data.id, route.query.data as string)"
    >
      <img class="detailed-edit" src="/icons/edit.svg" alt="" />
    </NuxtLink>
    <div v-html="data.page" class="detailed-title"></div>
  </div>
</template>

<script setup lang="ts">
import { doc, getDoc } from "firebase/firestore";
import { LINK_TEMPLATES } from "~/constants";
import { useAuthStore } from "~/store/auth";

const { authenticated } = storeToRefs(useAuthStore());

definePageMeta({
  layout: false,
});

const data = ref({
  title: "",
  description: "",
  id: "",
  image: "",
  ingredients: [],
  page: "",
});
const route = useRoute();
const { $db } = useNuxtApp();

onMounted(async () => {
  const documentId = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;

  const query = route.query.data as string;

  const receiptData = await getDoc(doc($db, query, documentId));
  data.value = receiptData.data() as {
    title: "";
    description: "";
    id: "";
    image: "";
    ingredients: [];
    page: "";
  };
});
</script>

<style scoped lang="scss">
@use "@/assets/index";
@include index.detailed;
</style>
