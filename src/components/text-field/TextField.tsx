import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import {TextInput} from 'react-native-paper';
import {COLORS} from '../../lib/design';
import FieldError from '../field-error/FieldError';
import BattleshipText from '../battleship-text/BattleshipText';

interface TextFieldProps {
  value?: string;
  onChangeText: (text: string) => void;
  errors?: string[];
  label?: string;
  placeholder?: string;
  isPassword?: boolean;
  disabled?: boolean;
}

const TextField = ({
  value,
  onChangeText,
  errors,
  label,
  placeholder,
  isPassword = false,
  disabled = false,
}: TextFieldProps) => {
  return (
    <View style={styles.container}>
      <BattleshipText text={label} size="large" style={styles.label} />
      <FieldError errors={errors} />
      <TextInput
        value={value}
        onChangeText={text => onChangeText(text)}
        placeholder={placeholder}
        placeholderTextColor={COLORS.TEXT.DISABLED}
        style={styles.textInput}
        activeUnderlineColor={COLORS.TEXT.INFO}
        error={!!errors?.length}
        contentStyle={styles.textInput}
        disabled={disabled}
        secureTextEntry={isPassword}
      />
    </View>
  );
};

export default TextField;
