import { instance } from '@/apis/index.js';
import { usePurchaseStore } from '@/store/purchase/purchaseStore';
import { storeToRefs } from 'pinia';

const createPurchase = async () => {
  const store = usePurchaseStore();
  const { request } = storeToRefs(store);


  return await instance({
    method: 'POST',
    url: '/histories/purchase',
    data: request.value,
  });
};

export { createPurchase };
