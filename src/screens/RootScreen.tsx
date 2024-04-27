import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {PAGES_NAVIGATION} from '../lib/pages-navigation';
import HomeScreen from './home-screen/HomeScreen';
import {PaperProvider} from 'react-native-paper';
import store from '../store';
import {Provider} from 'react-redux';
import {isLoggedIn} from '../lib/storage/user-storage';
import AuthenticateScreen from './authenticate-screen/AuthenticateScreen';
import LoginScreen from './login-screen/LoginScreen';
import RegisterScreen from './register-screen/RegisterScreen';
import UserProfileScreen from './user-profile-screen/UserProfileScreen';
import GameListScreen from './game-list-screen/GameListScreen';
import GameScreen from './game-screen/GameScreen';

const Stack = createNativeStackNavigator();

const RootScreen = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={
              isLoggedIn
                ? PAGES_NAVIGATION.HOME_SCREEN
                : PAGES_NAVIGATION.AUTHENTICATE_SCREEN
            }>
            <Stack.Screen
              name={PAGES_NAVIGATION.AUTHENTICATE_SCREEN}
              component={AuthenticateScreen}
            />
            <Stack.Screen
              name={PAGES_NAVIGATION.LOGIN_SCREEN}
              component={LoginScreen}
            />
            <Stack.Screen
              name={PAGES_NAVIGATION.REGISTER_SCREEN}
              component={RegisterScreen}
            />

            <Stack.Screen
              name={PAGES_NAVIGATION.HOME_SCREEN}
              component={HomeScreen}
            />
            <Stack.Screen
              name={PAGES_NAVIGATION.USER_PROFILE_SCREEN}
              component={UserProfileScreen}
            />
            <Stack.Screen
              name={PAGES_NAVIGATION.GAME_LIST_SCREEN}
              component={GameListScreen}
            />
            <Stack.Screen
              name={PAGES_NAVIGATION.GAME_SCREEN}
              component={GameScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default RootScreen;
