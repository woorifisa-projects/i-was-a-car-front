<template>
  <Card :cardTitle="cardTitle" :next="next" :nextUrl="nextUrl">
    <CompleteForm></CompleteForm>
  </Card>
</template>

<script setup>
import { ref } from 'vue';
import { useSaleStore } from '@/store/sales/saleStore';

import Card from '@/components/card/Card.vue';
import CompleteForm from '@/components/Form/CompleteForm.vue';
import { storeToRefs } from 'pinia';

const store = useSaleStore();
const { response } = storeToRefs(store);

const cardTitle = ref('원클릭 차량 접수 완료');
const next = ref('거래 상세');
const nextUrl = ref(`/mypage/sale/${response.value.saleId}`);
</script>

<style lang="scss" scoped></style>
