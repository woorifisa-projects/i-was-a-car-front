import { instance } from '@/apis/index.js';
import {
  multipartFormDataFileList,
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

const createProduct = () => {
  const store = useSaleStore();
  const { request, images } = storeToRefs(store);
  const formData = new FormData();

  multipartFormDataFileList(formData, images.value, 'carImages');
  multipartFormDataJson(formData, request.value, 'productCreateRequest');

  return instance.post({
    method: 'POST',
    url: '/sales',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export { getBanks, createProduct };
