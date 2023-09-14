<template>
  <Card
    :cardTitle="cardTitle"
    :next="next"
    :nextUrl="nextUrl"
    :personal="false"
    @onClickNextBtnEmit="onClickNextBtnEmit"
  >
    <CarTypeForm></CarTypeForm>
  </Card>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { usePurchaseStore } from '@/store/purchase/purchaseStore';

import Card from '@/components/card/Card.vue';
import CarTypeForm from '@/components/Form/CarTypeForm.vue';

const props = defineProps(['nextUrl']);

const cardTitle = ref('차종 선택');
const next = ref('다음');
const nextUrl = ref(props.nextUrl);
</script>

<style lang="scss" scoped></style>
