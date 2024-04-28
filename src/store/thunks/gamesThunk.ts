import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../lib/axios-client';
import {Game, GameList, GameListGame} from '../../lib/types';

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get<GameList>('/game');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const createNewGame = createAsyncThunk(
  'games/createNewGame',
  async (callback: (id: string) => void, {rejectWithValue}) => {
    try {
      const response = await axios.post<GameListGame>('/game');
      callback(response.data.id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const joinGame = createAsyncThunk(
  'games/joinGame',
  async (
    {id, callback}: {id: string; callback: (id: string) => void},
    {rejectWithValue},
  ) => {
    try {
      const response = await axios.post<Game>(`/game/join/${id}`);
      callback(response.data.id);
    } catch (error: any) {
      console.log('Error: ', error);
      return rejectWithValue(error.response.data);
    }
  },
);
