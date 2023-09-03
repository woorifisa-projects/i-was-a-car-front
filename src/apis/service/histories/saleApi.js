import { instance } from '@/apis/index.js';
import {
  multipartFormDataFileList,
  multipartFormDataFile,
  multipartFormDataJson,
} from '@/utils';
import { useSaleStore } from '@/store/sales/saleStore';
import { storeToRefs } from 'pinia';

const getBanks = () => {
  return instance.get('/banks');
};

const getCarInfo = (carNumber, name) => {
  return instance.get('/sales/car-info', {
    params: {
      carNumber: carNumber,
      name: name,
    },
  });
};

const addSaleItem = () => {
  const store = useSaleStore();
  const {request, performanceCheck, images} = storeToRefs(store);
  const formData = new FormData();

  multipartFormDataFileList(formData, images.value, 'carImages');
  multipartFormDataFile(formData, performanceCheck.value, 'performanceCheck');
  multipartFormDataJson(formData, request.value, 'saleRequest');

  return instance.post('/api/v1/sales', formData);
};

export { getBanks, addSaleItem };
