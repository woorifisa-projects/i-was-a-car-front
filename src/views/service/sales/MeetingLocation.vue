<template>
  <Card :cardTitle="cardTitle" :next="next" :nextUrl="nextUrl" @onClickNextBtnEmit="onClickNextBtnEmit">
    <v-text-field
      label="미팅 날짜 선택"
      density="compact"
      variant="underlined"
      v-model="meetingDate"
      type="datetime-local"
    >
    </v-text-field>
    <FindAddress
      @changeZipCode="setZipCode"
      @changeAddress="setAddress"
      @changeAddressDetail="setAddressDetail"
    ></FindAddress>
  </Card>
</template>

<script setup>
import Card from '@/components/card/Card.vue';
import FindAddress from '@/components/FindAddress.vue';
import { ref } from 'vue';
import { useSaleStore } from '@/store/sales/saleStore.js';

const cardTitle = ref('미팅 장소 입력');
const next = ref('다음');
const nextUrl = ref('car-info');
const meetingDate = ref('');
const zipCode = ref('');
const address = ref('');
const addressDetail = ref('');

const store = useSaleStore();
const { setMeetingInfo } = store;

const setZipCode = (emitZipCode) => (zipCode.value = emitZipCode);
const setAddress = (emitAddress) => (address.value = emitAddress);
const setAddressDetail = (emitAddressDetail) =>
  (addressDetail.value = emitAddressDetail);

const onClickNextBtnEmit = () => {
  setMeetingInfo(
    meetingDate.value,
    zipCode.value,
    address.value,
    addressDetail.value
  );
};
</script>

<style lang="scss" scoped></style>
