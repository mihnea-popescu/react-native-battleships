import {View} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import styles from './styles';
import HeaderWithTitle from '../../components/header-with-title/HeaderWithTitle';
import useCurrentGame from '../../hooks/useCurrentGame';
import BattleshipText from '../../components/battleship-text/BattleshipText';
import GameScreenMapConfig from './components/game-screen-map-config/GameScreenMapConfig';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store';
import {clearCurrentGame} from '../../store/slices/currentGameSlice';
import GameScreenActive from './components/game-screen-active/GameScreenActive';

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

  const {game, refresh} = useCurrentGame(gameId);

  const gameRefreshInterval = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!gameRefreshInterval.current && game) {
      gameRefreshInterval.current = setInterval(() => {
        refresh();
      }, 2500);
    }

    return () => {
      if (gameRefreshInterval.current) {
        clearInterval(gameRefreshInterval.current);
        gameRefreshInterval.current = null;
      }
    };
  }, [game, refresh]);

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
    </View>
  );

  const mapConfig = () => <GameScreenMapConfig gameId={gameId} />;
  const activeGame = () => <GameScreenActive gameId={gameId} />;

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
        {game?.status === 'ACTIVE' && activeGame()}
      </View>
    </View>
  );
};

export default GameScreen;
