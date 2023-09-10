<template>
  <v-sheet class="mt-5" elevation="2">
    <v-card-title class="font-weight-bold text-h6 text-sm-h5 py-5"
      >주행 거리 분석</v-card-title
    >

    <div class="d-flex justify-center">
      <div class="w-97">
        <v-slider v-model="slider2" track-color="gray"></v-slider>
      </div>
    </div>

    <v-card-text class="text-right pr-sm-16 pr-8 text-h6">
      총
      <span class="color-blue font-bold"
        >{{ lenYear }}년 {{ lenMonth }}개월</span
      >
      동안
      <span class="color-blue font-bold">{{ carInfo.distance }} KM</span>
      <br />
      연평균
      <span class="color-blue font-bold"> {{ yearlyDistance }} KM </span>
      <br />
      [ <span class="font-bold"> {{ carInfo.info }} </span> ]의 주행거리는
      일반적인 연평균 주행거리 대비 [
      <span class="color-blue font-bold">{{ distanceStatus }}</span> ]입니다.
    </v-card-text>
    <v-card-subtitle class="text-right pr-sm-16 pr-8 text-subtitle-1"
      >※ 분석기준: 20,000KM</v-card-subtitle
    ><br />
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue';

const slider2 = ref(100);
const props = defineProps(['carInfo']);
const carInfo = ref(props.carInfo);
const lenYear = ref('');
const lenMonth = ref('');
const today = new Date();

const carBirth = new Date(Date.parse(carInfo.value.year));
const distanceStatus = ref('');

lenYear.value = today.getFullYear() - carBirth.getFullYear();
if (today.getMonth() < carBirth.getMonth()) {
  lenYear.value--;
  lenMonth.value = today.getMonth() + 12 - carBirth.getMonth();
} else {
  lenMonth.value = today.getMonth() - carBirth.getMonth();
}

const yd = Math.ceil(carInfo.value.distance / lenYear.value);
const yearlyDistance = ref(yd);

if (yd <= 5000) {
  distanceStatus.value = '매우 짧음';
  slider2.value = 20;
} else if (5000 < yd && yd <= 15000) {
  distanceStatus.value = '짧음';
  slider2.value = 40;
} else if (15000 < yd && yd <= 25000) {
  distanceStatus.value = '보통';
  slider2.value = 60;
} else if (25000 < yd && yd < 35000) {
  distanceStatus.value = '다소 김';
  slider2.value = 80;
} else {
  distanceStatus.value = '김';
  slider2.value = 100;
}
</script>

<style lang="scss" scoped>
.w-97 {
  width: 97%;
}

.color-blue {
  color: #0057ff;
}

.font-bold {
  font-weight: bold;
}
</style>
