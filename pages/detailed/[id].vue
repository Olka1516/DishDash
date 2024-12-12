<template>
  <div class="container">
    <NuxtLink class="detailed-exit" :to="LINK_TEMPLATES.CATEGORY('')">
      <img class="detailed-edit" src="/icons/exit.svg" alt="" />
    </NuxtLink>
    <NuxtLink
      v-if="authenticated"
      :to="LINK_TEMPLATES.EDIT(data.id, route.query.data as string)"
    >
      <img class="detailed-edit" src="/icons/edit.svg" alt="" />
    </NuxtLink>
    <button v-if="authenticated" @click="deleteReceipt">
      <img class="detailed-edit" src="/icons/trash.svg" alt="" />
    </button>
    <div v-html="data.page" class="detailed-title"></div>
  </div>
</template>

<script setup lang="ts">
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { LINK_TEMPLATES } from "~/constants";
import { useAuthStore } from "~/store/auth";
import type { IReceipt } from "~/types";

const { authenticated } = storeToRefs(useAuthStore());

definePageMeta({
  layout: "auth",
});

const data = ref<IReceipt>({
  title: "",
  description: "",
  id: "",
  image: "",
  page: "",
  ingredients: [],
});

const route = useRoute();
const { $db } = useNuxtApp();
const documentId = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id;

const query = route.query.data as string;

const deleteReceipt = async () => {
  await deleteDoc(doc($db, query, documentId));
  await navigateTo("/category");
};

onMounted(async () => {
  const receiptData = await getDoc(doc($db, query, documentId));
  data.value = receiptData.data() as IReceipt;
});
</script>

<style scoped lang="scss">
@use "@/assets/index";
@include index.detailed;
</style>
