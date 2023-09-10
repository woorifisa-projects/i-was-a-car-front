<template>
  <v-virtual-scroll
    :height="400"
    width="100%"
    :items="products"
    class="scrollable-content"
  >
    <v-sheet class="d-flex flex-wrap justify-space-around">
      <v-card-actions
        v-for="product in products"
        :key="product.name"
        class="ma-2 pa-2"
      >
        <router-link :to="`/products/${product.id}`">
          <v-card-text class="mx-auto" width="300">
            <v-img :src="product.images" cover height="150"></v-img>

            <v-sheet elevation="2" class="mx-auto" width="285">
              <v-card-title class="text-subtitle-1 font-weight-bold">
                {{ product.brand }} {{ product.name }} {{ product.fuel }}
                {{ (product.displacement / 1000).toFixed(1) }}
                {{ product.drivingMethod }}
              </v-card-title>

              <v-card-subtitle>
                연식: {{ product.year.substring(0, product.year.length - 3) }} |
                주행거리: {{ product.distance.toLocaleString() }} km
              </v-card-subtitle>

              <v-card-title class="text-sm-right text-subtitle-1">
                {{ (product.price / 10000).toLocaleString() }}만원
              </v-card-title>
            </v-sheet>
          </v-card-text>
        </router-link>
      </v-card-actions>
    </v-sheet>
  </v-virtual-scroll>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { RecommendationProducts } from '@/apis/service/products/productApi.js';

const lastProductId = ref();
const products = ref([]);

const carType = ref(7);
const myMoney = ref(10000000);
const wantMoney = ref(30000000);

onBeforeMount(async () => {
  try {
    const response = await RecommendationProducts(
      carType.value,
      myMoney.value,
      wantMoney.value,
      lastProductId.value
    );

    products.value.push(...response.data.data);
  } catch (e) {
    console.error(e);
  }
});
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.scrollable-content {
  max-height: calc(100% - 100px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: black;
  }
}
</style>
