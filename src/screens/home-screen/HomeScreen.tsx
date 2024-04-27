import {View} from 'react-native';
import React from 'react';
import BattleshipButton from '../../components/battleship-button/BattleshipButton';
import logOut from '../../lib/auth/logout';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PAGES_NAVIGATION} from '../../lib/pages-navigation';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store';
import styles from './styles';

type Props = NativeStackScreenProps<{}>;

const HomeScreen = ({navigation}: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const logOutOnPress = () => {
    logOut({
      dispatch,
    });

    // @ts-ignore
    navigation.navigate(PAGES_NAVIGATION.AUTHENTICATE_SCREEN);
  };

  const viewProfile = () => {
    // @ts-ignore
    navigation.navigate(PAGES_NAVIGATION.USER_PROFILE_SCREEN);
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
    </View>
  );
};

export default HomeScreen;
