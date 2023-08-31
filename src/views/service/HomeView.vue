<template>
  <HomeMain></HomeMain>

  <v-container>
    <Search></Search>

    <v-infinite-scroll @load="load">
      <ProductsList :products="products"></ProductsList>
      <template v-slot:empty>
        <v-alert type="warning">마지막 상품입니다.</v-alert>
      </template>
      <template v-slot:error="{ props }">
        <v-alert type="error">
          <div class="d-flex justify-space-between align-center">
            문제가 발생했습니다. 다시 시도해주세요.
            <v-btn color="white" variant="outlined" size="small" v-bind="props">
              Retry
            </v-btn>
          </div>
        </v-alert>
      </template>
    </v-infinite-scroll>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { findProducts } from '@/apis/service/products/productApi.js';
import { VInfiniteScroll } from 'vuetify/labs/VInfiniteScroll';
import HomeMain from '@/components/HomeMain.vue';
import Search from '@/components/products/Search.vue';
import ProductsList from '@/components/products/ProductsList.vue';

const lastProductId = ref();
const products = ref([]);
const stdProduct = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

const load = async ({ done }) => {
  try {
    if (stdProduct.value.length < 10) done('empty');
    else {
      const response = await findProducts(lastProductId.value);

      stdProduct.value.length = 0;

      stdProduct.value.push(...response.data.data);

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

<style scoped></style>
