import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import BattleshipText from '../../components/battleship-text/BattleshipText';
import BattleshipButton from '../../components/battleship-button/BattleshipButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PAGES_NAVIGATION} from '../../lib/pages-navigation';

type AuthenticateScreenProps = NativeStackScreenProps<{}>;

const AuthenticateScreen = ({navigation}: AuthenticateScreenProps) => {
  const goToLogin = () => {
    // @ts-ignore
    navigation.navigate(PAGES_NAVIGATION.LOGIN_SCREEN);
  };

  const goToRegister = () => {
    // @ts-ignore
    navigation.navigate(PAGES_NAVIGATION.REGISTER_SCREEN);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.row}>
          <BattleshipText
            size="large"
            text={'Battleships'}
            style={styles.title}
          />
        </View>
        <View style={styles.buttonRow}>
          <BattleshipButton type="primary" text="Login" onPress={goToLogin} />
        </View>
        <View style={styles.buttonRow}>
          <BattleshipButton
            type="primary"
            text="Register"
            onPress={goToRegister}
          />
        </View>
        <View style={[styles.row, styles.footer]}>
          <BattleshipText
            size="medium"
            text={'Mihnea Popescu'}
            style={styles.footerTitle}
          />
        </View>
      </View>
    </View>
  );
};

export default AuthenticateScreen;
