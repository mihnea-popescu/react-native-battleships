import {ScrollView, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './styles';
import useGamesList from '../../hooks/useGameList';
import HeaderWithTitle from '../../components/header-with-title/HeaderWithTitle';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import BattleshipButton from '../../components/battleship-button/BattleshipButton';
import {ACTIVE_OPACITY} from '../../lib/design';
import BattleshipText from '../../components/battleship-text/BattleshipText';
import {PAGES_NAVIGATION} from '../../lib/pages-navigation';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store';
import {joinGame} from '../../store/thunks/gamesThunk';
import useUserProfile from '../../hooks/useUserProfile';
import {GameListGame} from '../../lib/types';

type Props = NativeStackScreenProps<{}>;

const GameListScreen = ({navigation}: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const {profile} = useUserProfile();

  const {requestStatus, games, count, refresh} = useGamesList();

  const canJoinGame = (game: GameListGame) => {
    if (
      !game.player2 ||
      game.player1Id === profile?.user.id ||
      game.player2Id === profile?.user.id
    ) {
      return true;
    }

    return false;
  };

  const joinExistingGame = (game: GameListGame) => {
    if (!canJoinGame(game)) {
      return false;
    }

    dispatch(joinGame({id: game.id, callback: joinedGame}));
  };

  const joinedGame = (id: string) => {
    //@ts-ignore
    navigation.navigate(PAGES_NAVIGATION.GAME_SCREEN, {id});
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle navigation={navigation} title={`${count} games`} />
      <ScrollView style={styles.content}>
        <View style={styles.headerRow}>
          <BattleshipButton
            type="secondary"
            text="Refresh list"
            loading={requestStatus === 'loading'}
            onPress={refresh}
          />
        </View>
        {requestStatus === 'success' &&
          games.map((game, i) => (
            <TouchableOpacity
              style={styles.gameContainer}
              activeOpacity={ACTIVE_OPACITY}
              key={`game-list-${i}`}
              onPress={() => joinExistingGame(game)}>
              <View style={styles.gameTitleContainer}>
                <BattleshipText
                  text={`Game #${game.id}`}
                  size="medium"
                  style={styles.gameTitle}
                />
              </View>
              <BattleshipText
                size="small"
                text={`Status: ${game.status}`}
                style={styles.gameDetails}
              />
              <BattleshipText
                size="small"
                text={`Player1: ${game.player1.email}(${game.player1.id})`}
                style={styles.gameDetails}
              />
              {game.player2 && (
                <BattleshipText
                  size="small"
                  text={`Player2: ${game.player2.email}(${game.player2.id})`}
                  style={styles.gameDetails}
                />
              )}
              <BattleshipText
                size="small"
                text={`Player to move: ${game.playerToMoveId}`}
                style={styles.gameDetails}
              />
            </TouchableOpacity>
          ))}
        <View style={styles.scrollFooter} />
      </ScrollView>
    </View>
  );
};

export default GameListScreen;
