<template>
  <v-form @submit.prevent>
    <div v-if="dataType === `loan`">
      <div style="text-align: center; font-size: small">
        선택하신 상품
        <span style="font-size: medium; font-weight: bold">
          {{ carInfo.carName }}
        </span>
        의 가격은
        <span style="font-size: medium; font-weight: bold">
          {{ (carInfo.price / 1000).toLocaleString() }}
        </span>
        만원 입니다
      </div>
      <div style="text-align: center">
        대출금
        <span style="font-size: large; font-weight: bold">
          {{ ((carInfo.price - financeInfo.capital) / 10000).toLocaleString() }}
        </span>
        만원에 할부기간
        <span style="font-size: large; font-weight: bold">
          {{ financeInfo.period }}
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
        @targetFinance="WhichTargetFinance"
      ></ScrollComponent>
    </Suspense>
  </v-form>
</template>

<script setup>
import { ref, defineProps, onBeforeMount, defineAsyncComponent } from 'vue';
import { usePurchaseStore } from '@/store/purchase/purchaseStore';
import { storeToRefs } from 'pinia';
import { useBtnStore } from '@/store/btnStore';

const props = defineProps(['finance', 'wantMoney', 'installment', 'dataType']);
const finance = ref(props.finance);
const dataType = ref(props.dataType);

const purchaseStore = usePurchaseStore();
const { financeInfo, carInfo } = storeToRefs(purchaseStore);
const { setLoanId, setInsuranceId } = purchaseStore;

const monthlyPayment = Math.round(
  financeInfo.value.loan / financeInfo.value.period
);

let ScrollComponent;

const btnStore = useBtnStore();
const { setBtnCondition } = btnStore;

onBeforeMount(async () => {
  setBtnCondition(false);
  try {
    ScrollComponent = defineAsyncComponent(() =>
      import('@/components/Form/ScrollComponent.vue')
    );
  } catch (e) {
    console.error(e);
  }
});

const WhichTargetFinance = (child) => {
  setBtnCondition(true);
  if (dataType.value === 'loan') {
    setLoanId(child.id);
  } else {
    setInsuranceId(child.id);
  }
};
</script>

<style lang="scss" scoped></style>
