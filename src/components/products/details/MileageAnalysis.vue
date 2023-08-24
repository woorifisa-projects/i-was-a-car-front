<template>
  <v-card>
    <v-card-title>주행 거리 분석</v-card-title>

    <div class="d-flex justify-center">
      <div class="w-97">
        <v-slider v-model="slider2" track-color="gray"></v-slider>
      </div>
    </div>

    <v-card-text>
      총
      <span class="color-blue font-bold"
        >{{ lenYear }}년 {{ lenMonth }}개월</span
      >
      동안
      <span class="color-blue font-bold">{{ carInfo.distance }} KM</span>
      <br />
      연평균
      <span class="color-blue font-bold">
        {{ Math.ceil(carInfo.distance / lenYear) }} KM
      </span>
      <br />
      [ <span class="font-bold"> {{ carInfo.info }} </span> ]의 주행거리는
      일반적인 연평균 주행거리 대비 [
      <span class="color-blue font-bold">매우 짧음</span> ]입니다.
    </v-card-text>
    <v-card-subtitle>분석기준: 20,000KM</v-card-subtitle><br />
  </v-card>
</template>

<script setup>
import { ref } from 'vue';

const slider2 = ref(null);
const props = defineProps(['carInfo']);
const carInfo = ref(props.carInfo);
const lenYear = ref('');
const lenMonth = ref('');
const today = new Date();

const carBirth = new Date(Date.parse(carInfo.value.year));

lenYear.value = today.getFullYear() - carBirth.getFullYear();
if (today.getMonth() < carBirth.getMonth()) {
  lenYear.value--;
  lenMonth.value = today.getMonth() + 12 - carBirth.getMonth();
} else {
  lenMonth.value = today.getMonth() - carBirth.getMonth();
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
