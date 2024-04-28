import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Game} from '../../lib/types';
import {fetchCurrentGame} from '../thunks/currentGameThunk';

interface StateType {
  game: Game | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: StateType = {
  game: null,
  isLoading: false,
  error: null,
};

const currentGameSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearCurrentGame: state => {
      state.game = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCurrentGame.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCurrentGame.fulfilled,
        (state, action: PayloadAction<Game>) => {
          state.isLoading = false;
          state.game = action.payload;
        },
      )
      .addCase(
        fetchCurrentGame.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
          state.isLoading = false;
        },
      );
  },
});

export const {clearCurrentGame} = currentGameSlice.actions;
export default currentGameSlice.reducer;
