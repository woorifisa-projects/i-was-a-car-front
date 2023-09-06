<template>
  <Card :cardTitle="cardTitle" :next="next" :nextUrl="nextUrl">
    <Suspense>
      <FinanceForm
        :finance="finance"
        :wantMoney="wantMoney"
        :installment="installment"
        :dataType="dataType"
      ></FinanceForm>
    </Suspense>
  </Card>
</template>

<script setup>
import { ref, onBeforeMount, defineAsyncComponent } from 'vue';

import Card from '@/components/card/Card.vue';
import { findSpecificLoan } from '@/apis/service/contracts/contractApi.js';

const cardTitle = ref('대출 선택');
const next = ref('다음');
const nextUrl = ref('6');

const myMoney = ref(500);
const wantMoney = ref(10000000);
const installment = ref(24);
const dataType = 'loan';

const finance = ref([]);

let FinanceForm;

onBeforeMount(async () => {
  try {
    const response = await findSpecificLoan(
      myMoney.value,
      wantMoney.value,
      installment.value
    );
    finance.value = response.data.data;

    FinanceForm = defineAsyncComponent(() =>
      import('@/components/Form/FinanceForm.vue')
    );
  } catch (e) {
    console.error(e);
  }
});
</script>

<style lang="scss" scoped></style>
