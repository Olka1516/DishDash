<template>
  <div class="burger" :class="{ open: !isClosed }">
    <div class="content" :class="{ 'open-content': !isClosed }">
      <button @click="closeBurger" class="burger-btn">
        <img class="burger-icon" src="/icons/exit.svg" alt="" />
      </button>
      <NuxtLink @click="closeBurger" :to="LINK_TEMPLATES.CATEGORY('')"
        >Category</NuxtLink
      >
      <NuxtLink
        v-if="!authenticated"
        @click="closeBurger"
        :to="LINK_TEMPLATES.FORM"
        >Form</NuxtLink
      >
      <NuxtLink v-else @click="closeBurger" :to="LINK_TEMPLATES.ADD_RECEIPT"
        >Add receipt</NuxtLink
      >
      <NuxtLink
        v-if="!authenticated"
        @click="closeBurger"
        :to="LINK_TEMPLATES.SIGN_IN"
        >Sign in</NuxtLink
      >
      <NuxtLink v-else @click="closeBurger" :to="LINK_TEMPLATES.ADMIN"
        >Admin</NuxtLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { LINK_TEMPLATES } from "~/constants";

defineProps<{ authenticated: boolean; isClosed: boolean }>();
const emit = defineEmits<{
  (e: "update:isClosed", val: boolean): void;
}>();

const closeBurger = () => {
  emit("update:isClosed", true);
  document.body.style.overflow = "visible";
};
</script>

<style scoped lang="scss">
@use "@/assets/index";
@include index.burger;
</style>
