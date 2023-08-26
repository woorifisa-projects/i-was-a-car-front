import { instance } from '@/apis/index.js';

const findProductDetail = (productId) => {
  return instance.get(`/products/${productId}`);
};

export { findProductDetail };
