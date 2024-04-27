import React from 'react';
import axios from '../../lib/axios-client';
import {APIResponse} from '../../lib/types';
import {AxiosError} from 'axios';

const useRegister = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const submit = async ({
    email,
    password,
  }: {
    email?: string;
    password?: string;
  }) => {
    setLoading(true);
    try {
      await axios.post(
        '/auth/register',
        JSON.stringify({
          email,
          password,
        }),
      );

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

export default useRegister;
