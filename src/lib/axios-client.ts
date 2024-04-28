import Axios from 'axios';
import UserMMKVStorage from './storage/user-storage';

const axios = Axios.create({
  baseURL: 'http://163.172.177.98:8081',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
});

axios.interceptors.request.use(
  async config => {
    const tokenExists = UserMMKVStorage.contains('auth-token');
    if (tokenExists) {
      const token = UserMMKVStorage.getString('auth-token');
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axios;
