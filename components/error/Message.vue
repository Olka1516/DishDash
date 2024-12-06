<template>
  <div class="error">
    <span v-if="(props.v.$error && props.v.$dirty) || props.error">
      <small class="p-error">{{ getError() }}</small>
    </span>
  </div>
</template>

<script setup lang="ts">
import type { ErrorObject } from "@vuelidate/core";
import { ErrorMessageEnum } from "~/types";

const props = defineProps<{
  v: {
    $error: boolean;
    $dirty: boolean;
    $errors: ErrorObject[];
    $path: string;
  };
  error?: string;
}>();

const getError = () => {
  const { $message: message } = props.v.$errors?.[0] ?? { $message: null };

  switch (props.v.$path) {
    case "email":
      if (message === ErrorMessageEnum.EmailIsNotValid)
        return ErrorMessageEnum.EmailIsNotValid;
      else if (message === ErrorMessageEnum.IsRequired)
        return ErrorMessageEnum.IsRequired;
      else if (props.error === ErrorMessageEnum.EmailInUse)
        return ErrorMessageEnum.EmailInUse;
      else if (props.error === ErrorMessageEnum.EmailNotFound)
        return ErrorMessageEnum.EmailNotFound;
      break;
    case "password":
      if (message === ErrorMessageEnum.IsRequired)
        return ErrorMessageEnum.IsRequired;
      else if (message === ErrorMessageEnum.PasswordMinLength)
        return ErrorMessageEnum.PasswordMinLength;
      else if (props.error === ErrorMessageEnum.PasswordNotFound)
        return ErrorMessageEnum.PasswordNotFound;
      break;
  }
};
</script>

<style lang="scss" scoped>
@use "@/assets/index";
@include index.error;
</style>
