<template>
  <Card
    :cardTitle="cardTitle"
    :next="next"
    :nextUrl="nextUrl"
    @onClickNextBtnEmit="onClickNextBtnEmit"
  >
    <SearchCarForm @targetFinance="targetFinance"></SearchCarForm>
  </Card>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { usePurchaseStore } from '@/store/purchase/purchaseStore.js';

import Card from '@/components/card/Card.vue';
import SearchCarForm from '@/components/Form/SearchCarForm.vue';

const props = defineProps(['nextUrl']);

const cardTitle = ref('자동차 대출 정보 입력');
const next = ref('다음');
const nextUrl = ref(props.nextUrl);
const targetCapital = ref();
const targetLoan = ref();
const targetPeriod = ref();

const purchaseStore = usePurchaseStore();
const { setFinanceInfo } = purchaseStore;

const onClickNextBtnEmit = () => {
  setFinanceInfo(targetCapital.value, targetLoan.value, targetPeriod.value);
};

const targetFinance = (child) => {
  targetCapital.value = parseInt(child.capital, 10);
  targetLoan.value = parseInt(child.loan, 10);
  targetPeriod.value = parseInt(child.period, 10);
};
</script>

<style lang="scss" scoped></style>
