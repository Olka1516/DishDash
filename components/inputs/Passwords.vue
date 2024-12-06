<template>
  <FloatLabel variant="on">
    <Password
      v-model="userPassword"
      inputId="on_label"
      @input="
        handleInput($event);
        props.v.$touch();
      "
      :invalid="isPasswordInvalid()"
      toggleMask
      :feedback="false"
    />
    <label for="on_label">Password</label>
  </FloatLabel>
</template>

<script setup lang="ts">
import { ErrorMessageEnum } from "~/types";

const props = defineProps<{
  modelValue: string;
  v: {
    $invalid: boolean;
    $dirty: boolean;
    $touch: Function;
  };
  error: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", val: string | null): void;
}>();

const userPassword = ref(props.modelValue);

const handleInput = (event: any) => {
  if (!event.target) return;
  emit("update:modelValue", event.target.value);
};

const isPasswordInvalid = () => {
  return (
    (props.v.$invalid && props.v.$dirty) ||
    props.error === ErrorMessageEnum.PasswordNotFound
  );
};
watch(
  () => props.modelValue,
  (data) => {
    userPassword.value = data;
  }
);
</script>
