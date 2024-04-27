import {StyleProp, Text, TextStyle} from 'react-native';
import React from 'react';
import styles from './styles';

export type BattleshipTextSize =
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge';

interface BattleshipTextProps {
  text?: string;
  size?: BattleshipTextSize;
  style?: StyleProp<TextStyle>;
}

const BattleshipText = ({text, size = 'small', style}: BattleshipTextProps) => {
  let sizeStyle;

  switch (size) {
    case 'xxlarge':
      sizeStyle = styles.xxlargeSize;
      break;
    case 'xlarge':
      sizeStyle = styles.xlargeSize;
      break;
    case 'large':
      sizeStyle = styles.largeSize;
      break;
    case 'medium':
      sizeStyle = styles.mediumSize;
      break;
    case 'small':
      sizeStyle = styles.smallSize;
      break;
    default:
      sizeStyle = styles.smallSize;
  }

  return <Text style={[styles.default, sizeStyle, style]}>{text}</Text>;
};

export default BattleshipText;
