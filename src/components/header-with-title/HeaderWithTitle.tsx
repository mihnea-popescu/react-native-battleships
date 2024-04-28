import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Icon} from 'react-native-paper';
import {ParamListBase} from '@react-navigation/native';
import styles from './styles';
import {ACTIVE_OPACITY} from '../../lib/design';
import BattleshipText from '../battleship-text/BattleshipText';

const HeaderWithTitle = ({
  navigation,
  title,
  onBack,
}: {
  // @ts-ignore
  navigation: NativeStackNavigationProp<ParamListBase, RouteName, NavigatorID>;
  title: string;
  onBack?: () => void;
}) => {
  const goBack = React.useCallback(() => {
    navigation.goBack();
    onBack?.();
  }, [navigation, onBack]);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={goBack}
        activeOpacity={ACTIVE_OPACITY}
        style={styles.headerIconContainer}>
        <Icon source="arrow-left" size={32} />
      </TouchableOpacity>
      <BattleshipText text={title} size="xlarge" style={styles.headerTitle} />
    </View>
  );
};

export default HeaderWithTitle;
