<template>
  <Card
    :cardTitle="cardTitle"
    :next="next"
    :nextUrl="nextUrl"
    @onClickNextBtnEmit="onClickNextBtnEmit"
  >
    <v-text-field
      label="성명"
      density="compact"
      variant="underlined"
      class="my-10"
      v-model="name"
    >
    </v-text-field>

    <v-text-field
      label="차량번호"
      density="compact"
      variant="underlined"
      class="my-10"
      v-model="carNumber"
    >
    </v-text-field>

    <v-text-field
      label="주행거리"
      density="compact"
      variant="underlined"
      class="my-10"
      v-model="distance"
      type="number"
    >
    </v-text-field>

    <v-file-input
      label="성능 점검 기록부"
      v-model="performanceCheck"
    ></v-file-input>
  </Card>
</template>

<script setup>
import Card from '@/components/card/Card.vue';
import { useRetrieveCarStore } from '@/store/retrieveCar/retrieveCar.js';
import { useSaleStore } from '@/store/sales/saleStore';
import { ref } from 'vue';

const name = ref('');
const carNumber = ref('');
const distance = ref();
const performanceCheck = ref(null);

const cardTitle = ref('차량 정보 조회');
const next = ref('조회하기');
const nextUrl = ref('car');

const carStore = useRetrieveCarStore();
const { setNameAndCarNumber } = carStore;
const saleStore = useSaleStore();
const { setDistance, setPerformanceCheck } = saleStore;

const onClickNextBtnEmit = () => {
  setPerformanceCheck(performanceCheck.value);
  setNameAndCarNumber(name.value, carNumber.value);
  setDistance(distance.value);
};
</script>

<style lang="scss" scoped></style>
