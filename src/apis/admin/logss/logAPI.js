import { instance } from '@/apis';

const logHistoryAPI = async (page, size) => {
  const res = await instance.get(`logs`, {
    params: {
      page,
      size,
    },
  });

  return res;
};
export {
    logHistoryAPI
}