import { instance } from '@/apis/index.js';

const getBanks = () => {
  return instance.get('/banks');
};

const getCarInfo = (carNumber) => {
  return instance.get('/banks', {
    params: {
      carNumber: carNumber,
    },
  });
};

export { getBanks };
