<template>
  <Card
    :cardTitle="cardTitle"
    :next="next"
    :nextUrl="nextUrl"
    @onClickNextBtnEmit="onClickNextBtnEmit"
  >
    <ChoiceCarForm @targetProduct="whichTargetProduct"></ChoiceCarForm>
  </Card>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { usePurchaseStore } from '@/store/purchase/purchaseStore';
import { useContractStore } from '@/store/contractStore';

import Card from '@/components/card/Card.vue';
import ChoiceCarForm from '@/components/Form/ChoiceCarForm.vue';

const props = defineProps(['nextUrl']);

const cardTitle = ref('차량 선택');
const next = ref('다음');
const nextUrl = ref(props.nextUrl);
const targetProduct = ref();

const purchaseStore = usePurchaseStore();
const { setCarInfo } = purchaseStore;

const contractStore = useContractStore();
const { setProductId } = contractStore;

const onClickNextBtnEmit = () => {
  setCarInfo(targetProduct.value);
  setProductId(targetProduct.value.id);
};

const whichTargetProduct = (child) => {
  targetProduct.value = child;
};
</script>

<style lang="scss" scoped></style>
