<template>
  <v-container>
    <v-sheet
      class="d-flex justify-space-around flex-wrap align-content-stretch"
    >
      <Suspense>
        <ImageSlider :carImages="carImages"></ImageSlider>
      </Suspense>

      <Suspense>
        <BasicCarInfo :carInfo="carInfo"></BasicCarInfo>
      </Suspense>
    </v-sheet>
    <br />
    <Suspense>
      <FinancialService :carInfo="carInfo"></FinancialService>
    </Suspense>
    <br />
    <Suspense>
      <CarDiagnosis :carInfo="carInfo"></CarDiagnosis>
    </Suspense>
    <br />
    <Suspense>
      <MileageAnalysis :carInfo="carInfo"></MileageAnalysis>
    </Suspense>
  </v-container>
</template>

<script setup>
// import ImageSlider from '@/components/products/details/ImageSlider.vue';
// import BasicCarInfo from '@/components/products/details/BasicCarInfo.vue';
// import FinancialService from '@/components/products/details/FinancialService.vue';
// import CarDiagnosis from '@/components/products/details/CarDiagnosis.vue';
// import MileageAnalysis from '@/components/products/details/MileageAnalysis.vue';

import { ref, onBeforeMount, defineAsyncComponent } from 'vue';
import { findProductDetail } from '@/apis/service/products/productApi.js';
import { useRoute } from 'vue-router';

const ImageSlider = defineAsyncComponent(() =>
  import('@/components/products/details/ImageSlider.vue')
);
const BasicCarInfo = defineAsyncComponent(() =>
  import('@/components/products/details/BasicCarInfo.vue')
);
const FinancialService = defineAsyncComponent(() =>
  import('@/components/products/details/FinancialService.vue')
);
const CarDiagnosis = defineAsyncComponent(() =>
  import('@/components/products/details/CarDiagnosis.vue')
);
const MileageAnalysis = defineAsyncComponent(() =>
  import('@/components/products/details/MileageAnalysis.vue')
);

const carImages = ref([]);
const carInfo = ref({});

onBeforeMount(async () => {
  try {
    const route = useRoute();
    const response = await findProductDetail(route.params.productId);
    const item = response.data.data;
    console.log(response.data.data);
    carInfo.value = item;
    carImages.value = item.images;
  } catch (e) {
    console.error(e);
  }
});
</script>

<style lang="scss" scoped></style>
