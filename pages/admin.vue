<template>
  <div class="container">
    <Toast />
    <div class="admin-header">
      <h1>Hello, admin!</h1>
      <button @click="logOut">Log out</button>
    </div>
    <AdminTable></AdminTable>
  </div>
</template>

<script setup lang="ts">
import { signOut } from "firebase/auth";
import { useAuthStore } from "~/store/auth";

const { $auth } = useNuxtApp();
const { logUserOut } = useAuthStore();

const logOut = async () => {
  await signOut($auth);
  logUserOut();
  await navigateTo("/");
};
</script>

<style lang="scss" scoped>
@use "@/assets/index";
@include index.admin;
</style>
