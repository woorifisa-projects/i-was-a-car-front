<template>
  <ProgressSpinner v-if="isLoading" />

  <v-container v-else>
    <v-sheet class="mt-5 d-sm-flex">
      <Suspense>
        <div :class="xs ? 'wp-100' : 'wp-50'">
          <ImageSlider :carImages="carImages"></ImageSlider>
        </div>
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
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { findProductDetail } from '@/apis/service/products/productApi.js';
import { useLoadingStore } from '@/store/loading.js';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const { xs } = useDisplay();

const loading = useLoadingStore();
const { isLoading } = storeToRefs(loading);

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

<style lang="scss" scoped>
.wp-50 {
  min-width: 50%;
}

.wp-100 {
  min-width: 100%;
}
</style>
