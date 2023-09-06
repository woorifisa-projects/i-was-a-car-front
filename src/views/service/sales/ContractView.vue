<template>
  <Card
    :cardTitle="cardTitle"
    :next="next"
    :nextUrl="nextUrl"
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
      :seller="iwc"
      :buyer="request.memberName"
      :price="request.price"
      :carNumber="request.info"
      :carName="request.carName"
      :carType="request.carType"
      :fuel="request.fuel"
    >
    </ContractForm>
  </Card>
</template>

<script setup>
import { ref } from 'vue';
import { useSaleStore } from '@/store/sales/saleStore';
import { createProduct } from '@/apis/service/histories/sales/saleApi';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import Card from '@/components/card/Card.vue';
import ContractForm from '@/components/Form/ContractForm.vue';

const store = useSaleStore();
const { setResponse } = store;
const { request } = storeToRefs(store);
const router = useRouter();

const iwc = ref('IWC');
const cardTitle = ref('자동차 매매 계약서 작성');
const next = ref('계약하기');
const nextUrl = ref('block');
const isLoading = ref(false);

const onClickNextBtnEmit = async () => {
  isLoading.value = true;
  await createProduct()
    .then((resp) => {
      console.log(resp);
      const response = resp.data.data;
      setResponse(response);
      router.push('8');
    })
    .catch((e) => console.error(e));
};
</script>

<style lang="scss" scoped></style>
