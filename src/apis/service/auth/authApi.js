import { instance } from '@/apis';

const login = (body) => {
  return instance.post('/members/login', body);
};

const signup = (body) => {
  return instance.post('/members/signup', body);
};

export { login };
