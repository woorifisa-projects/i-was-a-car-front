import { instance } from '@/apis';

const memberDetailApi = async (memberId) => {
  const res = await instance.get(`members/detail`, {
    params: {
      memberId,
    },
  });

  return res;
};

export { memberDetailApi };
