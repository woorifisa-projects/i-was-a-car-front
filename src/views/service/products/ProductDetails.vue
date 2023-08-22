<template>
  <v-container>
    <v-sheet
      class="d-flex justify-space-around flex-wrap align-content-stretch"
    >
      <ImageSlider :cars="cars"></ImageSlider>
      <BasicCarInfo></BasicCarInfo>
    </v-sheet>

    <br />

    <FinancialService></FinancialService>

    <br />
    <CarDiagnosis></CarDiagnosis>
    <br />
    <MileageAnalysis></MileageAnalysis>
  </v-container>
</template>

<script setup>
import ImageSlider from '@/components/products/details/ImageSlider.vue';
import BasicCarInfo from '@/components/products/details/BasicCarInfo.vue';
import FinancialService from '@/components/products/details/FinancialService.vue';
import CarDiagnosis from '@/components/products/details/CarDiagnosis.vue';
import MileageAnalysis from '@/components/products/details/MileageAnalysis.vue';

import { ref } from 'vue';

const cars = ref([
  {
    url: 'https://i-was-a-car.s3.ap-northeast-2.amazonaws.com/avanteImage.jpg',
  },
  {
    url: 'https://user-images.githubusercontent.com/38150034/261946505-46a11e63-ceab-47d3-be1d-8547a8abe744.png',
  },
  {
    url: 'https://i-was-a-car.s3.ap-northeast-2.amazonaws.com/audiImage.jpeg',
  },
  {
    url: 'https://i-was-a-car.s3.ap-northeast-2.amazonaws.com/blueCarImage.jpeg',
  },
  {
    url: 'https://i-was-a-car.s3.ap-northeast-2.amazonaws.com/carnivalImage.jpeg',
  },
  {
    url: 'https://i-was-a-car.s3.ap-northeast-2.amazonaws.com/eqImage.jpg',
  },
]);
</script>

<style lang="scss" scoped></style>
