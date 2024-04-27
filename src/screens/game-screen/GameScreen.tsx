import {View, Text} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  GameScreen: {
    id: string;
  };
};

type Props = NativeStackScreenProps<RootStackParamList>;

const GameScreen = ({navigation, route}: Props) => {
  console.log(route.params.id as string);

  return (
    <View>
      <Text>GameScreen</Text>
    </View>
  );
};

export default GameScreen;
