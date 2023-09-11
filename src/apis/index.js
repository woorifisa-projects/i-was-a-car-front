import { useLoadingStore } from '@/store/loading';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL_V1,
});

instance.interceptors.request.use(
  (config) => {
    const loading = useLoadingStore();
    const { setLoading } = loading;

    setLoading(true);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    const loading = useLoadingStore();
    const { setLoading } = loading;

    setLoading(false);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
