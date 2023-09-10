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
import { createPurchase } from '@/apis/service/histories/purchase/purchaseApi';

import Card from '@/components/card/Card.vue';
import DeliveryForm from '@/components/Form/DeliveryForm.vue';
import { storeToRefs } from 'pinia';

const props = defineProps(['nextUrl']);

const cardTitle = ref('탁송 정보 입력');
const next = ref('다음');
const nextUrl = ref(props.nextUrl);
const targetDelivery = ref();

const purchaseStore = usePurchaseStore();
const { request } = storeToRefs(purchaseStore);
const { setDeilveryInfo, setResponse } = purchaseStore;

const onClickNextBtnEmit = async () => {
  console.log(targetDelivery.value);

  console.log(request.value);
  setDeilveryInfo(targetDelivery.value);
  await createPurchase()
    .then((resp) => {
      console.log(resp);
      const response = resp.data.data;
      setResponse(response);
      router.push('9');
    })
    .catch((e) => console.error(e));
};

const whichTargetDelivery = (child) => {
  targetDelivery.value = child;
};
</script>

<style lang="scss" scoped></style>
