<template>
  <v-text-field
    label="탁송 날짜 선택"
    density="compact"
    variant="underlined"
    v-model="deliverySchedule"
    type="datetime-local"
    class="mb-2"
    :min="minDate"
  >
  </v-text-field>
  <FindAddress
    @changeZipCode="setZipCode"
    @changeAddress="setAddress"
    @changeAddressDetail="setAddressDetail"
  ></FindAddress>

  <v-text-field
    label="예금주"
    density="compact"
    variant="underlined"
    class="mt-2"
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
      v-model="account"
    >
    </v-text-field>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, defineEmits, watch } from 'vue';
import { getBanks } from '@/apis/service/contracts/contractApi';
import { useBtnStore } from '@/store/btnStore';
import { usePurchaseStore } from '@/store/purchase/purchaseStore.js';

import FindAddress from '@/components/FindAddress.vue';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['targetDelivery']);
const deliverySchedule = ref('');
const zipCode = ref('');
const address = ref('');
const addressDetail = ref('');

const setZipCode = (emitZipCode) => (zipCode.value = emitZipCode);
const setAddress = (emitAddress) => (address.value = emitAddress);
const setAddressDetail = (emitAddressDetail) =>
  (addressDetail.value = emitAddressDetail);

const accountHolder = ref('');
const selectedBank = ref();
const account = ref();

const bankList = ref([]);

onBeforeMount(async () => {
  setBtnCondition(false);

  const resp = await getBanks();
  const banks = resp.data.data;
  bankList.value.push(...banks);
});

const targetDelivery = ref();

const date = new Date();
const m = date.getMonth() + 1;
const month = m < 10 ? '0' + m : m;
const d = date.getDate() + 1;
const day = d < 10 ? '0' + d : d;
const minDate = ref(`${date.getFullYear()}-${month}-${day}T09:00`);

const btnStore = useBtnStore();
const { setBtnCondition } = btnStore;

watch(
  [
    deliverySchedule,
    zipCode,
    address,
    addressDetail,
    accountHolder,
    selectedBank,
    account,
  ],
  ([d, z, ad, add, ah, b, an]) => {
    const accountHolderRegex = /[가-힣]{2,10}$/;
    const accountNumberRegex = /[0-9]{10,14}$/;

    const value =
      !!d &&
      !!z &&
      !!ad &&
      !!add &&
      accountHolderRegex.test(ah) &&
      !!b &&
      accountNumberRegex.test(an);

    console.log(d, z, ad, add, ah, b, an);
    targetDelivery.value = {
      deliverySchedule: deliverySchedule.value,
      zipCode: zipCode.value,
      address: address.value,
      addressDetail: addressDetail.value,
      accountHolder: accountHolder.value,
      selectedBank: selectedBank.value,
      account: account.value,
    };

    setBtnCondition(value);
    emit('targetDelivery', targetDelivery.value);
  }
);
</script>

<style lang="scss" scoped></style>
