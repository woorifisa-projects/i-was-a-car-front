<template>
  <v-text-field
    label="미팅 날짜 선택"
    density="compact"
    variant="underlined"
    v-model="meetingDate"
    type="datetime-local"
    class="mb-2"
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
      v-model="account"
    >
    </v-text-field>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, defineEmits, watch } from 'vue';
import { getBanks } from '@/apis/service/contracts/contractApi';

import FindAddress from '@/components/FindAddress.vue';

const emit = defineEmits(['targetDelivery']);
const meetingDate = ref('');
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
  const resp = await getBanks();
  const banks = resp.data.data;
  bankList.value.push(...banks);
});

watch(
  (meetingDate,
  zipCode,
  address,
  addressDetail,
  accountHolder,
  selectedBank,
  account),
  () => {
    const targetDelivery = {
      meetingDate: meetingDate.value,
      zipCode: zipCode.value,
      address: address.value,
      addressDetail: addressDetail.value,
      accountHolder: accountHolder.value,
      selectedBank: selectedBank.value,
      account: account.value,
    };

    emit('targetDelivery', targetDelivery);
  }
);
</script>

<style lang="scss" scoped></style>
