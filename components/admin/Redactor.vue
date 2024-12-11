<template>
  <Editor v-model="value" editorStyle="height: 460px" />
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: string }>();

const value = ref(props.modelValue);

const emit = defineEmits<{
  (e: "update:modelValue", val: string): void;
}>();

watch(
  () => value.value,
  () => {
    emit("update:modelValue", value.value);
  }
);
watch(
  () => props.modelValue,
  () => {
    value.value = props.modelValue;
  }
);
</script>
