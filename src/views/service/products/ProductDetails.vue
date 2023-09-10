<template>
  <v-container>
    <!-- <v-sheet class="d-flex justify-space-between mt-5 w-100 flex-wrap"> -->
    <v-sheet class="mt-5 w-100 d-sm-flex">
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
import { ref, onBeforeMount, defineAsyncComponent } from 'vue';
import { findProductDetail } from '@/apis/service/products/productApi.js';
import { useRoute } from 'vue-router';

const carImages = ref([]);
const carInfo = ref({});

let ImageSlider;
let BasicCarInfo;
let FinancialService;
let CarDiagnosis;
let MileageAnalysis;

onBeforeMount(async () => {
  try {
    const route = useRoute();
    const response = await findProductDetail(route.params.productId);
    const item = response.data.data;

    carInfo.value = item;
    carImages.value = item.images;

    ImageSlider = defineAsyncComponent(() =>
      import('@/components/products/details/ImageSlider.vue')
    );
    BasicCarInfo = defineAsyncComponent(() =>
      import('@/components/products/details/BasicCarInfo.vue')
    );
    FinancialService = defineAsyncComponent(() =>
      import('@/components/products/details/FinancialService.vue')
    );
    CarDiagnosis = defineAsyncComponent(() =>
      import('@/components/products/details/CarDiagnosis.vue')
    );
    MileageAnalysis = defineAsyncComponent(() =>
      import('@/components/products/details/MileageAnalysis.vue')
    );
  } catch (e) {
    console.error(e);
  }
});
</script>

<style lang="scss" scoped></style>
