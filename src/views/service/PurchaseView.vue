<template>
  <BasicInfoView v-if="route.params.id === '1'" :nextUrl="'2'"></BasicInfoView>
  <SearchCarView
    v-else-if="route.params.id === '2'"
    :nextUrl="'3'"
  ></SearchCarView>
  <LoansView v-else-if="route.params.id === '3'" :nextUrl="'4'"></LoansView>
  <InsurancesView
    v-else-if="route.params.id === '4'"
    :nextUrl="'5'"
  ></InsurancesView>
  <ContractView
    v-else-if="route.params.id === '5'"
    :nextUrl="'6'"
  ></ContractView>
  <DeliveryView
    v-else-if="route.params.id === '6'"
    :nextUrl="'7'"
  ></DeliveryView>
  <DoneView
    v-else-if="route.params.id === '7'"
    :cardTitle="'차량 구매 접수 완료'"
    :done="'차량 구매가 완료 되었습니다'"
    :info="'구매 이력은 마이 페이지에서 확인 가능합니다'"
    :type="'purchase'"
  ></DoneView>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useSaleStore } from '@/store/sales/saleStore.js';

import BasicInfoView from '@/views/service/common/BasicInfoView.vue';
import SearchCarView from '@/views/service/purchase/SearchCarView.vue';
import LoansView from '@/views/service/purchase/LoansView.vue';
import InsurancesView from '@/views/service/purchase/InsurancesView.vue';
import DeliveryView from '@/views/service/purchase/DeliveryView.vue';
import ContractView from '@/views/service/purchase/ContractView.vue';
import DoneView from '@/views/service/common/DoneView.vue';
import { storeToRefs } from 'pinia';

const store = useSaleStore();
const { response } = storeToRefs(store);

const route = useRoute();
</script>

<style lang="scss" scoped></style>
