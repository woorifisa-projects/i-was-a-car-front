<template>
  <Card
    :cardTitle="cardTitle"
    :next="next"
    :nextUrl="nextUrl"
    :type="'purchase'"
    @onClickNextBtnEmit="onClickNextBtnEmit"
    s
  >
    <ContractForm
      :seller="iwc"
      :buyer="authInfo.name"
      :price="carInfo.price"
      :carNumber="carInfo.carNumber"
      :carName="carInfo.carName"
      :carType="carInfo.carType"
      :fuel="carInfo.fuel"
    ></ContractForm>
  </Card>
</template>

<script setup>
import { ref, defineProps } from 'vue';

import Card from '@/components/card/Card.vue';
import ContractForm from '@/components/Form/ContractForm.vue';
import { useAuthStore } from '@/store/auth.js';
import { usePurchaseStore } from '@/store/purchase/purchaseStore';
import { useContractStore } from '@/store/contractStore';
import { storeToRefs } from 'pinia';

const contractStore = useContractStore();
const { setConsent } = contractStore;
const { documentItems, isConsent } = storeToRefs(contractStore);

const props = defineProps(['nextUrl']);

const iwc = ref('IWC');
const cardTitle = ref('자동차 매매 계약서 작성');
const next = ref('계약하기');
const nextUrl = ref(props.nextUrl);

const authStore = useAuthStore();
const { authInfo } = storeToRefs(authStore);

const purchaseStore = usePurchaseStore();
const { carInfo } = storeToRefs(purchaseStore);
const { setMemberId } = purchaseStore;

const onClickNextBtnEmit = async () => {
  setMemberId(authInfo.value.id);

  documentItems.value.forEach((e) => {
    setConsent(e.documentItemId, isConsent.value, authInfo.value.id);
  });
};
</script>

<style lang="scss" scoped></style>
