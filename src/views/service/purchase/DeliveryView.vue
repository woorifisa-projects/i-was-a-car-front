<template>
  <Card
    :cardTitle="cardTitle"
    :next="next"
    :nextUrl="nextUrl"
    @onClickNextBtnEmit="onClickNextBtnEmit"
  >
    <DeliveryForm @targetDelivery="whichTargetDelivery"></DeliveryForm>
  </Card>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { usePurchaseStore } from '@/store/purchase/purchaseStore.js';
import { useContractStore } from '@/store/contractStore';
import { createPurchase } from '@/apis/service/histories/purchase/purchaseApi';
import { createConsent } from '@/apis/service/contracts/contractApi';

import Card from '@/components/card/Card.vue';
import DeliveryForm from '@/components/Form/DeliveryForm.vue';

const props = defineProps(['nextUrl']);

const cardTitle = ref('탁송 정보 입력');
const next = ref('다음');
const nextUrl = ref(props.nextUrl);
const targetDelivery = ref();

const purchaseStore = usePurchaseStore();
const { setDeilveryInfo, setPurchaseResponse, resetPurchaseRequest } =
  purchaseStore;

const contractStore = useContractStore();
const { setResponse, resetRequest } = contractStore;

const onClickNextBtnEmit = async () => {
  setDeilveryInfo(targetDelivery.value);

  await Promise.all([createPurchase(), createConsent()])
    .then(([purchaseResp, consentResp]) => {
      setPurchaseResponse(purchaseResp);
      setResponse(consentResp);
    })
    .catch((e) => console.error(e));

  resetRequest();
  resetPurchaseRequest();
};

const whichTargetDelivery = (child) => {
  targetDelivery.value = child;
};
</script>

<style lang="scss" scoped></style>
