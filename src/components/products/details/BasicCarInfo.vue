<template>
  <div class="d-flex flex-column justify-space-around w-100 px-10">
    <v-card-text class="w-100 d-flex flex-column justify-space-between">
      <v-card-title
        class="font-weight-bold h-50 text-h5 text-sm-h4 text-center mb-5 mb-sm-0"
        style="white-space: pre-line"
        >{{ carInfo.brand }} {{ carInfo.name }} {{ carInfo.fuel }}
        {{ carInfo.displacement }}</v-card-title
      >

      <v-card-text
        class="h-50 d-flex flex-column justify-space-between flex-sm-row"
      >
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

      <v-card-text
        class="text-subtitle-1 text-sm-h5 font-weight-bold text-right"
      >
        판매 가격:
        <span
          style="color: rgb(81, 81, 255); font-size: 32px; font-weight: 900"
          >{{ Math.floor(carInfo.price / 10000).toLocaleString() }}</span
        >
        만원
      </v-card-text>
    </v-card-text>

    <br />

    <div class="d-flex justify-space-between align-center">
      <v-btn
        :width="xs ? 120 : 200"
        variant="outlined"
        :size="xs ? 'large' : 'x-large'"
        @click="goBack"
        >뒤로</v-btn
      >
      <v-btn
        :width="xs ? 120 : 200"
        color="black"
        :size="xs ? 'large' : 'x-large'"
        >구매하기</v-btn
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const router = useRouter();

const { xs } = useDisplay();

const props = defineProps(['carInfo']);
const carInfo = ref(props.carInfo);

const goBack = () => {
  router.go(-1);
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
