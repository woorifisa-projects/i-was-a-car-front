import { instance } from '@/apis/index.js';

const findProductDetail = (productId) => {
  return instance.get(`/products/${productId}`);
};


const findProducts = (id) => {
  console.log("a",id)
  return instance.get(`/products`, {
    params: {
      lastProductId: id,
    },
  });
};

export { findProductDetail, findProducts };
