<template>
  <Card
    :cardTitle="cardTitle"
    :next="next"
    :nextUrl="nextUrl"
    :personal="false"
    @onClickNextBtnEmit="onClickNextBtnEmit"
  >
    <CarTypeForm @targetCarType="whichCarType"></CarTypeForm>
  </Card>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { usePurchaseStore } from '@/store/purchase/purchaseStore';
import { useBtnStore } from '@/store/btnStore';

import Card from '@/components/card/Card.vue';
import CarTypeForm from '@/components/Form/CarTypeForm.vue';

const props = defineProps(['nextUrl']);

const cardTitle = ref('차종 선택');
const next = ref('다음');
const nextUrl = ref(props.nextUrl);
const targetCarType = ref();

const whichCarType = (child) => {
  targetCarType.value = child.id;
};

const purchaseStore = usePurchaseStore();
const { setCarType } = purchaseStore;

const onClickNextBtnEmit = () => {
  setCarType(targetCarType.value);
};
</script>

<style lang="scss" scoped></style>
