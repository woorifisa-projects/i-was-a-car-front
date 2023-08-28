import { instance } from '@/apis/index.js';

const findProductDetail = (productId) => {
  return instance.get(`/products/${productId}`);
};

const findProducts = (id) => {
  return instance.get(`/products`, {
    params: {
      lastProductId: id,
    },
  });
};

export { findProductDetail, findProducts };
