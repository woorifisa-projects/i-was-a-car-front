<template>
  <suspense>
    <v-virtual-scroll
      v-if="products.length > 0"
      :height="400"
      width="100%"
      :items="products"
    >
      <template v-slot:default="{ item }">
        <v-sheet class="d-flex flex-wrap justify-space-around">
          <v-card-actions
            :key="item.name"
            style="cursor: pointer"
            class="ma-2 pa-2"
            :class="selectedProduct === item.id ? 'set' : 'set2'"
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
  </suspense>
  <ProgressSprinner v-if="isLoading" />

  <template v-else-if="products.length === 0">
    <div style="text-align: center; margin-top: 5rem">
      입력하신 최대 자본금
      <span style="font-size: large; font-weight: bold">
        {{ (financeInfo.capital / 10000).toLocaleString() }}
      </span>
      만원과 <br />입력하신 대출금
      <span style="font-size: large; font-weight: bold">
        {{ (financeInfo.loan / 10000).toLocaleString() }}
      </span>
      만원으로 <br />
    </div>
    <div style="text-align: center; margin-top: 1rem">
      <span style="font-size: large; font-weight: bold"
        >구매 가능 한 {{ carTypeName }} 상품이 없습니다</span
      ><br /><br />
      이전으로 돌아가 <br /><span style="font-size: large; font-weight: bold"
        >자본금 또는 대출금의 금액을 늘려 </span
      ><br />다시 검색해주세요
    </div>
  </template>
</template>

<script setup>
import { ref, onBeforeMount, defineEmits } from 'vue';
import { RecommendationProducts } from '@/apis/service/products/productApi.js';
import { usePurchaseStore } from '@/store/purchase/purchaseStore';
import { storeToRefs } from 'pinia';
import { useLoadingStore } from '@/store/loading';
import { useBtnStore } from '@/store/btnStore';
import { useContractStore } from '@/store/contractStore';

const btnStore = useBtnStore();
const { setBtnCondition } = btnStore;
const loading = useLoadingStore();
const { isLoading } = storeToRefs(loading);

const emit = defineEmits(['targetProduct']);

const lastProductId = ref();
const products = ref([]);

const purchaseStore = usePurchaseStore();
const { carType, carTypeName, financeInfo } = storeToRefs(purchaseStore);
const { setCarInfo } = purchaseStore;

const contractStore = useContractStore();
const { setProductId } = contractStore;

onBeforeMount(async () => {
  const purchaseStore = usePurchaseStore();
  const { carInfo } = storeToRefs(purchaseStore);
  setBtnCondition(false);

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

  if (Object.keys(carInfo.value).length > 0) {
    selectedProduct.value = carInfo.value.id;
    setBtnCondition(true);
  }
});

const selectedProduct = ref();

const whichTargetProduct = (product) => {
  console.log(product);
  selectedProduct.value = product.id;
  setCarInfo(product);
  setBtnCondition(true);
  setProductId(product.id);
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
