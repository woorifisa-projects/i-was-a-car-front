import { instance } from '@/apis/index.js';

const findProductDetail = (productId) => {
  return instance.get(`/products/${productId}`);
};

const findCarTpyes = () => {
  return instance.get(`/car-type`);
};

const findProducts = (id) => {
  return instance.get(`/products`, {
    params: {
      lastProductId: id,
    },
  });
};

const RecommendationProducts = (carType, myMoney, wantMoney, id) => {
  return instance.get(`/products/recommendation`, {
    params: {
      carType: carType,
      capital: myMoney,
      loan: wantMoney,
      lastProductId: id,
        });
};
                      
const findProductByNameAndCarNumber = (name, carNumber) => {
  return instance.get('/sales/car-info', {
    params: {
      name: name,
      carNumber: carNumber,
    });
};

export { findProductDetail, findProducts, RecommendationProducts, findCarTpyes, findProductByNameAndCarNumber };
