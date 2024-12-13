<template>
  <div class="container">
    <Toast />
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
import { useToastsStore } from "~/store/toasts";
import { ErrorMessageEnum } from "~/types";

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
  //Function addDoc() called with invalid data. Unsupported field value: undefined (found in field image in document receipts/pNhY19ZzwbAoSLKAygOu)
  const { showSuccess, showError } = useToastsStore();
  try {
    await setPersistence($auth, browserSessionPersistence);
    await signInWithEmailAndPassword($auth, user.email, user.password);
    authenticateUser();
    await navigateTo("/admin");
    showSuccess("Sign in successfully");
  } catch (err: any) {
    const message =
      err.message === ErrorMessageEnum.InvalidCradential
        ? "Invalid data"
        : err.message;
    showError(message);
    error.value = err.message;
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/index";
@include index.sign-in;
</style>
