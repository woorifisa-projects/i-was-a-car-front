<template>
  <v-form @submit.prevent class="h-100">
    <v-container
      class="d-flex flex-column justify-space-between align-center mb-10 pt-16"
    >
      <div class="pt-10">{{ done }}</div>
      <div class="pt-5">{{ info }}</div>
    </v-container>
    <v-progress-linear
      v-model="value"
      :buffer-value="bufferValue"
    ></v-progress-linear>
  </v-form>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, defineProps } from 'vue';
const props = defineProps(['done', 'info']);

const done = ref(props.done);
const info = ref(props.info);

const value = ref(0);
const bufferValue = ref(20);
const interval = ref(0);

onMounted(() => {
  startBuffer();
});

onBeforeUnmount(() => {
  clearInterval(interval.value);
});

watch(value, () => {
  if (value < 100) return;

  clearInterval(interval.value);
});

const startBuffer = () => {
  clearInterval(interval.value);

  interval.value = setInterval(() => {
    value.value += Math.random() * (15 - 5) + 100;
    bufferValue.value += Math.random() * 15;
  }, 2000);
};
</script>

<style lang="scss" scoped></style>
