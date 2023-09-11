<template>
  <v-virtual-scroll :height="400" width="100%" :items="products">
    <template v-slot:default="{ item }">
      <v-sheet class="d-flex flex-wrap justify-space-around">
        <v-card-actions
          :key="item.name"
          style="cursor: pointer"
          class="ma-2 pa-2"
          :class="selectedProduct === item.name ? 'set' : 'set2'"
          @click="whichTargetProduct(item)"
        >
          <v-card-text class="mx-auto" width="300">
            <v-img :src="item.images" cover height="150"></v-img>
            <v-card class="mx-auto" width="250">
              <v-card-title class="text-subtitle-1">
                {{ item.brand }} {{ item.name }} {{ item.fuel }}
                {{ (item.displacement / 1000).toFixed(1) }}
                {{ item.drivingMethod }}
              </v-card-title>

              <v-card-subtitle class="mb-3">
                연식: {{ item.year.substring(0, item.year.length - 3) }} |
                주행거리: {{ item.distance.toLocaleString() }} km
              </v-card-subtitle>

              <v-sheet class="d-flex justify-space-around align-center">
                <router-link :to="`/products/${item.id}`">
                  <v-btn
                    variant="outlined"
                    class="text-sm-left text-subtitle-1"
                  >
                    자세히보기
                  </v-btn></router-link
                >
                <v-card-title class="text-sm-right text-subtitle-1">
                  {{ (item.price / 10000).toLocaleString() }}만원
                </v-card-title>
              </v-sheet>
            </v-card>
          </v-card-text>
        </v-card-actions>
      </v-sheet>
    </template>
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
