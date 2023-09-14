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
import { getBanks } from '@/apis/service/contracts/contractApi';
import { useSaleStore } from '@/store/sales/saleStore.js';
import { onBeforeMount, ref, watch } from 'vue';
import { useBtnStore } from '@/store/btnStore';
import { storeToRefs } from 'pinia';
import { useValidateSaleStore } from '@/store/sales/saleValidateStore';

const btnStore = useBtnStore();
const { setBtnCondition } = btnStore;
const saleStore = useSaleStore();
const { setFinanceInfo } = saleStore;
const saleValidateStore = useValidateSaleStore();
const { setFinanceInfoCheck } = saleValidateStore;
const { request } = storeToRefs(saleStore);
const bankList = ref();

const cardTitle = ref('가격 및 계좌정보 입력');
const next = ref('다음');
const nextUrl = ref('6');

const price = ref(
  request.value.price === undefined ? undefined : request.value.price / 10000
);

const accountHolder = ref(request.value.accountHolder);
const accountNumber = ref(request.value.accountNumber);

const selectedBank = ref();

onBeforeMount(async () => {
  const { request } = storeToRefs(saleStore);
  const resp = await getBanks();
  const banks = await resp.data.data;
  bankList.value = banks;
  setBtnCondition(request.value.accountHolder !== undefined);
  const selectedBankId = request.value.bankId;
  const obj = Array.from(bankList.value).filter(
    (b) => b.id === selectedBankId
  )[0];
  selectedBank.value = obj === undefined ? undefined : obj;
});

const onClickNextBtnEmit = () => {
  setFinanceInfo(
    price.value * 10000,
    accountHolder.value,
    selectedBank.value,
    accountNumber.value
  );
};

watch(
  [price, accountHolder, selectedBank, accountNumber],
  ([p, ah, sb, an]) => {
    const accountHolderRegex = /[가-힣]{2,10}$/;
    const accountNumberRegex = /[0-9]{10,14}$/;
    const value =
      p != null &&
      p > 10 &&
      ah != null &&
      accountHolderRegex.test(ah) &&
      an != null &&
      accountNumberRegex.test(an) &&
      sb != null;
    setBtnCondition(value);
    setFinanceInfoCheck(value);
  }
);
</script>

<style lang="scss" scoped></style>
