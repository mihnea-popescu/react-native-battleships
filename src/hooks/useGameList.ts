import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {RequestStatus} from '../lib/types';
import React from 'react';
import {fetchGames} from '../store/thunks/gamesThunk';

const useGamesList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const gamesState = useSelector((state: RootState) => state.games);

  React.useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  let requestStatus: RequestStatus = 'initial-loading';

  if (gamesState.error) {
    requestStatus = 'error';
  } else if (!gamesState.isLoading && gamesState.games) {
    requestStatus = 'success';
  } else if (gamesState.isLoading && gamesState.games && !gamesState.error) {
    requestStatus = 'loading';
  } else {
    requestStatus = 'initial-loading';
  }

  if (gamesState.error) {
    console.error(`[NETWORK ERROR - GAMES]: ${gamesState.error}`);
  }

  const refresh = () => {
    dispatch(fetchGames());
  };

  return {
    games: gamesState.games,
    count: gamesState.count,
    refresh,
    requestStatus,
  };
};

export default useGamesList;
