import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import styles from './styles';
import {ActivityIndicator} from 'react-native-paper';
import {getBattleshipButtonStyle} from './utils';
import {ACTIVE_OPACITY, COLORS} from '../../lib/design';
import BattleshipText, {
  BattleshipTextSize,
} from '../battleship-text/BattleshipText';

export type BattleshipButtonType = 'primary' | 'secondary';

interface BattleshipButtonProps {
  type?: BattleshipButtonType;
  onPress?: () => void;
  loading?: boolean;
  text?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const BattleshipButton = ({
  type = 'primary',
  onPress,
  loading = false,
  text,
  disabled = false,
  style,
}: BattleshipButtonProps) => {
  const buttonStyle = React.useMemo(() => {
    return getBattleshipButtonStyle(type);
  }, [type]);

  return (
    <TouchableOpacity
      style={[styles.container, buttonStyle?.container, style]}
      activeOpacity={ACTIVE_OPACITY}
      onPress={onPress}
      disabled={loading || disabled}>
      {loading && <ActivityIndicator animating color={COLORS.WHITE} />}
      {!loading && text && (
        <BattleshipText
          text={text}
          size={buttonStyle?.textSize as BattleshipTextSize}
          style={styles.primaryButtonText}
        />
      )}
    </TouchableOpacity>
  );
};

export default BattleshipButton;
