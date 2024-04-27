import {View, Text} from 'react-native';
import React from 'react';
import BattleshipButton from '../../components/battleship-button/BattleshipButton';
import logOut from '../../lib/auth/logout';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PAGES_NAVIGATION} from '../../lib/pages-navigation';
import useUserProfile from '../../hooks/useUserProfile';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store';

type Props = NativeStackScreenProps<{}>;

const HomeScreen = ({navigation}: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const {profile} = useUserProfile();
  console.log(profile);

  const logOutOnPress = () => {
    logOut({
      dispatch,
    });

    // @ts-ignore
    navigation.navigate(PAGES_NAVIGATION.AUTHENTICATE_SCREEN);
  };

  return (
    <View>
      <Text>HomeScreen</Text>

      <BattleshipButton onPress={logOutOnPress} text="logout" />
    </View>
  );
};

export default HomeScreen;
