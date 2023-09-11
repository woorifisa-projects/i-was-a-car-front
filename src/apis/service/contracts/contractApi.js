import { instance } from '@/apis/index.js';
import { useContractStore } from '@/store/contractStore';
import { storeToRefs } from 'pinia';

const findContractById = (contractId) => {
    return instance.get(`/documents/${contractId}`);
};

const findSpecificLoan = (myMoney, wantMoney, installment) => {
    return instance.get(`/loans`, {
        params: {
            capital: myMoney,
            loan: wantMoney,
            period: installment,
        },
    });
}

const findSpecificinsurance = () => {
    return instance.get(`/insurances`);
}

const getBanks = () => {
  return instance.get('/banks');
};

const getIdentification = (name, rrnf, rrnb) => {
    return instance.get(`/members/identification`, {
        params: {
            name: name,
            rrnf: rrnf,
            rrnb: rrnb,
        },
    });
}

const createConscent = async () => {
  const store = useContractStore();
  const { request } = storeToRefs(store);


  return await instance({
    method: 'POST',
    url: '/consents',
    data: request.value,
  });
};

export { findContractById, findSpecificLoan, findSpecificinsurance, getBanks, getIdentification, createConscent };
