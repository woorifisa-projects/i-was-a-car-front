<template>
  <v-virtual-scroll :height="400" width="100%" :items="products">
    <v-sheet class="d-flex flex-wrap justify-space-around">
      <v-card-actions
        v-for="product in products"
        :key="product.name"
        style="cursor: pointer"
        class="ma-2 pa-2"
        :class="selectedProduct === product.name ? 'set' : 'set2'"
        @click="whichTargetProduct(product)"
      >
        <v-card-text class="mx-auto" width="300">
          <v-img :src="product.images" cover height="150"></v-img>

          <v-card class="mx-auto" width="250">
            <router-link :to="`/products/${product.id}`">
              <v-card-title class="text-subtitle-1">
                {{ product.brand }} {{ product.name }} {{ product.fuel }}
                {{ (product.displacement / 1000).toFixed(1) }}
                {{ product.drivingMethod }}
              </v-card-title>
            </router-link>

            <v-card-subtitle>
              연식: {{ product.year.substring(0, product.year.length - 3) }} |
              주행거리: {{ product.distance.toLocaleString() }} km
            </v-card-subtitle>

            <v-card-title class="text-sm-right text-subtitle-1">
              {{ (product.price / 10000).toLocaleString() }}만원
            </v-card-title>
          </v-card>
        </v-card-text>
      </v-card-actions>
    </v-sheet>
  </v-virtual-scroll>
</template>

<script setup>
import { ref, onBeforeMount, defineEmits } from 'vue';
import { RecommendationProducts } from '@/apis/service/products/productApi.js';
import { usePurchaseStore } from '@/store/purchase/purchaseStore';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['targetProduct']);

const lastProductId = ref();
const products = ref([]);

const purchaseStore = usePurchaseStore();
const { carType, financeInfo } = storeToRefs(purchaseStore);

onBeforeMount(async () => {
  try {
    console.log(financeInfo.value);
    const response = await RecommendationProducts(
      carType.value,
      financeInfo.value.capital,
      financeInfo.value.loan,
      lastProductId.value
    );

    products.value = response.data.data;
  } catch (e) {
    console.error(e);
  }
});

const selectedProduct = ref();
const whichTargetProduct = (product) => {
  selectedProduct.value = product.name;
  emit('targetProduct', product);
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: black;
  font-weight: bold;
}
.set {
  border: 5px solid black;
}

.set2 {
  background-color: #fff;
}
</style>
