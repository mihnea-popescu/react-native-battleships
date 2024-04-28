import {configureStore} from '@reduxjs/toolkit';
import profileSlice from './slices/profileSlice';
import gamesSlice from './slices/gamesSlice';
import currentGameSlice from './slices/currentGameSlice';

const store = configureStore({
  reducer: {
    profile: profileSlice,
    games: gamesSlice,
    currentGame: currentGameSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
