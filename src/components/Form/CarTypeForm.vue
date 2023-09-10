<template>
  <v-form @submit.prevent>
    <v-radio-group
      class="pl-8 w-30 d-flex align-center"
      v-model="agreeRadio"
      inline
      row
    >
      <v-row dense>
        <v-col
          cols="6"
          v-for="item in carTypes"
          :key="item.id"
          align-self="center"
        >
          <v-radio :label="item.name" :value="item.name" class="mb-3"></v-radio>
        </v-col>
      </v-row>
    </v-radio-group>
  </v-form>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { findCarTpyes } from '@/apis/service/products/productApi.js';

const agreeRadio = ref('disagree');

const carTypes = ref();

onBeforeMount(async () => {
  try {
    const response = await findCarTpyes();
    carTypes.value = response.data.data;
  } catch (e) {
    console.error(e);
  }
});
</script>

<style lang="scss" scoped></style>
