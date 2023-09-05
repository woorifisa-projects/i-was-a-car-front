<template>
  <v-form @submit.prevent>
    <v-text-field
      type="number"
      label="현재 나의 최대 자본금"
      density="compact"
      clearable
      variant="underlined"
      class="mb-10"
    >
      <template v-slot:append-inner>
        <span style="width: 3em; font-size: 1em">만 원</span>
      </template></v-text-field
    >

    <v-text-field
      type="number"
      label="대출하고 싶은 금액"
      density="compact"
      clearable
      variant="underlined"
      class="mb-10"
    >
      <template v-slot:append-inner>
        <span style="width: 3em; font-size: 1em">만 원</span>
      </template></v-text-field
    >

    <v-autocomplete label="상환 기간" :items="period"></v-autocomplete>
  </v-form>
</template>

<script setup>
import { ref } from 'vue';
import { period } from '@/components/data/period';
</script>

<style lang="scss" scoped></style>
