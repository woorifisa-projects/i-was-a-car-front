<template>
  <div class="d-flex flex-column align-center justify-space-around">
    <v-card-text class="mt-2">
      <v-card-title class="w-22"
        >{{ carInfo.brand }} {{ carInfo.name }} {{ carInfo.fuel }}
        {{ carInfo.displacement }}cc</v-card-title
      >
      <v-card-text> 판매 가격 {{ carInfo.price / 10000 }}만원 </v-card-text>
      <v-card-item> <hr /> </v-card-item>
      <v-card-text>
        생일: {{ new Date(Date.parse(carInfo.year)).getFullYear() }}년
        <br />
        지금까지 달려 온 거리: {{ carInfo.distance }} KM
      </v-card-text>
    </v-card-text>
    <br />

    <div class="d-flex justify-space-around w-100">
      <v-btn>상담 신청</v-btn>
      <v-btn @click="goTo">
        홈 서비스 구매하기 <br />
        8/14일 도착
      </v-btn>
    </div>

    <br />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['carInfo']);
const carInfo = ref(props.carInfo);

const goto = () => {};
</script>

<style lang="scss" scoped>
.w-22 {
  width: 22em;
}

.mt-2 {
  margin-top: 2em;
}
</style>
