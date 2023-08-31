import { instance } from '@/apis';

export const purchaseHistoryAPI = (memberId, page, size) => {
  return instance.get(`/${memberId}/purchase-histories`, {
    params: {
      page,
      size,
    },
  });
};
