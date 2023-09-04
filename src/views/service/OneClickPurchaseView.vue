<template>
  <BasicInfoView v-if="route.params.id === '1'"></BasicInfoView>
  <!-- <CarTypeView v-else-if="route.params.id === '2'"></CarTypeView>
  <SearchCarView v-else-if="route.params.id === '3'"></SearchCarView> -->
  <ChoiceCarView v-else-if="route.params.id === '4'"></ChoiceCarView>
  <LoansView v-else-if="route.params.id === '5'"></LoansView>
  <InsurancesView v-else-if="route.params.id === '6'"></InsurancesView>
  <ContractView v-else-if="route.params.id === '7'"></ContractView>
  <DeliveryView v-else-if="route.params.id === '8'"></DeliveryView>
</template>

<script setup>
import { useRoute } from 'vue-router';

import BasicInfoView from '@/views/service/purchase/BasicInfoView.vue';
// import CarTypeView from '@/views/service/purchase/CarTypeView.vue';
// import SearchCarView from '@/views/service/purchase/SearchCarView.vue';
import ChoiceCarView from '@/views/service/purchase/ChoiceCarView.vue';
import LoansView from '@/views/service/purchase/LoansView.vue';
import InsurancesView from '@/views/service/purchase/InsurancesView.vue';
import DeliveryView from '@/views/service/purchase/DeliveryView.vue';
import ContractView from '@/views/service/purchase/ContractView.vue';

const route = useRoute();
</script>

<style lang="scss" scoped></style>
