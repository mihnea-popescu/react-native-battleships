import {configureStore} from '@reduxjs/toolkit';
import profileSlice from './slices/profileSlice';
import gamesSlice from './slices/gamesSlice';

const store = configureStore({
  reducer: {
    profile: profileSlice,
    games: gamesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
