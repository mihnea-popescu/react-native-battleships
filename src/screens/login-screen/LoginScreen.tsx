import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useLogin from './useLogin';
import HeaderWithTitle from '../../components/header-with-title/HeaderWithTitle';
import TextField from '../../components/text-field/TextField';
import BattleshipButton from '../../components/battleship-button/BattleshipButton';
import FieldError from '../../components/field-error/FieldError';
import {PAGES_NAVIGATION} from '../../lib/pages-navigation';

type Props = NativeStackScreenProps<{}>;

const LoginScreen = ({navigation}: Props) => {
  const {loading, submit} = useLogin();

  const [email, setEmail] = React.useState<string>(),
    [password, setPassword] = React.useState<string>();

  const [errorMessage, setErrorMessage] = React.useState<string>();

  const validateForm = (): boolean => {
    let errorMsg = '';

    if (!email || email.length < 5 || email.length > 100) {
      errorMsg = 'Adresa de email trebuie să aibă între 5 și 100 de caractere.';
    }

    if (!password || password.length < 5 || password.length > 100) {
      errorMsg = 'Parola trebuie să aibă între 5 și 100 de caractere';
    }

    setErrorMessage(errorMsg);

    if (errorMsg.length) {
      return false;
    }

    return true;
  };

  const submitForm = async () => {
    if (!validateForm()) {
      return;
    }

    const response = await submit({
      email,
      password,
    });

    if (!response) {
      return;
    }

    if (!response.success) {
      if (response.data) {
        setErrorMessage(response.data.message);
      }
      return;
    }

    // @ts-ignore
    navigation.navigate(PAGES_NAVIGATION.HOME_SCREEN);
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle navigation={navigation} title="Login" />
      <KeyboardAwareScrollView
        style={styles.scrollView}
        scrollEnabled
        contentContainerStyle={styles.content}
        resetScrollToCoords={{x: 0, y: 0}}>
        <View style={styles.card}>
          <TextField
            value={email}
            onChangeText={setEmail}
            label="Adresă de mail"
            placeholder={'mihnea@test.ro'}
            disabled={loading}
          />
          <TextField
            value={password}
            onChangeText={setPassword}
            label="Parolă"
            placeholder="*****"
            isPassword
            disabled={loading}
          />
          {errorMessage && <FieldError errors={[errorMessage]} />}
          <View style={styles.row}>
            <BattleshipButton
              text="Loghează-te"
              onPress={submitForm}
              loading={loading}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default LoginScreen;
