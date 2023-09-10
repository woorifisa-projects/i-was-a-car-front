<template>
  <v-sheet class="mt-5" elevation="2">
    <v-card-title class="font-weight-bold text-h6 text-sm-h5 py-5"
      >금융 서비스</v-card-title
    >
    <v-divider></v-divider>

    <v-card-item>
      <div class="d-flex justify-space-around flex-wrap align-content-stretch">
        <div class="w-30">
          <v-card-item>
            <v-card-text class="font-bold pl-0"> 판매 가격 </v-card-text>
            <v-text-field variant="outlined" readonly="true">
              <template v-slot:append-inner>
                <span style="width: 3em">만 원</span>
              </template>
              {{ (carInfo.price / 10000).toLocaleString() }}
            </v-text-field>
          </v-card-item>
        </div>

        <div class="w-30">
          <v-card-item>
            <v-card-text class="font-bold pl-0">선수금</v-card-text>
            <v-select
              variant="outlined"
              v-model="selected"
              :items="guaranteePercentage"
            ></v-select>
          </v-card-item>
        </div>
      </div>
    </v-card-item>

    <v-card-text class="font-bold text-right pr-sm-16 pr-8">
      총 할부 신청 금액:
      <span class="my-highlight">{{ installment.toLocaleString() }} 원</span>
    </v-card-text>

    <div>
      <div>
        <!-- <v-card-text class="font-bold bg-red"> 기간 </v-card-text> -->
        <v-card-item>
          <div
            class="d-flex justify-space-around flex-wrap align-content-stretch"
          >
            <div v-for="(p, i) in period" :key="i">
              <v-btn
                @click="onClickPeriod(p)"
                variant="outlined"
                :disabled="btnDisable"
                width="160"
                :size="xs ? 'large' : 'x-large'"
                class="ma-5"
                :class="month === p ? 'btn-selected' : ''"
              >
                {{ p }}
              </v-btn>
            </div>
          </div>
        </v-card-item>
      </div>
      <div>
        <v-card-text class="font-bold text-right pr-sm-16 pr-8">
          월 납입 예상 금액:
          <span class="my-highlight">
            {{ monthlyPrice.toLocaleString() }} 원
          </span>
        </v-card-text>

        <v-card-subtitle class="text-right pr-sm-16 pr-8 text-subtitle-1"
          >※ 기준금리 3.5%로 계산한 결과입니다.</v-card-subtitle
        >
        <br />
      </div>
    </div>
  </v-sheet>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const { xs } = useDisplay();

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

.font-bold {
  font-weight: bold;
  font-size: 1.3em;
}

.my-highlight {
  font-size: 1.5em;
  color: #465ed5;
}

.btn-design {
  width: 7em;
  height: 3.5em;
  margin: 1em 0;
}

.btn-selected {
  background-color: black;
  color: white;
}
</style>
