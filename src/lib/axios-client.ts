import Axios from 'axios';
import UserMMKVStorage from './storage/user-storage';

const axios = Axios.create({
  baseURL: 'http://163.172.177.98:8081',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    ...{
      Authorization: UserMMKVStorage.contains('auth-token')
        ? `Bearer ${UserMMKVStorage.getString('auth-token')}`
        : undefined,
    },
  },
});

export default axios;
