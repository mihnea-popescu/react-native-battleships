import {clearUserProfile} from '../../store/slices/profileSlice';
import UserMMKVStorage from '../storage/user-storage';
import {AppDispatch} from '../../store';
import {Dispatch, ThunkDispatch, UnknownAction} from '@reduxjs/toolkit';

const logOut = ({
  dispatch,
}: {
  dispatch: ThunkDispatch<AppDispatch, undefined, UnknownAction> &
    Dispatch<UnknownAction>;
}) => {
  dispatch(clearUserProfile());

  UserMMKVStorage.clearAll();

  return true;
};

export default logOut;
