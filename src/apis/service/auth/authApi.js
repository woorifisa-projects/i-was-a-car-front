import { instance } from '@/apis/index.js';

const loginAPI = async (body) => {
  const { data } = await instance.post('/members/login', body);
  return data;
};

const signup = async (body) => {
  return await instance.post('/members/signup', body);
};

export { loginAPI };
