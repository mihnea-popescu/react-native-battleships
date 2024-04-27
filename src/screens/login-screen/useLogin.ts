import React from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store';
import axios from '../../lib/axios-client';
import {APIResponse} from '../../lib/types';
import UserMMKVStorage from '../../lib/storage/user-storage';
import {fetchProfile} from '../../store/thunks/profileThunk';
import {AxiosError} from 'axios';

const useLogin = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const submit = async ({
    email,
    password,
  }: {
    email?: string;
    password?: string;
  }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        '/auth/login',
        JSON.stringify({
          email,
          password,
        }),
      );

      const token = response.data.accessToken;

      UserMMKVStorage.set('auth-token', token);

      setTimeout(() => {
        dispatch(fetchProfile());
      });

      return {
        success: true,
      } as APIResponse;
    } catch (error) {
      if ((error as AxiosError).response) {
        const response = (error as AxiosError).response;

        if (response && response.status === 403) {
          return {
            success: false,
            data: response.data,
          } as APIResponse;
        }
      } else {
        console.log('Error: ', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    submit,
  };
};

export default useLogin;
