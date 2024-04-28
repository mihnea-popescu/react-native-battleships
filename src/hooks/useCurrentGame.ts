import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {RequestStatus} from '../lib/types';
import React from 'react';
import {fetchCurrentGame} from '../store/thunks/currentGameThunk';

const useCurrentGame = (id: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentGameState = useSelector((state: RootState) => state.currentGame);

  const refresh = React.useCallback(() => {
    dispatch(fetchCurrentGame(id));
  }, [dispatch, id]);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  let requestStatus: RequestStatus = 'initial-loading';

  if (currentGameState.error) {
    requestStatus = 'error';
  } else if (!currentGameState.isLoading && currentGameState.game) {
    requestStatus = 'success';
  } else if (
    currentGameState.isLoading &&
    currentGameState.game &&
    !currentGameState.error
  ) {
    requestStatus = 'loading';
  } else {
    requestStatus = 'initial-loading';
  }

  if (currentGameState.error) {
    console.error(`[NETWORK ERROR - current game]: ${currentGameState.error}`);
  }

  return {
    game: currentGameState.game,
    requestStatus,
    refresh,
  };
};

export default useCurrentGame;
