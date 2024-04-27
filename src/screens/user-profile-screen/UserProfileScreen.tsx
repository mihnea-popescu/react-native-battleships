import {View} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import styles from './styles';
import HeaderWithTitle from '../../components/header-with-title/HeaderWithTitle';
import useUserProfile from '../../hooks/useUserProfile';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store';
import {fetchProfile} from '../../store/thunks/profileThunk';
import BattleshipText from '../../components/battleship-text/BattleshipText';

type Props = NativeStackScreenProps<{}>;

const UserProfileScreen = ({navigation}: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const {profile} = useUserProfile();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <HeaderWithTitle navigation={navigation} title="Profile" />
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.row}>
            <BattleshipText
              text={`Games played: ${profile?.gamesPlayed}`}
              style={styles.text}
              size="large"
            />
          </View>
          <View style={styles.row}>
            <BattleshipText
              text={`Games won: ${profile?.gamesWon}`}
              style={styles.text}
              size="large"
            />
          </View>
          <View style={styles.row}>
            <BattleshipText
              text={`Games lost: ${profile?.gamesLost}`}
              style={styles.text}
              size="large"
            />
          </View>
          <View style={styles.row}>
            <BattleshipText
              text={`Email: ${profile?.user.email}`}
              style={styles.text}
              size="medium"
            />
          </View>
          <View style={styles.row}>
            <BattleshipText
              text={`ID: ${profile?.user.id}`}
              style={styles.text}
              size="medium"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserProfileScreen;
