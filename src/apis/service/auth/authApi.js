import { instance } from '@/apis/index.js';

const loginAPI = async (body) => {
  const { data } = await instance.post('/members/login', body);
  return data;
};

const signupAPI = async (body) => {
  const { data } = await instance.post('/members/signup', body);
  return data;
};

export { loginAPI, signupAPI };
