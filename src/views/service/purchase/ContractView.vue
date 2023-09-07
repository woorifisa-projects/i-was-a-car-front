<template>
  <Card
    :cardTitle="cardTitle"
    :next="next"
    :nextUrl="nextUrl"
    @onClickNextBtnEmit="onClickNextBtnEmit"
  >
    <ContractForm
      :seller="`IWC`"
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
import { storeToRefs } from 'pinia';

const props = defineProps(['nextUrl']);

const cardTitle = ref('자동차 매매 계약서 작성');
const next = ref('다음');
const nextUrl = ref(props.nextUrl);

const authStore = useAuthStore();
const { authInfo } = storeToRefs(authStore);

const purchaseStore = usePurchaseStore();
const { carInfo } = storeToRefs(purchaseStore);
const { setMemberId } = purchaseStore;

const onClickNextBtnEmit = () => {
  setMemberId(authInfo.value.id);
};
</script>

<style lang="scss" scoped></style>
