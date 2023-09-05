<template>
  <Card :cardTitle="cardTitle" :next="next" :nextUrl="nextUrl">
    <ContractForm 
    :seller="iwc"
    :buyer="request.memberName" 
    :price="request.price"
    :carNumber="request.info"
    :carName="request.carName"
    :carType="request.carType"
    :fuel="request.fuel"
    > </ContractForm>

    <button
    @click="test"
    >
      test
    </button>
  </Card>
</template>

<script setup>
import { ref } from 'vue';
import { useSaleStore } from '@/store/sales/saleStore';
import { createProduct } from '@/apis/service/histories/sales/saleApi';

import Card from '@/components/card/Card.vue';
import ContractForm from '@/components/Form/ContractForm.vue';
import { storeToRefs } from 'pinia';

const store = useSaleStore();
const { request } = storeToRefs(store);

const iwc= ref("IWC");
const cardTitle = ref('자동차 매매 계약서 작성');
const next = ref('다음');
const nextUrl = ref('test');

const test = () => createProduct();
</script>

<style lang="scss" scoped></style>
