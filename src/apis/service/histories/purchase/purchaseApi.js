import { instance } from '@/apis/index.js';
import { multipartFormDataJson } from '@/utils';
import { usePurchaseStore } from '@/store/purchase/purchaseStore';
import { storeToRefs } from 'pinia';

const getBanks = () => {
  return instance.get('/banks');
};

const createProduct = async () => {
  const store = usePurchaseStore();
  const { request } = storeToRefs(store);
  const formData = new FormData();

  multipartFormDataJson(formData, request.value, 'productCreateRequest');

  return await instance({
    method: 'POST',
    url: 'histories/purchase',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data; charset: UTF-8;',
    },
  });
};

export { getBanks, createProduct };
