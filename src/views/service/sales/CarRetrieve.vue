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
  </Card>
</template>

<script setup>
import Card from '@/components/card/Card.vue';
import { useRetrieveCarStore } from '@/store/retrieveCar/retrieveCar.js';
import { useSaleStore } from '@/store/sales/saleStore';
import { useValidateSaleStore } from '@/store/sales/saleValidateStore';
import { useBtnStore } from '@/store/btnStore';
import { onBeforeMount, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

const btnStore = useBtnStore();
const { setBtnCondition } = btnStore;
const saleValidateStore = useValidateSaleStore();
const { setCarInfoCheck } = saleValidateStore;

onBeforeMount(() => {
  const { name } = storeToRefs(carStore);
  setBtnCondition(name !== undefined);
});

const cardTitle = ref('차량 정보 조회');
const next = ref('조회하기');
const nextUrl = ref('4');

const carStore = useRetrieveCarStore();
const { setNameAndCarNumber } = carStore;
const { name, carNumber, distance } = storeToRefs(carStore);
const saleStore = useSaleStore();
const { setDistance } = saleStore;

const onClickNextBtnEmit = () => {
  setNameAndCarNumber(name.value, carNumber.value);
  setDistance(distance.value);
};

watch([name, carNumber, distance], ([n, c, d]) => {
  const nameRegex = /[가-힣]{2,10}$/;
  const carNumberRegex = /[0-9]{2,3}[가-힣][0-9]{4}$/;
  const value =
    n != null &&
    nameRegex.test(n) &&
    c != null &&
    carNumberRegex.test(c) &&
    d != null &&
    d > 0;
  setBtnCondition(value);
  setCarInfoCheck(value);
});
</script>

<style lang="scss" scoped></style>
