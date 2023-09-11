import { instance } from '@/apis';
import { multipartFormDataFile, multipartFormDataJson } from '@/utils';

const productsAPI = async (page, size) => {
  const res = await instance.get(`admin/products`, {
    params: {
      page,
      size,
    },
  });

  return res;
};

const waitingProductsAPI = async (page, size) => {
  const res = await instance.get(`admin/products/waiting`, {
    params: {
      page,
      size,
    },
  });

  return res;
};

const findProductHistory = async (productId) => {
  return await instance.get(`admin/products/history/${productId}`);
};

const findLabels = async () => {
  return await instance.get('labels');
};

const addPerformanceCheck = async (productId, formData) => {
  return await instance.patch(
    `admin/products/${productId}/performance-check`,
    formData,
    {
      'Content-Type': 'multipart/form-data; charset: UTF-8;',
    }
  );
};

const updatePriceAndLabel = async (productId, price, labelId) => {
  return await instance.patch(`admin/products/${productId}`, {
    price: price,
    labelId: labelId,
  });
};
const uploadImages = async (productId, formData) => {
  return await instance.patch(`admin/products/${productId}/images`, formData, {
    'Content-Type': 'multipart/form-data; charset: UTF-8;',
  });
};

export {
  productsAPI,
  waitingProductsAPI,
  findProductHistory,
  findLabels,
  updatePriceAndLabel,
  addPerformanceCheck,
  uploadImages,
};
