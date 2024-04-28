import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../lib/axios-client';
import {Game, MapConfigBody} from '../../lib/types';

export const fetchCurrentGame = createAsyncThunk(
  'currentGame/fetchCurrentGame',
  async (id: string, {rejectWithValue}) => {
    try {
      const response = await axios.get<Game>(`/game/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const sendCurrentGameMapConfig = createAsyncThunk(
  'currentGame/sendCurrentGameMapConfig',
  async (
    {
      gameId,
      mapConfig,
      callback,
    }: {gameId: string; mapConfig: MapConfigBody; callback: () => void},
    {rejectWithValue},
  ) => {
    try {
      const response = await axios.patch(
        `/game/${gameId}`,
        JSON.stringify(mapConfig),
      );
      callback?.();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
