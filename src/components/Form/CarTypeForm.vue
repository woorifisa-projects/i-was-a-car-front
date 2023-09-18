<template>
  <v-form @submit.prevent>
    <v-radio-group
      class="pl-8 w-30 d-flex align-center"
      v-model="selectedCarType"
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
import { useBtnStore } from '@/store/btnStore.js';
import { usePurchaseStore } from '@/store/purchase/purchaseStore.js';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';

const purchaseStore = usePurchaseStore();
const { setCarType } = purchaseStore;

const btnStore = useBtnStore();
const { setBtnCondition } = btnStore;

const selectedCarType = ref();

const carTypes = ref();

onBeforeMount(async () => {
  const purchaseStore = usePurchaseStore();
  const { carType } = storeToRefs(purchaseStore);
  setBtnCondition(false);

  try {
    const response = await findCarTpyes();
    carTypes.value = response.data.data;
  } catch (e) {
    console.error(e);
  }

  if (!!carType) {
    carTypes.value.forEach((e) => {
      if (e.id === carType.value) {
        selectedCarType.value = e.name;
        setBtnCondition(true);
      }
    });
  }
});

const targetCarType = ref({});

watch(selectedCarType, () => {
  setBtnCondition(true);

  targetCarType.value.name = selectedCarType.value;

  carTypes.value.forEach((e) => {
    if (e.name === selectedCarType.value) {
      targetCarType.value.id = e.id;
    }
  });

  setCarType(targetCarType.value);
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
