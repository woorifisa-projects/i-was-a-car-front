import { instance } from '@/apis';

const purchaseHistoryAPI = async (memberId, page, size) => {
  const res = await instance.get(`members/${memberId}/purchase-histories`, {
    params: {
      page,
      size,
    },
  });

  return res;
};

const saleHistoryAPI = async (memberId, page, size) => {
  const res = await instance.get(`sales/${memberId}/sale-histories`, {
    params: {
      page,
      size,
    },
  });
  return res;
};

const purchaseHistoryDetailAPI = async (memberId, purchaseHistoryNo) => {
  const res = await instance.get(
    `members/${memberId}/purchase-history/${purchaseHistoryNo}`
  );
  return res;
};
export { purchaseHistoryAPI, saleHistoryAPI, purchaseHistoryDetailAPI };
