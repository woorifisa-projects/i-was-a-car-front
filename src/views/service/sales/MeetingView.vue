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
      :min="minDate"
      class="my-10"
    >
    </v-text-field>
    <FindAddress
      @changeZipCode="setZipCode"
      @changeAddress="setAddress"
      @changeAddressDetail="setAddressDetail"
      :zipCode="zipCode"
      :address="address"
      :addressDetail="addressDetail"
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
import { storeToRefs } from 'pinia';
import { createProduct } from '@/apis/service/histories/sales/saleApi';

const validateSaleStore = useValidateSaleStore();
const { setMeetingCheck } = validateSaleStore;

const btnStore = useBtnStore();
const { setBtnCondition } = btnStore;

const cardTitle = ref('미팅 장소 입력');
const next = ref('다음');
const nextUrl = ref('8');

const store = useSaleStore();
const { setMeetingInfo, setResponse } = store;
const { request } = storeToRefs(store);

const meetingSchedule = ref('');
const zipCode = ref('');
const address = ref('');
const addressDetail = ref('');

onBeforeMount(() => {
  setBtnCondition(false);
  meetingSchedule.value = request.value.meetingSchedule;
  zipCode.value = request.value.zipCode;
  address.value = request.value.address;
  addressDetail.value = request.value.addressDetail;
});

const setZipCode = (emitZipCode) => (zipCode.value = emitZipCode);
const setAddress = (emitAddress) => (address.value = emitAddress);
const setAddressDetail = (emitAddressDetail) =>
  (addressDetail.value = emitAddressDetail);

const onClickNextBtnEmit = async () => {
  setMeetingInfo(
    meetingSchedule.value,
    zipCode.value,
    address.value,
    addressDetail.value
  );

  await createProduct()
    .then((resp) => {
      const response = resp.data.data;
      setResponse(response);
    })
    .catch((e) => console.error(e));
};

const date = new Date();
const m = date.getMonth() + 1;
const month = m < 10 ? '0' + m : m;
const d = date.getDate() + 1;
const day = d < 10 ? '0' + d : d;
const minDate = ref(`${date.getFullYear()}-${month}-${day}T09:00`);

watch([meetingSchedule, zipCode, address, addressDetail], ([ms, zc, a, ad]) => {
  const value =
    ms != undefined &&
    zc != undefined &&
    zc.length > 0 &&
    a != undefined &&
    a.length > 0 &&
    ad != undefined &&
    ad.length > 0;
  setBtnCondition(value);
  setMeetingCheck(value);
});
</script>

<style lang="scss" scoped></style>
