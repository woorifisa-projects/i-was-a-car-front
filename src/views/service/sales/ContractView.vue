<template>
  <Card
    :cardTitle="cardTitle"
    :next="next"
    :nextUrl="nextUrl"
    :type="'sale'"
    @onClickNextBtnEmit="onClickNextBtnEmit"
  >
    <div
      v-if="isLoading"
      style="height: 20em"
      class="d-flex flex-column justify-center align-center"
    >
      <v-card-title style="font-size: 1.5em">계약 중</v-card-title>
      <br />
      <v-progress-linear indeterminate></v-progress-linear>
    </div>
    <ContractForm
      v-else
      :seller="authInfo.name"
      :buyer="iwc"
      :price="carInfo.price"
      :carNumber="carInfo.info"
      :carName="carInfo.carName"
      :carType="carInfo.carType"
      :fuel="carInfo.fuel"
    >
    </ContractForm>
  </Card>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSaleStore } from '@/store/sales/saleStore';
import { useBtnStore } from '@/store/btnStore';
import ContractForm from '@/components/Form/ContractForm.vue';
import { useAuthStore } from '@/store/auth.js';

import Card from '@/components/card/Card.vue';
import { useContractStore } from '@/store/contractStore';
import { createConscent } from '@/apis/service/contracts/contractApi';

const authStore = useAuthStore();
const { authInfo } = storeToRefs(authStore);

const saleStore = useSaleStore();
const { carInfo } = storeToRefs(saleStore);

const contractStore = useContractStore();
const { setConsent, setResponse, resetRequest } = contractStore;
const { request, documentItems, isConsent } = storeToRefs(contractStore);

const btnStore = useBtnStore();
const { setBtnCondition } = btnStore;

onBeforeMount(() => {
  setBtnCondition(true);
});

const iwc = ref('IWC');
const cardTitle = ref('자동차 매매 계약서 작성');
const next = ref('계약하기');
const nextUrl = ref('7');
const isLoading = ref(false);

const onClickNextBtnEmit = async () => {
  documentItems.value.forEach((e) => {
    setConsent(e.documentItemId, isConsent.value, authInfo.value.id);
  });

  console.log(request.value);

  await createConscent()
    .then((resp) => {
      const response = resp.data.data;
      setResponse(response);
    })
    .catch((e) => console.error(e));

  resetRequest();
  console.log(request.value);
};
</script>

<style lang="scss" scoped></style>
