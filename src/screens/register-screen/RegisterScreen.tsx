import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import TextField from '../../components/text-field/TextField';
import HeaderWithTitle from '../../components/header-with-title/HeaderWithTitle';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useRegister from './useRegister';
import {PAGES_NAVIGATION} from '../../lib/pages-navigation';
import BattleshipButton from '../../components/battleship-button/BattleshipButton';
import FieldError from '../../components/field-error/FieldError';
import useLogin from '../login-screen/useLogin';

type Props = NativeStackScreenProps<{}>;

const RegisterScreen = ({navigation}: Props) => {
  const {loading, submit} = useRegister();
  const {submit: loginSubmit} = useLogin();

  const [email, setEmail] = React.useState<string>(),
    [password, setPassword] = React.useState<string>();

  const [errorMessage, setErrorMessage] = React.useState<string>();

  const validateForm = (): boolean => {
    let errorMsg = '';

    if (!email || email.length < 5 || email.length > 100) {
      errorMsg = 'The email address must be between 5 and 100 characters long.';
    }

    if (!password || password.length < 5 || password.length > 100) {
      errorMsg = 'The password must be between 5 and 100 characters long.';
    }

    setErrorMessage(errorMsg);

    if (errorMsg) {
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

    if (response && !response.success) {
      setErrorMessage(response?.data?.message);
      return;
    }

    const loginResponse = await loginSubmit({
      email,
      password,
    });

    if (loginResponse && !loginResponse.success) {
      setErrorMessage(loginResponse?.data?.message);
      return;
    }

    navigation.reset({
      index: 0,
      //@ts-ignore
      routes: [{name: PAGES_NAVIGATION.HOME_SCREEN}],
    });
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle navigation={navigation} title="Register" />
      <KeyboardAwareScrollView
        style={styles.scrollView}
        scrollEnabled
        contentContainerStyle={styles.content}
        resetScrollToCoords={{x: 0, y: 0}}>
        <View style={styles.card}>
          <TextField
            value={email}
            onChangeText={setEmail}
            label="Email address"
            placeholder={'mihnea@test.ro'}
            disabled={loading}
          />
          <TextField
            value={password}
            onChangeText={setPassword}
            label="Password"
            placeholder="*****"
            isPassword
            disabled={loading}
          />
          {errorMessage && (
            <View style={styles.row}>
              <FieldError errors={[errorMessage]} />
            </View>
          )}
          <View style={styles.row}>
            <BattleshipButton
              text="Register"
              onPress={submitForm}
              loading={loading}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default RegisterScreen;
