<template>
  <div class="container">
    <div class="auth-form">
      <h1>Sign in</h1>
      <div class="field">
        <InputsEmail v-model="user.email" :v="v$.email" />
        <ErrorMessage :v="v$.email" />
      </div>
      <div class="field">
        <InputsPasswords
          v-model="user.password"
          :v="v$.password"
          :error="error"
        />
        <ErrorMessage :v="v$.password" />
      </div>
      <button @click="signIn">Submit</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { required, minLength, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAuthStore } from "~/store/auth";

const { authenticateUser } = useAuthStore();

definePageMeta({
  layout: "auth",
});

const { $auth } = useNuxtApp();
const error = ref("");
const user = reactive({
  email: "",
  password: "",
});

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(6) },
};

const v$ = useVuelidate(rules, user);
const signIn = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  }
  try {
    await setPersistence($auth, browserSessionPersistence);
    await signInWithEmailAndPassword($auth, user.email, user.password);
    authenticateUser();
    await navigateTo("/admin");
  } catch (err: any) {
    error.value = err.message;
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/index";
@include index.sign-in;
</style>
