<template>
  <v-form @submit.prevent>
    <div v-if="dataType === `loan`">
      <div style="text-align: center">
        대출금
        <span style="font-size: large; font-weight: bold">
          {{ (wantMoney / 10000).toLocaleString() }}
        </span>
        만원에 할부기간
        <span style="font-size: large; font-weight: bold">
          {{ installment }}
        </span>
        개월 선택 시
      </div>
      <div style="text-align: center">
        월 납입 예상 금액은
        <span style="font-size: large; font-weight: bold">
          {{ monthlyPayment.toLocaleString() }}
        </span>
        원 입니다
      </div>
    </div>
    <div v-if="dataType === `insurance`" style="text-align: center">
      자동차 보험을 선택하실 수 있습니다
    </div>
    <br />
    <v-divider></v-divider>
    <br />
    <Suspense>
      <ScrollComponent
        :finance="finance"
        :dataType="dataType"
      ></ScrollComponent>
    </Suspense>
  </v-form>
</template>

<script setup>
import { ref, defineProps, onBeforeMount, defineAsyncComponent } from 'vue';

const props = defineProps(['finance', 'wantMoney', 'installment', 'dataType']);
const finance = ref(props.finance);
const dataType = ref(props.dataType);

const wantMoney = ref(props.wantMoney);
const installment = ref(props.installment);
const monthlyPayment = Math.round(wantMoney.value / installment.value);

let ScrollComponent;

onBeforeMount(async () => {
  try {
    ScrollComponent = defineAsyncComponent(() =>
      import('@/components/Form/ScrollComponent.vue')
    );
  } catch (e) {
    console.error(e);
  }
});
</script>

<style lang="scss" scoped></style>
