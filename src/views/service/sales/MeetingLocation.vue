<template>
  <Card
    :cardTitle="cardTitle"
    :next="next"
    :nextUrl="nextUrl"
    @onClickNextBtnEmit="onClickNextBtnEmit"
  >
    <v-text-field
      label="미팅 날짜 선택"
      density="compact"
      variant="underlined"
      v-model="meetingSchedule"
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
import { onBeforeMount, ref, watch } from 'vue';
import { useSaleStore } from '@/store/sales/saleStore.js';
import { useValidateSaleStore } from '@/store/sales/saleValidateStore.js';
import { useBtnStore } from '@/store/btnStore.js';

const validateSaleStore = useValidateSaleStore();
const { setMeetingCheck } = validateSaleStore;

const btnStore = useBtnStore();
const { setBtnCondition } = btnStore;

onBeforeMount(() => setBtnCondition(false));

const cardTitle = ref('미팅 장소 입력');
const next = ref('다음');
const nextUrl = ref('3');

const meetingSchedule = ref(null);
const zipCode = ref(null);
const address = ref(null);
const addressDetail = ref(null);

const store = useSaleStore();
const { setMeetingInfo } = store;

const setZipCode = (emitZipCode) => (zipCode.value = emitZipCode);
const setAddress = (emitAddress) => (address.value = emitAddress);
const setAddressDetail = (emitAddressDetail) =>
  (addressDetail.value = emitAddressDetail);

const onClickNextBtnEmit = () => {
  setMeetingInfo(
    meetingSchedule.value,
    zipCode.value,
    address.value,
    addressDetail.value
  );
};

watch([meetingSchedule, zipCode, address, addressDetail], ([ms, zc, a, ad]) => {
  const value =
    ms !== null &&
    zc !== null &&
    zc.length > 0 &&
    a != null &&
    a.length > 0 &&
    ad != null &&
    ad.length > 0;
  setBtnCondition(value);
  setMeetingCheck(value);
});
</script>

<style lang="scss" scoped></style>
