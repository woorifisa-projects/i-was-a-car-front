import { defineStore } from 'pinia';
import { ref } from 'vue';
import { dateFormat } from '@/utils';

export const usePurchaseStore = defineStore('purchaseStore', () => {
  const request = ref({}); //페이지마다 변수 모아서 쓸려구 
  const response = ref({}); //마지막 API 응답값저장
  const carType = ref();
  const financeInfo = ref({})
  const carInfo = ref({})
  

  const setCarInfo = (product) => {
    carInfo.value.id = product.id
    carInfo.value.carName = product.name
    carInfo.value.carNumber = product.info
    carInfo.value.carType = product.carType
    carInfo.value.fuel = product.fuel
    carInfo.value.price = product.price

    request.value.productId = product.id
  };

  const setCarType = (ct) => { carType.value = ct };
  const setLoanId = (id) => { request.value.loanId = id };
  const setInsuranceId = (id) => { request.value.insuranceId = id };
  const setMemberId = (id) => { request.value.memberId = id };

  const setFinanceInfo = (capital, loan, period) => {
    financeInfo.value.capital = capital;
    financeInfo.value.loan = loan;
    financeInfo.value.period = period;

    request.value.loanAmount = loan;
    request.value.period = period;
  }

  const setDeilveryInfo = (meetingSchedule, zipCode, address, addressDetail) => {
    request.value.deliverySchedule = dateFormat(meetingSchedule);
    request.value.zipCode = zipCode;
    request.value.address = address;
    request.value.addressDetail = addressDetail;

    request.value.accountHolder = accountHolder;
    request.value.bankId = bankId;
    request.value.accountNumber = accountNumber;
  
  };

  const setResponse = (resp) => (response.value = resp);

  return {
    request,
    carType,
    financeInfo,
    carInfo,
    setLoanId, 
    setInsuranceId,
    setCarType,
    setCarInfo,
    setDeilveryInfo,
    setResponse,
    setFinanceInfo,
    setMemberId,
    response,
  };
});
