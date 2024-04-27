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

type Props = NativeStackScreenProps<{}>;

const GameListScreen = ({navigation}: Props) => {
  const {requestStatus, games, count, refresh} = useGamesList();

  const joinGame = (id: string) => {
    navigation.reset({
      index: 0,
      routes: [
        {
          // @ts-ignore
          name: PAGES_NAVIGATION.GAME_SCREEN,
          params: {
            id,
          },
        },
      ],
    });
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
              onPress={() => joinGame(game.id)}>
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
