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
          {{ (carInfo.price / 10000).toLocaleString() }}
        </span>
        만원 입니다
      </div>
    </div>
    <suspense>
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
    </suspense>

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
import { period } from '@/components/data/period.js';
import { usePurchaseStore } from '@/store/purchase/purchaseStore.js';
import { useBtnStore } from '@/store/btnStore.js';

import { storeToRefs } from 'pinia';

const purchaseStore = usePurchaseStore();
const { carInfo } = storeToRefs(purchaseStore);
const { resetCarInfo } = purchaseStore;

const btnStore = useBtnStore();
const { setBtnCondition } = btnStore;

const emit = defineEmits(['targetFinance']);
const targetCapital = ref();
const targetLoan = ref();
const targetPeriod = ref();

watch([targetCapital, targetLoan, targetPeriod], () => {
  if (isCarInfoExist.value) {
    if (
      parseInt(targetCapital.value) * 10000 +
        parseInt(targetLoan.value) * 10000 ===
        carInfo.value.price &&
      !!targetPeriod.value
    ) {
      setBtnCondition(true);
    } else {
      setBtnCondition(false);
    }
  } else {
    if (!!targetCapital.value && !!targetLoan.value && !!targetPeriod.value) {
      if (parseInt(targetCapital.value) + parseInt(targetLoan.value) < 10) {
        setBtnCondition(false);
      } else {
        setBtnCondition(true);
      }
    } else {
      setBtnCondition(false);
    }
  }

  const targetFinance = {
    capital: targetCapital.value * 10000,
    loan: targetLoan.value * 10000,
    period: targetPeriod.value,
  };

  emit('targetFinance', targetFinance);
});

const customerText = ref('현재 나의 최대 자본금');
const isCarInfoExist = ref(false);

onBeforeMount(() => {
  setBtnCondition(false);

  if (Object.keys(carInfo.value).length > 0) {
    resetCarInfo();
  }

  const purchaseStore = usePurchaseStore();
  const { financeInfo } = storeToRefs(purchaseStore);

  if (Object.keys(financeInfo.value).length > 0) {
    console.log(financeInfo.value);
    targetCapital.value = financeInfo.value.capital / 10000;
    targetLoan.value = financeInfo.value.loan / 10000;

    period.forEach((e) => {
      if (e.id === financeInfo.value.period) {
        targetPeriod.value = e.title;
      }
    });
  }

  if (Object.keys(carInfo.value).length > 0) {
    isCarInfoExist.value = true;
    customerText.value = '선수금';
  }
});
</script>

<style lang="scss" scoped></style>
