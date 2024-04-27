import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {RequestStatus} from '../lib/types';
import React from 'react';
import {fetchProfile} from '../store/thunks/profileThunk';

const useUserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userProfileState = useSelector((state: RootState) => state.profile);

  React.useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  let requestStatus: RequestStatus;

  if (userProfileState.error) {
    requestStatus = 'error';
  } else if (!userProfileState.isLoading && userProfileState.profile) {
    requestStatus = 'success';
  } else if (
    userProfileState.isLoading &&
    userProfileState.profile &&
    !userProfileState.error
  ) {
    requestStatus = 'loading';
  } else {
    requestStatus = 'initial-loading';
  }

  if (userProfileState.error) {
    console.error(`[NETWORK ERROR - USER PROFILE]: ${userProfileState.error}`);
  }

  return {
    profile: userProfileState.profile,
    requestStatus,
  };
};

export default useUserProfile;
