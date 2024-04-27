import {MMKV} from 'react-native-mmkv';

const UserMMKVStorage = new MMKV({
  id: 'user-storage',
});

export const isLoggedIn = UserMMKVStorage.contains('auth-token');

export default UserMMKVStorage;
