<template>
  <v-card>
    <v-card-title>사용자 정보</v-card-title>
    <v-card-item>
      <div class="d-flex">
        <div style="width: 30%">
          <v-card-item>
            <v-card-text class="font-bold"> 판매자 </v-card-text>
            <v-text-field readonly="true"
              >{{ productHistory.memberName }}
            </v-text-field>
          </v-card-item>
        </div>

        <div style="width: 30%">
          <v-card-item>
            <v-card-text class="font-bold">미팅 날짜</v-card-text>
            <v-text-field readonly="true"
              >{{ productHistory.saleMeeting }}
            </v-text-field>
          </v-card-item>
        </div>

        <div style="width: 40%">
          <v-card-item>
            <v-card-text class="font-bold"> 미팅 주소 </v-card-text>
            <v-text-field readonly="true"
              >{{ productHistory.address }}
              {{ productHistory.addressDetail }}</v-text-field
            >
          </v-card-item>
        </div>
      </div>
    </v-card-item>
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue';

const selected = ref('-');
const props = defineProps(['productHistory']);
const productHistory = ref(props.productHistory);
const installment = ref('-');
const month = ref('');
const monthlyPrice = ref(0);
const onClickPeriod = (p) => (month.value = p);
const btnDisable = ref(true);
const memberName = ref(productHistory.memberName);

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
  color: #0057ff;
}

.btn-design {
  width: 7em;
  height: 3.5em;
  margin: 1em 0;
}

.btn-selected {
  border: 5px solid blue;
}
</style>
