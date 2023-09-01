import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSaleStore = defineStore('saleStore', () => {
  const request = {};

  const name = ref('');
  const carNumber = ref('');
  const setName = (name) => (name.value = name);
  const setCarNumber = (carNumber) => (carNumber.value = carNumber);

  const setMeetingInfo = (date, zipCode, address, addressDetail) => {
    request.meetingDate = date;
    request.zipCode = zipCode;
    request.address = address;
    request.addressDetail = addressDetail;
    console.log(request);
  }

  return {
    name,
    carNumber,
    setName,
    setCarNumber,
    setMeetingInfo,
  };
});
