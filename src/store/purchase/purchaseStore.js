import { defineStore } from 'pinia';
import { ref } from 'vue';
import { dateFormat } from '@/utils';

export const usePurchaseStore = defineStore('purchaseStore', () => {
  const request = ref({}); //페이지마다 변수 모아서 쓸려구
  const purchaseResponse = ref({}); //마지막 API 응답값저장
  const carType = ref();
  const carTypeName = ref();
  const financeInfo = ref({});
  const carInfo = ref({});

  const setCarInfo = (product) => {
    carInfo.value.id = product.id;
    carInfo.value.carName = product.name;
    carInfo.value.carNumber = product.info;
    carInfo.value.carType = product.carType;
    carInfo.value.fuel = product.fuel;
    carInfo.value.price = product.price;

    request.value.productId = product.id;
  };

  const resetCarInfo = () => {
    carInfo.value = {};
  };

  const setCarType = (ct) => {
    console.log(ct);
    carType.value = ct.id;
    carTypeName.value = ct.name;
  };

  const setLoanId = (id) => {
    request.value.loanId = id;
  };
  const setInsuranceId = (id) => {
    request.value.insuranceId = id;
  };
  const setMemberId = (id) => {
    request.value.memberId = id;
  };

  const setFinanceInfo = (capital, loan, period) => {
    financeInfo.value.capital = capital;
    financeInfo.value.loan = loan;
    financeInfo.value.period = period;

    request.value.loanAmount = loan;
    request.value.period = period;
  };

  const setDeilveryInfo = (targetDelivery) => {
    request.value.deliverySchedule = dateFormat(
      targetDelivery.deliverySchedule
    );
    request.value.zipCode = targetDelivery.zipCode;
    request.value.address = targetDelivery.address;
    request.value.addressDetail = targetDelivery.addressDetail;

    request.value.accountHolder = targetDelivery.accountHolder;
    request.value.bankId = targetDelivery.selectedBank;
    request.value.accountNumber = targetDelivery.account;
  };

  const setPurchaseResponse = (resp) => (purchaseResponse.value = resp);

  const resetPurchaseRequest = () => {
    request.value = {};
  };

  return {
    request,
    carType,
    carTypeName,
    financeInfo,
    carInfo,
    setLoanId,
    setInsuranceId,
    setCarType,
    setCarInfo,
    setDeilveryInfo,
    setPurchaseResponse,
    setFinanceInfo,
    setMemberId,
    purchaseResponse,
    resetCarInfo,
    resetPurchaseRequest,
  };
});
