import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import BattleshipText from '../battleship-text/BattleshipText';

interface FieldErrorProps {
  errors?: string[];
}

const FieldError = ({errors}: FieldErrorProps) => {
  if (!errors || !errors.length) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      {errors.map((err, i) => (
        <View key={`error-container-${i}`} style={styles.errorContainer}>
          <BattleshipText size="medium" text={err} style={styles.errorText} />
        </View>
      ))}
    </View>
  );
};

export default FieldError;
