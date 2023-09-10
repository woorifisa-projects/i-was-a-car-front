<template>
  <div class="d-flex flex-column justify-space-around w-100 px-10">
    <v-card-text class="w-100 d-flex flex-column justify-space-between">
      <v-card-title
        class="font-weight-bold h-50 text-h5 text-sm-h4 text-center"
        style="white-space: pre-line"
        >{{ carInfo.brand }} {{ carInfo.name }} {{ carInfo.fuel }}
        {{ carInfo.displacement }}</v-card-title
      >

      <v-card-text class="h-50 d-flex justify-space-between">
        <v-chip
          class="ma-2 font-weight-bold"
          variant="outlined"
          :size="xs ? 'default' : 'x-large'"
          color="indigo-lighten-2"
        >
          연식: {{ new Date(Date.parse(carInfo.year)).getFullYear() }}년
        </v-chip>
        <v-chip
          class="ma-2 font-weight-bold"
          variant="outlined"
          :size="xs ? 'default' : 'x-large'"
          color="indigo-lighten-2"
        >
          주행거리: {{ carInfo.distance }} KM
        </v-chip>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="text-h6 text-sm-h5 font-weight-bold text-right">
        판매 가격: {{ carInfo.price / 10000 }}만원
      </v-card-text>
    </v-card-text>
    <br />

    <v-btn class="w-100" color="black" size="x-large" @click="selectedProduct"
      >구매하기</v-btn
    >

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { useRouter } from 'vue-router';
import { usePurchaseStore } from '@/store/purchase/purchaseStore.js';

const router = useRouter();


const { xs } = useDisplay();

const props = defineProps(['carInfo']);
const carInfo = ref(props.carInfo);

const purchaseStore = usePurchaseStore();
const { setCarInfo } = purchaseStore;

const selectedProduct = () => {
  setCarInfo(carInfo.value);
  router.push('/normal-purchase/1');
};
</script>

<style lang="scss" scoped>
.w-22 {
  width: 22em;
}

.mt-2 {
  margin-top: 2em;
}
</style>
