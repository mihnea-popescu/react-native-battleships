import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {UserDetails} from '../../lib/types';
import {fetchProfile} from '../thunks/profileThunk';

interface StateType {
  profile: UserDetails | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: StateType = {
  profile: null,
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearUserProfile: state => {
      // Reset only profile, not the entire state
      state.profile = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProfile.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProfile.fulfilled,
        (state, action: PayloadAction<UserDetails>) => {
          state.profile = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(fetchProfile.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const {clearUserProfile} = profileSlice.actions;
export default profileSlice.reducer;
