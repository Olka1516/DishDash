<template>
  <div class="field">
    <img src="/icons/search.svg" alt="" />
    <input required v-model="userInfo" @input="handleInput($event)" />
    <i>Search</i>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", val: string): void;
}>();

const userInfo = ref(props.modelValue);

const handleInput = (event: any) => {
  if (!event.target) return;
  userInfo.value = event.target.value;
  emit("update:modelValue", event.target.value);
};
</script>
<style scoped lang="scss">
@use "@/assets/index";
@include index.search;
</style>
