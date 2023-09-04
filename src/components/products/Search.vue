<template>
  <v-card-text class="d-flex">
    <v-col cols="2" class="flex-grow-0 flex-shrink-0">
      <v-autocomplete
        label="선택"
        :items="category"
        :item-title="title"
        :item-value="id"
        color="grey"
        theme="light"
        variant="solo"
        single-line
        v-model="selectedCategory"
      ></v-autocomplete>
    </v-col>

    <v-col
      cols="1"
      style="min-width: 100px; max-width: 100%"
      class="flex-grow-1 flex-shrink-0"
    >
      <v-text-field
        :loading="loading"
        append-inner-icon="mdi-magnify"
        color="grey"
        theme="light"
        variant="solo"
        label="원하는 차종 또는 제조사를 입력해주세요."
        clearable
        single-line
        @click:append-inner="onClick"
      ></v-text-field>
    </v-col>
  </v-card-text>
</template>

<script setup>
import { ref } from 'vue';
import { category } from '@/components/data/searchCategory.js';

const loading = ref(false);
const selectedCategory = ref();

const onClick = () => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>

<style lang="scss" scoped></style>
