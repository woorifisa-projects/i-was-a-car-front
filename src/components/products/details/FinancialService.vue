<template>
  <v-card>
    <v-card-title>IWC 금융 서비스</v-card-title>
    <v-card-item>
      <div class="d-flex justify-space-around flex-wrap align-content-stretch">
        <div class="w-30">
          <v-card-item>
            <v-card-text>판매 가격</v-card-text>
            <v-text-field suffix="만원">
              {{ (carInfo.price / 10000).toLocaleString() }}
            </v-text-field>
          </v-card-item>
        </div>

        <div class="w-30">
          <v-card-item>
            <v-card-text>선수금</v-card-text>
            <v-select
              v-model="selected"
              :items="guaranteePercentage"
            ></v-select>
          </v-card-item>
        </div>
      </div>
    </v-card-item>

    <v-card-text
      >총 할부 신청 금액: {{ installment.toLocaleString() }} 원</v-card-text
    >

    <div>
      <div>
        <v-card-text>기간</v-card-text>
        <v-card-item>
          <div
            class="d-flex justify-space-between flex-wrap align-content-stretch"
          >
            <div v-for="(p, i) in period" :key="i">
              <v-btn
                @click="onClickPeriod(p)"
                variant="outlined"
                :disabled="btnDisable"
              >
                {{ p }}
              </v-btn>
            </div>
          </div>
        </v-card-item>
      </div>
      <div>
        <v-card-text
          >월 납입 예상 금액:
          {{ monthlyPrice.toLocaleString() }} 원</v-card-text
        >

        <v-card-subtitle>기준금리 3.5%로 계산한 결과입니다.</v-card-subtitle>
        <br />
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue';

const guaranteePercentage = ref(['없음', '10%', '20%', '30%', '40%', '50%']);
const period = ref(['12개월', '24개월', '36개월', '48개월', '60개월']);
const selected = ref('-');

const props = defineProps(['carInfo']);
const carInfo = ref(props.carInfo);
const installment = ref('-');
const month = ref('');
const monthlyPrice = ref(0);
const onClickPeriod = (p) => (month.value = p);
const btnDisable = ref(true);

watch(selected, (s) => {
  if (s === '없음') {
    s = '100%';
    btnDisable.value = true;
    monthlyPrice.value = 0;
  } else {
    btnDisable.value = false;
  }
  const percentage = 1 - s.substring(0, s.length - 1) / 100;
  installment.value = carInfo.value.price * percentage;
  monthlyPrice.value = (installment.value + installment.value * 0.035) / 60;
});

watch(month, (m) => {
  const howLong = m.substring(0, 2);
  monthlyPrice.value =
    (installment.value + installment.value * 0.035) / howLong;
});
</script>

<style lang="scss" scoped>
.w-30 {
  width: 30em;
}
</style>
