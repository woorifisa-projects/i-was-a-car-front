<template>
  <BasicInfoView v-if="route.params.id === '1'"></BasicInfoView>
  <CarRetrieveView v-else-if="route.params.id === '2'"></CarRetrieveView>
  <CarInfoView v-else-if="route.params.id === '3'"></CarInfoView>
  <ImageInputView v-else-if="route.params.id === '4'"></ImageInputView>
  <PriceAndAccountView
    v-else-if="route.params.id === '5'"
  ></PriceAndAccountView>
  <ContractView v-else-if="route.params.id === '6'"></ContractView>
  <MeetingView v-else-if="route.params.id === '7'"></MeetingView>
  <DoneView
    v-else-if="route.params.id === '8'"
    :cardTitle="'원클릭 차량 판매 접수 완료'"
    :done="'원클릭 차량 판매가 완료 되었습니다'"
    :info="'심사 결과는 마이 페이지에서 확인 가능합니다'"
    :type="'sale'"
  ></DoneView>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

import BasicInfoView from '@/views/service/common/BasicInfoView.vue';
import CarRetrieveView from '@/views/service/sales/CarRetrieveView.vue';
import CarInfoView from '@/views/service/sales/CarInfoView.vue';
import ImageInputView from '@/views/service/sales/ImageInputView.vue';
import PriceAndAccountView from '@/views/service/sales/PriceAndAccountView.vue';
import ContractView from '@/views/service/sales/ContractView.vue';
import MeetingView from '@/views/service/sales/MeetingView.vue';
import DoneView from '@/views/service/common/DoneView.vue';

const route = useRoute();
</script>

<style lang="scss" scoped></style>
