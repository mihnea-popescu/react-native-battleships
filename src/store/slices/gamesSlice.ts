import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {GameList, GameListGame} from '../../lib/types';
import {fetchGames} from '../thunks/gamesThunk';

interface StateType {
  count: number;
  games: GameListGame[];
  isLoading: boolean;
  error: string | null;
}

const initialState: StateType = {
  count: 0,
  games: [],
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearUserProfile: state => {
      state.count = 0;
      state.games = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGames.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchGames.fulfilled,
        (state, action: PayloadAction<GameList>) => {
          state.isLoading = false;
          state.count = action.payload.total;
          state.games = action.payload.games;
        },
      )
      .addCase(fetchGames.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const {clearUserProfile} = profileSlice.actions;
export default profileSlice.reducer;
