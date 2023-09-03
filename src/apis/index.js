import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL_V1,
});
