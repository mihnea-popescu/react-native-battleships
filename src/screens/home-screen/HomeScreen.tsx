import {View} from 'react-native';
import React from 'react';
import BattleshipButton from '../../components/battleship-button/BattleshipButton';
import logOut from '../../lib/auth/logout';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PAGES_NAVIGATION} from '../../lib/pages-navigation';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store';
import styles from './styles';
import {createNewGame} from '../../store/thunks/gamesThunk';

type Props = NativeStackScreenProps<{}>;

const HomeScreen = ({navigation}: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const logOutOnPress = () => {
    logOut({
      dispatch,
    });

    // @ts-ignore
    navigation.reset({
      index: 0,
      //@ts-ignore
      routes: [{name: PAGES_NAVIGATION.AUTHENTICATE_SCREEN}],
    });
  };

  const viewProfile = () => {
    // @ts-ignore
    navigation.navigate(PAGES_NAVIGATION.USER_PROFILE_SCREEN);
  };

  const viewGamesList = () => {
    // @ts-ignore
    navigation.navigate(PAGES_NAVIGATION.GAME_LIST_SCREEN);
  };

  const createGame = () => {
    dispatch(createNewGame(gameCreated));
  };

  const gameCreated = (id: string) => {
    if (!id) {
      return;
    }

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
      <View style={styles.headerRow}>
        <View style={styles.headerButton}>
          <BattleshipButton text="Log out" onPress={logOutOnPress} />
        </View>
        <View style={styles.headerButton}>
          <BattleshipButton text="Profile" onPress={viewProfile} />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <BattleshipButton text="View games list" onPress={viewGamesList} />
        </View>
        <View style={styles.row}>
          <BattleshipButton text="Create a game" onPress={createGame} />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
