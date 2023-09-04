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

export { findContractById, findSpecificLoan, findSpecificinsurance };
