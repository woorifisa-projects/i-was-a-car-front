import { instance } from '@/apis';

const membersAPI = async (page, size) => {
  const res = await instance.get(`members`, {
    params: {
      page,
      size,
    },
  });

  return res;
};
export {
    membersAPI
}