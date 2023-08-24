<template>
  <section class="bg-black bg-grey-lighten-4" style="height: 450px">
    <v-container class="py-10">
      <h1
        class="text-h2 font-weight-bold text-decoration-underline text-center text-sm-left"
      >
        I was a car
      </h1>
      <div
        class="d-flex justify-space-between flex-wrap text-center text-sm-left"
      >
        <div>
          <p class="text-h6 text-sm-h4 font-weight-bold mt-12 mb-8">
            허위 매물 없는 중고차 구매 <br />및 대출 상품 연계 플랫폼
          </p>
          <p class="text-sm-subtitle">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident
            <br />
            ipsa tenetur optio excepturi ipsum assumenda temporibus! Suscipit
          </p>
        </div>
        <div
          class="d-flex justify-sm-end flex-sm-column"
          :class="{ 'custom-sm-width': smAndDown }"
        >
          <v-btn
            :width="btnWidth"
            size="x-large"
            class="bg-black font-weight-black my-2"
            >내 차 사기</v-btn
          >
          <v-btn :width="btnWidth" size="x-large" class="font-weight-black my-2"
            >내 차 팔기</v-btn
          >
        </div>
      </div>
    </v-container>
  </section>

  <v-container>
    <Suspense>
      <Search></Search>
    </Suspense>

    <Suspense>
      <v-infinite-scroll @load="load">
        <ProductsList :products="products"></ProductsList>
        <template v-slot:empty>
          <v-alert type="warning">마지막 상품입니다.</v-alert>
        </template>
        <template v-slot:error="{ props }">
          <v-alert type="error">
            <div class="d-flex justify-space-between align-center">
              문제가 발생했습니다. 다시 시도해주세요.
              <v-btn
                color="white"
                variant="outlined"
                size="small"
                v-bind="props"
              >
                Retry
              </v-btn>
            </div>
          </v-alert>
        </template>
      </v-infinite-scroll>
    </Suspense>
  </v-container>
</template>

<script setup>
import { computed, ref, defineAsyncComponent, onBeforeMount } from 'vue';
import { findProducts } from '@/apis/service/products/productApi.js';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { VInfiniteScroll } from 'vuetify/labs/VInfiniteScroll';

let ProductsList;
let Search;
const lastProductId = ref();

const products = ref([]);
const { name, smAndDown } = useDisplay();

const btnWidth = computed(() => {
  switch (name.value) {
    case 'xs':
      return '150';
    case 'sm':
      return '250';
    case 'md':
      return '250';
    case 'lg':
      return '350';
    default:
      return '350';
  }
});

onBeforeMount(async () => {
  try {
    Search = defineAsyncComponent(() =>
      import('@/components/products/Search.vue')
    );

    ProductsList = defineAsyncComponent(() =>
      import('@/components/products/ProductsList.vue')
    );
  } catch (e) {
    console.error(e);
  }
});

const load = async ({ done }) => {
  console.log(lastProductId.value);
  try {
    if (lastProductId.value === 1) done('empty');
    else {
      const response = await findProducts(lastProductId.value);

      products.value.push(...response.data.data);

      lastProductId.value = products.value[products.value.length - 1].id;

      done('ok');
    }
  } catch (e) {
    done('error');
    console.error(e);
  }
};
</script>

<style scoped>
.custom-sm-width {
  width: 450px;
  margin-top: 25px;
  justify-content: space-around;
  flex-direction: row-reverse;
}
</style>
