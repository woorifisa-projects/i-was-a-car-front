<template>
  <Card
    :cardTitle="cardTitle"
    :next="next"
    :nextUrl="nextUrl"
    @onClickNextBtnEmit="onClickNextBtnEmit"
  >
    <v-text-field
      label="원하는 판매 가격"
      density="compact"
      variant="underlined"
      class="my-10"
      type="number"
      v-model="price"
    >
      <template v-slot:append-inner>
        <span style="width: 3em; font-size: 1em">만 원</span>
      </template>
    </v-text-field>

    <v-text-field
      label="예금주"
      density="compact"
      variant="underlined"
      class="my-10"
      v-model="accountHolder"
    >
    </v-text-field>
    <div class="d-flex align-center">
      <v-select
        label="은행명"
        :items="bankList"
        item-title="name"
        item-value="id"
        variant="underlined"
        style="width: 30%; margin-right: 1em"
        density="compact"
        v-model="selectedBank"
      ></v-select>

      <v-text-field
        label="계좌번호"
        density="compact"
        variant="underlined"
        style="width: 70%"
        type="number"
        placeholder="10~14 자리 숫자만"
        v-model="accountNumber"
      >
      </v-text-field>
    </div>
  </Card>
</template>

<script setup>
import Card from '@/components/card/Card.vue';
import { getBanks } from '@/apis/service/histories/sales/saleApi';
import { useSaleStore } from '@/store/sales/saleStore.js';
import { onBeforeMount, ref, watch } from 'vue';
import { useBtnStore } from '@/store/btnStore';

const btnStore = useBtnStore();
const { setBtnCondition } = btnStore;
const saleStore = useSaleStore();
const { setFinanceInfo } = saleStore;

const cardTitle = ref('가격 및 계좌정보 입력');
const next = ref('다음');
const nextUrl = ref('7');

const price = ref();
const accountHolder = ref('');
const bankList = ref([]);
const selectedBank = ref();
const accountNumber = ref('');

onBeforeMount(async () => {
  const resp = await getBanks();
  const banks = resp.data.data;
  bankList.value.push(...banks);
  setBtnCondition(false);
});

const onClickNextBtnEmit = () =>
  setFinanceInfo(
    price.value * 10000,
    accountHolder.value,
    selectedBank.value,
    accountNumber.value
  );

watch(
  [price, accountHolder,  selectedBank, accountNumber],
  ([p, ah,  sb, an]) => {
    const accountHolderRegex = /[가-힣]{2,10}$/;
    const accountNumberRegex = /[0-9]{10,14}$/;
    const value = 
    (p != null && p > 10) &&
    (ah != null && accountHolderRegex.test(ah)) &&
    (an != null && accountNumberRegex.test(an)) &&
    (sb != null);
    setBtnCondition(value);
    setFinanceInfo(value);
  }
);
</script>

<style lang="scss" scoped></style>
