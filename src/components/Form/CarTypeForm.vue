<template>
  <v-form @submit.prevent>
    <v-radio-group
      class="pl-8 w-30 d-flex align-center"
      v-model="carType"
      inline
      row
    >
      <v-row dense>
        <v-col
          cols="2"
          v-for="item in carTypes"
          :key="item.id"
          align-self="center"
          md="6"
          sm="6"
        >
          <v-radio
            :label="item.name"
            :value="item.name"
            class="mb-3"
            @click="whichCarType(item.name, item.id)"
          ></v-radio> </v-col></v-row
    ></v-radio-group>
  </v-form>
</template>

<script setup>
import { ref, onBeforeMount, defineEmits } from 'vue';
import { findCarTpyes } from '@/apis/service/products/productApi.js';

const carType = ref();
const emit = defineEmits(['targetCarType']);

const carTypes = ref();
onBeforeMount(async () => {
  try {
    const response = await findCarTpyes();
    carTypes.value = response.data.data;
  } catch (e) {
    console.error(e);
  }
});

const whichCarType = (name, id) => {
  const targetCarType = {
    name: name,
    id: id,
  };
  emit('targetCarType', targetCarType);
};
</script>

<style lang="scss" scoped></style>
