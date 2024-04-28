import {View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import styles from './styles';
import HeaderWithTitle from '../../components/header-with-title/HeaderWithTitle';
import useCurrentGame from '../../hooks/useCurrentGame';
import BattleshipText from '../../components/battleship-text/BattleshipText';
import BattleshipButton from '../../components/battleship-button/BattleshipButton';
import GameScreenMapConfig from './components/game-screen-map-config/GameScreenMapConfig';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store';
import {clearCurrentGame} from '../../store/slices/currentGameSlice';

type RootStackParamList = {
  GameScreen: {
    id: string;
  };
};

type Props = NativeStackScreenProps<RootStackParamList>;

const GameScreen = ({navigation, route}: Props) => {
  //@ts-ignore
  const gameId = route.params.id as string;

  const dispatch = useDispatch<AppDispatch>();

  const {
    requestStatus,
    game,
    refresh: refreshCurrentGame,
  } = useCurrentGame(gameId);

  const onBack = () => {
    dispatch(clearCurrentGame());
  };

  const createdGame = () => (
    <View style={styles.createdContainer}>
      <BattleshipText
        size="large"
        text="Waiting for another player to join..."
        style={styles.createdText}
      />
      <BattleshipButton
        text="Refresh"
        disabled={requestStatus === 'loading'}
        onPress={refreshCurrentGame}
        loading={requestStatus === 'loading'}
      />
    </View>
  );

  const mapConfig = () => <GameScreenMapConfig gameId={gameId} />;

  return (
    <View style={styles.container}>
      <HeaderWithTitle
        navigation={navigation}
        title={`Game #${gameId.substring(0, 10)}`}
        onBack={onBack}
      />
      <View style={styles.content}>
        {game?.status === 'CREATED' && createdGame()}
        {game?.status === 'MAP_CONFIG' && mapConfig()}
      </View>
    </View>
  );
};

export default GameScreen;
