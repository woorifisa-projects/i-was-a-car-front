<template>
  <HomeMain></HomeMain>

  <v-container>
    <Search @search="search"></Search>

    <div :key="renderKey">
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
    </div>
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

const category = ref();
const keyword = ref();
const renderKey = ref(0);

const search = (child) => {
  category.value = child.category;
  keyword.value = child.keyword;

  forceRender();
};

const forceRender = () => {
  products.value = [];
  lastProductId.value = null;
  renderKey.value += 1;
  stdProduct.value.push(1);
};

const load = async ({ done }) => {
  try {
    if (stdProduct.value.length < 1) {
      done('empty');
    } else {
      const response = await findProducts(
        category.value,
        keyword.value,
        lastProductId.value
      );

      stdProduct.value.length = 0;

      stdProduct.value.push(...response.data.data);

      products.value.push(...response.data.data);
      console.log('========');
      console.log(products.value[products.value.length - 1]);
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
