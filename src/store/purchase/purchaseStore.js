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

  const setDeilveryInfo = (targetDelivery) => {
    console.log(targetDelivery)
    request.value.deliverySchedule = dateFormat(targetDelivery.meetingDate);
    request.value.zipCode = targetDelivery.zipCode;
    request.value.address = targetDelivery.address;
    request.value.addressDetail = targetDelivery.addressDetail;
<<<<<<< HEAD

    request.value.accountHolder = targetDelivery.accountHolder;
    request.value.bankId = targetDelivery.selectedBank;
    request.value.accountNumber = targetDelivery.account;

=======

    request.value.accountHolder = targetDelivery.accountHolder;
    request.value.bankId = targetDelivery.selectedBank;
    request.value.accountNumber = targetDelivery.account;
  
>>>>>>> 23616d6 (원클릭 연결 완료[#3])
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
