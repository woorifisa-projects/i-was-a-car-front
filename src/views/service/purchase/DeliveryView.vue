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
import { useContractStore } from '@/store/contractStore.js';
import { createPurchase } from '@/apis/service/histories/purchase/purchaseApi.js';
import { createConsent } from '@/apis/service/contracts/contractApi.js';
import { useBtnStore } from '@/store/btnStore.js';

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

const btnStore = useBtnStore();
const { setBtnCondition } = btnStore;

const onClickNextBtnEmit = async () => {
  setBtnCondition(false);
  setDeilveryInfo(targetDelivery.value);

  await Promise.all([createPurchase(), createConsent()])
    .then(([purchaseResp, consentResp]) => {
      setPurchaseResponse(purchaseResp);
      setResponse(consentResp);
    })
    .catch((e) => console.error(e))
    .finally(setBtnCondition(true));

  resetRequest();
  resetPurchaseRequest();
};

const whichTargetDelivery = (child) => {
  targetDelivery.value = child;
};
</script>

<style lang="scss" scoped></style>
