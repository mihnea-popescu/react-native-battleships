import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {PAGES_NAVIGATION} from '../lib/pages-navigation';
import HomeScreen from './home-screen/HomeScreen';
import {PaperProvider} from 'react-native-paper';
import store from '../store';
import {Provider} from 'react-redux';

const Stack = createNativeStackNavigator();

const RootScreen = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={PAGES_NAVIGATION.HOME_SCREEN}>
            <Stack.Screen
              name={PAGES_NAVIGATION.HOME_SCREEN}
              component={HomeScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default RootScreen;
