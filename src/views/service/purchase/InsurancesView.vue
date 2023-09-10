<template>
  <Card :cardTitle="cardTitle" :next="next" :nextUrl="nextUrl">
    <Suspense>
      <FinanceForm :finance="finance" :dataType="dataType"></FinanceForm>
    </Suspense>
  </Card>
</template>

<script setup>
import { ref, onBeforeMount, defineAsyncComponent, defineProps } from 'vue';

import Card from '@/components/card/Card.vue';
import { findSpecificinsurance } from '@/apis/service/contracts/contractApi.js';

const props = defineProps(['nextUrl']);

const cardTitle = ref('보험 선택');
const next = ref('다음');
const nextUrl = ref(props.nextUrl);

const finance = ref([]);
const dataType = 'insurance';

let FinanceForm;

onBeforeMount(async () => {
  try {
    const response = await findSpecificinsurance();
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
