import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSaleStore = defineStore('saleStore', () => {

  const request = ref({});
  const distance = ref(0);
  const performanceCheck = ref();
  const images = ref([]);

  const setMeetingInfo = (date, zipCode, address, addressDetail) => {
    request.value.meetingDate = date;
    request.value.zipCode = zipCode;
    request.value.address = address;
    request.value.addressDetail = addressDetail;
  };

  const setDistance = (d) => {
    request.value.distance = d;
    distance.value = d;
  };

  const combineResponse = (carInfo) => Object.assign(request.value, carInfo)
  const addStoreImages = (imgs) => images.value.push(...imgs);

  const setFinanceInfo = (price, accountHolder, bankId, accountNumber) => {
    request.value.price = price;
    request.value.accountHolder = accountHolder;
    request.value.bankId = bankId;
    request.value.accountNumber = accountNumber;
  };

  const getRequestBody = () => {};

  return {
    request,
    performanceCheck,
    images,
    setMeetingInfo,
    setDistance,
    distance,
    combineResponse,
    addStoreImages,
    setFinanceInfo,
    getRequestBody,
  };
});
