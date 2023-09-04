<template>
  <v-text-field
    label="미팅 날짜 선택"
    density="compact"
    variant="underlined"
    v-model="meetingDate"
    type="datetime-local"
    class="mb-3"
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
    class="my-1"
    v-model="accountHolder"
  >
  </v-text-field>
  <div class="d-flex align-center">
    <v-select
      label="은행명"
      :items="bankList"
      variant="underlined"
      style="width: 30%; margin-right: 1em"
      density="compact"
    ></v-select>
    <v-text-field
      label="계좌번호"
      density="compact"
      variant="underlined"
      style="width: 70%"
      type="number"
    >
    </v-text-field>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FindAddress from '@/components/FindAddress.vue';

const meetingDate = ref('');
const zipCode = ref('');
const address = ref('');
const addressDetail = ref('');

const setZipCode = (emitZipCode) => (zipCode.value = emitZipCode);
const setAddress = (emitAddress) => (address.value = emitAddress);
const setAddressDetail = (emitAddressDetail) =>
  (addressDetail.value = emitAddressDetail);

const price = ref();
const accountHolder = ref('');
const bankList = ref([
  '우리은행',
  '국민은행',
  '신한은행',
  '하나은행',
  '농협은행',
]);
</script>

<style lang="scss" scoped></style>
