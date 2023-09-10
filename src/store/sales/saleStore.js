import { defineStore } from 'pinia';
import { ref } from 'vue';
import { dateFormat } from '@/utils';

export const useSaleStore = defineStore('saleStore', () => {
  const request = ref({});
  const response = ref({});
  const distance = ref(0);
  const images = ref([]);

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

  const combineResponse = (carInfo) => Object.assign(request.value, carInfo);
  const addStoreImages = (imgs) => {
    images.value = imgs;
    // images.value.push(...imgs);
  };

  const setFinanceInfo = (price, accountHolder, bankId, accountNumber) => {
    request.value.price = price;
    request.value.accountHolder = accountHolder;
    request.value.bankId = bankId;
    request.value.accountNumber = accountNumber;
  };

  const getRequestBody = () => {};
  const setResponse = (resp) => (response.value = resp);

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
    response,
  };
});
