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

const findProductByNameAndCarNumber = (name, carNumber) => {
  return instance.get('/sales/car-info', {
    params: {
      name: name,
      carNumber: carNumber,
    },
  });
};

export { findProductDetail, findProducts, findProductByNameAndCarNumber };
