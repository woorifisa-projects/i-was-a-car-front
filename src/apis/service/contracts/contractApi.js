import { instance } from '@/apis/index.js';

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

export { findContractById, findSpecificLoan, findSpecificinsurance, getBanks, getIdentification };


