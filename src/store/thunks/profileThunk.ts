import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../lib/axios-client';
import {UserDetails} from '../../lib/types';

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get<UserDetails>('/user/details/me');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
