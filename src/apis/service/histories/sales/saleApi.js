import { instance } from '@/apis/index.js';
import { multipartFormDataFileList, multipartFormDataJson } from '@/utils';
import { useSaleStore } from '@/store/sales/saleStore';
import { storeToRefs } from 'pinia';

const getCarInfo = (carNumber, name) => {
  return instance.get('/sales/car-info', {
    params: {
      carNumber: carNumber,
      name: name,
    },
  });
};

const createProduct = async () => {
  const store = useSaleStore();
  const { request, images } = storeToRefs(store);
  const formData = new FormData();

  multipartFormDataFileList(formData, images.value, 'carImages');
  multipartFormDataJson(formData, request.value, 'productCreateRequest');

  return await instance({
    method: 'POST',
    url: '/sales',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data; charset: UTF-8;',
    },
  });
};

export { createProduct };
