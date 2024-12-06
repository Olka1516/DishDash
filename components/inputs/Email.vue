<template>
  <IconField>
    <FloatLabel variant="on">
      <InputText
        id="on_label"
        v-model="userName"
        name="email"
        @input="
          handleInput($event);
          props.v.$touch();
        "
        :invalid="isNameInvalid()"
      />
      <label for="on_label">Name</label>
    </FloatLabel>
    <InputIcon class="pi pi-user" />
  </IconField>
</template>
<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  v: {
    $invalid: boolean;
    $dirty: boolean;
    $touch: Function;
  };
}>();

const emit = defineEmits<{
  (e: "update:modelValue", val: string | null): void;
}>();

const userName = ref(props.modelValue);

const handleInput = (event: any) => {
  if (!event.target) return;
  emit("update:modelValue", event.target.value);
};

const isNameInvalid = () => {
  return props.v.$invalid && props.v.$dirty;
};

watch(
  () => props.modelValue,
  (data) => {
    userName.value = data;
  }
);
</script>
