<template>
  <v-form @submit.prevent>
    <div v-if="isCarInfoExist">
      <div style="text-align: center">
        선택하신 상품
        <span style="font-size: large; font-weight: bold">
          {{ carInfo.carName }}
        </span>
        의 가격은
        <span style="font-size: large; font-weight: bold">
          {{ (carInfo.price / 1000).toLocaleString() }}
        </span>
        만원 입니다.
      </div>
    </div>
    <v-text-field
      type="number"
      :label="customerText"
      density="compact"
      clearable
      variant="underlined"
      class="my-10"
      v-model="targetCapital"
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
      v-model="targetLoan"
    >
      <template v-slot:append-inner>
        <span style="width: 3em; font-size: 1em">만 원</span>
      </template></v-text-field
    >

    <v-autocomplete
      label="상환 기간"
      :items="period"
      v-model="targetPeriod"
    ></v-autocomplete>
  </v-form>
</template>

<script setup>
import { ref, watch, defineEmits, onBeforeMount } from 'vue';
import { period } from '@/components/data/period';
import { usePurchaseStore } from '@/store/purchase/purchaseStore.js';
import { useBtnStore } from '@/store/btnStore';

import { storeToRefs } from 'pinia';

const purchaseStore = usePurchaseStore();
const { request, carInfo } = storeToRefs(purchaseStore);

const btnStore = useBtnStore();
const { setBtnCondition } = btnStore;

const emit = defineEmits(['targetFinance']);
const targetCapital = ref();
const targetLoan = ref();
const targetPeriod = ref();

watch([targetCapital, targetLoan, targetPeriod], () => {
  if (isCarInfoExist) {
    if (targetCapital.value + targetLoan.value === carInfo.value.price) {
      setBtnCondition(false);
    } else {
      setBtnCondition(true);
    }
  }

  const targetFinance = {
    capital: targetCapital.value * 10000,
    loan: targetLoan.value * 10000,
    period: targetPeriod.value,
  };

  emit('targetFinance', targetFinance);
});

const isCarInfoExist = ref(false);

onBeforeMount(() => {
  setBtnCondition(false);
  if (!!request.value.productId) {
    isCarInfoExist.value = true;
  }
});

const customerText = ref(isCarInfoExist ? '선수금' : '현재 나의 최대 자본금');
</script>

<style lang="scss" scoped></style>
