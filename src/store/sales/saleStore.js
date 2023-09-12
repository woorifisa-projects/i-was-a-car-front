import { defineStore } from 'pinia';
import { ref } from 'vue';
import { dateFormat } from '@/utils';

export const useSaleStore = defineStore('saleStore', () => {
  const request = ref({});
  const saleResponse = ref({});
  const distance = ref(0);
  const images = ref([]);
  const carInfo = ref();

  const setMeetingInfo = (meetingSchedule, zipCode, address, addressDetail) => {
    request.value.meetingSchedule = dateFormat(meetingSchedule);
    request.value.zipCode = zipCode;
    request.value.address = address;
    request.value.addressDetail = addressDetail;
  };

  const setDistance = (d) => {
    request.value.distance = d;
    distance.value = d;
  };

  const combineResponse = (c) => {
    Object.assign(request.value, c);
    carInfo.value = c;
  };

  const addStoreImages = (imgs) => {
    images.value = imgs;
  };

  const setFinanceInfo = (price, accountHolder, bankId, accountNumber) => {
    carInfo.value.price = price;

    request.value.price = price;
    request.value.accountHolder = accountHolder;
    request.value.bankId = bankId;
    request.value.accountNumber = accountNumber;
  };

  const getRequestBody = () => {};
  const setResponse = (resp) => (saleResponse.value = resp);

  return {
    request,
    images,
    setMeetingInfo,
    setDistance,
    distance,
    combineResponse,
    addStoreImages,
    setFinanceInfo,
    getRequestBody,
    setResponse,
    saleResponse,
    carInfo,
  };
});
